import { useEffect } from 'react'
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
    // Track visitor on component mount
    trackVisitor()
  }, []) // Empty dependency array ensures this runs only once per session

  // Log tracking status for debugging (only in development)
  if (import.meta.env.DEV) {
    console.log('VisitorTracker Status:', {
      isLoading,
      error,
      isRateLimited,
    })
  }

  // This component doesn't render anything visible
  return null
}

export default VisitorTracker
