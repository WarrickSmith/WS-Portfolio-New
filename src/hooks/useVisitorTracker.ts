import { useEffect, useState, useCallback } from 'react'
import emailjs from '@emailjs/browser'
import { VisitorData, RateLimitConfig } from '../types/visitor.types'
import { IpGeolocationService } from '../services/ipGeolocationService'

// Rate limiting configuration
const RATE_LIMIT_CONFIG: RateLimitConfig = {
  windowMs: 5 * 60 * 1000, // 5 minutes
  maxRequests: 1,
  storageKey: 'visitor_notification_sent',
}

export const useVisitorTracker = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isRateLimited, setIsRateLimited] = useState(false)

  /**
   * Checks if the visitor has been notified within the rate limit window
   */
  const checkRateLimit = useCallback((): boolean => {
    if (typeof window === 'undefined') return false

    const lastSent = localStorage.getItem(RATE_LIMIT_CONFIG.storageKey)
    if (!lastSent) return false

    const lastSentTime = parseInt(lastSent, 10)
    const now = Date.now()

    return now - lastSentTime < RATE_LIMIT_CONFIG.windowMs
  }, [])

  /**
   * Sets the rate limit marker
   */
  const setRateLimit = useCallback((): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(RATE_LIMIT_CONFIG.storageKey, Date.now().toString())
  }, [])

  /**
   * Collects visitor data including geolocation
   */
  const collectVisitorData =
    useCallback(async (): Promise<VisitorData | null> => {
      try {
        if (!IpGeolocationService.isAvailable()) {
          throw new Error('Geolocation service not available')
        }

        const geolocation = await IpGeolocationService.getGeolocation()

        return {
          ip: geolocation.ip,
          timestamp: new Date().toISOString(),
          geolocation,
          userAgent: navigator.userAgent,
          referrer: document.referrer || 'Direct',
          pageUrl: window.location.href,
        }
      } catch (error) {
        console.error('Failed to collect visitor data:', error)
        return null
      }
    }, [])

  /**
   * Sends visitor notification email via EmailJS
   */
  const sendVisitorNotification = useCallback(
    async (visitorData: VisitorData): Promise<boolean> => {
      try {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

        if (!serviceId || !templateId || !publicKey) {
          throw new Error('EmailJS configuration missing')
        }

        const templateParams = {
          visitor_ip: visitorData.ip,
          visitor_city: visitorData.geolocation.city,
          visitor_region: visitorData.geolocation.region,
          visitor_country: visitorData.geolocation.country,
          visitor_timezone: visitorData.geolocation.timezone,
          visit_timestamp: new Date(visitorData.timestamp).toLocaleString(),
          visitor_user_agent: visitorData.userAgent,
          visitor_referrer: visitorData.referrer,
          visitor_page_url: visitorData.pageUrl,
        }

        await emailjs.send(serviceId, templateId, templateParams, publicKey)
        return true
      } catch (error) {
        console.error('Failed to send visitor notification:', error)
        return false
      }
    },
    []
  )

  /**
   * Main function to track visitor and send notification
   */
  const trackVisitor = useCallback(async (): Promise<void> => {
    // Skip if already rate limited
    if (checkRateLimit()) {
      setIsRateLimited(true)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const visitorData = await collectVisitorData()

      if (!visitorData) {
        throw new Error('Failed to collect visitor data')
      }

      const success = await sendVisitorNotification(visitorData)

      if (success) {
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
    checkRateLimit,
    collectVisitorData,
    sendVisitorNotification,
    setRateLimit,
  ])

  return {
    trackVisitor,
    isLoading,
    error,
    isRateLimited,
  }
}
