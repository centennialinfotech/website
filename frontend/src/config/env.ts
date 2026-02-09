/**
 * Environment configuration
 * Centralized configuration - change URL in one place only
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://cc-5vhm.onrender.com'
export const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LceVxcqAAAAAF_gPRPoijZWJ1NUrg2MRu3nlcJI'
export const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'drutr9why'
export const CLOUDINARY_FOLDER = import.meta.env.VITE_CLOUDINARY_FOLDER || 'img'