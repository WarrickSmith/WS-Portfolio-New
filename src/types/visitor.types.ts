export interface VisitorGeolocation {
  ip: string
  city: string
  region: string
  country: string
  latitude: number
  longitude: number
  timezone: string
}

export interface VisitorData {
  ip: string
  timestamp: string
  geolocation: VisitorGeolocation
  userAgent: string
  referrer: string
  pageUrl: string
}

export interface EmailJSParams {
  service_id: string
  template_id: string
  user_id: string
  template_params: {
    visitor_ip: string
    visitor_city: string
    visitor_region: string
    visitor_country: string
    visitor_timezone: string
    visit_timestamp: string
    visitor_user_agent: string
    visitor_referrer: string
    visitor_page_url: string
  }
}

export interface RateLimitConfig {
  windowMs: number
  maxRequests: number
  storageKey: string
}
