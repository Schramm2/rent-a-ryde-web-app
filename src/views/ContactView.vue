<template>
  <NavBar />
  <main class="contact-page">
    <!-- Header Banner Section -->
    <section class="hero-banner">
      <div class="hero-background">
        <img src="@/assets/Vehicles/IMG-20250527-WA0152.jpg" alt="Contact Hero Image" class="hero-image" />
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <h1 class="hero-title">Get in Touch</h1>
        <p class="hero-subtitle">We're here to guide your next off-road experience.</p>
      </div>
    </section>

    <!-- Main Contact Section -->
    <section class="contact-section">
      <div class="container">
        <div class="contact-layout">
          <!-- Contact Form -->
          <div class="contact-form-container">
            <div class="form-header">
              <h2 class="form-title">Send Us a Message</h2>
              <p class="form-subtitle">Have questions about our vehicles or need help planning your adventure? We'd love to hear from you.</p>
            </div>

            <form @submit.prevent="submitForm" class="contact-form">
              <div class="form-group">
                <label for="fullName" class="form-label">Full Name</label>
                <input 
                  id="fullName"
                  type="text" 
                  v-model="contactForm.fullName" 
                  class="form-input"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="email" class="form-label">Email Address</label>
                  <input 
                    id="email"
                    type="email" 
                    v-model="contactForm.email" 
                    class="form-input"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="phone" class="form-label">Phone Number</label>
                  <input 
                    id="phone"
                    type="tel" 
                    v-model="contactForm.phone" 
                    class="form-input"
                    placeholder="+27 XX XXX XXXX"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="message" class="form-label">Message</label>
                <textarea 
                  id="message"
                  v-model="contactForm.message" 
                  class="form-textarea"
                  placeholder="Tell us about your adventure plans, questions, or how we can help..."
                  rows="6"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                class="submit-btn"
                :disabled="isSubmitting"
              >
                <span v-if="!isSubmitting">Send Message</span>
                <span v-else class="loading-text">
                  <span class="spinner"></span>
                  Sending...
                </span>
              </button>
            </form>
          </div>

          <!-- Contact Info Panel -->
          <div class="contact-view-info-panel">
            <div class="contact-view-info-card">
              <h3 class="contact-view-info-title">Contact Information</h3>
              <p class="contact-view-info-description">
                Ready to start your adventure? Get in touch with us through any of these channels.
              </p>

              <div class="contact-view-info-items">
                <div class="contact-view-info-item">
                  <div class="contact-view-info-icon">
                    <svg class="contact-view-svg-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div class="contact-view-info-content">
                    <h4 class="contact-view-info-label">Email</h4>
                    <p class="contact-view-info-value">enquiries@rentaryde.co.za</p>
                  </div>
                </div>

                <div class="contact-view-info-item">
                  <div class="contact-view-info-icon">
                    <svg class="contact-view-svg-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <div class="contact-view-info-content">
                    <h4 class="contact-view-info-label">Phone</h4>
                    <p class="contact-view-info-value">+27 72 130 1912</p>
                  </div>
                </div>

                <div class="contact-view-info-item">
                  <div class="contact-view-info-icon">
                    <svg class="contact-view-svg-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                      <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                  </div>
                  <div class="contact-view-info-content">
                    <h4 class="contact-view-info-label">Office Hours</h4>
                    <p class="contact-view-info-value">Mon–Fri, 08:00–17:00</p>
                  </div>
                </div>

                <div class="contact-view-info-item">
                  <div class="contact-view-info-icon">
                    <svg class="contact-view-svg-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div class="contact-view-info-content">
                    <h4 class="contact-view-info-label">Location</h4>
                    <p class="contact-view-info-value">South Africa<br>Durban, KwaZulu-Natal</p>
                  </div>
                </div>
              </div>

              <div class="contact-view-social-section">
                <h4 class="contact-view-social-title">Follow Our Adventures</h4>
                <div class="contact-view-social-buttons">
                  <a href="https://www.facebook.com/people/Rent-A-Ryde/61575497434092/" class="contact-view-social-btn" aria-label="Follow us on Facebook" target="_blank" rel="noopener noreferrer">
                    <svg class="contact-view-social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/renta.ryde/" class="contact-view-social-btn" aria-label="Follow us on Instagram" target="_blank" rel="noopener noreferrer">
                    <svg class="contact-view-social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="https://www.tiktok.com/@rent.a.ryde?lang=en-GB" class="contact-view-social-btn" aria-label="Follow us on TikTok" target="_blank" rel="noopener noreferrer">
                    <svg class="contact-view-social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Footer -->
    <section class="cta-footer">
      <div class="cta-background">
        <img src="@/assets/Vehicles/IMG-20250527-WA0140.jpg" alt="Adventure is one click away" class="cta-image" />
        <div class="cta-overlay"></div>
      </div>
      <div class="cta-content">
        <h2 class="cta-title">Adventure is One Click Away</h2>
        <p class="cta-subtitle">Ready to explore? Browse our rugged vehicles and start planning your next expedition.</p>
        <button class="cta-button" @click="browseVehicles">
          Browse Vehicles
        </button>
      </div>
    </section>
  </main>
  <Footer />
  <ToastNotif ref="toastRef" />
</template>

<script setup>
import { ref, reactive } from 'vue'
import NavBar from '../components/NavBar.vue'
import Footer from '../components/FooterComp.vue'
import ToastNotif from '../components/ToastNotif.vue'
import { sendContactEmail } from '@/services/contactService.js'
import { useRouter } from 'vue-router'

// Toast notification ref
const toastRef = ref(null)

// Form data
const contactForm = reactive({
  fullName: '',
  email: '',
  phone: '',
  message: ''
})

const isSubmitting = ref(false)

// Methods
const submitForm = async () => {
  isSubmitting.value = true
  
  try {
    // --- BACKEND LOGIC (restored) ---
    await sendContactEmail({
      name: contactForm.fullName,
      email: contactForm.email,
      subject: 'Contact Form Submission - Rent A Ryde',
      message: `Phone: ${contactForm.phone || 'Not provided'}\n\nMessage:\n${contactForm.message}`
    })
    // --- END BACKEND LOGIC ---

    // Show success toast instead of alert
    toastRef.value?.showSuccess(
      'Message Sent Successfully!',
      'Thank you for your message! We\'ll get back to you within 24 hours.',
      5000
    )
    
    // Reset form
    Object.keys(contactForm).forEach(key => {
      contactForm[key] = ''
    })
  } catch (error) {
    console.error('Error sending email:', error)
    // Show error toast instead of alert
    toastRef.value?.showError(
      'Message Failed to Send',
      'Sorry, there was an error sending your message. Please try again or contact us directly.',
      6000
    )
  } finally {
    isSubmitting.value = false
  }
}
const router = useRouter()
const browseVehicles = () => {
  router.push('/vehicles')
}
</script>

<style scoped>
/* Global Styles */
.contact-page {
    font-family: 'Arial', sans-serif;
    color: #2D372D;
    line-height: 1.6;
    margin-top: 5rem;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  .section-title {
    font-size: 2.5rem;
    font-weight: 900;
    color: #2D372D;
    margin-bottom: 3rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-align: center;
  }
  
  /* Hero Banner */
  .hero-banner {
    position: relative;
    height: 50vh;
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  
  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
  }
  
  .hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: linear-gradient(135deg, #8B7355 0%, #A0845C 100%);
  }
  
  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(45, 55, 45, 0.7);
    z-index: -1;
  }
  
  .hero-content {
    text-align: center;
    color: #F5E6D3;
    z-index: 1;
    max-width: 800px;
    padding: 0 2rem;
  }
  
  .hero-title {
    font-size: 3.5rem;
    font-weight: 900;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 3px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  .hero-subtitle {
  font-size: 1.3rem;
  font-weight: 400;
  letter-spacing: 1px;
  color: #FFFFFF;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.5);
}
  
  /* Contact Section */
  .contact-section {
    padding: 6rem 0;
    background: #F5E6D3;
  }
  
  .contact-layout {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 4rem;
    align-items: start;
  }
  
  .contact-form-container {
    background: white;
    border-radius: 15px;
    padding: 3rem;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
  
  .form-header {
    margin-bottom: 3rem;
    text-align: center;
  }
  
  .form-title {
    font-size: 2.2rem;
    font-weight: 800;
    color: #2D372D;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .form-subtitle {
    color: #666;
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  .form-label {
    font-weight: 600;
    color: #2D372D;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 0.9rem;
  }
  
  .form-input,
  .form-textarea {
    padding: 1rem;
    border: 2px solid #E5E5E5;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: white;
    font-family: inherit;
  }
  
  .form-input:focus,
  .form-textarea:focus {
    outline: none;
    border-color: #8B7355;
    box-shadow: 0 0 0 3px rgba(139, 115, 85, 0.1);
  }
  
  .form-textarea {
    resize: vertical;
    min-height: 120px;
  }
  
  .submit-btn {
    padding: 1.25rem 2rem;
    background: linear-gradient(135deg, #8B7355, #A0845C);
    color: #F5E6D3;
    border: none;
    border-radius: 8px;
    font-weight: 700;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;
    position: relative;
    overflow: hidden;
  }
  
  .submit-btn:hover:not(:disabled) {
    background: linear-gradient(135deg, #A0845C, #B8926A);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(139, 115, 85, 0.4);
  }
  
  .submit-btn:disabled {
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
    border-top: 2px solid #F5E6D3;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* Contact Info Panel */
  .contact-view-info-panel {
    position: sticky;
    top: 2rem;
  }
  
  .contact-view-info-card {
    background: white;
    border-radius: 15px;
    padding: 2.5rem;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
    border: 3px solid #8B7355;
  }
  
  .contact-view-info-title {
    font-size: 1.5rem;
    font-weight: 800;
    color: #2D372D;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .contact-view-info-description {
    color: #666;
    margin-bottom: 2rem;
    line-height: 1.6;
  }
  
  .contact-view-info-items {
    margin-bottom: 0;
  }
  
  .contact-view-info-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #E5E5E5;
  }
  
  .contact-view-info-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  
  .contact-view-info-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #8B7355, #A0845C);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
   
  }
  
  .contact-view-svg-icon {
    width: 24px;
    height: 24px;
    color: #F5E6D3;
  }
  
  .contact-view-info-content {
    flex: 1;
  }
  
  .contact-view-info-label {
    font-weight: 700;
    color: #2D372D;
    margin-bottom: 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 0.9rem;
  }
  
  .contact-view-info-value {
    color: #666;
    line-height: 1.5;
  }
  
  .contact-view-social-section {
    border-top: 1px solid #E5E5E5;
    padding-top: 2rem;
  }
  
  .contact-view-social-title {
    font-weight: 700;
    color: #2D372D;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 0.9rem;
  }
  
  .contact-view-social-buttons {
    display: flex;
    gap: 1.5rem;
  }
  
  .contact-view-social-btn {
    width: 40px;
    height: 40px;
    background: #8B7355;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #F5E6D3;
    text-decoration: none;
    transition: all 0.3s ease;
  }
  
  .contact-view-social-btn:hover {
    background: #A0845C;
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(139, 115, 85, 0.4);
  }
  
  .contact-view-social-icon {
    width: 28px;
    height: 28px;
  }
  
  /* CTA Footer */
  .cta-footer {
    position: relative;
    height: 50vh;
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  
  .cta-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
  }
  
  .cta-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: linear-gradient(135deg, #2D372D 0%, #3D473D 100%);
  }
  
  .cta-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(45, 55, 45, 0.8);
    z-index: -1;
  }
  
  .cta-content {
    text-align: center;
    color: #F5E6D3;
    z-index: 1;
    max-width: 600px;
    padding: 0 2rem;
  }
  
  .cta-title {
    font-size: 3rem;
    font-weight: 900;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  .cta-subtitle {
    font-size: 1.2rem;
    margin-bottom: 2.5rem;
    letter-spacing: 1px;
    line-height: 1.6;
    color: #FFFFFF;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.5);
  }
  
  .cta-button {
    background: linear-gradient(135deg, #8B7355, #A0845C);
    color: #F5E6D3;
    padding: 1.25rem 3rem;
    font-size: 1.2rem;
    font-weight: 800;
    border: none;
    border-radius: 8px;
    text-transform: uppercase;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 6px 20px rgba(139, 115, 85, 0.3);
    position: relative;
    overflow: hidden;
    margin-bottom: 2rem;
  }
  
  .cta-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  .cta-button:hover::before {
    left: 100%;
  }
  
  .cta-button:hover {
    background: linear-gradient(135deg, #A0845C, #B8926A);
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(139, 115, 85, 0.4);
  }
  
  /* iPad Specific Media Queries */
  @media (min-width: 768px) and (max-width: 1024px) {
    .hero-title {
      font-size: 3rem;
    }
    
    .hero-subtitle {
      font-size: 1.2rem;
    }
    
    .section-title {
      font-size: 2.2rem;
    }
    
    .container {
      padding: 0 3rem;
    }
    
    .contact-layout {
      gap: 3rem;
    }
    
    .contact-form-container {
      padding: 2.5rem;
    }
    
    .form-row {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .contact-view-info-card {
      padding: 2rem;
    }
    
    .contact-view-social-buttons {
      gap: 1.5rem;
    }
    
    .cta-title {
      font-size: 2.5rem;
    }
    
    .form-title {
      font-size: 2rem;
    }
    
    .contact-view-info-panel {
      gap: 1.5rem;
    }
    
    .contact-view-info-item {
      gap: 1rem;
    }
    
    .contact-view-info-icon {
      width: 35px;
      height: 35px;
    }
    
    .contact-view-svg-icon {
      width: 18px;
      height: 18px;
    }
  }
  
  @media (max-width: 768px) {
    .contact-page {
      margin-top: 4rem;
    }

    .hero-title {
      font-size: 2.5rem;
    }
    
    .contact-layout {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    
    .contact-form-container {
      padding: 2rem;
    }
    
    .form-row {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .contact-view-info-card {
      padding: 1.5rem;
    }
    
    .contact-view-social-buttons {
      gap: 1rem;
    }
    
    .cta-title {
      font-size: 2.2rem;
    }
    
    .container {
      padding: 0 1.5rem;
    }
  }
  
  @media (max-width: 480px) {
    .hero-title {
      font-size: 2rem;
    }
    
    .contact-form-container {
      padding: 1.5rem;
    }
    
    .form-title {
      font-size: 1.8rem;
    }
    
    .contact-view-info-card {
      padding: 1rem;
    }
    
    .cta-title {
      font-size: 1.8rem;
    }
    
    .cta-button {
      padding: 1rem 2rem;
      font-size: 1rem;
    }
  }
</style>
