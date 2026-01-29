import { useForm, Controller } from 'react-hook-form'
import axiosInstance from '../utils/axios'

interface NewsletterFormData {
  email: string
}

declare global {
  interface Window {
    Toastify?: any
  }
}

function NewsletterForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<NewsletterFormData>({
    defaultValues: {
      email: ''
    }
  })

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

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      const response = await axiosInstance.post('/subscribe', {
        email: data.email
      })

      if (response.status === 200 || response.status === 201) {
        showToast('Subscription successful!', 'success')
        reset()
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.response?.data || error.message || 'Unknown error'
      showToast(`Subscription Error: ${errorMessage}`, 'error')
    }
  }

  return (
    <div className="map-head">
      <div className="container">
        <h1 className="map-h1">Sign up for our newsletter to get updated information, news, insights, or promotions</h1>
        <p className="map-subhead">Break down language barriers to learning and gain new skills with Our newsletter</p>
        <form className="map-form" onSubmit={handleSubmit(onSubmit)}>
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
                  className="map-email"
                />
                {errors.email && (
                  <small style={{ color: 'red', display: 'block', marginTop: '5px' }}>
                    {errors.email.message}
                  </small>
                )}
              </>
            )}
          />
          <button type="submit" className="ml-1 map-btn">Join Now</button>
        </form>
      </div>
    </div>
  )
}

export default NewsletterForm
