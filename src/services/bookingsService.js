import { API_BASE_URL } from './config'

class BookingsService {
    constructor() {
      this.baseURL = `${API_BASE_URL}/api/bookings`
    }

    /**
     * Check comprehensive availability for vehicle and add-ons
     * @param {string} vehicleId - Vehicle ID to check
     * @param {Array} addOnIds - Array of add-on IDs to check
     * @param {string} startDate - Start date (YYYY-MM-DD)
     * @param {string} endDate - End date (YYYY-MM-DD)
     * @param {string} excludeBookingId - Optional booking ID to exclude from check
     * @param {string} token - Authentication token
     * @returns {Promise<Object>} Comprehensive availability status with conflict details
     */
    async checkComprehensiveAvailability(vehicleId, addOnIds, startDate, endDate, excludeBookingId = null, token) {
      try {
        const response = await fetch(`${this.baseURL}/checkComprehensiveAvailability`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            vehicleId,
            addOnIds: addOnIds || [],
            startDate,
            endDate,
            excludeBookingId
          })
        })
        
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.error || data.details || `Failed to check availability: ${response.status}`)
        }
        return data
      } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
          throw new Error('Unable to connect to server. Please check your internet connection.')
        }
        throw error
      }
    }

    /**
     * Check vehicle availability for given dates (real-time)
     * @param {string} vehicleId - Vehicle ID to check
     * @param {string} startDate - Start date (YYYY-MM-DD)
     * @param {string} endDate - End date (YYYY-MM-DD)
     * @param {string} token - Authentication token
     * @returns {Promise<Object>} Vehicle availability status
     */
    async checkVehicleAvailability(vehicleId, startDate, endDate, token) {
      try {
        const url = `${this.baseURL}/vehicleAvailability/${vehicleId}?startDate=${startDate}&endDate=${endDate}`
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.error || data.details || `Failed to check vehicle availability: ${response.status}`)
        }
        return data
      } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
          throw new Error('Unable to connect to server. Please check your internet connection.')
        }
        throw error
      }
    }

    /**
     * Check add-on availability for given dates (real-time)
     * @param {Array} addOnIds - Array of add-on IDs to check
     * @param {string} startDate - Start date (YYYY-MM-DD)
     * @param {string} endDate - End date (YYYY-MM-DD)
     * @param {string} token - Authentication token
     * @returns {Promise<Object>} Add-on availability status
     */
    async checkAddOnAvailability(addOnIds, startDate, endDate, token) {
      try {
        const response = await fetch(`${this.baseURL}/addOnAvailability`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            addOnIds,
            startDate,
            endDate
          })
        })
        
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.error || data.details || `Failed to check add-on availability: ${response.status}`)
        }
        return data
      } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
          throw new Error('Unable to connect to server. Please check your internet connection.')
        }
        throw error
      }
    }

    /**
     * Validate date range for business logic
     * @param {string} startDate - Start date (YYYY-MM-DD)
     * @param {string} endDate - End date (YYYY-MM-DD)
     * @returns {Object} Validation result with success status and error message
     */
    validateDateRange(startDate, endDate) {
      const errors = []
      
      // Check if dates are provided
      if (!startDate || !endDate) {
        errors.push('Both start and end dates are required')
        return { valid: false, errors }
      }
      
      // Check date format validity
      const start = new Date(startDate)
      const end = new Date(endDate)
      
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        errors.push('Invalid date format. Please use YYYY-MM-DD format')
        return { valid: false, errors }
      }
      
      // Check for past dates
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (start < today) {
        errors.push('Start date cannot be in the past')
      }
      
      if (end < today) {
        errors.push('End date cannot be in the past')
      }
      
      // Check if start is before end
      if (start >= end) {
        errors.push('Start date must be before end date')
      }
      
      return {
        valid: errors.length === 0,
        errors
      }
    }

    /**
     * Check if two date ranges overlap
     * @param {string} start1 - First range start date
     * @param {string} end1 - First range end date
     * @param {string} start2 - Second range start date
     * @param {string} end2 - Second range end date
     * @returns {boolean} True if dates overlap
     */
    datesOverlap(start1, end1, start2, end2) {
      const s1 = new Date(start1)
      const e1 = new Date(end1)
      const s2 = new Date(start2)
      const e2 = new Date(end2)
      
      return s1 < e2 && s2 < e1
    }

    async createBooking(booking, token) {
      const url = `${this.baseURL}/createBooking`;
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(booking)
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || 'Failed to create booking');
      }
      return response.json();
    }
}

export const bookingsService = new BookingsService()

// Also export the class for testing purposes
export { BookingsService }
