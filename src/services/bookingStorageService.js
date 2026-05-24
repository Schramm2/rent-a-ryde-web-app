// Service to handle temporary storage of booking form data
// This allows users to fill out the booking form, then login/register, and have their data restored

const BOOKING_STORAGE_KEY = 'pendingBookingData'
const BOOKING_RETURN_URL_KEY = 'bookingReturnUrl'

export const bookingStorageService = {
  // Store booking form data temporarily
  storeBookingData(bookingData) {
    try {
      const dataToStore = {
        ...bookingData,
        timestamp: Date.now(),
        expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours expiry
      }
      sessionStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(dataToStore))
      return true
    } catch (error) {
      console.error('Failed to store booking data:', error)
      return false
    }
  },

  // Retrieve stored booking data
  getBookingData() {
    try {
      const stored = sessionStorage.getItem(BOOKING_STORAGE_KEY)
      if (!stored) return null

      const data = JSON.parse(stored)
      
      // Check if data has expired
      if (data.expiresAt && Date.now() > data.expiresAt) {
        this.clearBookingData()
        return null
      }

      return data
    } catch (error) {
      console.error('Failed to retrieve booking data:', error)
      return null
    }
  },

  // Clear stored booking data
  clearBookingData() {
    try {
      sessionStorage.removeItem(BOOKING_STORAGE_KEY)
      sessionStorage.removeItem(BOOKING_RETURN_URL_KEY)
      return true
    } catch (error) {
      console.error('Failed to clear booking data:', error)
      return false
    }
  },

  // Store the return URL for after login/register
  storeReturnUrl(url) {
    try {
      sessionStorage.setItem(BOOKING_RETURN_URL_KEY, url)
      return true
    } catch (error) {
      console.error('Failed to store return URL:', error)
      return false
    }
  },

  // Get the return URL
  getReturnUrl() {
    try {
      return sessionStorage.getItem(BOOKING_RETURN_URL_KEY)
    } catch (error) {
      console.error('Failed to get return URL:', error)
      return null
    }
  },

  // Check if there's pending booking data
  hasPendingBooking() {
    return this.getBookingData() !== null
  },

  // Validate booking data (basic validation)
  validateStoredBookingData(data) {
    if (!data) return false
    
    const requiredFields = ['vehicle', 'pickupDate', 'dropoffDate', 'name', 'email', 'phone']
    return requiredFields.every(field => data[field] && data[field].trim())
  }
} 