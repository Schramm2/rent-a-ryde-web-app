<template>
  <NavBar />
  <ToastNotif ref="toastRef" />
  <main class="bookings-view-page">
    <!-- Header Banner Section -->
    <section class="bookings-view-hero-banner">
      <div class="bookings-view-hero-background">
        <img src="@/assets/Vehicles/IMG-20250527-WA0148.jpg" alt="Plan Your Adventure Banner" class="bookings-view-hero-image" />
        <div class="bookings-view-hero-overlay"></div>
      </div>
      <div class="bookings-view-hero-content">
        <h1 class="bookings-view-hero-title">Plan Your Adventure</h1>
        <p class="bookings-view-hero-subtitle">Select your vehicle, choose your extras, and pick your dates. We'll handle the rest.</p>
      </div>
    </section>

    <!-- Main Booking Section -->
    <section class="bookings-view-booking-section">
      <div class="bookings-view-container">
        <div class="bookings-view-booking-layout">
          <!-- Booking Form -->
          <div class="bookings-view-booking-form-container">
            <div class="bookings-view-form-header">
              <h2 class="bookings-view-form-title">Book Your Ryde</h2>
              <p class="bookings-view-form-subtitle">Fill in the details below to reserve your adventure vehicle</p>
            </div>

            <form @submit.prevent="submitBooking" class="bookings-view-booking-form">
              <!-- Vehicle Selection -->
              <div class="bookings-view-form-section">
                <div class="bookings-view-form-group">
                  <label for="vehicle" class="bookings-view-form-label">
                    <span class="bookings-view-label-text">Select Vehicle</span>
                    <span class="bookings-view-label-required">*</span>
                  </label>
                  <div class="bookings-view-select-wrapper">
                    <select id="vehicle" v-model="bookingForm.vehicle" class="bookings-view-form-select" required>
                      <option value="">Choose your adventure vehicle</option>
                      <option v-for="vehicle in vehicles" :key="vehicle.id" :value="vehicle.id">
                        {{ vehicle.name }} - {{ vehicle.price }}
                      </option>
                      <option v-if="vehiclesLoading" value="" disabled>
                        Loading vehicles...
                      </option>
                      <option v-if="vehicles.length === 0 && !vehiclesLoading" value="" disabled>
                        No vehicles available
                      </option>
                    </select>
                    <div class="bookings-view-select-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6,9 12,15 18,9"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Date Range -->
              <div class="bookings-view-form-section">
                <h3 class="bookings-view-section-title">Rental Period</h3>
                <div class="bookings-view-form-row">
                  <div class="bookings-view-form-group">
                    <label for="pickupDate" class="bookings-view-form-label">
                      <span class="bookings-view-label-text">Pick-Up Date</span>
                      <span class="bookings-view-label-required">*</span>
                    </label>
                    <div class="bookings-view-input-wrapper">
                      <input 
                        id="pickupDate" 
                        type="date" 
                        v-model="bookingForm.pickupDate" 
                        class="bookings-view-form-input" 
                        required 
                        @change="checkAvailability"
                      />
                      <div class="bookings-view-input-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="bookings-view-form-group">
                    <label for="dropoffDate" class="bookings-view-form-label">
                      <span class="bookings-view-label-text">Drop-Off Date</span>
                      <span class="bookings-view-label-required">*</span>
                    </label>
                    <div class="bookings-view-input-wrapper">
                      <input 
                        id="dropoffDate" 
                        type="date" 
                        v-model="bookingForm.dropoffDate" 
                        class="bookings-view-form-input" 
                        required 
                        @change="checkAvailability"
                      />
                      <div class="bookings-view-input-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Real-time Availability Status -->
                <div v-if="availabilityStatus.show" class="bookings-view-availability-section">
                  <div class="bookings-view-availability-header">
                    <h4 class="bookings-view-availability-title">Availability Status</h4>
                    <button 
                      v-if="availabilityStatus.loading" 
                      class="bookings-view-availability-refresh-btn"
                      disabled
                    >
                      <div class="bookings-view-spinner-small"></div>
                      Checking...
                    </button>
                    <button 
                      v-else 
                      class="bookings-view-availability-refresh-btn"
                      @click="checkAvailability"
                      :disabled="!canCheckAvailability"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 2v6h-6"></path>
                        <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                        <path d="M3 22v-6h6"></path>
                        <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                      </svg>
                      Check Again
                    </button>
                  </div>
                  
                  <!-- Loading State -->
                  <div v-if="availabilityStatus.loading" class="bookings-view-availability-loading">
                    <div class="bookings-view-spinner"></div>
                    <p>Checking availability...</p>
                  </div>
                  
                  <!-- Available State -->
                  <div v-else-if="availabilityStatus.available" class="bookings-view-availability-available">
                    <div class="bookings-view-availability-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9 12l2 2 4-4"></path>
                      </svg>
                    </div>
                    <div class="bookings-view-availability-content">
                      <h5 class="bookings-view-availability-status">Available</h5>
                      <p class="bookings-view-availability-message">
                        Your selected vehicle and extras are available for the chosen dates.
                      </p>
                    </div>
                  </div>
                  
                  <!-- Conflict State -->
                  <div v-else-if="availabilityStatus.conflicts" class="bookings-view-availability-conflicts">
                    <div class="bookings-view-availability-icon conflict">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                      </svg>
                    </div>
                    <div class="bookings-view-availability-content">
                      <h5 class="bookings-view-availability-status conflict">Unavailable</h5>
                      <p class="bookings-view-availability-message">
                        There are conflicts with your selected dates. Please review the details below.
                      </p>
                      
                      <!-- Vehicle Conflicts -->
                      <div v-if="availabilityStatus.vehicleConflicts && availabilityStatus.vehicleConflicts.length > 0" class="bookings-view-conflict-details">
                        <h6 class="bookings-view-conflict-type">Vehicle Conflicts:</h6>
                        <div v-for="conflict in availabilityStatus.vehicleConflicts" :key="conflict.bookingId" class="bookings-view-conflict-item">
                          <span class="bookings-view-conflict-date">
                            {{ formatDate(conflict.startDate) }} - {{ formatDate(conflict.endDate) }}
                          </span>
                          <span class="bookings-view-conflict-status">{{ conflict.status }}</span>
                        </div>
                      </div>
                      
                      <!-- Add-on Conflicts -->
                      <div v-if="availabilityStatus.addOnConflicts && Object.keys(availabilityStatus.addOnConflicts).length > 0" class="bookings-view-conflict-details">
                        <h6 class="bookings-view-conflict-type">Add-on Conflicts:</h6>
                        <div v-for="(conflicts, addonId) in availabilityStatus.addOnConflicts" :key="addonId" class="bookings-view-conflict-item">
                          <span class="bookings-view-conflict-addon">{{ getAddonName(addonId) }}</span>
                          <span class="bookings-view-conflict-date">
                            {{ formatDate(conflicts[0].startDate) }} - {{ formatDate(conflicts[0].endDate) }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Error State -->
                  <div v-else-if="availabilityStatus.error" class="bookings-view-availability-error">
                    <div class="bookings-view-availability-icon error">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                      </svg>
                    </div>
                    <div class="bookings-view-availability-content">
                      <h5 class="bookings-view-availability-status error">Error</h5>
                      <p class="bookings-view-availability-message">{{ availabilityStatus.error }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Optional Extras -->
              <div class="bookings-view-form-section">
                <h3 class="bookings-view-section-title">Optional Extras</h3>
                <p class="bookings-view-section-description">Enhance your adventure with our premium add-ons</p>
                <div class="bookings-view-extras-container">
                  <div v-if="extrasLoading" class="bookings-view-no-extras">
                    <p class="bookings-view-no-extras-text">Loading extras...</p>
                  </div>
                  <div v-else-if="extras.length === 0" class="bookings-view-no-extras">
                    <p class="bookings-view-no-extras-text">No extras available</p>
                  </div>
                  <div v-else class="bookings-view-extras-grid">
                    <label v-for="extra in extras" :key="extra.id" class="bookings-view-extra-card">
                      <input type="checkbox" :value="extra.id" v-model="bookingForm.selectedExtras" class="bookings-view-extra-checkbox" />
                      <div class="bookings-view-extra-content">
                        <div class="bookings-view-extra-header">
                          <span class="bookings-view-extra-name">{{ extra.name }}</span>
                          <div class="bookings-view-checkbox-indicator">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                              <polyline points="20,6 9,17 4,12"></polyline>
                            </svg>
                          </div>
                        </div>
                        <span class="bookings-view-extra-price">{{ extra.price }}</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Contact Information -->
              <div class="bookings-view-form-section">
                <h3 class="bookings-view-section-title">Contact Information</h3>
                <div class="bookings-view-form-row">
                  <div class="bookings-view-form-group">
                    <label for="name" class="bookings-view-form-label">
                      <span class="bookings-view-label-text">Full Name</span>
                      <span class="bookings-view-label-required">*</span>
                    </label>
                    <div class="bookings-view-input-wrapper">
                      <input id="name" type="text" v-model="bookingForm.name" class="bookings-view-form-input" placeholder="Your full name" required />
                      <div class="bookings-view-input-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="bookings-view-form-group">
                    <label for="email" class="bookings-view-form-label">
                      <span class="bookings-view-label-text">Email Address</span>
                      <span class="bookings-view-label-required">*</span>
                    </label>
                    <div class="bookings-view-input-wrapper">
                      <input id="email" type="email" v-model="bookingForm.email" class="bookings-view-form-input" placeholder="your@email.com" required />
                      <div class="bookings-view-input-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="bookings-view-form-group">
                  <label for="phone" class="bookings-view-form-label">
                    <span class="bookings-view-label-text">Phone Number</span>
                    <span class="bookings-view-label-required">*</span>
                  </label>
                  <div class="bookings-view-input-wrapper">
                    <input id="phone" type="tel" v-model="bookingForm.phone" class="bookings-view-form-input" placeholder="+27 XX XXX XXXX" required />
                    <div class="bookings-view-input-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Special Requests -->
              <div class="bookings-view-form-section">
                <div class="bookings-view-form-group">
                  <label for="specialRequests" class="bookings-view-form-label">
                    <span class="bookings-view-label-text">Special Requests</span>
                    <span class="bookings-view-label-optional">(Optional)</span>
                  </label>
                  <div class="bookings-view-textarea-wrapper">
                    <textarea id="specialRequests" v-model="bookingForm.specialRequests" class="bookings-view-form-textarea" placeholder="Any special requirements, dietary needs, or questions? Let us know and we'll do our best to accommodate..." rows="4"></textarea>
                  </div>
                </div>
              </div>

              <!-- Authentication-based Action Buttons -->
              <div class="bookings-view-form-actions">
                <!-- Authenticated User: Show Submit Button -->
                <button v-if="isAuthenticated" type="submit" class="bookings-view-submit-btn bookings-view-primary-btn" :disabled="isSubmitting">
                  <span v-if="!isSubmitting" class="bookings-view-btn-content">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22,4 12,14.01 9,11.01"></polyline>
                    </svg>
                    Submit Booking
                  </span>
                  <span v-else class="bookings-view-btn-content bookings-view-loading">
                    <div class="bookings-view-spinner"></div>
                    {{ isCheckingAvailability ? 'Checking Availability...' : 'Processing...' }}
                  </span>
                </button>

                <!-- Unauthenticated User: Show Login Button -->
                <button v-else type="button" class="bookings-view-submit-btn bookings-view-login-btn" @click="redirectToLogin">
                  <span class="bookings-view-btn-content">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                      <polyline points="10,17 15,12 10,7"></polyline>
                      <line x1="15" y1="12" x2="3" y2="12"></line>
                    </svg>
                    Login to Book
                  </span>
                </button>

                <!-- Screen reader note about authentication requirement -->
                <p class="bookings-view-sr-only">Authentication is required to complete vehicle bookings</p>

                <!-- Visual note for unauthenticated users -->
                <div v-if="!isAuthenticated" class="bookings-view-auth-notice">
                  <div class="bookings-view-notice-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </div>
                  <p class="bookings-view-notice-text">Fill out your booking details above, then log in to complete your reservation. Your data will be saved automatically.</p>
                </div>
              </div>
            </form>
          </div>

          <!-- Booking Summary Card -->
          <div class="bookings-view-booking-summary">
            <div class="bookings-view-summary-card">
              <h3 class="bookings-view-summary-title">Booking Summary</h3>
              
              <!-- Restored Data Indicator -->
              <div v-if="dataRestored" class="bookings-view-restored-indicator">
                <div class="bookings-view-restored-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22,4 12,14.01 9,11.01"></polyline>
                  </svg>
                </div>
                <span class="bookings-view-restored-text">Your booking data has been restored</span>
              </div>

              <div class="bookings-view-summary-section">
                <h4 class="bookings-view-summary-subtitle">Vehicle</h4>
                <p class="bookings-view-summary-item">
                  {{ selectedVehicle?.name || 'No vehicle selected' }}
                </p>
                <p class="bookings-view-summary-price" v-if="selectedVehicle">
                  {{ selectedVehicle.price }} per day
                </p>
              </div>

              <div class="bookings-view-summary-section" v-if="bookingForm.pickupDate && bookingForm.dropoffDate">
                <h4 class="bookings-view-summary-subtitle">Rental Period</h4>
                <p class="bookings-view-summary-item">
                  {{ formatDate(bookingForm.pickupDate) }} - {{ formatDate(bookingForm.dropoffDate) }}
                </p>
                <p class="bookings-view-summary-detail">{{ rentalDays }} day(s)</p>
              </div>

              <div class="bookings-view-summary-section" v-if="selectedExtrasDetails.length">
                <h4 class="bookings-view-summary-subtitle">Extras</h4>
                <div v-for="extra in selectedExtrasDetails" :key="extra.id" class="bookings-view-summary-extra">
                  <span>{{ extra.name }}</span>
                  <span>{{ extra.price }}</span>
                </div>
              </div>
              
              <div class="bookings-view-summary-section" v-if="extras.length === 0 && !extrasLoading">
                <h4 class="bookings-view-summary-subtitle">Extras</h4>
                <p class="bookings-view-summary-item" style="color: #6C757D; font-style: italic;">
                  No extras available
                </p>
              </div>

              <div class="bookings-view-summary-total">
                <div class="bookings-view-total-line">
                  <span class="bookings-view-total-label">Estimated Total:</span>
                  <span class="bookings-view-total-amount">{{ estimatedTotal }}</span>
                </div>
                <p class="bookings-view-total-note">*Final price confirmed upon booking</p>
              </div>

              <!-- Deposit Notice -->
              <div class="bookings-view-deposit-notice">
                <div class="bookings-view-deposit-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                  </svg>
                </div>
                <div class="bookings-view-deposit-content">
                  <h4 class="bookings-view-deposit-title">Booking Deposit</h4>
                  <p class="bookings-view-deposit-text">A 10% deposit may be required depending on your travel destination. We'll confirm the exact amount when processing your booking.</p>
                </div>
              </div>

              <div class="bookings-view-confirmation-note">
                <p>You'll receive a summary email once submitted.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonial Section -->
    <section class="bookings-view-testimonial-section">
      <div class="bookings-view-container">
        <div class="bookings-view-testimonial-content">
          <div class="bookings-view-testimonial-images">
            <div class="bookings-view-testimonial-img-wrapper" @click="openImageModal(testimonialImg1, 'Adventure Scene 1')">
              <img src="@/assets/Vehicles/DSC_0484.jpg" alt="Adventure Scene 1" class="bookings-view-testimonial-img" />
              <div class="bookings-view-img-overlay">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </div>
            </div>
            <div class="bookings-view-testimonial-img-wrapper" @click="openImageModal(testimonialImg2, 'Adventure Scene 2')">
              <img src="@/assets/Vehicles/DSC_0614.jpg" alt="Adventure Scene 2" class="bookings-view-testimonial-img" />
              <div class="bookings-view-img-overlay">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </div>
            </div>
            <div class="bookings-view-testimonial-img-wrapper" @click="openImageModal(testimonialImg3, 'Adventure Scene 3')">
              <img src="@/assets/Vehicles/DSC_0625.jpg" alt="Adventure Scene 3" class="bookings-view-testimonial-img" />
              <div class="bookings-view-img-overlay">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </div>
            </div>
          </div>
          <div class="bookings-view-testimonial-text">
            <blockquote class="bookings-view-testimonial-quote">
              "Ryder took us places we never thought possible. The vehicle was perfectly equipped for our Drakensberg adventure, and the booking process was seamless."
            </blockquote>
            <cite class="bookings-view-testimonial-author">- Sarah & Mike, Cape Town</cite>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Footer -->
    <section class="bookings-view-cta-footer">
      <div class="bookings-view-cta-background">
        <img src="@/assets/Vehicles/IMG-20250527-WA0154.jpg" alt="Ready to Hit the Trails" class="bookings-view-cta-image" />
        <div class="bookings-view-cta-overlay"></div>
      </div>
      <div class="bookings-view-cta-content">
        <h2 class="bookings-view-cta-title">Ready to Hit the Trails?</h2>
        <p class="bookings-view-cta-subtitle">Explore our vehicle options and start planning your adventure</p>
        <button class="bookings-view-cta-btn" @click="browseVehicles">
          Browse Vehicles
        </button>
      </div>
    </section>
  </main>

  <!-- Image Modal -->
  <div v-if="showImageModal" class="bookings-view-image-modal" @click="closeImageModal">
    <div class="bookings-view-modal-content" @click.stop>
      <button class="bookings-view-modal-close" @click="closeImageModal">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <img :src="modalImageSrc" :alt="modalImageAlt" class="bookings-view-modal-image" />
    </div>
  </div>

  <Footer />
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import Footer from '../components/FooterComp.vue'
import NavBar from '../components/NavBar.vue'
import ToastNotif from '../components/ToastNotif.vue'
import { adminService } from '@/services/adminService.js'
import { auth } from '@/services/firebaseConfig.js'
import { onAuthStateChanged } from 'firebase/auth'
import { userService } from '@/services/userService.js'
import { bookingsService } from '@/services/bookingsService.js'
import { sendBookingSummaryEmail } from '@/services/contactService.js'
import { bookingStorageService } from '@/services/bookingStorageService.js'

// Import testimonial images
import testimonialImg1 from '@/assets/Vehicles/DSC_0484.jpg'
import testimonialImg2 from '@/assets/Vehicles/DSC_0614.jpg'
import testimonialImg3 from '@/assets/Vehicles/DSC_0625.jpg'

// Form data
const bookingForm = reactive({
  vehicle: '',
  pickupDate: '',
  dropoffDate: '',
  selectedExtras: [],
  specialRequests: '',
  name: '',
  email: '',
  phone: ''
})

const isSubmitting = ref(false)
const isCheckingAvailability = ref(false)

// Toast reference
const toastRef = ref(null)

// Availability checking state
const availabilityStatus = reactive({
  show: false,
  loading: false,
  available: false,
  conflicts: false,
  vehicleConflicts: [],
  addOnConflicts: {},
  error: null
})

// Debounce timer for availability checking
let availabilityCheckTimer = null

// Robust authentication state (reactive)
const isAuthenticated = ref(false)
const hasShownWelcomeToast = ref(false)
const hasShownRestoreToast = ref(false)

const checkAuth = () => {
  const user = auth.currentUser
  if (user) {
    isAuthenticated.value = true
    user.getIdToken().then(token => {
      sessionStorage.setItem('authToken', token)
      sessionStorage.setItem('userUid', user.uid)
      // Only prepopulate after token/uid are set
      prepopulateContactInfo()
    })
  } else {
    isAuthenticated.value = false
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('userUid')
    // Reset toast flags when user logs out
    hasShownWelcomeToast.value = false
    hasShownRestoreToast.value = false
  }
}

async function prepopulateContactInfo() {
  try {
    const uid = sessionStorage.getItem('userUid')
    const token = sessionStorage.getItem('authToken')
    if (uid && token) {
      const user = await userService.getUserById(uid, token)
      bookingForm.name = user.fullname || ''
      bookingForm.email = user.email || ''
      bookingForm.phone = user.phoneNumber || ''
      
      // Show info toast for successful prepopulation only once
      if (toastRef.value && !hasShownWelcomeToast.value) {
        toastRef.value.showInfo(
          'Welcome Back!',
          'Contact Info Filled In!',
          4000
        )
        hasShownWelcomeToast.value = true
      }
    }
  } catch (error) {
    console.error('Failed to prepopulate contact info:', error)
    
    
  }
}

onMounted(() => {
  checkAuth()
  // Listen to Firebase Auth state changes
  const unsubscribe = onAuthStateChanged(auth, () => {
    checkAuth()
  })
  window.addEventListener('storage', checkAuth)

  // Add keyboard event listener for modal
  window.addEventListener('keydown', handleKeydown)

  // Fetch vehicles and extras regardless of authentication status
  // This allows users to see available options even when not logged in
  fetchData()
  
  // Handle query parameters from HomeView
  handleQueryParameters()
  
  // If authenticated, prepopulate contact info and restore booking data
  if (isAuthenticated.value) {
    // prepopulateContactInfo() is now called in checkAuth
    // Restore booking data if available
    restoreBookingData()
  }

  // Watch for auth changes to refetch data if needed
  const stopWatch = watch(isAuthenticated, (val) => {
    // Always refetch data when auth state changes
    fetchData()
    
    if (val) {
      // prepopulateContactInfo() is now called in checkAuth
      // Restore booking data if available
      restoreBookingData()
    }
  })

  // Clean up
  onUnmounted(() => {
    unsubscribe()
    window.removeEventListener('storage', checkAuth)
    window.removeEventListener('keydown', handleKeydown)
    stopWatch()
    // Reset toast flags when component is unmounted
    hasShownWelcomeToast.value = false
    hasShownRestoreToast.value = false
  })
})

// Fetch vehicles and extras
const vehicles = ref([])
const vehiclesLoading = ref(false)
const vehiclesError = ref('')
const extras = ref([])
const extrasLoading = ref(false)
const extrasError = ref('')

async function fetchData() {
  vehiclesLoading.value = true
  vehiclesError.value = ''
  extrasLoading.value = true
  extrasError.value = ''
  
  try {
    const token = sessionStorage.getItem('authToken')
    
    // Fetch vehicles regardless of authentication
    const fetchedVehicles = await adminService.fetchAllVehicles(token)
    vehicles.value = (fetchedVehicles || []).map(v => ({
      id: v.id || v._id || v.vehicleId,
      name: v.make && v.model ? `${v.make} ${v.model}` : v.name || '',
      price: typeof v.price === 'number' ? `R${v.price.toLocaleString()}` : (v.price || ''),
      dailyRate: typeof v.price === 'number' ? v.price : parseInt((v.price || '').replace(/\D/g, '')) || 0
    }))
    
    // Fetch extras regardless of authentication
    const fetchedAddons = await adminService.fetchAllAddons(token)
    extras.value = (fetchedAddons || []).map(a => ({
      id: a.id || a._id || a.addonId,
      name: a.name || a.addonName || '',
      price: typeof a.price === 'number' ? `R${a.price}/day` : (a.price || ''),
    }))
    
    // Pre-select Suzuki Jimny if query parameter is present
    preSelectSuzukiJimny()
    
    // Handle query parameters from HomeView after vehicles are loaded
    handleQueryParameters()
  } catch (err) {
    const errorMessage = err.message || 'Failed to load booking data.'
    vehiclesError.value = errorMessage
    extrasError.value = errorMessage
    
    // Show error toast
    if (toastRef.value) {
      toastRef.value.showError(
        'Data Loading Failed',
        'Unable to load vehicles and extras. Please refresh the page or try again later.',
        6000
      )
    }
  } finally {
    vehiclesLoading.value = false
    extrasLoading.value = false
  }
}

// Computed properties
const selectedVehicle = computed(() => {
  return vehicles.value.find(v => v.id === bookingForm.vehicle)
})

// Check if availability can be checked
const canCheckAvailability = computed(() => {
  return bookingForm.vehicle && 
         bookingForm.pickupDate && 
         bookingForm.dropoffDate && 
         isAuthenticated.value
})

const selectedExtrasDetails = computed(() => {
  return extras.value.filter(extra => bookingForm.selectedExtras.includes(extra.id))
})

const rentalDays = computed(() => {
  if (!bookingForm.pickupDate || !bookingForm.dropoffDate) return 0
  const pickup = new Date(bookingForm.pickupDate)
  const dropoff = new Date(bookingForm.dropoffDate)
  const diffTime = Math.abs(dropoff - pickup)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1
})

const estimatedTotal = computed(() => {
  let total = 0

  if (selectedVehicle.value && rentalDays.value) {
    total += selectedVehicle.value.dailyRate * rentalDays.value
  }

  // Add extras (simplified calculation)
  selectedExtrasDetails.value.forEach(extra => {
    const price = parseInt(extra.price.match(/\d+/)[0])
    total += price * rentalDays.value
  })

  return total > 0 ? `R${total.toLocaleString()}` : 'R0'
})

// Methods
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-ZA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const submitBooking = async () => {
  isSubmitting.value = true
  
  try {
    const token = sessionStorage.getItem('authToken')
    const userId = sessionStorage.getItem('userUid')
    
    // Authentication check
    if (!userId) {
      throw new Error('Authentication required. Please log in to continue.')
    }
    
    // Form validation
    const validationErrors = validateForm()
    if (validationErrors.length > 0) {
      // Show first validation error
      throw new Error(validationErrors[0])
    }

    // Final availability check before submitting
    if (toastRef.value) {
      toastRef.value.showInfo(
        'Checking Availability',
        'Verifying availability for your selected dates...',
        0 // No auto-dismiss for loading state
      )
    }

    try {
      isCheckingAvailability.value = true
      
      // Perform final availability check
      const availability = await bookingsService.checkComprehensiveAvailability(
        selectedVehicle.value.id,
        bookingForm.selectedExtras,
        bookingForm.pickupDate,
        bookingForm.dropoffDate,
        null, // excludeBookingId
        token
      )

      if (!availability.available) {
        // Handle conflicts
        let conflictMessage = 'Your selected dates are no longer available:\n'
        
        if (availability.vehicleConflicts && availability.vehicleConflicts.length > 0) {
          const vehicleConflicts = availability.vehicleConflicts
            .map(b => `• Vehicle: ${formatDate(b.startDate)} to ${formatDate(b.endDate)}`)
            .join('\n')
          conflictMessage += vehicleConflicts + '\n'
        }
        
        if (availability.addOnConflicts && Object.keys(availability.addOnConflicts).length > 0) {
          const addonConflicts = Object.entries(availability.addOnConflicts)
            .map(([addonId, conflicts]) => {
              const addonName = getAddonName(addonId)
              return `• ${addonName}: ${formatDate(conflicts[0].startDate)} to ${formatDate(conflicts[0].endDate)}`
            })
            .join('\n')
          conflictMessage += addonConflicts
        }
        
        throw new Error(conflictMessage)
      }

      // Clear availability checking state
      isCheckingAvailability.value = false
      
      // Clear availability check toast
      if (toastRef.value) {
        toastRef.value.clearAllToasts()
      }

      // Show loading toast for booking submission
      if (toastRef.value) {
        toastRef.value.showInfo(
          'Processing Booking',
          'Please wait while we submit your booking...',
          0 // No auto-dismiss for loading state
        )
      }
    } catch (availabilityError) {
      // Clear availability checking state
      isCheckingAvailability.value = false
      
      // Clear any existing toasts
      if (toastRef.value) {
        toastRef.value.clearAllToasts()
      }
      
      // Re-throw availability errors
      throw availabilityError
    }

    // Prepare booking data for backend
    const bookingPayload = {
      vehicleId: selectedVehicle.value.id,
      userId,
      startDate: bookingForm.pickupDate,
      endDate: bookingForm.dropoffDate,
      extras: bookingForm.selectedExtras,
      specialRequest: bookingForm.specialRequests,
      totalPrice: estimatedTotal.value.replace(/[^\d]/g, ''), // Remove currency formatting
      status: 'pending'
    }

    await bookingsService.createBooking(bookingPayload, token)
    
    // Get user settings to check email notification preferences
    let emailNotificationsEnabled = true // Default to true if we can't fetch settings
    try {
      const userSettings = await userService.getUserSettings(userId, token)
      emailNotificationsEnabled = userSettings?.notifications?.emailNotificationsForBookings !== false
    } catch {
      // Keep default as true if we can't fetch settings
    }
    
    // Send booking summary email to user (only if email notifications are enabled)
    try {

      const bookingEmailData = {
        name: bookingForm.name,
        email: bookingForm.email,
        vehicleName: selectedVehicle.value.name,
        pickupDate: formatDate(bookingForm.pickupDate),
        dropoffDate: formatDate(bookingForm.dropoffDate),
        rentalDays: rentalDays.value,
        extras: selectedExtrasDetails.value,
        totalPrice: estimatedTotal.value,
        specialRequests: bookingForm.specialRequests,
        emailNotificationsEnabled: emailNotificationsEnabled
      }
      
      await sendBookingSummaryEmail(bookingEmailData)
    } catch (emailError) {
      console.error('Failed to send booking summary email:', emailError)
      // Don't fail the booking if email fails, just log it
    }
    
    // Clear any existing toasts
    if (toastRef.value) {
      toastRef.value.clearAllToasts()
    }
    
    // Show success toast
    if (toastRef.value) {
      const emailMessage = emailNotificationsEnabled ? 
        `Your ${selectedVehicle.value.name} booking has been confirmed. You'll receive a summary email shortly.` :
        `Your ${selectedVehicle.value.name} booking has been confirmed.`
      
      toastRef.value.showSuccess(
        'Booking Submitted Successfully!',
        emailMessage,
        8000
      )
    }
    
    // Reset form fields except prepopulated contact info
    bookingForm.vehicle = ''
    bookingForm.pickupDate = ''
    bookingForm.dropoffDate = ''
    bookingForm.selectedExtras = []
    bookingForm.specialRequests = ''
    // Keep name, email, phone as they may be prepopulated
    
    // Clear any stored booking data
    bookingStorageService.clearBookingData()
    
    // Reset restored data indicator
    dataRestored.value = false
    
  } catch (err) {
    // Clear any existing toasts
    if (toastRef.value) {
      toastRef.value.clearAllToasts()
    }
    
    // Show error toast with appropriate message
    const errorMessage = err.message || 'An unexpected error occurred while submitting your booking.'
    
    if (toastRef.value) {
      toastRef.value.showError(
        'Booking Failed',
        errorMessage,
        8000
      )
    }
    
    console.error('Booking submission error:', err)
  } finally {
    isSubmitting.value = false
  }
}

const router = useRouter()

// Function to pre-select Suzuki Jimny based on query parameter
const preSelectSuzukiJimny = () => {
  const route = router.currentRoute.value
  if (route.query.preSelectVehicle === 'suzuki-jimney' && vehicles.value.length > 0) {
    // Find the Suzuki Jimney in the vehicles list (note: database has "Jimney" with 'e')
    const suzukiJimny = vehicles.value.find(vehicle => 
      vehicle.name.toLowerCase().includes('suzuki') && 
      vehicle.name.toLowerCase().includes('jimney')
    )
    
    if (suzukiJimny) {
      bookingForm.vehicle = suzukiJimny.id
    }
  }
}

// Function to handle query parameters from HomeView
const handleQueryParameters = () => {
  const route = router.currentRoute.value
  const query = route.query
  
  // Handle pickup date
  if (query.pickup) {
    bookingForm.pickupDate = query.pickup
  }
  
  // Handle return date
  if (query.return) {
    bookingForm.dropoffDate = query.return
  }
  
  // Handle vehicle selection
  if (query.vehicle && vehicles.value.length > 0) {
    const selectedVehicle = vehicles.value.find(v => v.id === query.vehicle)
    if (selectedVehicle) {
      bookingForm.vehicle = query.vehicle
    }
  }
}





const browseVehicles = () => {
  // Show info toast before redirecting
  if (toastRef.value) {
    toastRef.value.showInfo(
      'Browsing Vehicles',
      'Taking you to our vehicle selection page...',
      2000
    )
  }
  
  setTimeout(() => {
    router.push('/vehicles')
  }, 500)
}

// Form validation helper with toast notifications
const validateForm = () => {
  const errors = []
  
  if (!bookingForm.vehicle) {
    errors.push('Please select a vehicle')
  }
  
  if (!bookingForm.pickupDate) {
    errors.push('Please select a pickup date')
  }
  
  if (!bookingForm.dropoffDate) {
    errors.push('Please select a drop-off date')
  }
  
  if (bookingForm.pickupDate && bookingForm.dropoffDate) {
    const pickup = new Date(bookingForm.pickupDate)
    const dropoff = new Date(bookingForm.dropoffDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (pickup < today) {
      errors.push('Pickup date cannot be in the past')
    }
    
    if (dropoff <= pickup) {
      errors.push('Drop-off date must be after pickup date')
    }
  }
  
  if (!bookingForm.name.trim()) {
    errors.push('Please enter your full name')
  }
  
  if (!bookingForm.email.trim()) {
    errors.push('Please enter your email address')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingForm.email)) {
    errors.push('Please enter a valid email address')
  }
  
  if (!bookingForm.phone.trim()) {
    errors.push('Please enter your phone number')
  }
  
  return errors
}

const redirectToLogin = () => {
  // Store current booking form data before redirecting
  const bookingDataToStore = {
    vehicle: bookingForm.vehicle,
    pickupDate: bookingForm.pickupDate,
    dropoffDate: bookingForm.dropoffDate,
    selectedExtras: bookingForm.selectedExtras,
    specialRequests: bookingForm.specialRequests,
    name: bookingForm.name,
    email: bookingForm.email,
    phone: bookingForm.phone
  }
  
  // Only store if there's meaningful data
  const hasData = bookingForm.vehicle || bookingForm.pickupDate || bookingForm.dropoffDate || 
                  bookingForm.name || bookingForm.email || bookingForm.phone
  
  if (hasData) {
    bookingStorageService.storeBookingData(bookingDataToStore)
    bookingStorageService.storeReturnUrl('/bookings')
    
      // Show info toast about data preservation
  if (toastRef.value) {
    toastRef.value.showInfo(
      'Booking Data Saved',
      'Your booking details have been saved. Redirecting to login...',
      4000
    )
  }
  }
  
  // Small delay to show the toast before redirecting
  setTimeout(() => {
    router.push('/login')
  }, 1000)
}

// Function to restore booking data after login
const restoreBookingData = () => {
  const storedData = bookingStorageService.getBookingData()
  
  if (storedData && bookingStorageService.validateStoredBookingData(storedData)) {
    // Restore the form data
    bookingForm.vehicle = storedData.vehicle || ''
    bookingForm.pickupDate = storedData.pickupDate || ''
    bookingForm.dropoffDate = storedData.dropoffDate || ''
    bookingForm.selectedExtras = storedData.selectedExtras || []
    bookingForm.specialRequests = storedData.specialRequests || ''
    bookingForm.name = storedData.name || ''
    bookingForm.email = storedData.email || ''
    bookingForm.phone = storedData.phone || ''
    
    // Clear the stored data
    bookingStorageService.clearBookingData()
    
    // Set flag to show restored data indicator
    dataRestored.value = true
    
    // Show success toast only once
    if (toastRef.value && !hasShownRestoreToast.value) {
      toastRef.value.showSuccess(
        'Booking Data Restored',
        'Your booking details have been restored. You can now complete your booking!',
        5000
      )
      hasShownRestoreToast.value = true
    }
    
  }
}

// Track if data was restored to show visual indicator
const dataRestored = ref(false)

// Image Modal State
const showImageModal = ref(false)
const modalImageSrc = ref('')
const modalImageAlt = ref('')

const openImageModal = (src, alt) => {
  modalImageSrc.value = src
  modalImageAlt.value = alt
  showImageModal.value = true
}

const closeImageModal = () => {
  showImageModal.value = false
  modalImageSrc.value = ''
  modalImageAlt.value = ''
}

// Keyboard event handler for modal
const handleKeydown = (event) => {
  if (event.key === 'Escape' && showImageModal.value) {
    closeImageModal()
  }
}

// Availability checking functions
const checkAvailability = async () => {
  // Clear previous availability status
  availabilityStatus.show = false
  availabilityStatus.loading = false
  availabilityStatus.available = false
  availabilityStatus.conflicts = false
  availabilityStatus.vehicleConflicts = []
  availabilityStatus.addOnConflicts = {}
  availabilityStatus.error = null

  // Check if we have all required data
  if (!canCheckAvailability.value) {
    return
  }

  // Validate date range first
  const dateValidation = bookingsService.validateDateRange(bookingForm.pickupDate, bookingForm.dropoffDate)
  if (!dateValidation.valid) {
    availabilityStatus.show = true
    availabilityStatus.error = dateValidation.errors[0]
    return
  }

      // Show loading state
    availabilityStatus.show = true
    availabilityStatus.loading = true
    isCheckingAvailability.value = true

  try {
    const token = sessionStorage.getItem('authToken')
    
    // Check comprehensive availability
    const availability = await bookingsService.checkComprehensiveAvailability(
      bookingForm.vehicle,
      bookingForm.selectedExtras,
      bookingForm.pickupDate,
      bookingForm.dropoffDate,
      null, // excludeBookingId
      token
    )

    // Update availability status
    availabilityStatus.loading = false
    isCheckingAvailability.value = false
    availabilityStatus.available = availability.available
    availabilityStatus.conflicts = !availability.available
    
    if (availability.available) {
      // Everything is available
      availabilityStatus.vehicleConflicts = []
      availabilityStatus.addOnConflicts = {}
    } else {
      // Handle conflicts
      availabilityStatus.vehicleConflicts = availability.vehicleConflicts || []
      availabilityStatus.addOnConflicts = availability.addOnConflicts || {}
    }

    // Show success toast if available
    if (availability.available && toastRef.value) {
      toastRef.value.showSuccess(
        'Availability Confirmed',
        'Your selected vehicle and extras are available for the chosen dates!',
        4000
      )
    }

    // Show warning toast if conflicts exist
    if (!availability.available && toastRef.value) {
      toastRef.value.showWarning(
        'Availability Conflicts',
        'There are conflicts with your selected dates. Please review the details below.',
        6000
      )
    }

  } catch (error) {
    console.error('Availability check failed:', error)
    availabilityStatus.loading = false
    isCheckingAvailability.value = false
    availabilityStatus.error = error.message || 'Failed to check availability. Please try again.'
    
    // Show error toast
    if (toastRef.value) {
      toastRef.value.showError(
        'Availability Check Failed',
        error.message || 'Unable to check availability. Please try again later.',
        6000
      )
    }
  }
}

// Debounced availability check for better UX
const debouncedCheckAvailability = () => {
  if (availabilityCheckTimer) {
    clearTimeout(availabilityCheckTimer)
  }
  
  availabilityCheckTimer = setTimeout(() => {
    checkAvailability()
  }, 500) // 500ms delay
}

// Helper function to get addon name by ID
const getAddonName = (addonId) => {
  const addon = extras.value.find(a => a.id === addonId)
  return addon ? addon.name : 'Unknown Add-on'
}

// Watch for changes that should trigger availability check
watch([() => bookingForm.vehicle, () => bookingForm.pickupDate, () => bookingForm.dropoffDate], () => {
  if (canCheckAvailability.value) {
    debouncedCheckAvailability()
  }
})

// Watch for changes in selected extras
watch(() => bookingForm.selectedExtras, () => {
  if (canCheckAvailability.value && availabilityStatus.show) {
    debouncedCheckAvailability()
  }
})
</script>

<style scoped>
/* Global Styles */
.bookings-view-page {
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2D372D;
  line-height: 1.6;
  margin-top: 5rem;
}

.bookings-view-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Hero Banner */
.bookings-view-hero-banner {
  position: relative;
  height: 50vh;
  min-height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.bookings-view-hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
}

.bookings-view-hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: linear-gradient(135deg, #8B7355 0%, #A0845C 100%);
}

.bookings-view-hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(45, 55, 45, 0.7);
  z-index: -1;
}

.bookings-view-hero-content {
  text-align: center;
  color: #F5E6D3;
  z-index: 1;
  max-width: 800px;
  padding: 0 2rem;
}

.bookings-view-hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.bookings-view-hero-subtitle {
  font-size: 1.3rem;
  font-weight: 400;
  letter-spacing: 1px;
  color: #FFFFFF;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.5);
}

/* Booking Section */
.bookings-view-booking-section {
  padding: 4rem 0;
  background: linear-gradient(135deg, #F5E6D3 0%, #EDD5B8 100%);
  min-height: 100vh;
}

.bookings-view-booking-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 3rem;
  align-items: start;
}

/* Booking Form Container */
.bookings-view-booking-form-container {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(45, 55, 45, 0.1);
  border: 1px solid rgba(139, 115, 85, 0.1);
  position: relative;
  overflow: hidden;
}

.bookings-view-booking-form-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #8B7355, #A0845C, #2D372D);
}

.bookings-view-form-header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #F5E6D3;
}

.bookings-view-form-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #2D372D;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.bookings-view-form-subtitle {
  color: #666;
  font-size: 1.1rem;
  font-weight: 400;
}

/* Form Sections */
.bookings-view-booking-form {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.bookings-view-form-section {
  background: #FAFAFA;
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid #E8E8E8;
  transition: all 0.3s ease;
}

.bookings-view-form-section:hover {
  border-color: #8B7355;
  box-shadow: 0 8px 25px rgba(139, 115, 85, 0.1);
}

.bookings-view-section-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2D372D;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.bookings-view-section-title::before {
  content: '';
  width: 4px;
  height: 20px;
  background: linear-gradient(135deg, #8B7355, #A0845C);
  border-radius: 2px;
}

.bookings-view-section-description {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  font-style: italic;
}

.bookings-view-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.bookings-view-form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Form Labels */
.bookings-view-form-label {
  font-weight: 600;
  color: #2D372D;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.bookings-view-label-text {
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.bookings-view-label-required {
  color: #D73527;
  font-weight: 700;
}

.bookings-view-label-optional {
  color: #666;
  font-weight: 400;
  font-size: 0.85rem;
  text-transform: none;
  letter-spacing: normal;
}

/* Form Inputs */
.bookings-view-input-wrapper,
.bookings-view-select-wrapper,
.bookings-view-textarea-wrapper {
  position: relative;
}

.bookings-view-form-input,
.bookings-view-form-select,
.bookings-view-form-textarea {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #E0E0E0;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  background: white;
  transition: all 0.3s ease;
  color: #2D372D;
}

.bookings-view-form-input:focus,
.bookings-view-form-select:focus,
.bookings-view-form-textarea:focus {
  outline: none;
  border-color: #8B7355;
  box-shadow: 0 0 0 4px rgba(139, 115, 85, 0.1);
  transform: translateY(-1px);
}

.bookings-view-form-input:hover,
.bookings-view-form-select:hover,
.bookings-view-form-textarea:hover {
  border-color: #A0845C;
}

.bookings-view-form-textarea {
  resize: vertical;
  min-height: 120px;
  padding-left: 1rem;
  font-family: inherit;
}

/* Input Icons */
.bookings-view-input-icon,
.bookings-view-select-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #8B7355;
  pointer-events: none;
  z-index: 2;
}

.bookings-view-select-icon {
  right: 1rem;
  left: auto;
}

/* Select Styling */
.bookings-view-form-select {
  appearance: none;
  cursor: pointer;
  padding-right: 3rem;
}

/* Extras Section */
.bookings-view-extras-container {
  margin-top: 1rem;
}

.bookings-view-extras-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.bookings-view-extra-card {
  display: flex;
  align-items: center;
  padding: 1.25rem;
  background: white;
  border: 2px solid #E8E8E8;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.bookings-view-extra-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(135deg, #8B7355, #A0845C);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.bookings-view-extra-card:hover {
  border-color: #8B7355;
  box-shadow: 0 8px 25px rgba(139, 115, 85, 0.15);
  transform: translateY(-2px);
}

.bookings-view-extra-card:hover::before {
  transform: scaleY(1);
}

.bookings-view-extra-checkbox {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.bookings-view-extra-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.25rem;
}

.bookings-view-extra-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bookings-view-extra-name {
  font-weight: 600;
  color: #2D372D;
  font-size: 1rem;
}

.bookings-view-extra-price {
  font-size: 0.9rem;
  color: #8B7355;
  font-weight: 600;
}

.bookings-view-checkbox-indicator {
  width: 24px;
  height: 24px;
  border: 2px solid #E0E0E0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  transition: all 0.3s ease;
}

.bookings-view-checkbox-indicator svg {
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.3s ease;
  color: white;
}

.bookings-view-extra-checkbox:checked + .bookings-view-extra-content .bookings-view-checkbox-indicator {
  background: linear-gradient(135deg, #8B7355, #A0845C);
  border-color: #8B7355;
}

.bookings-view-extra-checkbox:checked + .bookings-view-extra-content .bookings-view-checkbox-indicator svg {
  opacity: 1;
  transform: scale(1);
}

/* No Extras State */
.bookings-view-no-extras {
  text-align: center;
  padding: 2rem;
  background: #F8F9FA;
  border: 2px dashed #DEE2E6;
  border-radius: 12px;
  color: #6C757D;
}

.bookings-view-no-extras-text {
  margin: 0;
  font-style: italic;
  font-size: 0.95rem;
}

/* Form Actions */
.bookings-view-form-actions {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.bookings-view-submit-btn {
  padding: 1.25rem 2rem;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 56px;
}

.bookings-view-primary-btn {
  background: linear-gradient(135deg, #8B7355, #A0845C);
  color: #F5E6D3;
  box-shadow: 0 6px 20px rgba(139, 115, 85, 0.3);
}

.bookings-view-primary-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #A0845C, #B8926A);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(139, 115, 85, 0.4);
}

.bookings-view-login-btn {
  background: linear-gradient(135deg, #2D372D, #3D473D);
  color: #F5E6D3;
  box-shadow: 0 6px 20px rgba(45, 55, 45, 0.3);
}

.bookings-view-login-btn:hover {
  background: linear-gradient(135deg, #3D473D, #4D574D);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(45, 55, 45, 0.4);
}

.bookings-view-submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.bookings-view-btn-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.bookings-view-btn-content.bookings-view-loading {
  gap: 0.5rem;
}

.bookings-view-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: bookings-view-spin 1s linear infinite;
}

@keyframes bookings-view-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Auth Notice */
.bookings-view-auth-notice {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: linear-gradient(135deg, #FFF3CD, #FFEAA7);
  border: 1px solid #F4D03F;
  border-radius: 12px;
  color: #8B7355;
}

.bookings-view-notice-icon {
  flex-shrink: 0;
}

.bookings-view-notice-text {
  font-size: 0.95rem;
  font-weight: 500;
  margin: 0;
}

.bookings-view-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Booking Summary */
.bookings-view-booking-summary {
  position: sticky;
  top: 6rem;
}

.bookings-view-summary-card {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 20px 60px rgba(45, 55, 45, 0.1);
  border: 1px solid rgba(139, 115, 85, 0.1);
  position: relative;
  overflow: hidden;
  margin-top: 1rem;
}

.bookings-view-summary-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #8B7355, #A0845C, #2D372D);
}

.bookings-view-summary-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #2D372D;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
}

/* Restored Data Indicator */
.bookings-view-restored-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #D4EDDA, #C3E6CB);
  border: 1px solid #C3E6CB;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  color: #155724;
}

.bookings-view-restored-icon {
  flex-shrink: 0;
  color: #28A745;
}

.bookings-view-restored-text {
  font-size: 0.9rem;
  font-weight: 600;
}

.bookings-view-summary-section {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #F0F0F0;
}

.bookings-view-summary-section:last-of-type {
  border-bottom: none;
}

.bookings-view-summary-subtitle {
  font-size: 1rem;
  font-weight: 700;
  color: #2D372D;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.bookings-view-summary-item {
  color: #666;
  margin-bottom: 0.25rem;
  font-weight: 500;
}

.bookings-view-summary-price {
  color: #8B7355;
  font-weight: 600;
}

.bookings-view-summary-detail {
  font-size: 0.9rem;
  color: #999;
}

.bookings-view-summary-extra {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: #666;
  font-weight: 500;
}

.bookings-view-summary-total {
  background: linear-gradient(135deg, #F5E6D3, #EDD5B8);
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(139, 115, 85, 0.2);
}

.bookings-view-total-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.bookings-view-total-label {
  font-weight: 700;
  color: #2D372D;
  font-size: 1.1rem;
}

.bookings-view-total-amount {
  font-size: 1.5rem;
  font-weight: 900;
  color: #2D372D;
}

.bookings-view-total-note {
  font-size: 0.8rem;
  color: #666;
  font-style: italic;
  margin: 0;
}

/* Deposit Notice */
.bookings-view-deposit-notice {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #E8F4FD, #D1ECF1);
  border: 1px solid #BEE5EB;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  color: #0C5460;
}

.bookings-view-deposit-icon {
  flex-shrink: 0;
  color: #17A2B8;
  margin-top: 0.25rem;
}

.bookings-view-deposit-content {
  flex: 1;
}

.bookings-view-deposit-title {
  font-size: 1rem;
  font-weight: 700;
  color: #0C5460;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.bookings-view-deposit-text {
  font-size: 0.9rem;
  color: #0C5460;
  margin: 0;
  line-height: 1.5;
}

.bookings-view-confirmation-note {
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Testimonial Section */
.bookings-view-testimonial-section {
  padding: 6rem 0;
  background: white;
}

.bookings-view-testimonial-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.bookings-view-testimonial-images {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.bookings-view-testimonial-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  background: #8B7355;
}

.bookings-view-testimonial-img-wrapper {
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.bookings-view-testimonial-img-wrapper:hover {
  transform: scale(1.05);
}

.bookings-view-img-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.bookings-view-testimonial-img-wrapper:hover .bookings-view-img-overlay {
  opacity: 1;
}

.bookings-view-img-overlay svg {
  color: white;
  width: 40px;
  height: 40px;
}

.bookings-view-testimonial-quote {
  font-size: 1.3rem;
  font-style: italic;
  color: #2D372D;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.bookings-view-testimonial-author {
  font-weight: 600;
  color: #8B7355;
  font-size: 1rem;
}

/* CTA Footer */
.bookings-view-cta-footer {
  position: relative;
  height: 50vh;
  min-height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.bookings-view-cta-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
}

.bookings-view-cta-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: linear-gradient(135deg, #2D372D 0%, #3D473D 100%);
}

.bookings-view-cta-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(45, 55, 45, 0.8);
  z-index: -1;
}

.bookings-view-cta-content {
  text-align: center;
  color: #F5E6D3;
  z-index: 1;
  max-width: 600px;
  padding: 0 2rem;
}

.bookings-view-cta-title {
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.bookings-view-cta-subtitle {
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  color: #FFFFFF;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.5);
}

.bookings-view-cta-btn {
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
}

.bookings-view-cta-btn:hover {
  background: linear-gradient(135deg, #A0845C, #B8926A);
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(139, 115, 85, 0.4);
}

/* Image Modal Styles */
.bookings-view-image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 2rem;
  backdrop-filter: blur(5px);
}

.bookings-view-modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.bookings-view-modal-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.bookings-view-modal-caption {
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.bookings-view-modal-close {
  position: absolute;
  top: -3rem;
  right: 0;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  backdrop-filter: blur(10px);
}

.bookings-view-modal-close:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.bookings-view-modal-close svg {
  width: 24px;
  height: 24px;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .bookings-view-booking-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .bookings-view-booking-summary {
    position: static;
  }
  
  .bookings-view-form-row {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .bookings-view-extras-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .bookings-view-page {
    margin-top: 4rem;
  }

  .bookings-view-hero-title {
    font-size: 2.5rem;
  }
  
  .bookings-view-booking-form-container {
    padding: 2rem;
  }
  
  .bookings-view-form-section {
    padding: 1.5rem;
  }
  
  .bookings-view-form-title {
    font-size: 2rem;
  }
  
  .bookings-view-extras-grid {
    grid-template-columns: 1fr;
  }
  
  .bookings-view-testimonial-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .bookings-view-container {
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .bookings-view-hero-title {
    font-size: 2rem;
  }
  
  .bookings-view-booking-form-container {
    padding: 1.5rem;
  }
  
  .bookings-view-form-title {
    font-size: 1.8rem;
  }
  
  .bookings-view-summary-card {
    padding: 1.5rem;
  }
  
  .bookings-view-cta-title {
    font-size: 2rem;
  }
  
  /* Modal responsive styles */
  .bookings-view-image-modal {
    padding: 1rem;
  }
  
  .bookings-view-modal-content {
    max-width: 95vw;
    max-height: 95vh;
  }
  
  .bookings-view-modal-image {
    max-height: 70vh;
  }
  
  .bookings-view-modal-caption {
    font-size: 1rem;
  }
  
  .bookings-view-modal-close {
    top: -2.5rem;
    width: 40px;
    height: 40px;
  }
  
  .bookings-view-modal-close svg {
    width: 20px;
    height: 20px;
  }
}

/* Availability Section Styles */
.bookings-view-availability-section {
  margin-top: 1.5rem;
  padding: 1.5rem;
  border-radius: 12px;
  background: #F8F9FA;
  border: 1px solid #E9ECEF;
}

.bookings-view-availability-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.bookings-view-availability-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2D372D;
  margin: 0;
}

.bookings-view-availability-refresh-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #8B7355;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.bookings-view-availability-refresh-btn:hover:not(:disabled) {
  background: #A0845C;
  transform: translateY(-1px);
}

.bookings-view-availability-refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.bookings-view-availability-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  text-align: center;
}

.bookings-view-availability-loading p {
  color: #6C757D;
  margin: 0;
}

.bookings-view-availability-available,
.bookings-view-availability-conflicts,
.bookings-view-availability-error {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
}

.bookings-view-availability-available {
  background: #D4EDDA;
  border: 1px solid #C3E6CB;
}

.bookings-view-availability-conflicts {
  background: #F8D7DA;
  border: 1px solid #F5C6CB;
}

.bookings-view-availability-error {
  background: #F8D7DA;
  border: 1px solid #F5C6CB;
}

.bookings-view-availability-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #28A745;
  color: white;
}

.bookings-view-availability-icon.conflict {
  background: #DC3545;
}

.bookings-view-availability-icon.error {
  background: #DC3545;
}

.bookings-view-availability-icon svg {
  width: 20px;
  height: 20px;
}

.bookings-view-availability-content {
  flex: 1;
}

.bookings-view-availability-status {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #155724;
}

.bookings-view-availability-status.conflict {
  color: #721C24;
}

.bookings-view-availability-status.error {
  color: #721C24;
}

.bookings-view-availability-message {
  color: #155724;
  margin: 0 0 1rem 0;
  line-height: 1.5;
}

.bookings-view-availability-conflicts .bookings-view-availability-message,
.bookings-view-availability-error .bookings-view-availability-message {
  color: #721C24;
}

.bookings-view-conflict-details {
  margin-top: 1rem;
}

.bookings-view-conflict-type {
  font-size: 0.95rem;
  font-weight: 600;
  color: #721C24;
  margin: 0 0 0.5rem 0;
}

.bookings-view-conflict-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  margin: 0.25rem 0;
  background: rgba(220, 53, 69, 0.1);
  border-radius: 6px;
  font-size: 0.9rem;
}

.bookings-view-conflict-date {
  color: #721C24;
  font-weight: 500;
}

.bookings-view-conflict-status {
  background: #DC3545;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: capitalize;
}

.bookings-view-conflict-addon {
  color: #721C24;
  font-weight: 500;
}

.bookings-view-spinner-small {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive availability styles */
@media (max-width: 768px) {
  .bookings-view-availability-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .bookings-view-availability-refresh-btn {
    align-self: stretch;
    justify-content: center;
  }
  
  .bookings-view-availability-available,
  .bookings-view-availability-conflicts,
  .bookings-view-availability-error {
    flex-direction: column;
    text-align: center;
  }
  
  .bookings-view-conflict-item {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>
