export interface VisitorGeolocation {
  ip: string
  city: string
  region: string
  country: string
  latitude: number
  longitude: number
  timezone: string
  isp: string
}

export interface UTMParams {
  source: string
  medium: string
  campaign: string
  term: string
  content: string
}

export interface VisitorData {
  ip: string
  timestamp: string
  geolocation: VisitorGeolocation
  userAgent: string
  browser: string
  os: string
  deviceType: string
  screenResolution: string
  viewportSize: string
  referrer: string
  utmParams: UTMParams
  language: string
  connectionType: string
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
    visitor_isp: string
    visit_timestamp: string
    visitor_user_agent: string
    visitor_browser: string
    visitor_os: string
    visitor_device_type: string
    visitor_screen_resolution: string
    visitor_viewport_size: string
    visitor_referrer: string
    visitor_utm_source: string
    visitor_utm_medium: string
    visitor_utm_campaign: string
    visitor_utm_term: string
    visitor_utm_content: string
    visitor_language: string
    visitor_connection_type: string
    visitor_page_url: string
  }
}

export interface RateLimitConfig {
  windowMs: number
  maxRequests: number
  storageKey: string
}
