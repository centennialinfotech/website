import { useEffect, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import intlTelInput from 'intl-tel-input'
import 'intl-tel-input/build/css/intlTelInput.css'
import ReCAPTCHA from 'react-google-recaptcha'
import axiosInstance from '../utils/axios'
import { RECAPTCHA_SITE_KEY } from '../config/env'

interface ContactFormData {
  name: string
  email: string
  query: string
  phone: string
}

declare global {
  interface Window {
    Toastify?: any
  }
}

function ContactForm() {
  const phoneInputRef = useRef<HTMLInputElement | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const itiInstanceRef = useRef<any>(null)
  const [recaptchaToken, setRecaptchaToken] = useState<string>('')
  const phoneValueRef = useRef<string>('') // Store phone value to prevent loss

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>({
    mode: 'onSubmit', // Only validate on submit to prevent premature validation
    reValidateMode: 'onBlur', // Re-validate on blur after first submit
    shouldUnregister: false, // Keep values even when fields are unmounted
    defaultValues: {
      name: '',
      email: '',
      query: '',
      phone: ''
    }
  })

  // Initialize intl-tel-input using the npm package
  useEffect(() => {
    if (!phoneInputRef.current) {
      return
    }

    if (itiInstanceRef.current) {
      return
    }

    const initIntlTelInput = () => {
      if (!phoneInputRef.current) {
        return
      }

      try {
        itiInstanceRef.current = intlTelInput(phoneInputRef.current, {
          autoHideDialCode: true,
          autoPlaceholder: 'polite' as any,
          dropdownContainer: document.body,
          formatOnDisplay: true,
          initialCountry: 'in',
          placeholderNumberType: 'MOBILE' as any,
          preferredCountries: ['us', 'gb', 'in'],
          separateDialCode: true,
          utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@12.1.6/build/js/utils.js'
        } as any)
      } catch (error) {
        console.error('Error initializing intl-tel-input:', error)
      }
    }

    const timer = setTimeout(initIntlTelInput, 100)

    return () => {
      clearTimeout(timer)
      if (itiInstanceRef.current?.destroy) {
        try {
          itiInstanceRef.current.destroy()
        } catch (error) {
          console.error('Error destroying intl-tel-input:', error)
        }
        itiInstanceRef.current = null
      }
    }
  }, [])

  const showToast = (message: string, type: 'success' | 'error') => {
    if (window.Toastify) {
      window.Toastify({
        text: message,
        duration: 4000,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: type === 'error' ? '#f44336' : '#4CAF50',
        stopOnFocus: true
      }).showToast()
    }
  }

  const onSubmit = async (data: ContactFormData) => {
    // Get phone number with country code from intl-tel-input
    let phoneNumber = ''
    
    // First, try to get the full number from intl-tel-input (includes country code)
    if (itiInstanceRef.current) {
      try {
        const fullNumber = itiInstanceRef.current.getNumber()
        if (fullNumber && fullNumber.trim().length > 0) {
          // Verify it has enough digits
          const digitsOnly = fullNumber.replace(/\D/g, '')
          if (digitsOnly.length >= 10) {
            phoneNumber = fullNumber
          }
        }
      } catch (error) {
        console.error('Error getting number from intl-tel-input:', error)
      }
    }
    
    // If we don't have a number from intl-tel-input, construct it from input + country code
    if (!phoneNumber) {
      const phoneValue = phoneInputRef.current?.value.trim() || ''
      if (phoneValue) {
        const digitsOnly = phoneValue.replace(/\D/g, '')
        if (digitsOnly.length >= 10) {
          // Get country code from intl-tel-input
          if (itiInstanceRef.current) {
            try {
              const countryData = itiInstanceRef.current.getSelectedCountryData()
              if (countryData && countryData.dialCode) {
                phoneNumber = `+${countryData.dialCode}${digitsOnly}`
              } else {
                phoneNumber = phoneValue
              }
            } catch (error) {
              phoneNumber = phoneValue
            }
          } else {
            phoneNumber = phoneValue
          }
        }
      }
    }

    // Validate phone number has minimum digits
    if (!phoneNumber || phoneNumber.trim().length === 0) {
      showToast('Please enter a phone number.', 'error')
      return
    }
    
    const digitsOnly = phoneNumber.replace(/\D/g, '')
    if (digitsOnly.length < 10) {
      showToast('Please enter a valid phone number (at least 10 digits).', 'error')
      return
    }

    // Get reCAPTCHA token
    if (!recaptchaToken) {
      showToast('Please complete the reCAPTCHA.', 'error')
      return
    }

    try {
      const response = await axiosInstance.post('/v1/contact-us', {
        name: data.name,
        phone: phoneNumber,
        email: data.email,
        query: data.query,
        recaptchaToken: recaptchaToken
      }, {
        timeout: 30000 // 30 seconds timeout
      })

      if (response.status === 200 || response.status === 201) {
        showToast('Form submitted successfully!', 'success')
        // Only reset form on successful submission
        phoneValueRef.current = '' // Clear stored phone value
        reset({
          name: '',
          email: '',
          query: '',
          phone: ''
        })
        if (phoneInputRef.current) {
          phoneInputRef.current.value = ''
          if (itiInstanceRef.current?.setNumber) {
            itiInstanceRef.current.setNumber('')
          }
        }
        if (recaptchaRef.current) {
          recaptchaRef.current.reset()
          setRecaptchaToken('')
        }
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || 'Unknown error'
      showToast(`Submission Error: ${errorMessage}`, 'error')
      // Don't reset form on error - keep user's input
      // Explicitly preserve form values
    }
  }

  return (
    <div className="contact-right">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h6 className="small-text">Contact with me</h6>
        <h3 className="main-heading pb-2">Get in Touch</h3>

        <div className="row cr-input">
          <div className="col-md-6 col-lg-6 col-sm-4 col-xl-6">
            <Controller
              name="name"
              control={control}
              rules={{
                required: 'Name is required',
                minLength: {
                  value: 3,
                  message: 'Name must be at least 3 characters long'
                },
                validate: (value) => {
                  if (/^\d+$/.test(value)) {
                    return 'Name cannot be a number'
                  }
                  return true
                }
              }}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    placeholder="Your Name"
                    className="cr-name"
                  />
                  {errors.name && (
                    <small style={{ color: 'red', display: 'block', marginTop: '5px' }}>
                      {errors.name.message}
                    </small>
                  )}
                </>
              )}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-4 col-xl-6">
            <Controller
              name="phone"
              control={control}
              rules={{
                validate: (fieldValue) => {
                  // Get value from multiple sources to ensure we don't miss it
                  const inputValue = phoneInputRef.current?.value || ''
                  const formFieldValue = fieldValue || ''
                  const storedValue = phoneValueRef.current || ''
                  const valueToCheck = inputValue || formFieldValue || storedValue
                  const trimmedValue = valueToCheck.trim()
                  
                  // Extract digits from the value
                  const inputDigits = trimmedValue.replace(/\D/g, '')
                  
                  // Debug logging
                  console.log('Phone validation - inputValue:', inputValue, 'formFieldValue:', formFieldValue, 'inputDigits:', inputDigits, 'length:', inputDigits.length)
                  
                  // If we have 10 or more digits, it's valid
                  if (inputDigits.length >= 10) {
                    return true
                  }
                  
                  // If we have some digits but less than 10, show length error
                  if (inputDigits.length > 0 && inputDigits.length < 10) {
                    return 'Please enter a valid phone number (at least 10 digits)'
                  }
                  
                  // If input is empty, check intl-tel-input as fallback
                  if (itiInstanceRef.current) {
                    try {
                      const fullNumber = itiInstanceRef.current.getNumber()
                      if (fullNumber && fullNumber.trim().length > 0) {
                        const digitsOnly = fullNumber.replace(/\D/g, '')
                        console.log('Phone validation - fullNumber from intl-tel-input:', fullNumber, 'digitsOnly:', digitsOnly)
                        if (digitsOnly.length >= 10) {
                          return true
                        }
                      }
                    } catch (error) {
                      console.error('Error in phone validation:', error)
                    }
                  }
                  
                  // If we get here, no valid number found
                  return 'Phone number is required'
                }
              }}
              render={({ field }) => (
                <>
                  <input
                    type="tel"
                    placeholder="XXXXXXXXXX"
                    className="number cr-name"
                    value={field.value || phoneValueRef.current || phoneInputRef.current?.value || ''}
                    ref={(e) => {
                      field.ref(e)
                      if (e) {
                        phoneInputRef.current = e
                        // Sync field value with input value if input has value but field doesn't
                        const currentValue = e.value || phoneValueRef.current || ''
                        if (currentValue && currentValue !== field.value) {
                          phoneValueRef.current = currentValue
                          field.onChange(currentValue)
                        }
                      }
                    }}
                    onChange={(e) => {
                      const newValue = e.target.value
                      // Store the value in ref to prevent loss
                      phoneValueRef.current = newValue
                      // Update both the field and ensure input keeps the value
                      field.onChange(newValue)
                      // Ensure the input element keeps the value
                      if (phoneInputRef.current) {
                        phoneInputRef.current.value = newValue
                      }
                    }}
                    onBlur={() => {
                      // Preserve the value on blur
                      const currentValue = phoneInputRef.current?.value || phoneValueRef.current || field.value || ''
                      if (currentValue) {
                        phoneValueRef.current = currentValue
                        if (currentValue !== field.value) {
                          field.onChange(currentValue)
                        }
                      }
                      field.onBlur()
                    }}
                  />
                  {errors.phone && (
                    <small style={{ color: 'red', display: 'block', marginTop: '5px' }}>
                      {errors.phone.message}
                    </small>
                  )}
                </>
              )}
            />
          </div>
        </div>

        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email address'
            }
          }}
          render={({ field }) => (
            <>
              <input
                {...field}
                type="email"
                placeholder="Email Address"
                className="cr-email"
              />
              {errors.email && (
                <small style={{ color: 'red', display: 'block', marginTop: '5px' }}>
                  {errors.email.message}
                </small>
              )}
            </>
          )}
        />

        <Controller
          name="query"
          control={control}
          rules={{
            required: 'Query is required'
          }}
          render={({ field }) => (
            <>
              <textarea
                {...field}
                placeholder="Drop your query here"
                className="cr-query"
              />
              {errors.query && (
                <small style={{ color: 'red', display: 'block', marginTop: '5px' }}>
                  {errors.query.message}
                </small>
              )}
            </>
          )}
        />

          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={(token) => setRecaptchaToken(token || '')}
          />

        <div className="pt-4">
          <button type="submit" className="cr-button" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
