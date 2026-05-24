// userService.js - Handles all user-related API calls

import { API_BASE_URL } from './config'

class UserService {
  constructor() {
    this.baseURL = `${API_BASE_URL}/api/users`
  }

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @param {string} userData.fullname - User's full name
   * @param {string} userData.email - User's email address
   * @param {string} userData.password - User's password
   * @param {number} userData.age - User's age
   * @param {string} userData.gender - User's gender
   * @param {string} userData.role - User's role (customer/owner)
   * @param {string} userData.phoneNumber - User's phone number
   * @returns {Promise<Object>} Registration response with user data and token
   */
  async registerUser(userData) {
    try {
      // Ensure phone is included in the request
      if (!userData.phoneNumber) {
        throw new Error('Phone number is required for registration')
      }

      const response = await fetch(`${this.baseURL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('UserService: Registration failed:', data)
        throw new Error(data.error || data.details || `Registration failed: ${response.status}`)
      }

      return data

    } catch (error) {
      console.error('UserService: Network error during registration:', error)
      
      // Handle different types of errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check your internet connection.')
      }
      
      throw error
    }
  }





  /**
   * Fetch all users (admin only)
   * @param {string} token - Authentication token (admin)
   * @returns {Promise<Array>} Array of user objects
   */
  async fetchAllUsers(token) {
    try {
      const response = await fetch(`${this.baseURL}/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('UserService: Fetch all users failed:', data)
        throw new Error(data.error || data.details || `Failed to fetch users: ${response.status}`)
      }

      return data.users

    } catch (error) {
      console.error('UserService: Network error during fetch all users:', error)
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check your internet connection.')
      }
      throw error
    }
  }

  /**
   * Fetch user by UID
   * @param {string} uid - User's unique ID
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} User data
   */
  async getUserById(uid, token) {
    try {
      const response = await fetch(`${this.baseURL}/${uid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || `Failed to fetch user: ${response.status}`);
      }

      return data.user;
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check your internet connection.');
      }
      throw error;
    }
  }

  /**
   * Fetch user bookings
   * @param {string} uid - User's unique ID
   * @param {string} token - Authentication token
   * @returns {Promise<Array>} Array of booking objects
   */
  async getUserBookings(uid, token) {
    try {
      // Try the user-specific endpoint first
      const endpoint1 = `${this.baseURL}/${uid}/bookings`
      
      const response = await fetch(endpoint1, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        // If that fails, try the alternative endpoint path
        if (response.status === 404) {
          const endpoint2 = `${API_BASE_URL}/api/userBookings/${uid}`
          
          const altResponse = await fetch(endpoint2, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });

          const altData = await altResponse.json();
          
          if (!altResponse.ok) {
            throw new Error(altData.error || altData.details || `Failed to fetch user bookings: ${altResponse.status}`);
          }
          return altData.bookings;
        }
        throw new Error(data.error || data.details || `Failed to fetch user bookings: ${response.status}`);
      }

      return data.bookings;
    } catch (error) {
      console.error('❌ Error in getUserBookings:', error)
      console.error('❌ Error message:', error.message)
      console.error('❌ Error stack:', error.stack)
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check your internet connection.');
      }
      throw error;
    }
  }

  

  /**
   * Logout user
   * @param {string} uid - User's unique ID
   * @returns {Promise<void>}
   */
  async logoutUser(uid) { // force logout user is the only use case for this method
    try {
      const response = await fetch(`${this.baseURL}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid })
      })

      if (!response.ok) {
        const data = await response.json()
        console.error('UserService: Logout failed:', data)
        throw new Error(data.error || data.details || `Logout failed: ${response.status}`)
      }

    } catch (error) {
      console.error('UserService: Network error during logout:', error)
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check your internet connection.')
      }
      
      throw error
    }
  }

  /**
   * Update user profile
   * @param {string} uid - User's unique ID
   * @param {string} token - Authentication token
   * @param {Object} profileData - Profile data to update
   * @param {string} profileData.fullname - User's full name
   * @param {string} profileData.email - User's email address
   * @param {number} profileData.age - User's age
   * @param {string} profileData.phoneNumber - User's phone number
   * @returns {Promise<Object>} Updated user data
   */
  async updateUserProfile(uid, token, profileData) {
    try {
      const response = await fetch(`${this.baseURL}/${uid}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('UserService: Update profile failed:', data)
        throw new Error(data.error || data.details || `Failed to update profile: ${response.status}`)
      }

      return data.user

    } catch (error) {
      console.error('UserService: Network error during profile update:', error)
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check your internet connection.')
      }
      
      throw error
    }
  }

  /**
   * Get user settings
   * @param {string} uid - User's unique ID
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} User settings data
   */
  async getUserSettings(uid, token) {
    try {
      const response = await fetch(`${this.baseURL}/${uid}/settings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('UserService: Fetch settings failed:', data)
        throw new Error(data.error || data.details || `Failed to fetch settings: ${response.status}`)
      }

      return data.settings

    } catch (error) {
      console.error('UserService: Network error during settings fetch:', error)
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check your internet connection.')
      }
      
      throw error
    }
  }

  /**
   * Update user settings
   * @param {string} uid - User's unique ID
   * @param {string} token - Authentication token
   * @param {Object} settings - Settings data to update
   * @returns {Promise<Object>} Updated settings data
   */
  async updateUserSettings(uid, token, settings) {
    try {
      const response = await fetch(`${this.baseURL}/${uid}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('UserService: Update settings failed:', data)
        throw new Error(data.error || data.details || `Failed to update settings: ${response.status}`)
      }

      return data.settings

    } catch (error) {
      console.error('UserService: Network error during settings update:', error)
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check your internet connection.')
      }
      
      throw error
    }
  }
}

// Create and export a singleton instance
export const userService = new UserService()

// Also export the class for testing purposes
export { UserService }
