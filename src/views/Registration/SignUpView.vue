<template>
  <div class="auth-container">
    
    <!-- Background Image -->
    <div class="background-overlay">
      <img src="@/assets/Vehicles/IMG-20250527-WA0154.jpg" alt="Off-road adventure landscape" class="background-image" />
    </div>
    
    <!-- Signup Form -->
    <div class="auth-card">
      <div class="brand-header">
          <img src="@/assets/Logos/FullLogo_Transparent_NoBuffer.png" alt="RentARyde Logo" class="logo" />
          <h1 class="brand-title">RentARyde</h1>
          <p class="brand-tagline">Your Adventure Awaits</p>
        </div>
      
      <div class="form-container">
        <h2 class="form-title">Create Account</h2>
        <p class="form-subtitle">Join thousands of adventurers exploring Southern Africa</p>
        
        <form @submit.prevent="handleSignup" class="auth-form">
          <div class="form-group">
            <label for="fullName" class="form-label">Full Name</label>
            <input
              id="fullName"
              type="text"
              v-model="fullName"
              class="form-input"
              :class="{ error: fullNameError }"
              placeholder="Enter your full name"
              required
            />
            <span v-if="fullNameError" class="error-message">{{ fullNameError }}</span>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="age" class="form-label">Age</label>
              <input
                id="age"
                type="number"
                v-model="age"
                class="form-input"
                :class="{ error: ageError }"
                placeholder="Age"
                min="18"
                max="100"
                required
              />
              <span v-if="ageError" class="error-message">{{ ageError }}</span>
            </div>
            
            <div class="form-group">
              <label for="gender" class="form-label">Gender</label>
              <select
                id="gender"
                v-model="gender"
                class="form-input"
                :class="{ error: genderError }"
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              <span v-if="genderError" class="error-message">{{ genderError }}</span>
            </div>
          </div>
          
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
            <label for="phoneNumber" class="form-label">Phone Number</label>
            <input
              id="phoneNumber"
              type="tel"
              v-model="phoneNumber"
              class="form-input"
              :class="{ error: phoneNumberError }"
              placeholder="e.g. +27 82 123 4567"
              required
            />
            <span v-if="phoneNumberError" class="error-message">{{ phoneNumberError }}</span>
          </div>
          
          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input
              id="password"
              type="password"
              v-model="password"
              class="form-input"
              :class="{ error: passwordError }"
              placeholder="Create a strong password"
              required
            />
            <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
          </div>
          
          <div class="form-group">
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              v-model="confirmPassword"
              class="form-input"
              :class="{ error: confirmPasswordError }"
              placeholder="Confirm your password"
              required
            />
            <span v-if="confirmPasswordError" class="error-message">{{ confirmPasswordError }}</span>
          </div>
          
          <div class="form-options">
            <label class="checkbox-container">
              <input type="checkbox" v-model="agreeToTerms" required />
              <span class="checkmark"></span>
              I agree to the <a href="#" class="terms-link">Terms of Service</a> and <a href="#" class="terms-link">Privacy Policy</a>
            </label>
          </div>
          
          <div class="form-options">
            <label class="checkbox-container">
              <input type="checkbox" v-model="subscribeNewsletter" />
              <span class="checkmark"></span>
              Subscribe to adventure updates and special offers
            </label>
          </div>
          
          <button type="submit" class="auth-button" :disabled="isLoading || !agreeToTerms">
            <span v-if="!isLoading">Create Account</span>
            <span v-else class="loading-text">
              <span class="spinner"></span>
              Creating account...
            </span>
          </button>
        </form>
        
        <div class="auth-footer">
          <p class="auth-switch">
            Already have an account? 
            <router-link to="/login" class="auth-link">Sign in here</router-link>
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
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { userService } from '@/services/userService.js'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import ToastNotif from '../../components/ToastNotif.vue'
import { bookingStorageService } from '@/services/bookingStorageService.js'

library.add(fas)

// Toast notification ref
const toastRef = ref(null)

const router = useRouter()

// Form data
const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const age = ref('')
const gender = ref('')
const phoneNumber = ref('')
const agreeToTerms = ref(false)
const subscribeNewsletter = ref(true)
const isLoading = ref(false)

// Error states
const fullNameError = ref('')
const emailError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const ageError = ref('')
const genderError = ref('')
const phoneNumberError = ref('')

// Validation functions
const validatePassword = () => {
  if (password.value.length < 8) {
    passwordError.value = 'Password must be at least 8 characters'
    return false
  }
  passwordError.value = ''
  return true
}

const validateConfirmPassword = () => {
  if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = 'Passwords do not match'
    return false
  }
  confirmPasswordError.value = ''
  return true
}

const validateAge = () => {
  const ageNum = parseInt(age.value)
  if (!ageNum || ageNum < 18 || ageNum > 100) {
    ageError.value = 'Age must be between 18 and 100'
    return false
  }
  ageError.value = ''
  return true
}

// Phone number validation (accepts local SA format and converts to international)
const validatePhoneNumber = () => {
  // Accepts 10 digits starting with 0 (e.g., 0821234567)
  const localPattern = /^0\d{9}$/
  // Accepts already formatted international numbers (e.g., +27821234567)
  const intlPattern = /^\+27\d{9}$/
  if (!phoneNumber.value.trim()) {
    phoneNumberError.value = 'Phone number is required'
    return false
  } else if (!localPattern.test(phoneNumber.value.replace(/\s+/g, '')) && !intlPattern.test(phoneNumber.value.replace(/\s+/g, ''))) {
    phoneNumberError.value = 'Enter a valid phone number (e.g. 0821234567)'
    return false
  }
  phoneNumberError.value = ''
  return true
}

// Watch for form changes to clear errors
watch(password, () => {
  if (password.value) validatePassword()
  if (confirmPassword.value) validateConfirmPassword()
})

watch(confirmPassword, () => {
  if (confirmPassword.value) validateConfirmPassword()
})

watch(age, () => {
  if (age.value) validateAge()
})

watch(phoneNumber, () => {
  if (phoneNumber.value) validatePhoneNumber()
})

// Clear API messages when user starts typing
watch([fullName, email, password, confirmPassword, age, gender, phoneNumber], () => {
  // apiError.value = '' // Removed as per edit hint
  // successMessage.value = '' // Removed as per edit hint
})

// Main signup handler
const handleSignup = async () => {
  // Reset all errors
  fullNameError.value = ''
  emailError.value = ''
  passwordError.value = ''
  confirmPasswordError.value = ''
  ageError.value = ''
  genderError.value = ''
  phoneNumberError.value = ''
  // apiError.value = '' // Removed as per edit hint
  // successMessage.value = '' // Removed as per edit hint
  
  // Client-side validation
  let isValid = true
  
  if (!fullName.value.trim()) {
    fullNameError.value = 'Full name is required'
    isValid = false
  }
  
  if (!email.value) {
    emailError.value = 'Email is required'
    isValid = false
  }
  
  if (!validatePassword()) {
    isValid = false
  }
  
  if (!validateConfirmPassword()) {
    isValid = false
  }
  
  if (!validateAge()) {
    isValid = false
  }

  if (!validatePhoneNumber()) {
    isValid = false
  }
  
  if (!gender.value) {
    genderError.value = 'Gender is required'
    isValid = false
  }
  
  if (!agreeToTerms.value) {
    // apiError.value = 'You must agree to the Terms of Service and Privacy Policy' // Removed as per edit hint
    toastRef.value?.showError(
      'Registration Failed',
      'You must agree to the Terms of Service and Privacy Policy.',
      6000
    )
    return
  }
  
  if (!isValid) return
  
  isLoading.value = true
  
  try {
    // Convert local phone number to international format before sending
    let formattedPhoneNumber = phoneNumber.value.trim().replace(/\s+/g, '')
    if (/^0\d{9}$/.test(formattedPhoneNumber)) {
      formattedPhoneNumber = '+27' + formattedPhoneNumber.substring(1)
    }
    
    // Prepare user data for backend
    const userData = {
      fullname: fullName.value.trim(),
      email: email.value.trim(),
      password: password.value,
      age: parseInt(age.value),
      gender: gender.value,
      phoneNumber: formattedPhoneNumber,
      role: 'client'
    }
    
    // Call the backend API through userService
    const response = await userService.registerUser(userData)
    
    // Show success toast
    toastRef.value?.showSuccess(
      'Account Created Successfully!',
      'Welcome to RentARyde! Your account has been created.',
      4000
    )
    
    // Store authentication data if needed
    if (response.token) {
      localStorage.setItem('authToken', response.token)
      localStorage.setItem('userUid', response.uid)
    }
    
    // Clear form
    fullName.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    age.value = ''
    gender.value = ''
    phoneNumber.value = ''
    agreeToTerms.value = false
    subscribeNewsletter.value = true
    
    // Check if there's stored booking data that needs to be restored
    const hasPendingBooking = bookingStorageService.hasPendingBooking()
    const returnUrl = bookingStorageService.getReturnUrl()
    
    // Redirect after success
    setTimeout(() => {
      if (hasPendingBooking && returnUrl) {
        // Redirect back to bookings page to restore data
        router.push(returnUrl)
      } else {
        router.push('/login')
      }
    }, 2000)
    
  } catch (error) {
    console.error('Registration failed:', error)
    
    // Show error toast
    toastRef.value?.showError(
      'Registration Failed',
      error.message || 'Registration failed. Please try again.',
      6000
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
  --success: #22c55e;
}

.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 1rem;
  background: linear-gradient(135deg, var(--tan) 0%, var(--olive) 100%);
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
  opacity: 0.25;
  filter: sepia(30%) saturate(1.3) brightness(0.9);
}

.auth-card {
  position: relative;
  z-index: 2;
  background: rgba(245, 241, 232, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 520px;
  overflow: hidden;
  border: 1px solid rgba(212, 184, 150, 0.3);
}

.brand-header {
  background: linear-gradient(135deg, var(--tan), var(--olive));
  color: white;
  text-align: center;
  padding: 2rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  line-height: 1.4;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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
  margin: 0.5rem 0;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  font-size: 0.85rem;
  color: var(--charcoal);
  line-height: 1.4;
  gap: 0.5rem;
}

.checkbox-container input {
  margin-top: 0.1rem;
  flex-shrink: 0;
}

.terms-link {
  color: var(--olive);
  text-decoration: none;
  transition: color 0.3s ease;
}

.terms-link:hover {
  color: var(--forest);
  text-decoration: underline;
}

.auth-button {
  background: linear-gradient(135deg, var(--tan), var(--olive));
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
  margin-top: 0.5rem;
}

.auth-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(193, 154, 107, 0.3);
}

.auth-button:active {
  transform: translateY(0);
}

.auth-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
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
  margin: 0.5rem 0;
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
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 1.25rem;
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
  
  .auth-form {
    gap: 1rem;
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
  
  .checkbox-container {
    font-size: 0.8rem;
  }
}
</style>
