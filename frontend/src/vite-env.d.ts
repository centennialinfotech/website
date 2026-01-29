/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  // Add more env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Extend Window interface for third-party scripts
interface Window {
  Tawk_API?: any
  Tawk_LoadStart?: Date
  Toastify?: any
  intlTelInput?: any
  intlTelInputGlobals?: any
  grecaptcha?: any
  recaptchaCallback?: (response: string) => void
}
