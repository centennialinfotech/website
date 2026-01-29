import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Custom hook to scroll to top when route changes
 * Use this hook in page components to ensure page starts from top on navigation
 * Uses smooth scrolling behavior
 */
function useScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [pathname])
}

export default useScrollToTop
