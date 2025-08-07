declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    EMAILJS_SERVICE_ID: string;
    EMAILJS_TEMPLATE_ID: string;
    EMAILJS_CONTACT_TEMPLATE_ID: string;
    EMAILJS_PUBLIC_KEY: string;
    RECAPTCHA_SITE_KEY: string;
    DEBUG_VISITOR_TRACKING: string;
    API_URL: string;
  }
}