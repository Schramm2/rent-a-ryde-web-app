<template>
  <div class="auth-container">
    <!-- Background Image -->
    <div class="background-overlay">
      <img src="@/assets/Vehicles/IMG-20250527-WA0154.jpg" alt="4x4 vehicle on rugged terrain" class="background-image" />
    </div>
    
    <!-- Login Form -->
    <div class="auth-card">
      <div class="brand-header">
        <img src="@/assets/Logos/FullLogo_Transparent_NoBuffer.png" alt="RentARyde Logo" class="logo" />
        <h1 class="brand-title">RentARyde</h1>
        <p class="brand-tagline">Your Adventure Awaits</p>
      </div>
      
      <div class="form-container">
        <h2 class="form-title">Welcome Back</h2>
        <p class="form-subtitle">Ready for your next off-road adventure?</p>
        
        <form @submit.prevent="handleLogin" class="auth-form">
          <div v-if="apiError" class="error-message" style="text-align:center;">{{ apiError }}</div>
          <div class="form-group">
            <label for="email" class="form-label">Email Address</label>
            <input
              id="email"
              type="email"
              v-model="email"
              class="form-input"
              :class="{ error: emailError }"
              placeholder="your@email.com"
              required
            />
            <span v-if="emailError" class="error-message">{{ emailError }}</span>
          </div>
          
          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input
              id="password"
              type="password"
              v-model="password"
              class="form-input"
              :class="{ error: passwordError }"
              placeholder="Enter your password"
              required
            />
            <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
          </div>
          
          <div class="form-options">
            <label class="checkbox-container">
              <input type="checkbox" v-model="rememberMe" />
              <span class="checkmark"></span>
              Remember me
            </label>
            <router-link to="/forgot-password" class="forgot-link">Forgot password?</router-link>
          </div>
          
          <button type="submit" class="auth-button" :disabled="isLoading">
            <span v-if="!isLoading">Log In</span>
            <span v-else class="loading-text">
              <span class="spinner"></span>
              Logging in...
            </span>
          </button>
        </form>
        
        <div class="auth-footer">
          <p class="auth-switch">
            New to RentARyde? 
            <router-link to="/signup" class="auth-link">Create an account</router-link>
          </p>
          <p class="auth-switch">
            <router-link to="/" class="auth-link">Head to Homepage</router-link>
          </p>
        </div>
      </div>
    </div>
    <ToastNotif ref="toastRef" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { db } from '@/services/firebaseConfig.js'
import { doc, getDoc } from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth'
import { authService } from '@/services/authService.js'
import ToastNotif from '../../components/ToastNotif.vue'
import { bookingStorageService } from '@/services/bookingStorageService.js'

// Toast notification ref
const toastRef = ref(null)

// Form data
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)

// Error states
const emailError = ref('')
const passwordError = ref('')
const apiError = ref('')

const router = useRouter()

// Check if user is already authenticated on component mount
onMounted(async () => {
  const currentUser = authService.getCurrentUser()
  const storedToken = authService.getAuthToken()
  
  if (currentUser && storedToken) {
    // User is already authenticated, redirect based on role
    try {
      const userDocRef = doc(db, 'users', currentUser.uid)
      const userSnap = await getDoc(userDocRef)
      if (userSnap.exists()) {
        const userData = userSnap.data()
        if (userData.role === 'admin') {
          router.push('/admin')
        } else {
          router.push('/')
        }
      } else {
        router.push('/')
      }
    } catch (error) {
      console.error('Error checking user role:', error)
      // If there's an error, just redirect to home
      router.push('/')
    }
  }
})

// Methods
const handleLogin = async () => {
  emailError.value = ''
  passwordError.value = ''
  apiError.value = ''

  if (!email.value) {
    emailError.value = 'Email is required'
    return
  }
  if (!password.value) {
    passwordError.value = 'Password is required'
    return
  }

  isLoading.value = true

  try {
    const auth = getAuth()
    
    // Set persistence BEFORE signing in
    await setPersistence(auth, rememberMe.value ? browserLocalPersistence : browserSessionPersistence)

    // Sign in
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    const uid = userCredential.user.uid

    // Get a fresh ID token (for API calls)
    const token = await userCredential.user.getIdToken(/* forceRefresh= */ true)
    
    // Store token based on "Remember me" setting
    if (rememberMe.value) {
      // Use localStorage for persistent storage
      localStorage.setItem('authToken', token)
      localStorage.setItem('userUid', uid)
      // Clear sessionStorage to avoid conflicts
      sessionStorage.removeItem('authToken')
      sessionStorage.removeItem('userUid')
    } else {
      // Use sessionStorage for session-only storage
      sessionStorage.setItem('authToken', token)
      sessionStorage.setItem('userUid', uid)
      // Clear localStorage to avoid conflicts
      localStorage.removeItem('authToken')
      localStorage.removeItem('userUid')
    }

    // Show success toast
    toastRef.value?.showSuccess(
      'Login Successful!',
      'Welcome back to RentARyde!',
      3000
    )

    // Check if there's stored booking data that needs to be restored
    const hasPendingBooking = bookingStorageService.hasPendingBooking()
    const returnUrl = bookingStorageService.getReturnUrl()

    // Fetch user role from Firestore
    const userDocRef = doc(db, 'users', uid)
    const userSnap = await getDoc(userDocRef)
    if (userSnap.exists()) {
      const userData = userSnap.data()
      if (userData.role === 'admin') {
        router.push('/admin')
      } else if (hasPendingBooking && returnUrl) {
        // Redirect back to bookings page to restore data
        router.push(returnUrl)
      } else {
        router.push('/')
      }
    } else if (hasPendingBooking && returnUrl) {
      // Redirect back to bookings page to restore data
      router.push(returnUrl)
    } else {
      router.push('/')
    }
  } catch (error) {
    let errorMessage = 'Login failed. Please try again later.'
    
    if (
      error.code === 'auth/user-not-found' ||
      error.code === 'auth/wrong-password' ||
      error.code === 'auth/invalid-email' ||
      error.code === 'auth/invalid-credential'
    ) {
      errorMessage = 'Incorrect email or password. Please try again.'
    }
    
    // Show error toast
    toastRef.value?.showError(
      'Login Failed',
      errorMessage,
      5000
    )
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Color Variables */
:root {
  --olive: #6B7C32;
  --sand: #D4B896;
  --charcoal: #2C2C2C;
  --tan: #C19A6B;
  --cream: #F5F1E8;
  --rust: #B85450;
  --forest: #4A5D23;
}

.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 1rem;
  background: linear-gradient(135deg, var(--olive) 0%, var(--forest) 100%);
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
  filter: sepia(20%) saturate(1.2);
}

.auth-card {
  position: relative;
  z-index: 2;
  background: rgba(245, 241, 232, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 420px;
  overflow: hidden;
  border: 1px solid rgba(212, 184, 150, 0.3);
}

.brand-header {
  background: linear-gradient(135deg, var(--olive), var(--forest));
  color: white;
  text-align: center;
  padding: 2rem 1.5rem 1.5rem;
}

.logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  
  border: 3px solid var(--sand);
  object-fit: contain;
  padding: 8px;
}

.brand-title {
  font-family: 'Georgia', serif;
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  color: rgba(45, 55, 45, 0.95);
}

.brand-tagline {
  font-size: 0.9rem;
  opacity: 0.9;
  margin: 0;
  font-style: italic;
  color: rgba(45, 55, 45, 0.95);
}

.form-container {
  padding: 2rem 1.5rem;
}

.form-title {
  font-family: 'Georgia', serif;
  font-size: 1.75rem;
  color: var(--charcoal);
  margin: 0 0 0.5rem;
  text-align: center;
}

.form-subtitle {
  color: var(--olive);
  text-align: center;
  margin: 0 0 2rem;
  font-size: 0.95rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-weight: 600;
  color: var(--charcoal);
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.form-input {
  padding: 0.875rem 1rem;
  border: 2px solid var(--sand);
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
  color: var(--charcoal);
}

.form-input:focus {
  outline: none;
  border-color: var(--olive);
  box-shadow: 0 0 0 3px rgba(107, 124, 50, 0.1);
}

.form-input.error {
  border-color: var(--rust);
  box-shadow: 0 0 0 3px rgba(184, 84, 80, 0.1);
}

.error-message {
  color: var(--rust);
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: -0.5rem 0 0.5rem;
}

.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.9rem;
  color: var(--charcoal);
}

.checkbox-container input {
  margin-right: 0.5rem;
}

.forgot-link {
  color: var(--olive);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.forgot-link:hover {
  color: var(--forest);
  text-decoration: underline;
}

.auth-button {
  background: linear-gradient(135deg, var(--olive), var(--forest));
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
}

.auth-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(107, 124, 50, 0.3);
}

.auth-button:active {
  transform: translateY(0);
}

.auth-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.auth-footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--sand);
}

.auth-switch {
  color: var(--charcoal);
  margin: 0;
  font-size: 0.9rem;
}

.auth-link {
  color: var(--olive);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.auth-link:hover {
  color: var(--forest);
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 768px) {
  .auth-container {
    margin-top: 4rem;
    padding: 0.5rem;
  }
  
  .auth-card {
    max-width: 100%;
    margin: 0;
  }
  
  .brand-header {
    padding: 1.5rem 1rem 1rem;
  }
  
  .brand-title {
    font-size: 1.75rem;
  }
  
  .form-container {
    padding: 1.5rem 1rem;
  }
  
  .form-title {
    font-size: 1.5rem;
  }
  
  .form-options {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .brand-title {
    font-size: 1.5rem;
  }
  
  .form-title {
    font-size: 1.25rem;
  }
  
  .auth-button {
    padding: 0.875rem 1.5rem;
  }
}
</style>