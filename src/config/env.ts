const buildEnv: RuntimeEnv = {
  EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
  EMAILJS_CONTACT_TEMPLATE_ID: process.env.EMAILJS_CONTACT_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY,
  RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
  DEBUG_VISITOR_TRACKING: process.env.DEBUG_VISITOR_TRACKING,
  API_URL: process.env.API_URL,
  ENABLE_VISITOR_TRACKING: process.env.ENABLE_VISITOR_TRACKING,
}

const getRuntimeEnv = (): RuntimeEnv | undefined => {
  if (typeof window === 'undefined') {
    return undefined
  }

  return window.__ENV
}

const readEnv = (key: keyof RuntimeEnv): string => {
  return getRuntimeEnv()?.[key] ?? buildEnv[key] ?? ''
}

const parseFeatureFlag = (value: string): boolean => {
  const normalizedValue = value.trim().toLowerCase()

  return normalizedValue === 'true'
    || normalizedValue === '1'
    || normalizedValue === 'yes'
    || normalizedValue === 'on'
}

export const EMAILJS_SERVICE_ID = readEnv('EMAILJS_SERVICE_ID')
export const EMAILJS_TEMPLATE_ID = readEnv('EMAILJS_TEMPLATE_ID')
export const EMAILJS_CONTACT_TEMPLATE_ID = readEnv('EMAILJS_CONTACT_TEMPLATE_ID')
export const EMAILJS_PUBLIC_KEY = readEnv('EMAILJS_PUBLIC_KEY')
export const RECAPTCHA_SITE_KEY = readEnv('RECAPTCHA_SITE_KEY')
export const DEBUG_VISITOR_TRACKING = parseFeatureFlag(
  readEnv('DEBUG_VISITOR_TRACKING')
)
export const API_URL = readEnv('API_URL')
export const ENABLE_VISITOR_TRACKING = parseFeatureFlag(
  readEnv('ENABLE_VISITOR_TRACKING')
)
