// adminService.js - Handles all admin-related API calls for the dashboard

import { API_BASE_URL } from './config'

class AdminService {
  constructor() {
    this.baseURL = `${API_BASE_URL}/api/admin`
  }

  /**
   * Fetch all bookings (admin only)
   * @param {string} token - Authentication token (admin)
   * @returns {Promise<Array>} Array of booking objects
   */
  async fetchAllBookings(token) {
    try {
      const response = await fetch(`${this.baseURL}/allBookings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || data.details || `Failed to fetch bookings: ${response.status}`)
      }
      return data.bookings
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check your internet connection.')
      }
      throw error
    }
  }

  /**
   * Fetch all vehicles (admin only)
   * @param {string} token - Authentication token (admin)
   * @returns {Promise<Array>} Array of vehicle objects
   */
  async fetchAllVehicles(token) {
    try {
      const response = await fetch(`${this.baseURL}/allVehicles`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || data.details || `Failed to fetch vehicles: ${response.status}`)
      }
      return data.vehicles
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check your internet connection.')
      }
      throw error
    }
  }

  /**
   * Fetch all add-ons (admin only)
   * @param {string} token - Authentication token (admin)
   * @returns {Promise<Array>} Array of addon objects
   */
  async fetchAllAddons(token) {
    try {
      const response = await fetch(`${this.baseURL}/allAddons`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || data.details || `Failed to fetch add-ons: ${response.status}`)
      }
      return data.addons
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check your internet connection.')
      }
      throw error
    }
  }

  /**
   * Create a new vehicle (admin only)
   * @param {Object} vehicleData - Vehicle data to create
   * @param {string} token - Authentication token (admin)
   * @returns {Promise<Object>} The created vehicle object
   */
  async createVehicle(vehicleData, token) {
    try {
      const response = await fetch(`${this.baseURL}/createVehicle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(vehicleData)
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || data.details || `Failed to create vehicle: ${response.status}`)
      }
      return data.vehicle
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check your internet connection.')
      }
      throw error
    }
  }

  /**
   * Create a new add-on (admin only)
   * @param {Object} addonData - Add-on data to create
   * @param {string} token - Authentication token (admin)
   * @returns {Promise<Object>} The created add-on object
   */
  async createAddon(addonData, token) {
    try {
      const response = await fetch(`${this.baseURL}/createAddon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(addonData)
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || data.details || `Failed to create add-on: ${response.status}`)
      }
      return data.addon
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check your internet connection.')
      }
      throw error
    }
  }

  /**
   * Update an existing vehicle (admin only)
   * @param {string} id - Vehicle ID
   * @param {Object} updateData - Data to update
   * @param {string} token - Authentication token (admin)
   * @returns {Promise<Object>} The updated vehicle object
   */
  async updateVehicle(id, updateData, token) {
    try {
      const response = await fetch(`${this.baseURL}/updateVehicle/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || data.details || `Failed to update vehicle: ${response.status}`)
      }
      return data.vehicle
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check your internet connection.')
      }
      throw error
    }
  }

  /**
   * Update an existing add-on (admin only)
   * @param {string} id - Add-on ID
   * @param {Object} updateData - Data to update
   * @param {string} token - Authentication token (admin)
   * @returns {Promise<Object>} The updated add-on object
   */
  async updateAddon(id, updateData, token) {
    try {
      const response = await fetch(`${this.baseURL}/updateAddon/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || data.details || `Failed to update add-on: ${response.status}`)
      }
      return data.addOn
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check your internet connection.')
      }
      throw error
    }
  }

  /**
   * Delete a vehicle (admin only)
   * @param {string} id - Vehicle ID
   * @param {string} token - Authentication token (admin)
   * @returns {Promise<Object>} Response message
   */
  async deleteVehicle(id, token) {
    try {
      const response = await fetch(`${this.baseURL}/deleteVehicle/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || data.details || `Failed to delete vehicle: ${response.status}`)
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
   * Delete an add-on (admin only)
   * @param {string} id - Add-on ID
   * @param {string} token - Authentication token (admin)
   * @returns {Promise<Object>} Response message
   */
  async deleteAddon(id, token) {
    try {
      const response = await fetch(`${this.baseURL}/deleteAddon/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || data.details || `Failed to delete add-on: ${response.status}`)
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
   * Delete a user (admin only)
   * @param {string} id - User ID
   * @param {string} token - Authentication token (admin)
   * @returns {Promise<Object>} Response message
   */
  async deleteUser(id, token) {
    try {
      const response = await fetch(`${this.baseURL}/deleteUser/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || data.details || `Failed to delete user: ${response.status}`)
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
   * Fetch vehicle by ID (admin only)
   * @param {string} id - Vehicle ID
   * @param {string} token - Authentication token (admin)
   * @returns {Promise<Object>} Vehicle object
   */
  async fetchVehicleById(id, token) {
    try {
      const response = await fetch(`${this.baseURL}/vehicle/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || data.details || `Failed to fetch vehicle: ${response.status}`)
      }
      // Support both { vehicle: {...} } and { ...vehicleFields }
      if (data.vehicle) return data.vehicle
      return data
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check your internet connection.')
      }
      throw error
    }
  }

  /**
   * Fetch addon by ID (admin only)
   * @param {string} id - Addon ID
   * @param {string} token - Authentication token (admin)
   * @returns {Promise<Object>} Addon object
   */
  async fetchAddonById(id, token) {
    try {
      const response = await fetch(`${this.baseURL}/addon/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || data.details || `Failed to fetch addon: ${response.status}`);
      }
      
      // Support both { addOn: {...} } and { ...addonFields }
      if (data.addOn) return data.addOn;
      if (data.addon) return data.addon;
      if (data.extra) return data.extra;
      return data;
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check your internet connection.')
      }
      throw error
    }
  }

  /**
   * Approve a booking (admin only)
   * @param {string} id - Booking ID
   * @param {string} token - Authentication token (admin)
   * @returns {Promise<Object>} The updated booking object
   */
  async approveBooking(id, token) {
    try {
      const response = await fetch(`${this.baseURL}/approveBooking/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || data.details || `Failed to approve booking: ${response.status}`)
      }
      return data.booking || data
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check your internet connection.')
      }
      throw error
    }
  }

  /**
   * Cancel a booking (admin only)
   * @param {string} id - Booking ID
   * @param {Object} cancellationData - Cancellation data (e.g., reason)
   * @param {string} token - Authentication token (admin)
   * @returns {Promise<Object>} The updated booking object
   */
  async cancelBooking(id, cancellationData, token) {
    try {
      const response = await fetch(`${this.baseURL}/cancelBooking/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(cancellationData)
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || data.details || `Failed to cancel booking: ${response.status}`)
      }
      return data.booking || data
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check your internet connection.')
      }
      throw error
    }
  }

  /**
   * Edit a booking (admin only)
   * @param {string} id - Booking ID
   * @param {Object} updateData - Data to update
   * @param {string} token - Authentication token (admin)
   * @returns {Promise<Object>} The updated booking object
   */
  async editBooking(id, updateData, token) {
    try {
      const response = await fetch(`${this.baseURL}/editBooking/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || data.details || `Failed to edit booking: ${response.status}`)
      }
      return data.booking || data
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check your internet connection.')
      }
      throw error
    }
  }

  /**
   * Check vehicle availability for given dates
   * @param {string} vehicleId - Vehicle ID to check
   * @param {string} startDate - Start date
   * @param {string} endDate - End date
   * @param {string} excludeBookingId - Booking ID to exclude from check (for updates)
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Availability status and conflicting bookings
   */
  async checkVehicleAvailability(vehicleId, startDate, endDate, excludeBookingId = null, token) {
    try {
      const response = await fetch(`${this.baseURL}/checkVehicleAvailability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          vehicleId,
          startDate,
          endDate,
          excludeBookingId
        })
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
   * Check comprehensive availability for vehicle and add-ons (new system)
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
        throw new Error(data.error || data.details || `Failed to check comprehensive availability: ${response.status}`)
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
   * Check add-on availability for given dates
   * @param {Array} addOnIds - Array of add-on IDs to check
   * @param {string} startDate - Start date
   * @param {string} endDate - End date
   * @param {string} excludeBookingId - Booking ID to exclude from check
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Availability status and conflicting add-ons
   */
  async checkAddOnAvailability(addOnIds, startDate, endDate, excludeBookingId = null, token) {
    try {
      const response = await fetch(`${this.baseURL}/checkAddOnAvailability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          addOnIds,
          startDate,
          endDate,
          excludeBookingId
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
   * Get availability calendar for a vehicle
   * @param {string} vehicleId - Vehicle ID
   * @param {string} startDate - Start date for calendar (optional)
   * @param {string} endDate - End date for calendar (optional)
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Calendar data with booked and available dates
   */
  async getVehicleCalendar(vehicleId, startDate = null, endDate = null, token) {
    try {
      let url = `${this.baseURL}/vehicleCalendar/${vehicleId}`
      const params = new URLSearchParams()
      if (startDate) params.append('startDate', startDate)
      if (endDate) params.append('endDate', endDate)
      if (params.toString()) {
        url += `?${params.toString()}`
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || data.details || `Failed to fetch vehicle calendar: ${response.status}`)
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
   * Get all bookings for a specific user
   * @param {string} userId - User ID
   * @param {string} token - Authentication token
   * @returns {Promise<Array>} Array of booking objects
   */
  async getUserBookings(userId, token) {
    try {
      const response = await fetch(`${this.baseURL}/userBookings/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Server returned ${contentType || 'unknown content type'} instead of JSON. Status: ${response.status}`)
      }
      
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || data.details || `Failed to fetch user bookings: ${response.status}`)
      }
      return data.bookings
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check your internet connection.')
      }
      if (error.name === 'SyntaxError' && error.message.includes('Unexpected token')) {
        throw new Error('Server returned invalid JSON. Please try again later.')
      }
      throw error
    }
  }

  /**
   * Get a specific booking by ID
   * @param {string} id - Booking ID
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Booking object
   */
  async getBookingById(id, token) {
    try {
      const response = await fetch(`${this.baseURL}/booking/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || data.details || `Failed to fetch booking: ${response.status}`)
      }
      return data.booking
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check your internet connection.')
      }
      throw error
    }
  }

  /**
   * Update a booking (user-facing)
   * @param {string} id - Booking ID
   * @param {Object} updateData - Data to update
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} The updated booking object
   */
  async updateBooking(id, updateData, token) {
    try {
      const response = await fetch(`${this.baseURL}/updateBooking/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || data.details || `Failed to update booking: ${response.status}`)
      }
      return data.booking || data
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check your internet connection.')
      }
      throw error
    }
  }

  /**
   * Cancel a booking (user-facing)
   * @param {string} id - Booking ID
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} The updated booking object
   */
  async cancelUserBooking(id, token) {
    try {
      const response = await fetch(`${this.baseURL}/cancelBooking/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || data.details || `Failed to cancel booking: ${response.status}`)
      }
      return data.booking || data
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check your internet connection.')
      }
      throw error
    }
  }
}


export const adminService = new AdminService()
export { AdminService }
