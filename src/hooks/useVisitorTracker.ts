import { useState, useCallback } from 'react'
import emailjs from '@emailjs/browser'
import {
  DEBUG_VISITOR_TRACKING,
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  ENABLE_VISITOR_TRACKING,
} from '../config/env'
import { VisitorData, RateLimitConfig, UTMParams } from '../types/visitor.types'
import { IpGeolocationService } from '../services/ipGeolocationService'

const RATE_LIMIT_CONFIG: RateLimitConfig = {
  windowMs: 5 * 60 * 1000,
  maxRequests: 1,
  storageKey: 'visitor_notification_sent',
}

const EMAILJS_TIMEOUT_MS = 10000

interface NetworkInformation {
  effectiveType?: string
}

function parseBrowser(ua: string): string {
  if (ua.includes('Edg/')) {
    const match = ua.match(/Edg\/([\d.]+)/)
    return match ? `Edge ${match[1]}` : 'Edge'
  }
  if (ua.includes('Chrome/') && !ua.includes('Chromium/')) {
    const match = ua.match(/Chrome\/([\d.]+)/)
    return match ? `Chrome ${match[1]}` : 'Chrome'
  }
  if (ua.includes('Firefox/')) {
    const match = ua.match(/Firefox\/([\d.]+)/)
    return match ? `Firefox ${match[1]}` : 'Firefox'
  }
  if (ua.includes('Safari/') && !ua.includes('Chrome/')) {
    const match = ua.match(/Version\/([\d.]+)/)
    return match ? `Safari ${match[1]}` : 'Safari'
  }
  return 'Unknown'
}

function parseOS(ua: string): string {
  if (ua.includes('Windows NT 10.0')) return 'Windows 10/11'
  if (ua.includes('Windows NT')) return 'Windows'
  if (ua.includes('Mac OS X')) {
    const match = ua.match(/Mac OS X ([\d_]+)/)
    return match ? `macOS ${match[1].replace(/_/g, '.')}` : 'macOS'
  }
  if (ua.includes('Android')) {
    const match = ua.match(/Android ([\d.]+)/)
    return match ? `Android ${match[1]}` : 'Android'
  }
  if (ua.includes('iPhone OS') || ua.includes('iPad')) {
    const match = ua.match(/OS ([\d_]+)/)
    return match ? `iOS ${match[1].replace(/_/g, '.')}` : 'iOS'
  }
  if (ua.includes('Linux')) return 'Linux'
  return 'Unknown'
}

function inferDeviceType(): string {
  const hasTouch = navigator.maxTouchPoints > 0
  const width = window.innerWidth
  if (hasTouch && width < 768) return 'mobile'
  if (hasTouch && width >= 768) return 'tablet'
  return 'desktop'
}

function extractUTMParams(): UTMParams {
  const params = new URLSearchParams(window.location.search)
  return {
    source: params.get('utm_source') || '',
    medium: params.get('utm_medium') || '',
    campaign: params.get('utm_campaign') || '',
    term: params.get('utm_term') || '',
    content: params.get('utm_content') || '',
  }
}

function getConnectionType(): string {
  const nav = navigator as Navigator & { connection?: NetworkInformation }
  return nav.connection?.effectiveType || 'unknown'
}

function collectBrowserData() {
  const ua = navigator.userAgent
  return {
    userAgent: ua,
    browser: parseBrowser(ua),
    os: parseOS(ua),
    deviceType: inferDeviceType(),
    screenResolution: `${screen.width}x${screen.height}`,
    viewportSize: `${window.innerWidth}x${window.innerHeight}`,
    referrer: document.referrer || 'Direct',
    utmParams: extractUTMParams(),
    language: navigator.language,
    connectionType: getConnectionType(),
    pageUrl: window.location.href,
  }
}

export const useVisitorTracker = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isRateLimited, setIsRateLimited] = useState(false)
  const shouldLogDebug = DEBUG_VISITOR_TRACKING

  const checkRateLimit = useCallback((): boolean => {
    if (typeof window === 'undefined') return false

    const lastSent = localStorage.getItem(RATE_LIMIT_CONFIG.storageKey)
    if (!lastSent) return false

    const lastSentTime = parseInt(lastSent, 10)
    const now = Date.now()

    return now - lastSentTime < RATE_LIMIT_CONFIG.windowMs
  }, [])

  const setRateLimit = useCallback((): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(RATE_LIMIT_CONFIG.storageKey, Date.now().toString())
  }, [])

  const collectVisitorData =
    useCallback(async (): Promise<VisitorData> => {
      const geolocation = await IpGeolocationService.getGeolocation()
      const browserData = collectBrowserData()

      return {
        ip: geolocation.ip,
        timestamp: new Date().toISOString(),
        geolocation,
        ...browserData,
      }
    }, [])

  const sendVisitorNotification = useCallback(
    async (visitorData: VisitorData): Promise<boolean> => {
      try {
        const serviceId = EMAILJS_SERVICE_ID
        const templateId = EMAILJS_TEMPLATE_ID
        const publicKey = EMAILJS_PUBLIC_KEY

        if (!serviceId || !templateId || !publicKey) {
          throw new Error('EmailJS configuration missing')
        }

        const templateParams = {
          visitor_ip: visitorData.ip,
          visitor_city: visitorData.geolocation.city,
          visitor_region: visitorData.geolocation.region,
          visitor_country: visitorData.geolocation.country,
          visitor_timezone: visitorData.geolocation.timezone,
          visitor_isp: visitorData.geolocation.isp,
          visit_timestamp: new Date(visitorData.timestamp).toLocaleString(),
          visitor_user_agent: visitorData.userAgent,
          visitor_browser: visitorData.browser,
          visitor_os: visitorData.os,
          visitor_device_type: visitorData.deviceType,
          visitor_screen_resolution: visitorData.screenResolution,
          visitor_viewport_size: visitorData.viewportSize,
          visitor_referrer: visitorData.referrer,
          visitor_utm_source: visitorData.utmParams.source,
          visitor_utm_medium: visitorData.utmParams.medium,
          visitor_utm_campaign: visitorData.utmParams.campaign,
          visitor_utm_term: visitorData.utmParams.term,
          visitor_utm_content: visitorData.utmParams.content,
          visitor_language: visitorData.language,
          visitor_connection_type: visitorData.connectionType,
          visitor_page_url: visitorData.pageUrl,
        }

        await Promise.race([
          emailjs.send(serviceId, templateId, templateParams, publicKey),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('EmailJS send timed out')), EMAILJS_TIMEOUT_MS)
          ),
        ])

        return true
      } catch (error) {
        if (shouldLogDebug) {
          console.error('Failed to send visitor notification:', error)
        }

        return false
      }
    },
    [shouldLogDebug]
  )

  const trackVisitor = useCallback(async (): Promise<void> => {
    if (!ENABLE_VISITOR_TRACKING) {
      return
    }

    if (checkRateLimit()) {
      if (shouldLogDebug) {
        console.log('Visitor tracking skipped: rate limited')
      }
      setIsRateLimited(true)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const visitorData = await collectVisitorData()

      if (shouldLogDebug) {
        console.log('Visitor data collected:', visitorData)
      }

      const success = await sendVisitorNotification(visitorData)

      if (success) {
        if (shouldLogDebug) {
          console.log('Visitor notification sent successfully')
        }
        setRateLimit()
        setIsRateLimited(true)
      } else {
        throw new Error('Failed to send notification')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }, [
    shouldLogDebug,
    checkRateLimit,
    collectVisitorData,
    sendVisitorNotification,
    setRateLimit,
    ENABLE_VISITOR_TRACKING,
  ])

  return {
    trackVisitor,
    isLoading,
    error,
    isRateLimited,
  }
}
