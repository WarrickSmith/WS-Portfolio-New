import { useEffect } from 'react'
import { DEBUG_VISITOR_TRACKING, ENABLE_VISITOR_TRACKING } from '../config/env'
import { useVisitorTracker } from '../hooks/useVisitorTracker'

/**
 * VisitorTracker Component
 *
 * A non-visual component that tracks portfolio visitors and sends email notifications.
 * Implements rate limiting (5-minute window per IP) and privacy-compliant data collection.
 *
 * Usage: Place this component in your app root to enable visitor tracking.
 */
export const VisitorTracker = () => {
  const { trackVisitor, isLoading, error, isRateLimited } = useVisitorTracker()

  useEffect(() => {
    if (!ENABLE_VISITOR_TRACKING) {
      return
    }

    const runTracking = () => {
      void trackVisitor()
    }

    if (typeof window.requestIdleCallback === 'function') {
      const idleId = window.requestIdleCallback(runTracking, { timeout: 3000 })

      return () => {
        window.cancelIdleCallback(idleId)
      }
    }

    const timeoutId = window.setTimeout(runTracking, 1500)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [trackVisitor])

  useEffect(() => {
    if (!DEBUG_VISITOR_TRACKING) {
      return
    }

    console.log('VisitorTracker Status:', {
      isLoading,
      error,
      isRateLimited,
      isEnabled: ENABLE_VISITOR_TRACKING,
    })
  }, [error, isLoading, isRateLimited])

  // This component doesn't render anything visible
  return null
}

export default VisitorTracker
