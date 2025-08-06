import { VisitorGeolocation } from '../types/visitor.types'

export class IpGeolocationService {
  private static readonly API_URL = 'https://ipapi.co/json/'

  /**
   * Fetches geolocation data for the current visitor
   * @returns Promise<VisitorGeolocation> - Geolocation data
   * @throws Error if API request fails
   */
  static async getGeolocation(): Promise<VisitorGeolocation> {
    try {
      const response = await fetch(this.API_URL)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // Validate required fields
      if (!data.ip || !data.city || !data.region || !data.country) {
        throw new Error('Invalid geolocation response format')
      }

      return {
        ip: data.ip,
        city: data.city,
        region: data.region,
        country: data.country,
        latitude: parseFloat(data.latitude) || 0,
        longitude: parseFloat(data.longitude) || 0,
        timezone: data.timezone || 'UTC',
      }
    } catch (error) {
      console.error('Failed to fetch geolocation:', error)

      // Return fallback data for privacy compliance
      return {
        ip: '0.0.0.0',
        city: 'Unknown',
        region: 'Unknown',
        country: 'Unknown',
        latitude: 0,
        longitude: 0,
        timezone: 'UTC',
      }
    }
  }

  /**
   * Checks if geolocation service is available
   * @returns boolean - Service availability
   */
  static isAvailable(): boolean {
    return typeof window !== 'undefined' && window.fetch !== undefined
  }
}
