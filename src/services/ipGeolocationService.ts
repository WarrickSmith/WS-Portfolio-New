import { VisitorGeolocation } from '../types/visitor.types'

const GEOLOCATION_TIMEOUT_MS = 8000

const FALLBACK_GEOLOCATION: VisitorGeolocation = {
  ip: '0.0.0.0',
  city: 'Unknown',
  region: 'Unknown',
  country: 'Unknown',
  latitude: 0,
  longitude: 0,
  timezone: 'UTC',
  isp: 'Unknown',
}

export class IpGeolocationService {
  private static readonly API_URL = 'https://ipapi.co/json/'

  static async getGeolocation(): Promise<VisitorGeolocation> {
    let timeoutId: ReturnType<typeof setTimeout>
    try {
      const result = await Promise.race([
        fetch(this.API_URL).then((res) => {
          clearTimeout(timeoutId)
          return res
        }),
        new Promise<never>((_, reject) => {
          timeoutId = setTimeout(() => reject(new Error('Geolocation request timed out')), GEOLOCATION_TIMEOUT_MS)
        }),
      ])

      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`)
      }

      const data = await result.json()

      return {
        ip: data.ip || FALLBACK_GEOLOCATION.ip,
        city: data.city || FALLBACK_GEOLOCATION.city,
        region: data.region || FALLBACK_GEOLOCATION.region,
        country: data.country || FALLBACK_GEOLOCATION.country,
        latitude: parseFloat(data.latitude) || 0,
        longitude: parseFloat(data.longitude) || 0,
        timezone: data.timezone || FALLBACK_GEOLOCATION.timezone,
        isp: data.org || FALLBACK_GEOLOCATION.isp,
      }
    } catch (error) {
      clearTimeout(timeoutId!)
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to fetch geolocation:', error)
      }

      return { ...FALLBACK_GEOLOCATION }
    }
  }
}
