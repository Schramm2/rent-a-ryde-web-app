<template>
    <div class="auth-container">
      <!-- Background Image -->
      <div class="background-overlay">
        <img src="@/assets/Vehicles/IMG-20250527-WA0154.jpg" alt="4x4 vehicle on rugged terrain" class="background-image" />
      </div>
      
      <!-- Forgot Password Form -->
      <div class="auth-card">
        <div class="brand-header">
          <img src="@/assets/Logos/FullLogo_Transparent_NoBuffer.png" alt="RentARyde Logo" class="logo" />
          <h1 class="brand-title">RentARyde</h1>
          <p class="brand-tagline">Your Adventure Awaits</p>
        </div>
        
        <div class="form-container">
          <h2 class="form-title">Forgot your password?</h2>
          <p class="form-subtitle">Enter your email address and we'll send you a password reset link.</p>
          
          <form @submit.prevent="handlePasswordReset" class="auth-form" v-if="!isEmailSent">
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
            
            <button type="submit" class="auth-button" :disabled="isLoading">
              <span v-if="!isLoading">Send Reset Link</span>
              <span v-else class="loading-text">
                <span class="spinner"></span>
                Sending...
              </span>
            </button>
          </form>
  
          <!-- Success Message -->
          <div v-if="isEmailSent" class="success-container">
            <div class="success-icon">✓</div>
            <h3 class="success-title">Check your email</h3>
            <p class="success-message">
              We've sent a password reset link to <strong>{{ email }}</strong>
            </p>
            <p class="success-subtitle">
              Didn't receive the email? Check your spam folder or try again.
            </p>
            <button @click="resetForm" class="auth-button secondary">
              Try Again
            </button>
          </div>
          
          <div class="auth-footer">
            <p class="auth-switch">
              Remember your password? 
              <router-link to="/login" class="auth-link">Go back to login</router-link>
            </p>
            <p class="auth-switch">
              <router-link to="/" class="auth-link">Head to Homepage</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { auth } from '@/services/firebaseConfig.js'
  import { sendPasswordResetEmail } from 'firebase/auth'

  // Form data
  const email = ref('')
  const isLoading = ref(false)
  const isEmailSent = ref(false)

  // Error states
  const emailError = ref('')
  const apiError = ref('')

  // Methods
  const handlePasswordReset = async () => {
    emailError.value = ''
    apiError.value = ''

    if (!email.value) {
      emailError.value = 'Email is required'
      return
    }

    if (!isValidEmail(email.value)) {
      emailError.value = 'Please enter a valid email address'
      return
    }

    isLoading.value = true

    try {
      
      await sendPasswordResetEmail(auth, email.value)
      isEmailSent.value = true
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        apiError.value = 'No account found with this email address.'
      } else if (error.code === 'auth/invalid-email') {
        apiError.value = 'Please enter a valid email address.'
      } else if (error.code === 'auth/too-many-requests') {
        apiError.value = 'Too many attempts. Please try again later.'
      } else {
        apiError.value = 'Failed to send reset email. Please try again later.'
      }
    } finally {
      isLoading.value = false
    }
  }

  const resetForm = () => {
    isEmailSent.value = false
    email.value = ''
    emailError.value = ''
    apiError.value = ''
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
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
    --success: #4A7C59;
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
    line-height: 1.4;
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
  
  .auth-button.secondary {
    background: linear-gradient(135deg, var(--sand), var(--tan));
    color: var(--charcoal);
  }
  
  .auth-button.secondary:hover:not(:disabled) {
    box-shadow: 0 8px 20px rgba(212, 184, 150, 0.3);
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
  
  .success-container {
    text-align: center;
    padding: 1rem 0;
  }
  
  .success-icon {
    width: 60px;
    height: 60px;
    background: var(--success);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
    margin: 0 auto 1.5rem;
  }
  
  .success-title {
    font-family: 'Georgia', serif;
    font-size: 1.5rem;
    color: var(--charcoal);
    margin: 0 0 1rem;
  }
  
  .success-message {
    color: var(--olive);
    margin: 0 0 1rem;
    font-size: 0.95rem;
    line-height: 1.4;
  }
  
  .success-subtitle {
    color: var(--charcoal);
    font-size: 0.85rem;
    margin: 0 0 2rem;
    opacity: 0.8;
  }
  
  .auth-footer {
    text-align: center;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--sand);
  }
  
  .auth-switch {
    color: var(--charcoal);
    margin: 0 0 0.5rem;
    font-size: 0.9rem;
  }
  
  .auth-switch:last-child {
    margin-bottom: 0;
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
    
    .success-icon {
      width: 50px;
      height: 50px;
      font-size: 1.5rem;
    }
  }
  </style>