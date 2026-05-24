import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { clearAuthData } from './api.js'

class AuthService {
  constructor() {
    this.auth = getAuth()
    this.currentUser = null
    this.authStateListener = null
  }

  /**
   * Get the current authenticated user
   * @returns {Object|null} Current user or null if not authenticated
   */
  getCurrentUser() {
    return this.auth.currentUser
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} True if user is authenticated
   */
  isAuthenticated() {
    return !!this.auth.currentUser
  }

  /**
   * Get auth token from storage (localStorage or sessionStorage)
   * @returns {string|null} Auth token or null if not found
   */
  getAuthToken() {
    // Check localStorage first (for "Remember me" users)
    const localToken = localStorage.getItem('authToken')
    if (localToken) {
      return localToken
    }
    
    // Fall back to sessionStorage (for session-only users)
    const sessionToken = sessionStorage.getItem('authToken')
    if (sessionToken) {
      return sessionToken
    }
    
    return null
  }

  /**
   * Get user UID from storage
   * @returns {string|null} User UID or null if not found
   */
  getUserUid() {
    // Check localStorage first (for "Remember me" users)
    const localUid = localStorage.getItem('userUid')
    if (localUid) {
      return localUid
    }
    
    // Fall back to sessionStorage (for session-only users)
    const sessionUid = sessionStorage.getItem('userUid')
    if (sessionUid) {
      return sessionUid
    }
    
    return null
  }

  /**
   * Logout the current user
   * @returns {Promise<void>}
   */
  async logout() {
    try {
      // Sign out from Firebase
      await signOut(this.auth)
      
      // Clear all auth data from storage
      clearAuthData()
      
      // Reset current user
      this.currentUser = null
      
    } catch (error) {
      console.error('AuthService: Logout error:', error)
      // Even if Firebase logout fails, clear local storage
      clearAuthData()
      throw error
    }
  }

  /**
   * Set up auth state listener
   * @param {Function} callback - Callback function to handle auth state changes
   * @returns {Function} Unsubscribe function
   */
  onAuthStateChange(callback) {
    if (this.authStateListener) {
      this.authStateListener()
    }

    this.authStateListener = onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user
      callback(user)
    })

    return this.authStateListener
  }

  /**
   * Remove auth state listener
   */
  removeAuthStateListener() {
    if (this.authStateListener) {
      this.authStateListener()
      this.authStateListener = null
    }
  }

  /**
   * Check if user has "Remember me" enabled
   * @returns {boolean} True if token is stored in localStorage
   */
  isRememberMeEnabled() {
    return !!localStorage.getItem('authToken')
  }

  /**
   * Clear only session storage (for users who want to log out but keep "Remember me" data)
   */
  clearSessionOnly() {
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('userUid')
  }

  /**
   * Clear only local storage (for users who want to remove "Remember me" but stay logged in)
   */
  clearRememberMe() {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userUid')
  }
}

// Create and export a singleton instance
export const authService = new AuthService()

// Also export the class for testing purposes
export { AuthService } 
