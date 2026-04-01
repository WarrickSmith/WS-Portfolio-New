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

    void trackVisitor()
  }, [trackVisitor])

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development' || !DEBUG_VISITOR_TRACKING) {
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
