<template>
    <div class="profile-page">
      <!-- Navigation Bar -->
      <NavBar />
      
      <!-- Loading State -->
      <LoadingScreen v-if="isLoading" />
  
      <!-- Error State -->
      <div v-else-if="error" class="error-overlay">
        <div class="error-content">
          <div class="error-icon">⚠️</div>
          <h2 class="error-title">Unable to Load Profile</h2>
          <p class="error-message">{{ error }}</p>
          <button class="retry-btn" @click="loadProfileData">Try Again</button>
        </div>
      </div>
  
      <!-- Profile Content -->
      <div v-else>
        <!-- User Profile Header -->
        <section class="profile-header">
          <div class="profile-container">
            <div class="profile-header-content2">
              <div class="profile-info">
                <h1 class="profile-name">{{ user.fullname || 'Loading...' }}</h1>
                <p class="profile-email">{{ user.email || 'Loading...' }}</p>
                <span class="profile-role">{{ user.role || 'Member' }}</span>
              </div>
              <div class="profile-actions">
                <button class="edit-profile-btn" @click="showEditProfileModal = true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  Edit Profile
                </button>
                <button class="settings-btn" @click="showSettingsModal = true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                  Settings
                </button>
              </div>
            </div>
          </div>
        </section>
    
        <!-- Profile Info Panel -->
        <section class="profile-details">
          <div class="profile-container">
            <div class="profile-section-header">
              <h2 class="profile-section-title">Profile Information</h2>
              <div class="section-divider"></div>
            </div>
            <div class="details-grid">
              <div class="profile-detail-card1">
                <label class="detail-label1">Full Name</label>
                <div class="detail-value2">{{ user.fullname || 'Not provided' }}</div>
              </div>
              <div class="profile-detail-card1">
                <label class="detail-label1">Email Address</label>
                <div class="detail-value2">{{ user.email || 'Not provided' }}</div>
              </div>
              <div class="profile-detail-card1">
                <label class="detail-label1">Phone Number</label>
                <div class="detail-value2">{{ user.phoneNumber || 'Not provided' }}</div>
              </div>
              <div class="profile-detail-card1">
                <label class="detail-label1">Age</label>
                <div class="detail-value2">{{ user.age ? `${user.age} years` : 'Not provided' }}</div>
              </div>
              <div class="profile-detail-card1">
                <label class="detail-label1">Member Since</label>
                <div class="detail-value2">{{ formatDate(user.createdAt) }}</div>
              </div>
              <div class="profile-detail-card1">
                <label class="detail-label1">Account Type</label>
                <div class="detail-value2">{{ user.role || 'Member' }}</div>
              </div>
              <div class="profile-detail-card1">
                <label class="detail-label1">Emergency Contact</label>
                <div class="detail-value2">{{ user.emergencyContact || 'Not provided' }}</div>
              </div>
            </div>
          </div>
        </section>
    
        <!-- Uploaded Documents Section -->
        <section class="documents-section">
          <div class="profile-container">
            <div class="profile-section-header">
              <h2 class="profile-section-title">Uploaded Documents</h2>
              <div class="section-divider"></div>
            </div>
            
            <!-- Document Status Messages - Removed in favor of toast notifications -->
            <div v-if="documentsLoading" class="loading-state">
              <div class="loading-spinner-small"></div>
              <p>Loading documents...</p>
            </div>
            <div v-else-if="documents.length === 0" class="empty-state">
              <div class="empty-icon">📄</div>
              <p class="empty-text">No documents uploaded yet</p>
              <p class="empty-subtext">Upload your driver's license and other required documents</p>
              <button class="upload-docs-btn" @click="showUploadModal = true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17,8 12,3 7,8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                Upload Documents
              </button>
            </div>
            <div v-else class="documents-grid">
              <div 
                v-for="document in documents" 
                :key="document.id" 
                class="document-card"
              >
                <div class="document-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14,2 14,8 20,8"></polyline>
                  </svg>
                </div>
                <div class="document-info">
                  <h4 class="document-name">{{ document.name }}</h4>
                  <p class="document-type">{{ document.type }}</p>
                  <span class="document-size">{{ document.size }}</span>
                </div>
                <div class="document-actions">
                  <button 
                    v-if="document.canPreview" 
                    class="profile-action-btn preview-btn" 
                    @click="previewDocument(document)"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    Preview
                  </button>
                  <button class="profile-action-btn download-btn" @click="downloadDocument(document)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7,10 12,15 17,10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Download
                  </button>
                  <button 
                    class="profile-action-btn replace-btn" 
                    @click="replaceDocumentFile(document)"
                    :disabled="uploadLoading"
                  >
                    <span v-if="uploadLoading" class="loading-spinner-small"></span>
                    <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14,2 14,8 20,8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="17"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                    </svg>
                    {{ uploadLoading ? 'Replacing...' : 'Replace' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
    
        <!-- Recent Bookings Section - REDESIGNED -->
        <section class="bookings-section">
          <div class="profile-container">
            <div class="profile-section-header">
              <h2 class="profile-section-title">Recent Bookings</h2>
              <div class="section-divider"></div>
            </div>
            
            <div v-if="bookingsLoading" class="loading-state">
              <div class="loading-spinner-small"></div>
              <p>Loading your adventure bookings...</p>
            </div>
            
            <div v-else-if="bookingsError" class="error-state">
              <div class="error-icon">⚠️</div>
              <p class="error-text">{{ bookingsError }}</p>
              <button class="retry-btn" @click="loadBookings">Retry</button>
            </div>
            
            <div v-else-if="recentBookings.length === 0" class="empty-state">
              <div class="empty-icon">🏔️</div>
              <p class="empty-text">No adventures yet</p>
              <p class="empty-subtext">Ready to conquer the wild? Book your first 4x4 adventure today!</p>
              <button class="browse-vehicles-btn" @click="browseVehicles">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M7 17L17 7"></path>
                  <path d="M7 7h10v10"></path>
                </svg>
                Explore Vehicles
              </button>
            </div>
            
            <div v-else class="bookings-grid">
              <div 
                v-for="booking in recentBookings" 
                :key="booking.id" 
                class="booking-card"
              >
                <div class="booking-card-header">
                  <div class="vehicle-image-container">
                    <img 
                      :src="booking.vehicleImage || '/placeholder.svg?height=120&width=200&text=4x4+Vehicle'" 
                      :alt="booking.vehicleName" 
                      class="vehicle-image"
                    />
                    <div class="vehicle-badge">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10V6c0-2-2-4-4-4H4c-2 0-4 2-4 4v10c0 .6.4 1 1 1h2"></path>
                        <circle cx="7" cy="17" r="2"></circle>
                        <path d="M9 17h6"></path>
                        <circle cx="17" cy="17" r="2"></circle>
                      </svg>
                      4x4
                    </div>
                  </div>
                  <div class="booking-status-container">
                    <span class="booking-status-badge" :class="booking.status.toLowerCase()">
                      {{ booking.status }}
                    </span>
                  </div>
                </div>
                
                <div class="booking-card-content">
                  <h3 class="vehicle-title">{{ booking.vehicleName || 'Rugged 4x4 Adventure' }}</h3>
                  
                  <div class="booking-details">
                    <div class="booking-detail-item">
                      <div class="detail-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                      </div>
                      <div class="detail-content">
                        <span class="detail-label1">Booking Date</span>
                        <span class="detail-value">{{ formatDate(booking.startDate) }}</span>
                      </div>
                    </div>
                    
                    <div class="booking-detail-item">
                      <div class="detail-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12,6 12,12 16,14"></polyline>
                        </svg>
                      </div>
                      <div class="detail-content">
                        <span class="detail-label1">Duration</span>
                        <span class="detail-value">{{ calculateDuration(booking.startDate, booking.endDate) }}</span>
                      </div>
                    </div>
                    
                    <div class="booking-detail-item">
                      <div class="detail-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <line x1="12" y1="1" x2="12" y2="23"></line>
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                      </div>
                      <div class="detail-content">
                        <span class="detail-label1">Total Cost</span>
                        <span class="detail-value">R{{ booking.totalPrice || '2,500' }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="booking-card-footer">
                  <button class="view-details-btn" @click="viewBookingDetails(booking)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    View Details
                  </button>
                </div>
              </div>
            </div>
            
            <div v-if="recentBookings.length > 0" class="bookings-footer">
              <button class="view-all-bookings-btn" @click="viewAllBookings">
                View All Adventures
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M7 17L17 7"></path>
                  <path d="M7 7h10v10"></path>
                </svg>
              </button>
            </div>
          </div>
        </section>
    
        <!-- CTA Footer -->
        <section class="cta-footer">
          <div class="profile-container">
            <div class="cta-content">
              <h2 class="cta-title">Ready for Your Next Adventure?</h2>
              <p class="cta-description">
                Discover our fleet of ruggedly modified 4x4 vehicles and embark on unforgettable off-road experiences across South Africa's most challenging terrains.
              </p>
              <button class="cta-button" @click="browseVehicles">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M7 17L17 7"></path>
                  <path d="M7 7h10v10"></path>
                </svg>
                Explore Available Vehicles
              </button>
            </div>
          </div>
        </section>
      </div>
      
      <!-- Footer -->
      <FooterComp />
      
      <!-- Toast Notifications -->
      <ToastNotif ref="toastNotif" />
  
      <!-- MODALS -->
      
      <!-- View Booking Details Modal -->
      <teleport to="body">
        <div v-if="showBookingDetailsModal" class="modal-overlay" @click="closeModal">
          <div class="modal-container booking-details-modal" @click.stop>
            <div class="modal-header">
              <h2 class="modal-title">Booking Details</h2>
              <button class="modal-close-btn" @click="closeModal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div class="modal-content1">
              <div class="booking-details-content">
                <div class="booking-hero">
                  <img 
                    :src="selectedBooking?.vehicleImage || '/placeholder.svg?height=200&width=350&text=Adventure+Vehicle'" 
                    :alt="selectedBooking?.vehicleName" 
                    class="booking-hero-image"
                  />
                  <div class="booking-hero-info">
                    <h3 class="booking-vehicle-name">{{ selectedBooking?.vehicleName || 'Rugged 4x4 Jimny' }}</h3>
                    <span class="booking-hero-status" :class="selectedBooking?.status?.toLowerCase()">
                      {{ selectedBooking?.status || 'Confirmed' }}
                    </span>
                  </div>
                </div>
                
                <div class="booking-info-grid">
                  <div class="booking-info-card">
                    <div class="info-card-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                    <div class="info-card-content">
                      <h4 class="info-card-title">Pickup Date</h4>
                      <p class="info-card-value">{{ formatDate(selectedBooking?.startDate) || 'March 15, 2024' }}</p>
                      <p class="info-card-detail">09:00 AM</p>
                    </div>
                  </div>
                  
                  <div class="booking-info-card">
                    <div class="info-card-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                    <div class="info-card-content">
                      <h4 class="info-card-title">Return Date</h4>
                      <p class="info-card-value">{{ formatDate(selectedBooking?.endDate) || 'March 18, 2024' }}</p>
                      <p class="info-card-detail">18:00 PM</p>
                    </div>
                  </div>
                  
                  <div class="booking-info-card">
                    <div class="info-card-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12,6 12,12 16,14"></polyline>
                      </svg>
                    </div>
                    <div class="info-card-content">
                      <h4 class="info-card-title">Duration</h4>
                      <p class="info-card-value">{{ calculateDuration(selectedBooking?.startDate, selectedBooking?.endDate) || '3 Days' }}</p>
                      
                    </div>
                  </div>
                  
                  <div class="booking-info-card">
                    <div class="info-card-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                    </div>
                    <div class="info-card-content">
                      <h4 class="info-card-title">Total Cost</h4>
                      <p class="info-card-value">R{{ selectedBooking?.totalPrice || '2,850' }}</p>
                      <p class="info-card-detail">Including insurance</p>
                    </div>
                  </div>
                </div>
                
                <div class="booking-extras">
                  <h4 class="extras-title">Included Equipment</h4>
                  <div class="extras-list">
                    <template v-if="selectedBooking?.extras && selectedBooking.extras.length > 0">
                      <div v-for="extra in selectedBooking.extras" :key="extra.id" class="extra-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polyline points="20,6 9,17 4,12"></polyline>
                        </svg>
                        {{ extra.name }}
                      </div>
                    </template>
                    <div v-else class="extra-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20,6 9,17 4,12"></polyline>
                      </svg>
                      No extras included
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="modal-footer">
              <button class="modal-btn secondary" @click="closeModal">Close</button>
              <button class="modal-btn primary" @click="contactSupport">Contact Support</button>
            </div>
          </div>
        </div>
      </teleport>
  
      <!-- Upload Documents Modal -->
      <teleport to="body">
        <div v-if="showUploadModal" class="modal-overlay" @click="closeModal">
          <div class="modal-container upload-modal" @click.stop>
            <div class="modal-header">
              <h2 class="modal-title">Upload Documents</h2>
              <button class="modal-close-btn" @click="closeModal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div class="modal-content1">
              <div class="upload-content">
                <p class="upload-description">
                  Please upload the required documents to complete your profile. All documents must be clear, valid, and in PDF or image format.
                </p>
                
                <!-- Upload Status Messages - Removed in favor of toast notifications -->
                
                <div class="upload-sections">
                  <div class="upload-section">
                    <h4 class="upload-section-title">Driver's License</h4>
                    <div 
                      class="upload-area" 
                      :class="{ 'drag-over': dragOver }"
                      @dragover="handleDragOver"
                      @dragleave="handleDragLeave"
                      @drop="handleDrop($event, 'driversLicense')"
                    >
                      <div v-if="!selectedFiles.driversLicense" class="upload-content">
                        <div class="upload-icon">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17,8 12,3 7,8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                          </svg>
                        </div>
                        <p class="upload-text">Drop your driver's license here or <label class="upload-link" for="drivers-license-input">browse files</label></p>
                        <p class="upload-hint">PDF, JPG, PNG up to 10MB</p>
                        <input 
                          type="file" 
                          id="drivers-license-input"
                          class="file-input" 
                          accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx,.txt"
                          @change="handleFileSelect($event, 'driversLicense')"
                        />
                      </div>
                      <div v-else class="selected-file">
                        <div class="file-info">
                          <div class="file-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14,2 14,8 20,8"></polyline>
                            </svg>
                          </div>
                          <div class="file-details">
                            <p class="file-name">{{ selectedFiles.driversLicense.name }}</p>
                            <p class="file-size">{{ formatFileSize(selectedFiles.driversLicense.size) }}</p>
                          </div>
                        </div>
                        <button class="remove-file-btn" @click="removeSelectedFile('driversLicense')">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div class="upload-section">
                    <h4 class="upload-section-title">Identity Document</h4>
                    <div 
                      class="upload-area" 
                      :class="{ 'drag-over': dragOver }"
                      @dragover="handleDragOver"
                      @dragleave="handleDragLeave"
                      @drop="handleDrop($event, 'identityDocument')"
                    >
                      <div v-if="!selectedFiles.identityDocument" class="upload-content">
                        <div class="upload-icon">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17,8 12,3 7,8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                          </svg>
                        </div>
                        <p class="upload-text">Drop your ID document here or <label class="upload-link" for="identity-document-input">browse files</label></p>
                        <p class="upload-hint">PDF, JPG, PNG up to 10MB</p>
                        <input 
                          type="file" 
                          id="identity-document-input"
                          class="file-input" 
                          accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx,.txt"
                          @change="handleFileSelect($event, 'identityDocument')"
                        />
                      </div>
                      <div v-else class="selected-file">
                        <div class="file-info">
                          <div class="file-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14,2 14,8 20,8"></polyline>
                            </svg>
                          </div>
                          <div class="file-details">
                            <p class="file-name">{{ selectedFiles.identityDocument.name }}</p>
                            <p class="file-size">{{ formatFileSize(selectedFiles.identityDocument.size) }}</p>
                          </div>
                        </div>
                        <button class="remove-file-btn" @click="removeSelectedFile('identityDocument')">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div class="upload-section">
                    <h4 class="upload-section-title">Other Documents</h4>
                    <div 
                      class="upload-area" 
                      :class="{ 'drag-over': dragOver }"
                      @dragover="handleDragOver"
                      @dragleave="handleDragLeave"
                      @drop="handleDrop($event, 'otherDocuments')"
                    >
                      <div v-if="selectedFiles.otherDocuments.length === 0" class="upload-content">
                        <div class="upload-icon">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17,8 12,3 7,8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                          </svg>
                        </div>
                        <p class="upload-text">Drop other documents here or <label class="upload-link" for="other-documents-input">browse files</label></p>
                        <p class="upload-hint">Utility bill, bank statement, etc. (PDF, JPG, PNG up to 10MB)</p>
                        <input 
                          type="file" 
                          id="other-documents-input"
                          class="file-input" 
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx,.txt"
                          @change="handleMultipleFileSelect"
                        />
                      </div>
                      <div v-else class="selected-files">
                        <div v-for="(file, index) in selectedFiles.otherDocuments" :key="index" class="selected-file">
                          <div class="file-info">
                            <div class="file-icon">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14,2 14,8 20,8"></polyline>
                              </svg>
                            </div>
                            <div class="file-details">
                              <p class="file-name">{{ file.name }}</p>
                              <p class="file-size">{{ formatFileSize(file.size) }}</p>
                            </div>
                          </div>
                          <button class="remove-file-btn" @click="removeSelectedFile('otherDocuments', index)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="upload-notes">
                  <h4 class="notes-title">Important Notes:</h4>
                  <ul class="notes-list">
                    <li>All documents must be valid and not expired</li>
                    <li>Images should be clear and all text must be readable</li>
                    <li>Documents will be verified within 24-48 hours</li>
                    <li>You'll receive an email confirmation once approved</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div class="modal-footer">
              <button class="modal-btn secondary" @click="closeModal">Cancel</button>
              <button 
                class="modal-btn primary" 
                @click="uploadDocuments"
                :disabled="uploadLoading"
              >
                <span v-if="uploadLoading" class="loading-spinner-small"></span>
                {{ uploadLoading ? 'Uploading...' : 'Upload Documents' }}
              </button>
            </div>
          </div>
        </div>
      </teleport>
  
      <!-- Edit Profile Modal -->
      <teleport to="body">
        <div v-if="showEditProfileModal" class="modal-overlay" @click="closeModal">
          <div class="modal-container edit-profile-modal" @click.stop>
            <div class="modal-header">
              <h2 class="modal-title">Edit Profile</h2>
              <button class="modal-close-btn" @click="closeModal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div class="modal-content1">
              <div class="edit-profile-content">
                <form class="profile-form" @submit.prevent="saveProfileChanges">
                  <div class="form-section">
                    <h4 class="form-section-title">Personal Information</h4>
                    
                    <div class="form-row">
                      <div class="form-group">
                        <label class="form-label">Full Name</label>
                        <input 
                          type="text" 
                          class="form-input" 
                          v-model="editForm.fullname"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div class="form-group">
                        <label class="form-label">Email Address</label>
                        <input 
                          type="email" 
                          class="form-input" 
                          v-model="editForm.email"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    
                    <div class="form-row">
                      <div class="form-group">
                        <label class="form-label">Phone Number</label>
                        <input 
                          type="tel" 
                          class="form-input" 
                          v-model="editForm.phoneNumber"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      
                      <div class="form-group">
                        <label class="form-label">Age</label>
                        <input 
                          type="number" 
                          class="form-input" 
                          v-model="editForm.age"
                          placeholder="Enter your age"
                          min="18"
                          max="100"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div class="form-section">
                    <h4 class="form-section-title">Contact Preferences</h4>
                    
                    <!-- <div class="form-group">
                      <label class="form-label">Experience Level</label>
                      <select class="form-select">
                        <option value="beginner">Beginner - New to off-roading</option>
                        <option value="intermediate" selected>Intermediate - Some experience</option>
                        <option value="advanced">Advanced - Experienced adventurer</option>
                        <option value="expert">Expert - Professional level</option>
                      </select>
                    </div> -->
                    
                    <!-- <div class="form-group">
                      <label class="form-label">Preferred Terrain</label>
                      <div class="checkbox-group">
                        <label class="checkbox-item">
                          <input type="checkbox" checked />
                          <span class="checkbox-text">Mountain Trails</span>
                        </label>
                        <label class="checkbox-item">
                          <input type="checkbox" />
                          <span class="checkbox-text">Desert Adventures</span>
                        </label>
                        <label class="checkbox-item">
                          <input type="checkbox" checked />
                          <span class="checkbox-text">Forest Expeditions</span>
                        </label>
                        <label class="checkbox-item">
                          <input type="checkbox" />
                          <span class="checkbox-text">Coastal Routes</span>
                        </label>
                      </div>
                    </div> -->
                    
                    <div class="form-group">
                      <label class="form-label">Emergency Contact</label>
                      <input 
                        type="text" 
                        class="form-input" 
                        v-model="editForm.emergencyContact"
                        placeholder="Name and phone number"
                      />
                    </div>
                  </div>
                  
                </form>
              </div>
            </div>
            
            <div class="modal-footer">
              <button class="modal-btn secondary" @click="closeModal" :disabled="profileUpdateLoading">Cancel</button>
              <button class="modal-btn primary" @click="saveProfileChanges" :disabled="profileUpdateLoading">
                <span v-if="profileUpdateLoading" class="loading-spinner-small"></span>
                {{ profileUpdateLoading ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </div>
        </div>
      </teleport>
      
      <!-- Settings Modal -->
      <teleport to="body">
        <div v-if="showSettingsModal" class="modal-overlay" @click="closeModal">
          <div class="modal-container settings-modal" @click.stop>
            <div class="modal-header">
              <h2 class="modal-title">Settings</h2>
              <button class="modal-close-btn" @click="closeModal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div class="modal-content1">
              <div class="settings-content">
                <div class="settings-section">
                  <h4 class="settings-section-title">Notification Preferences</h4>
                  <p class="settings-description">Choose how you'd like to receive updates and notifications from RentARyde.</p>
                  
                  <div class="checkbox-group">
                    <label class="checkbox-item">
                      <input 
                        type="checkbox" 
                        v-model="userSettings.notifications.emailNotificationsForBookings"
                      />
                      <span class="checkbox-text">Email notifications for bookings</span>
                    </label>
                    <!-- <label class="checkbox-item">
                      <input 
                        type="checkbox" 
                        v-model="userSettings.notifications.smsReminders"
                      />
                      <span class="checkbox-text">SMS reminders</span>
                    </label> -->
                    <label class="checkbox-item">
                      <input 
                        type="checkbox" 
                        v-model="userSettings.notifications.marketingUpdates"
                      />
                      <span class="checkbox-text">Marketing updates</span>
                    </label>
                  </div>
                </div>
                

              </div>
            </div>
            
            <div class="modal-footer">
              <button class="modal-btn secondary" @click="closeModal" :disabled="settingsLoading">Cancel</button>
              <button class="modal-btn primary" @click="saveSettings" :disabled="settingsLoading">
                <span v-if="settingsLoading" class="loading-spinner-small"></span>
                {{ settingsLoading ? 'Saving...' : 'Save Settings' }}
              </button>
            </div>
          </div>
        </div>
      </teleport>
      
      <!-- Image Preview Modal -->
      <teleport to="body">
        <div v-if="showImagePreviewModal" class="modal-overlay" @click="closeModal">
          <div class="modal-container image-preview-modal" @click.stop>
            <div class="modal-header">
              <h2 class="modal-title">Image Preview</h2>
              <button class="modal-close-btn" @click="closeModal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div class="modal-content1">
              <div v-if="selectedImage" class="image-preview-content">
                <div v-if="!selectedImage.previewUrl && !selectedImage.url" class="image-error">
                  <div class="error-icon">⚠️</div>
                  <p>Image URL not available</p>
                  <p class="error-details">Debug: {{ JSON.stringify(selectedImage) }}</p>
                  <p v-if="selectedImage.originalDoc" class="error-details">
                    Original Doc: {{ JSON.stringify(selectedImage.originalDoc) }}
                  </p>
                </div>
                <img 
                  v-else
                  :src="selectedImage.previewUrl || selectedImage.url" 
                  :alt="selectedImage.name"
                  class="preview-image"
                  @error="handleImageError"
                  @load="handleImageLoad"
                />
                <div class="image-info">
                  <h3 class="image-name">{{ selectedImage.name }}</h3>
                  <p class="image-details">
                    <span class="image-type">{{ selectedImage.type }}</span>
                    <span class="image-size">{{ selectedImage.size }}</span>
                  </p>
                  
                </div>
              </div>
            </div>
            
            <div class="modal-footer">
              <button class="modal-btn secondary" @click="closeModal">Close</button>
              <button class="modal-btn primary" @click="downloadDocument(selectedImage)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7,10 12,15 17,10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download
              </button>
            </div>
          </div>
        </div>
      </teleport>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import NavBar from '@/components/NavBar.vue'
import FooterComp from '@/components/FooterComp.vue'
import ToastNotif from '@/components/ToastNotif.vue'
import LoadingScreen from '@/components/LoadingScreen.vue'
import { userService } from '@/services/userService.js'
import { adminService } from '@/services/adminService.js'
import { 
  uploadDocument, 
  uploadMultipleDocuments, 
  getUserDocuments, 
  replaceDocument,
  validateFile, 
  formatFileSize 
} from '@/services/documentService.js'
  
  const router = useRouter()
  
  // Toast notification ref
  const toastNotif = ref(null)
  
  // Reactive data
  const user = ref({})
  const documents = ref([])
  const recentBookings = ref([])
  const isLoading = ref(true)
  const error = ref('')
  const documentsLoading = ref(false)
  const bookingsLoading = ref(false)
  const bookingsError = ref('')
  
  // Modal states
  const showBookingDetailsModal = ref(false)
  const showUploadModal = ref(false)
  const showEditProfileModal = ref(false)
  const showSettingsModal = ref(false)
  const showImagePreviewModal = ref(false)
  const selectedBooking = ref(null)
  const selectedImage = ref(null)
  
  // Computed property to check if any modal is open
  const isAnyModalOpen = computed(() => {
    return showBookingDetailsModal.value || 
           showUploadModal.value || 
           showEditProfileModal.value || 
           showSettingsModal.value || 
           showImagePreviewModal.value
  })
  
  // Scroll locking functions
  const lockBodyScroll = () => {
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = '0px' // Prevent layout shift
  }
  
  const unlockBodyScroll = () => {
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  }
  
  // Watch for modal state changes to lock/unlock scroll
  watch(isAnyModalOpen, (isOpen) => {
    if (isOpen) {
      lockBodyScroll()
    } else {
      unlockBodyScroll()
    }
  })
  
  // Document upload states
  const uploadLoading = ref(false)
  const selectedFiles = ref({
    driversLicense: null,
    identityDocument: null,
    otherDocuments: []
  })
  const dragOver = ref(false)
  
  // Edit profile form data
  const editForm = ref({
    fullname: '',
    email: '',
    age: '',
    phoneNumber: '',
    emergencyContact: ''
  })
  
  // User settings data
  const userSettings = ref({
    notifications: {
      emailNotificationsForBookings: false,
      smsReminders: false,
      marketingUpdates: false
    }
  })
  
  // Initialize settings immediately to prevent undefined errors
  const initializeSettings = () => {
    if (!userSettings.value.notifications) {
      userSettings.value.notifications = {
        emailNotificationsForBookings: false,
        smsReminders: false,
        marketingUpdates: false
      }
    }
  }
  
  // Loading states for profile and settings
  const profileUpdateLoading = ref(false)
  const settingsLoading = ref(false)
  
  // Methods
  const loadProfileData = async () => {
    isLoading.value = true
    error.value = ''
    
    try {
      const auth = getAuth()
      const currentUser = auth.currentUser
      
      if (!currentUser) {
        router.push('/login')
        return
      }
      
      // Initialize settings to prevent undefined errors
      initializeSettings()
      
      // Get token for API calls
      const token = await currentUser.getIdToken()
      
      // Fetch user data from backend
      const userData = await userService.getUserById(currentUser.uid, token)
      user.value = userData
      
      // Initialize edit form with current user data
      editForm.value = {
        fullname: userData.fullname || '',
        email: userData.email || '',
        age: userData.age || '',
        phoneNumber: userData.phoneNumber || '',
        emergencyContact: userData.emergencyContact || ''
      }
      
      // Load user settings
      await loadUserSettings()
      
      // Load bookings
      await loadBookings()
      
      // Load documents (placeholder for now)
      loadDocuments()
      
      // Show success toast for profile load
      toastNotif.value?.showSuccess(
        'Profile Loaded Successfully!',
        `Welcome back, ${userData.fullname || 'Adventurer'}!`,
        4000
      )
      
    } catch (err) {
      console.error('Error loading profile data:', err)
      error.value = err.message || 'Failed to load profile data. Please try again.'
      
      // Show error toast
      toastNotif.value?.showError(
        'Profile Load Failed',
        err.message || 'Failed to load profile data. Please try again.',
        6000
      )
    } finally {
      isLoading.value = false
    }
  }
  
  const loadBookings = async () => {
    bookingsLoading.value = true
    bookingsError.value = ''
    
    try {
      const auth = getAuth()
      const currentUser = auth.currentUser
      const token = await currentUser.getIdToken()
      
      // Try to fetch user bookings from user endpoint
      try {
        const bookings = await userService.getUserBookings(currentUser.uid, token)
        
        // Transform bookings for display with vehicle details
        const transformedBookings = []
        
        for (const booking of bookings.slice(0, 4)) {
          try {
            // Fetch vehicle details using adminService
            const vehicleId = booking.vehicleId || booking.vehicle_id || booking.vehicle
            const vehicleDetails = await adminService.fetchVehicleById(vehicleId, token)
            
            // Fetch addon details for each extra
            const extrasWithNames = []
            if (booking.extras && booking.extras.length > 0) {
              for (const extraId of booking.extras) {
                try {
                  const addonDetails = await adminService.fetchAddonById(extraId, token)
                  extrasWithNames.push({
                    id: extraId,
                    name: addonDetails.name || addonDetails.title || 'Extra'
                  })
                } catch (addonError) {
                  // If addon fetch fails, use the ID as fallback
                  extrasWithNames.push({
                    id: extraId,
                    name: `Extra ID: ${extraId}`
                  })
                }
              }
            }
            
            const transformedBooking = {
              id: booking.id,
              vehicleName: vehicleDetails.make && vehicleDetails.model 
                ? `${vehicleDetails.make} ${vehicleDetails.model}`
                : vehicleDetails.name || vehicleDetails.title || vehicleDetails.model || 'Vehicle',
              startDate: booking.startDate,
              endDate: booking.endDate,
              extras: extrasWithNames,
              status: booking.status || 'pending',
              vehicleImage: vehicleDetails.image || vehicleDetails.imageUrl || vehicleDetails.photo || '/placeholder.svg?height=60&width=80&text=Vehicle',
              totalPrice: booking.totalPrice
            }
            transformedBookings.push(transformedBooking)
          } catch (vehicleError) {
            // Fallback booking with basic info
            const fallbackBooking = {
              id: booking.id,
              vehicleName: 'Vehicle',
              startDate: booking.startDate,
              endDate: booking.endDate,
              extras: booking.extras ? booking.extras.map(extraId => ({
                id: extraId,
                name: `Extra ID: ${extraId}`
              })) : [],
              status: booking.status || 'pending',
              vehicleImage: '/placeholder.svg?height=60&width=80&text=Vehicle',
              totalPrice: booking.totalPrice
            }
            transformedBookings.push(fallbackBooking)
          }
        }
        
        recentBookings.value = transformedBookings
        
        
        
      } catch (bookingError) {
        // Try alternative approach - check if user has any bookings in their profile
        // For now, we'll show an empty state with helpful messaging
        recentBookings.value = []
      }
      
    } catch (err) {
      recentBookings.value = []
      bookingsError.value = 'Unable to load bookings at this time.'
      
      // Show warning toast
      toastNotif.value?.showWarning(
        'Bookings Unavailable',
        'Unable to load your recent bookings at this time.',
        5000
      )
    } finally {
      bookingsLoading.value = false
    }
  }
  
  const loadDocuments = async () => {
    documentsLoading.value = true
    try {
      const auth = getAuth()
      const currentUser = auth.currentUser
      
      const userDocuments = await getUserDocuments(currentUser.uid)
      
      // Ensure userDocuments is an array before calling map
      if (!Array.isArray(userDocuments)) {
        console.warn('getUserDocuments returned non-array:', userDocuments)
        documents.value = []
        return
      }
      
      // Transform documents and add preview capability for image files
      documents.value = userDocuments.map(doc => {
        const isImage = doc.mimeType && doc.mimeType.startsWith('image/') || 
                       doc.fileName && /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(doc.fileName)
        
        // Try to find the correct URL property
        const imageUrl = doc.fileUrl || doc.url || doc.downloadUrl || doc.signedUrl || doc.previewUrl
        
        return {
          id: doc.id || doc.fileName,
          name: doc.fileName || doc.name,
          type: doc.fileType || 'Document',
          size: formatFileSize(doc.fileSize || 0),
          url: imageUrl,
          canPreview: isImage,
          previewUrl: isImage ? imageUrl : null,
          // Store original document for debugging
          originalDoc: doc
        }
      })
    } catch (err) {
      console.error('Error loading documents:', err)
      documents.value = []
    } finally {
      documentsLoading.value = false
    }
  }
  
  const loadUserSettings = async () => {
    settingsLoading.value = true
    try {
      const auth = getAuth()
      const currentUser = auth.currentUser
      const token = await currentUser.getIdToken()
      
      const settings = await userService.getUserSettings(currentUser.uid, token)
      
      // Ensure all required objects exist with default values
      userSettings.value = {
        notifications: {
          emailNotificationsForBookings: false,
          smsReminders: false,
          marketingUpdates: false,
          ...settings?.notifications
        }
      }
      
      
    } catch (err) {
      console.error('Error loading user settings:', err)
      // Keep default settings if loading fails
      toastNotif.value?.showWarning(
        'Settings Unavailable',
        'Using default settings. Some preferences may not be saved.',
        5000
      )
    } finally {
      settingsLoading.value = false
    }
  }
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Not available'
    
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch (err) {
      return 'Invalid date'
    }
  }
  
  const calculateDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return 'Duration unknown'
    
    try {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const diffTime = Math.abs(end - start)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return `${diffDays} day${diffDays !== 1 ? 's' : ''}`
    } catch (err) {
      return 'Duration unknown'
    }
  }
  
//   const editProfile = () => {
//     // Placeholder for edit profile functionality
//     alert('Edit profile functionality coming soon!')
//   }
  
//   const uploadDocuments = () => {
//     // Placeholder for document upload functionality
//     alert('Document upload functionality coming soon!')
//   }
  
  const downloadDocument = (document) => {
    if (document.url) {
      window.open(document.url, '_blank')
      
      // Show info toast for download
      toastNotif.value?.showInfo(
        'Download Started',
        `${document.name} is being downloaded.`,
        3000
      )
    } else {
      // Show warning toast for unavailable download
      toastNotif.value?.showWarning(
        'Download Unavailable',
        `${document.name} cannot be downloaded at this time.`,
        4000
      )
    }
  }
  
  const handleFileSelect = (event, fileType) => {
    const file = event.target.files[0]
    if (file) {
      try {
        validateFile(file)
        selectedFiles.value[fileType] = file
        
        // Show success toast for file selection
        toastNotif.value?.showSuccess(
          'File Selected',
          `${file.name} has been selected for upload.`,
          3000
        )
      } catch (err) {
        event.target.value = ''
        
        // Show error toast for invalid file
        toastNotif.value?.showError(
          'Invalid File',
          err.message,
          5000
        )
      }
    }
  }
  
  const handleMultipleFileSelect = (event) => {
    const files = Array.from(event.target.files)
    const validFiles = []
    const invalidFiles = []
    
    files.forEach(file => {
      try {
        validateFile(file)
        validFiles.push(file)
      } catch (err) {
        invalidFiles.push({ name: file.name, error: err.message })
      }
    })
    
    selectedFiles.value.otherDocuments = validFiles
    
    // Show appropriate toasts
    if (validFiles.length > 0) {
      toastNotif.value?.showSuccess(
        'Files Selected',
        `${validFiles.length} file(s) selected for upload.`,
        3000
      )
    }
    
    if (invalidFiles.length > 0) {
      toastNotif.value?.showWarning(
        'Some Files Invalid',
        `${invalidFiles.length} file(s) were rejected due to format or size restrictions.`,
        5000
      )
    }
  }
  
  const handleDragOver = (event) => {
    event.preventDefault()
    dragOver.value = true
  }
  
  const handleDragLeave = (event) => {
    event.preventDefault()
    dragOver.value = false
  }
  
  const handleDrop = (event, fileType) => {
    event.preventDefault()
    dragOver.value = false
    
    const files = Array.from(event.dataTransfer.files)
    if (files.length > 0) {
      const file = files[0]
      try {
        validateFile(file)
        selectedFiles.value[fileType] = file
        
        // Show success toast for dropped file
        toastNotif.value?.showSuccess(
          'File Dropped Successfully',
          `${file.name} has been added for upload.`,
          3000
        )
      } catch (err) {
        // Show error toast for invalid dropped file
        toastNotif.value?.showError(
          'Invalid Dropped File',
          err.message,
          5000
        )
      }
    }
  }
  
  const uploadDocuments = async () => {
    uploadLoading.value = true
    
    try {
      const auth = getAuth()
      const currentUser = auth.currentUser
      
      if (!currentUser) {
        throw new Error('User not authenticated')
      }
      
      const uploadPromises = []
      
      // Upload driver's license
      if (selectedFiles.value.driversLicense) {
        uploadPromises.push(
          uploadDocument(
            currentUser.uid, 
            selectedFiles.value.driversLicense, 
            'drivers-license'
          )
        )
      }
      
      // Upload identity document
      if (selectedFiles.value.identityDocument) {
        uploadPromises.push(
          uploadDocument(
            currentUser.uid, 
            selectedFiles.value.identityDocument, 
            'identity-document'
          )
        )
      }
      
      // Upload other documents
      if (selectedFiles.value.otherDocuments.length > 0) {
        uploadPromises.push(
          uploadMultipleDocuments(
            currentUser.uid, 
            selectedFiles.value.otherDocuments, 
            'other-documents'
          )
        )
      }
      
      if (uploadPromises.length === 0) {
        throw new Error('Please select at least one document to upload')
      }
      
      await Promise.all(uploadPromises)
      
      // Show success toast
      toastNotif.value?.showSuccess(
        'Documents Uploaded Successfully!',
        'Your documents have been uploaded and are being processed.',
        5000
      )
      
      // Reset form
      selectedFiles.value = {
        driversLicense: null,
        identityDocument: null,
        otherDocuments: []
      }
      
      // Reload documents
      await loadDocuments()
      
      // Close modal after a short delay
      setTimeout(() => {
        closeModal()
      }, 2000)
      
    } catch (err) {
      console.error('Error uploading documents:', err)
      
      // Show error toast
      toastNotif.value?.showError(
        'Upload Failed',
        err.message || 'Failed to upload documents. Please try again.',
        6000
      )
    } finally {
      uploadLoading.value = false
    }
  }
  
  const removeSelectedFile = (fileType, index = null) => {
    let removedFileName = ''
    
    if (index !== null) {
      removedFileName = selectedFiles.value.otherDocuments[index].name
      selectedFiles.value.otherDocuments.splice(index, 1)
    } else {
      removedFileName = selectedFiles.value[fileType]?.name || 'File'
      selectedFiles.value[fileType] = null
    }
    
    // Show info toast for file removal
    toastNotif.value?.showInfo(
      'File Removed',
      `${removedFileName} has been removed from the upload queue.`,
      3000
    )
  }
  
  const replaceDocumentFile = async (docItem) => {
    try {
      // Create a file input element
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.pdf,.jpg,.jpeg,.png,.gif,.doc,.docx,.txt'
      
      input.onchange = async (event) => {
        const file = event.target.files[0]
        if (!file) return
        
        try {
          // Validate the file
          validateFile(file)
          
          const auth = getAuth()
          const currentUser = auth.currentUser
          
          if (!currentUser) {
            throw new Error('User not authenticated')
          }
          
          // Show loading state
          uploadLoading.value = true
          
          // Replace the document
          await replaceDocument(
            currentUser.uid,
            docItem.name,
            file,
            docItem.type.toLowerCase()
          )
          
          // Reload documents
          await loadDocuments()
          
          // Show success toast
          toastNotif.value?.showSuccess(
            'Document Replaced Successfully!',
            `${docItem.name} has been replaced successfully.`,
            4000
          )
          
        } catch (err) {
          console.error('Error replacing document:', err)
          
          // Show error toast
          toastNotif.value?.showError(
            'Document Replacement Failed',
            err.message || 'Failed to replace document. Please try again.',
            6000
          )
        } finally {
          uploadLoading.value = false
        }
      }
      
      input.click()
          } catch (err) {
        console.error('Error setting up file replacement:', err)
        
        // Show error toast
        toastNotif.value?.showError(
          'File Selector Error',
          'Failed to open file selector. Please try again.',
          4000
        )
      }
  }
  
//   const replaceDocument = (document) => {
//     // Placeholder for document replacement functionality
//     alert(`Replacing ${document.name}...`)
//   }
  
  const viewBookingDetails = (booking) => {
    selectedBooking.value = booking
    showBookingDetailsModal.value = true
  }
  
  const viewAllBookings = () => {
    // Show info toast for navigation
    toastNotif.value?.showInfo(
      'Navigating to Bookings',
      'Taking you to your complete booking history.',
      2000
    )
    
    setTimeout(() => {
      router.push('/bookings')
    }, 500)
  }
  
  const browseVehicles = () => {
    // Show info toast for navigation
    toastNotif.value?.showInfo(
      'Exploring Vehicles',
      'Taking you to our available 4x4 vehicles.',
      2000
    )
    
    setTimeout(() => {
      router.push('/vehicles')
    }, 500)
  }
  
  const closeModal = () => {
    showBookingDetailsModal.value = false
    showUploadModal.value = false
    showEditProfileModal.value = false
    showSettingsModal.value = false
    showImagePreviewModal.value = false
    selectedBooking.value = null
    selectedImage.value = null
  }
  
  const previewDocument = (document) => {
    selectedImage.value = document
    showImagePreviewModal.value = true
    
    
    
  }
  
  const handleImageError = (event) => {
    console.error('Image failed to load:', event.target.src)
    // You could show an error message here
  }
  
  const handleImageLoad = () => {}
  
  const saveProfileChanges = async () => {
    profileUpdateLoading.value = true
    
    try {
      const auth = getAuth()
      const currentUser = auth.currentUser
      const token = await currentUser.getIdToken()
      
      // Prepare profile data (only include fields that have values)
      const profileData = {}
      if (editForm.value.fullname) profileData.fullname = editForm.value.fullname
      if (editForm.value.email) profileData.email = editForm.value.email
      if (editForm.value.age) profileData.age = parseInt(editForm.value.age)
      if (editForm.value.phoneNumber) profileData.phoneNumber = editForm.value.phoneNumber
      if (editForm.value.emergencyContact) profileData.emergencyContact = editForm.value.emergencyContact
      
      // Update profile
      const updatedUser = await userService.updateUserProfile(currentUser.uid, token, profileData)
      
      // Update local user data
      user.value = { ...user.value, ...updatedUser }
      
      // Show success toast for profile update
      toastNotif.value?.showSuccess(
        'Profile Updated Successfully!',
        'Your profile has been saved.',
        4000
      )
      
      // Close the modal
      closeModal()
      
    } catch (err) {
      console.error('Error updating profile:', err)
      
      // Show error toast
      toastNotif.value?.showError(
        'Update Failed',
        err.message || 'Failed to update profile. Please try again.',
        6000
      )
    } finally {
      profileUpdateLoading.value = false
    }
  }
  
  const saveSettings = async () => {
    settingsLoading.value = true
    
    try {
      const auth = getAuth()
      const currentUser = auth.currentUser
      const token = await currentUser.getIdToken()
      
      // Update settings
      await userService.updateUserSettings(currentUser.uid, token, userSettings.value)
      
      // Show success toast for settings update
      toastNotif.value?.showSuccess(
        'Settings Saved Successfully!',
        'Your preferences have been updated.',
        4000
      )
      
      // Close the modal
      closeModal()
      
    } catch (err) {
      console.error('Error updating settings:', err)
      
      // Show error toast
      toastNotif.value?.showError(
        'Settings Update Failed',
        err.message || 'Failed to update settings. Please try again.',
        6000
      )
    } finally {
      settingsLoading.value = false
    }
  }
  
  const contactSupport = () => {
    // Show info toast for navigation
    toastNotif.value?.showInfo(
      'Contacting Support',
      'Taking you to our support page.',
      2000
    )
    
    // Close the modal first
    closeModal()
    
    // Navigate to contact page after a short delay
    setTimeout(() => {
      router.push('/contact')
    }, 500)
  }
  
  // Lifecycle
  onMounted(() => {
    const auth = getAuth()
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        loadProfileData()
      } else {
        router.push('/login')
      }
    })
    
    return () => unsubscribe()
  })
  
  // Clean up scroll locking when component is unmounted
  onUnmounted(() => {
    unlockBodyScroll()
  })
  </script>
  
  <style scoped>
  /* Global Styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .profile-page {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.6;
    color: rgba(45, 55, 45, 0.95);
    background: #fafafa;
    margin-top: 5rem;
  }
  
  .profile-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }
  
  /* Profile Header */
  .profile-header {
    background: linear-gradient(135deg, #2D372D 0%, #3a4a3a 100%);
    color: white;
    padding: 60px 0;
    position: relative;
    overflow: hidden;
  }
  
  .profile-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.02)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.02)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }
  
  .profile-header-content2 {
    display: flex;
    align-items: center;
    gap: 32px;
    position: relative;
    z-index: 1;
  }
  
  .profile-info {
    flex: 1;
  }
  
  .profile-name {
    font-size: 2.75rem;
    font-weight: 700;
    margin-bottom: 8px;
    letter-spacing: -0.02em;
  }
  
  .profile-email {
    font-size: 1.125rem;
    opacity: 0.85;
    margin-bottom: 8px;
  }
  
  .profile-role {
    display: inline-block;
    background: rgba(139, 115, 85, 0.9);
    color: white;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .edit-profile-btn {
    background: #8B7355;
    color: white;
    border: none;
    padding: 14px 28px;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 16px rgba(139, 115, 85, 0.3);
  }
  
  .edit-profile-btn:hover {
    background: #9d8266;
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(139, 115, 85, 0.4);
  }
  
  .profile-actions {
    display: flex;
    gap: 16px;
    align-items: center;
  }
  
  .settings-btn {
    background: #8B7355;
    color: white;
    border: none;
    padding: 14px 28px;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 16px rgba(139, 115, 85, 0.3);
  }
  
  .settings-btn:hover {
    background: #9d8266;
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(139, 115, 85, 0.4);
  }
  
  /* Section Styles */
  .profile-details,
  .documents-section,
  .bookings-section {
    padding: 80px 0;
  }
  
  .profile-details {
    background: white;
  }
  
  .documents-section {
    background: #f8f6f0;
  }
  
  .bookings-section {
    background: white;
  }
  
  .profile-section-header {
    margin-bottom: 48px;
    text-align: center;
  }
  
  .profile-section-title {
    font-size: 2.25rem;
    font-weight: 700;
    color: #2c2c2c;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
  }
  
  .section-divider {
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #8B7355, #9d8266);
    margin: 0 auto;
    border-radius: 2px;
  }
  
  /* Profile Details Grid */
  .details-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
  }
  
  .profile-detail-card1 {
    background: white;
    padding: 32px;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(139, 115, 85, 0.1);
    transition: all 0.3s ease;
  }
  
  .profile-detail-card1:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    border-color: rgba(139, 115, 85, 0.2);
  }
  
  .detail-label1 {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    color: #8B7355;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    
    
  }
  
  .detail-value2 {
    font-size: 1.125rem;
    font-weight: 500;
    color: #2c2c2c;
    line-height: 1.4;
  }
  
  /* Documents Grid */
  .documents-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 24px;
    align-items: start;
  }
  
  .document-card {
    background: white;
    padding: 24px 24px 32px 24px;
    border-radius: 16px;
    display: flex;
    align-items: flex-start;
    gap: 20px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(139, 115, 85, 0.1);
    transition: all 0.3s ease;
    min-height: 160px;
    position: relative;
    height: fit-content;
    overflow: visible;
  }
  
  .document-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    border-color: rgba(139, 115, 85, 0.2);
  }
  

  
  .document-icon {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    background: rgba(139, 115, 85, 0.1);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #8B7355;
  }
  
  .document-info {
    flex: 1;
    min-width: 0;
    margin-right: 120px; /* Ensure space for buttons */
  }
  
  .document-name {
    font-size: 1.125rem;
    font-weight: 600;
    color: #2c2c2c;
    margin-bottom: 4px;
    word-break: break-word;
    line-height: 1.3;
  }
  
  .document-type {
    font-size: 0.875rem;
    color: #666;
    margin-bottom: 2px;
  }
  
  .document-size {
    font-size: 0.75rem;
    color: #999;
    font-weight: 500;
  }
  
  .document-actions {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-end;
    position: absolute;
    top: 24px;
    right: 24px;
    min-width: 100px;
    height: auto;
    justify-content: flex-start;
    z-index: 1;
  }
  
  .profile-action-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
    min-width: 100px;
    justify-content: center;
    height: 36px;
  }
  
  /* Responsive adjustments for document cards */
  @media (max-width: 768px) {
    .document-info {
      margin-right: 0;
      margin-bottom: 60px; /* Space for buttons below */
    }
    
    .document-actions {
      position: static;
      flex-direction: row;
      justify-content: flex-start;
      gap: 12px;
      margin-top: 16px;
      height: auto;
    }
    
    .document-card {
      flex-direction: column;
      align-items: flex-start;
      height: auto;
    }
  }
  
  .download-btn {
    background: #8B7355;
    color: white;
  }
  
  .download-btn:hover {
    background: #9d8266;
    transform: translateY(-1px);
  }
  
  .replace-btn {
    background: transparent;
    color: #8B7355;
    border: 1px solid #8B7355;
  }
  
  .replace-btn:hover {
    background: #8B7355;
    color: white;
  }
  
  .replace-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .replace-btn:disabled:hover {
    background: transparent;
    color: #8B7355;
  }
  
  .preview-btn {
    background: #8B7355;
    color: white;
  }
  
  .preview-btn:hover {
    background: #9d8266;
    transform: translateY(-1px);
  }
  
  /* REDESIGNED BOOKINGS SECTION */
  .bookings-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
    margin-top: 24px;
  }
  
  .booking-card {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(139, 115, 85, 0.1);
    transition: all 0.4s ease;
    position: relative;
    flex: 1 1 380px;
    min-width: 380px;
  }
  
  .booking-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
    border-color: rgba(139, 115, 85, 0.2);
  }
  
  .booking-card-header {
    position: relative;
    height: 200px;
    overflow: hidden;
  }
  
  .vehicle-image-container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .vehicle-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }
  
  .booking-card:hover .vehicle-image {
    transform: scale(1.05);
  }
  
  .vehicle-badge {
    position: absolute;
    top: 16px;
    left: 16px;
    background: rgba(45, 55, 45, 0.9);
    color: white;
    padding: 8px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
    backdrop-filter: blur(10px);
  }
  
  .booking-status-container {
    position: absolute;
    top: 16px;
    right: 16px;
  }
  
  .booking-status-badge {
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    backdrop-filter: blur(10px);
  }
  
  .booking-status-badge.completed {
    background: rgba(34, 197, 94, 0.9);
    color: white;
  }
  
  .booking-status-badge.confirmed {
    background: rgba(59, 130, 246, 0.9);
    color: white;
  }
  
  .booking-status-badge.pending {
    background: rgba(245, 158, 11, 0.9);
    color: white;
  }
  
  .booking-card-content {
    padding: 24px;
  }
  
  .vehicle-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2c2c2c;
    margin-bottom: 4px;
    letter-spacing: -0.01em;
  }
  

  
  .booking-details {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .booking-detail-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid rgba(139, 115, 85, 0.1);
  }
  
  .booking-detail-item:last-child {
    border-bottom: none;
  }
  
  .detail-icon {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    background: rgba(139, 115, 85, 0.1);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #8B7355;
  }
  
  .detail-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .detail-label1 {
    font-size: 0.875rem;
    color: #666;
    font-weight: 500;
    margin-bottom: 2px;
  }
  
  .detail-value {
    font-size: 1rem;
    color: #2c2c2c;
    font-weight: 600;
  }
  
  .booking-card-footer {
    padding: 20px 24px;
    background: rgba(139, 115, 85, 0.02);
    border-top: 1px solid rgba(139, 115, 85, 0.1);
  }
  
  .view-details-btn {
    width: 100%;
    background: #8B7355;
    color: white;
    border: none;
    padding: 14px 20px;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  
  .view-details-btn:hover {
    background: #9d8266;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(139, 115, 85, 0.3);
  }
  
  .bookings-footer {
    text-align: center;
    margin-top: 48px;
  }
  
  .view-all-bookings-btn {
    background: transparent;
    color: #8B7355;
    border: 2px solid #8B7355;
    padding: 16px 32px;
    border-radius: 12px;
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  
  .view-all-bookings-btn:hover {
    background: #8B7355;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(139, 115, 85, 0.3);
  }
  
  /* CTA Footer */
  .cta-footer {
    background: linear-gradient(135deg, #f8f6f0 0%, #ede8dc 100%);
    color: #2c2c2c;
    padding: 80px 0;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  
  .cta-content {
    position: relative;
    z-index: 1;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .cta-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 24px;
    letter-spacing: -0.02em;
  }
  
  .cta-description {
    font-size: 1.125rem;
    opacity: 0.9;
    margin-bottom: 40px;
    line-height: 1.6;
  }
  
  .cta-button {
    background: #8B7355;
    color: white;
    border: none;
    padding: 18px 36px;
    border-radius: 12px;
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 6px 24px rgba(139, 115, 85, 0.3);
  }
  
  .cta-button:hover {
    background: #9d8266;
    transform: translateY(-3px);
    box-shadow: 0 8px 32px rgba(139, 115, 85, 0.4);
  }
  
  /* Error States */
  .error-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.95);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .error-content {
    text-align: center;
    max-width: 400px;
    padding: 40px;
  }
  
  .error-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2c2c2c;
    margin-bottom: 16px;
  }
  
  .error-message {
    font-size: 1rem;
    color: #666;
    margin-bottom: 24px;
    line-height: 1.5;
  }
  
  .loading-state,
  .error-state,
  .empty-state {
    position: relative;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(139, 115, 85, 0.1);
    padding: 40px;
    margin: 20px 0;
  }
  
  .loading-spinner-small {
    border: 4px solid rgba(139, 115, 85, 0.3);
    border-top: 4px solid #8B7355;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
    margin-bottom: 16px;
  }
  
  .error-text,
  .empty-text {
    font-size: 1.125rem;
    color: #333;
    margin-bottom: 8px;
    text-align: center;
  }
  
  .empty-subtext {
    font-size: 0.875rem;
    color: #666;
    text-align: center;
    margin-bottom: 24px;
  }
  
  .error-icon,
  .empty-icon {
    font-size: 3rem;
    margin-bottom: 16px;
  }
  
  .retry-btn {
    background: #8B7355;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 16px rgba(139, 115, 85, 0.3);
  }
  
  .retry-btn:hover {
    background: #9d8266;
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(139, 115, 85, 0.4);
  }
  
  .browse-vehicles-btn,
  .upload-docs-btn {
    background: #8B7355;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 16px rgba(139, 115, 85, 0.3);
  }
  
  .browse-vehicles-btn:hover,
  .upload-docs-btn:hover {
    background: #9d8266;
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(139, 115, 85, 0.4);
  }
  
  /* MODAL STYLES */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    backdrop-filter: blur(4px);
    animation: fadeIn 0.3s ease;
    overflow: hidden; /* Prevent any scroll within overlay */
  }
  
  .modal-container {
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    max-width: 90vw;
    max-height: 90vh;
    overflow: hidden;
    animation: slideUp 0.3s ease;
    display: flex;
    flex-direction: column;
    position: relative; /* Ensure proper positioning */
  }
  
  .booking-details-modal {
    width: 800px;
  }
  
  .upload-modal {
    width: 700px;
  }
  
  .edit-profile-modal {
    width: 900px;
  }
  
  .settings-modal {
    width: 600px;
  }
  
  .image-preview-modal {
    width: 800px;
    max-width: 90vw;
  }
  
  .modal-header {
    padding: 24px 32px;
    border-bottom: 1px solid rgba(139, 115, 85, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f8f6f0;
  }
  
  .modal-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2c2c2c;
    margin: 0;
  }
  
  .modal-close-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    color: #666;
    transition: all 0.3s ease;
  }
  
  .modal-close-btn:hover {
    background: rgba(139, 115, 85, 0.1);
    color: #8B7355;
  }
  
  .modal-content1 {
    flex: 1;
    overflow-y: auto;
    padding: 32px;
  }
  
  .modal-footer {
    padding: 24px 32px;
    border-top: 1px solid rgba(139, 115, 85, 0.1);
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    background: #f8f6f0;
  }
  
  .modal-btn {
    padding: 12px 24px;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
  }
  
  .modal-btn.primary {
    background: #8B7355;
    color: white;
    box-shadow: 0 4px 16px rgba(139, 115, 85, 0.3);
  }
  
  .modal-btn.primary:hover {
    background: #9d8266;
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(139, 115, 85, 0.4);
  }
  
  .modal-btn.secondary {
    background: transparent;
    color: #666;
    border: 1px solid #ddd;
  }
  
  .modal-btn.secondary:hover {
    background: #f5f5f5;
    border-color: #8B7355;
    color: #8B7355;
  }
  
  /* Image Preview Modal Content */
  .image-preview-content {
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
    padding: 32px;
  }
  
  .preview-image {
    max-width: 100%;
    max-height: 60vh;
    object-fit: contain;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
  
  .image-info {
    text-align: center;
    width: 100%;
  }
  
  .image-name {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2c2c2c;
    margin-bottom: 8px;
  }
  
  .image-details {
    display: flex;
    justify-content: center;
    gap: 16px;
    color: #666;
    font-size: 0.875rem;
  }
  
  .image-type {
    background: rgba(139, 115, 85, 0.1);
    padding: 4px 12px;
    border-radius: 12px;
    color: #8B7355;
    font-weight: 500;
  }
  
  .image-size {
    color: #999;
  }
  
  .image-error {
    text-align: center;
    padding: 40px;
    color: #666;
  }
  
  .image-error .error-icon {
    font-size: 3rem;
    margin-bottom: 16px;
  }
  
  .image-error p {
    margin-bottom: 8px;
  }
  
  .error-details {
    font-size: 0.75rem;
    color: #999;
    word-break: break-all;
    max-width: 100%;
    overflow-wrap: break-word;
  }
  
  .image-url {
    font-size: 0.75rem;
    color: #666;
    word-break: break-all;
    max-width: 100%;
    overflow-wrap: break-word;
    margin-top: 8px;
  }
  
  /* Booking Details Modal Content */
  .booking-details-content {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  
  .booking-hero {
    display: flex;
    gap: 24px;
    align-items: flex-start;
  }
  
  .booking-hero-image {
    width: 200px;
    height: 120px;
    border-radius: 12px;
    object-fit: cover;
    flex-shrink: 0;
  }
  
  .booking-hero-info {
    flex: 1;
  }
  
  .booking-vehicle-name {
    font-size: 1.75rem;
    font-weight: 700;
    color: #2c2c2c;
    margin-bottom: 8px;
  }
  

  
  .booking-hero-status {
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .booking-hero-status.completed {
    background: #d4edda;
    color: #155724;
  }
  
  .booking-hero-status.confirmed {
    background: #cce5ff;
    color: #004085;
  }
  
  .booking-hero-status.pending {
    background: #fff3cd;
    color: #856404;
  }
  
  .booking-info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 20px;
  }
  
  .booking-info-card {
    background: #f8f6f0;
    padding: 20px;
    border-radius: 12px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  
  .info-card-icon {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    background: rgba(139, 115, 85, 0.2);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #8B7355;
  }
  
  .info-card-content {
    flex: 1;
  }
  
  .info-card-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: #8B7355;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .info-card-value {
    font-size: 1.125rem;
    font-weight: 600;
    color: #2c2c2c;
    margin-bottom: 2px;
  }
  
  .info-card-detail {
    font-size: 0.875rem;
    color: #666;
  }
  
  .booking-extras {
    background: #f8f6f0;
    padding: 24px;
    border-radius: 12px;
  }
  
  .extras-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #2c2c2c;
    margin-bottom: 16px;
  }
  
  .extras-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
  }
  
  .extra-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.875rem;
    color: #2c2c2c;
  }
  
  .extra-item svg {
    color: #22c55e;
    flex-shrink: 0;
  }
  
  /* Upload Modal Content */
  .upload-content {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  
  .upload-description {
    font-size: 1rem;
    color: #666;
    line-height: 1.6;
    text-align: center;
    margin-bottom: 8px;
  }
  
  .upload-sections {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  
  .upload-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .upload-section-title {
    font-size: 1rem;
    font-weight: 600;
    color: #2c2c2c;
  }
  
  .upload-area {
    border: 2px dashed rgba(139, 115, 85, 0.3);
    border-radius: 12px;
    padding: 32px;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  
  .upload-area:hover {
    border-color: #8B7355;
    background: rgba(139, 115, 85, 0.02);
  }
  
  .upload-icon {
    color: #8B7355;
    margin-bottom: 16px;
  }
  
  .upload-text {
    font-size: 1rem;
    color: #2c2c2c;
    margin-bottom: 8px;
  }
  
  .upload-link {
    color: #8B7355;
    font-weight: 600;
    text-decoration: underline;
  }
  
  .upload-hint {
    font-size: 0.875rem;
    color: #666;
  }
  
  .upload-notes {
    background: #f8f6f0;
    padding: 24px;
    border-radius: 12px;
  }
  
  .notes-title {
    font-size: 1rem;
    font-weight: 600;
    color: #2c2c2c;
    margin-bottom: 12px;
  }
  
  .notes-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .notes-list li {
    font-size: 0.875rem;
    color: #666;
    margin-bottom: 8px;
    padding-left: 16px;
    position: relative;
  }
  
  .notes-list li::before {
    content: '•';
    color: #8B7355;
    position: absolute;
    left: 0;
    font-weight: bold;
  }
  
  /* Upload Status Messages */
  .upload-error,
  .upload-success {
    padding: 16px;
    border-radius: 12px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .upload-error {
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #dc2626;
  }
  
  .upload-success {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    color: #16a34a;
  }
  
  .error-icon,
  .success-icon {
    font-size: 1.25rem;
    flex-shrink: 0;
  }
  
  /* File Upload Styles */
  .upload-area {
    border: 2px dashed rgba(139, 115, 85, 0.3);
    border-radius: 12px;
    padding: 32px;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
  }
  
  .upload-area:hover,
  .upload-area.drag-over {
    border-color: #8B7355;
    background: rgba(139, 115, 85, 0.02);
  }
  
  .upload-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  
  .file-input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .selected-file {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background: rgba(139, 115, 85, 0.05);
    border-radius: 8px;
    border: 1px solid rgba(139, 115, 85, 0.2);
  }
  
  .file-info {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
  }
  
  .file-icon {
    width: 40px;
    height: 40px;
    background: rgba(139, 115, 85, 0.1);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #8B7355;
    flex-shrink: 0;
  }
  
  .file-details {
    flex: 1;
    min-width: 0;
  }
  
  .file-name {
    font-size: 0.875rem;
    font-weight: 600;
    color: #2c2c2c;
    margin-bottom: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .file-size {
    font-size: 0.75rem;
    color: #666;
  }
  
  .remove-file-btn {
    background: none;
    border: none;
    color: #dc2626;
    cursor: pointer;
    padding: 8px;
    border-radius: 6px;
    transition: all 0.3s ease;
    flex-shrink: 0;
  }
  
  .remove-file-btn:hover {
    background: rgba(220, 38, 38, 0.1);
  }
  
  .selected-files {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .modal-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .modal-btn .loading-spinner-small {
    width: 16px;
    height: 16px;
    border-width: 2px;
    margin-right: 8px;
  }
  
  /* Document Section Status Messages */
  .documents-section .upload-error,
  .documents-section .upload-success {
    margin-bottom: 24px;
    padding: 16px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .documents-section .upload-error {
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #dc2626;
  }
  
  .documents-section .upload-success {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    color: #16a34a;
  }
  
  /* Edit Profile Modal Content */
  .edit-profile-content {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  
  .profile-form {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  
  .form-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .form-section-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2c2c2c;
    padding-bottom: 8px;
    border-bottom: 2px solid rgba(139, 115, 85, 0.1);
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .form-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: #8B7355;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .form-input,
  .form-select {
    padding: 12px 16px;
    border: 1px solid rgba(139, 115, 85, 0.3);
    border-radius: 8px;
    font-size: 1rem;
    color: #2c2c2c;
    transition: all 0.3s ease;
    background: white;
  }
  
  .form-input:focus,
  .form-select:focus {
    outline: none;
    border-color: #8B7355;
    box-shadow: 0 0 0 3px rgba(139, 115, 85, 0.1);
  }
  
  .checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .checkbox-item {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    font-size: 0.875rem;
    color: #2c2c2c;
  }
  
  .checkbox-item input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: #8B7355;
  }
  
  .checkbox-text {
    flex: 1;
  }
  
  /* Settings Modal Content */
  .settings-content {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  
  .settings-section {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .settings-section-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2c2c2c;
    padding-bottom: 8px;
    border-bottom: 2px solid rgba(139, 115, 85, 0.1);
  }
  
  .settings-description {
    font-size: 0.875rem;
    color: #666;
    line-height: 1.5;
    margin-bottom: 8px;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .profile-container {
      padding: 0 16px;
    }
    
    .profile-header-content2 {
      flex-direction: column;
      text-align: center;
      gap: 24px;
    }
    
    .profile-actions {
      flex-direction: column;
      gap: 12px;
      width: 100%;
    }
    
    .edit-profile-btn,
    .settings-btn {
      width: 100%;
      justify-content: center;
    }
    
    .profile-name {
      font-size: 2.25rem;
    }
    
    .profile-section-title {
      font-size: 1.875rem;
    }
    
    .details-grid {
      grid-template-columns: 1fr;
    }
    
    .documents-grid {
      grid-template-columns: 1fr;
    }
    
    .document-card {
      flex-direction: column;
      text-align: center;
      gap: 16px;
      align-items: center;
    }
    
    .bookings-grid {
      grid-template-columns: 1fr;
    }
    
    .cta-title {
      font-size: 2rem;
    }
    
    .profile-details,
    .documents-section,
    .bookings-section,
    .cta-footer {
      padding: 60px 0;
    }
  
    .document-actions {
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: auto;
    }
    
    .profile-action-btn {
      flex: 1;
      max-width: 120px;
    }
  
    .modal-container {
      max-width: 95vw;
      margin: 20px;
    }
  
    .booking-details-modal,
    .upload-modal,
    .edit-profile-modal {
      width: 100%;
    }
  
    .modal-content1 {
      padding: 20px;
    }
  
    .booking-hero {
      flex-direction: column;
    }
  
    .booking-hero-image {
      width: 100%;
      height: 200px;
    }
  
    .booking-info-grid {
      grid-template-columns: 1fr;
    }
  
    .form-row {
      grid-template-columns: 1fr;
    }
  
    .extras-list {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 480px) {
    .profile-header {
      padding: 40px 0;
    }
    .profile-page{
      margin-top: 4rem;
    }
    
    .profile-name {
      font-size: 2rem;
    }
    
    .profile-section-title {
      font-size: 1.5rem;
    }
    .document-card-content{
      margin-bottom: -4rem;
    }
    
    .profile-detail-card1,
    .document-card {
      padding: 5px;
    }
    
    .cta-title {
      font-size: 1.75rem;
    }
    
    .profile-details,
    .documents-section,
    .bookings-section,
    .cta-footer {
      padding: 40px 0;
    }
    
    /* Fix booking card centering issues */
    .bookings-grid {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
      margin-top: 24px;
    }
    
    .booking-card {
      flex: none;
      min-width: unset;
      width: 100%;
      max-width: 400px;
    }
  
    .booking-card-content {
      padding: 20px;
    }
  
    .vehicle-title {
      font-size: 1.25rem;
    }
  
    .modal-header,
    .modal-footer {
      padding: 16px 20px;
    }
  
    .modal-content1 {
      padding: 16px;
    }
  }
 
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { 
      opacity: 0;
      transform: translateY(30px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>
