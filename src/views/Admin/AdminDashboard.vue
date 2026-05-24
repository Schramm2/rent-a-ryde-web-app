<template>
  <div class="admin-dashboard">
    <!-- Header -->
    <header class="dashboard-header">
      <div class="header-content">
        <div class="logo-section">
          <img :src="LogoImage" alt="RentARyde Logo" class="logo-image" />
          <div class="logo-text-container">
            <span class="logo-text">RENTARYDE</span>
            <span class="admin-badge">ADMIN DASHBOARD</span>
          </div>
        </div>
        <div class="header-actions">
          <button class="header-btn home-btn" @click="goHome">
            <span>HOME</span>
          </button>
          <button class="header-btn logout-btn" @click="logout">
            <span>LOGOUT</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Navigation Tabs -->
    <nav class="dashboard-nav">
      <div class="nav-container">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="['nav-tab', { active: activeTab === tab.id }]"
        >
          <span>{{ tab.label }}</span>
        </button>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="dashboard-main">
      <!-- Manage Users -->
      <section v-if="activeTab === 'users'" class="dashboard-section">
        <div class="section-header1">
          <div class="section-title2">
            <h2>Manage Users</h2>
            <p class="section-subtitle">View and manage all registered users</p>
          </div>
          <div class="header-actions-group">
            <button class="action-btn secondary" @click="refreshUsers">
              <span>Refresh</span>
            </button>
          </div>
          <!-- <button class="action-btn primary" @click="showAddUserModal = true">
            <span>Add New User</span>
          </button> -->
        </div>
        
        <div class="data-table-container">
          <div class="data-table users-table">
            <div class="users-table-header">
              <div class="users-table-cell users-header-cell">Name</div>
              <div class="users-table-cell users-header-cell">Email</div>
              <div class="users-table-cell users-header-cell">Date Registered</div>
              <div class="users-table-cell users-header-cell">Role</div>
              <div class="users-table-cell users-header-cell">Actions</div>
            </div>
            
            <div v-if="usersLoading" class="users-table-row loading-row">
              <div class="users-table-cell loading-cell" colspan="5">
                <div class="loading-spinner"></div>
                <span>Loading users...</span>
              </div>
            </div>
            
            <div v-else-if="usersError" class="users-table-row error-row">
              <div class="users-table-cell error-cell" colspan="5">
                <span class="error-text">{{ usersError }}</span>
                <button class="action-btn secondary small" @click="refreshUsers">Retry</button>
              </div>
            </div>
            
            <div v-else v-for="user in users" :key="user.id" class="users-table-row data-row">
              <div class="users-table-cell">
                <div class="user-info">
                  <div class="user-avatar">{{ user.name.charAt(0).toUpperCase() }}</div>
                  <span class="user-name">{{ user.name }}</span>
                </div>
              </div>
              <div class="users-table-cell">
                <span class="user-email">{{ user.email }}</span>
              </div>
              <div class="users-table-cell">
                <span class="date-text">{{ formatDate(user.dateRegistered) }}</span>
              </div>
              <div class="users-table-cell">
                <span :class="['role-badge', user.role ? user.role.toLowerCase() : 'default']">{{ user.role || 'N/A' }}</span>
              </div>
              <div class="users-table-cell">
                <div class="action-buttons">
                  <button class="action-btn secondary small" @click="viewUser(user)">View</button>
                  <button class="action-btn danger small" @click="deleteUser(user)">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Manage Bookings -->
      <section v-if="activeTab === 'bookings'" class="dashboard-section">
        <div class="section-header1">
          <div class="section-title2">
            <h2>Manage Bookings</h2>
            <p class="section-subtitle">Track and manage all vehicle bookings with enhanced controls</p>
          </div>
          <div class="header-actions-group">
            <button class="action-btn secondary" @click="refreshBookings">
              <span>Refresh</span>
            </button>
            <button class="action-btn primary" @click="showExportModal = true">
              <span>Export Bookings</span>
            </button>
          </div>
        </div>
        
        <!-- Bookings Stats Cards -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon pending">📋</div>
            <div class="stat-content">
              <div class="stat-number">{{ bookings.filter(b => b.status === 'pending').length }}</div>
              <div class="stat-label">Pending</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon approved">✅</div>
            <div class="stat-content">
              <div class="stat-number">{{ bookings.filter(b => b.status === 'approved').length }}</div>
              <div class="stat-label">Approved</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon cancelled">❌</div>
            <div class="stat-content">
              <div class="stat-number">{{ bookings.filter(b => b.status === 'cancelled').length }}</div>
              <div class="stat-label">Cancelled</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon total">📊</div>
            <div class="stat-content">
              <div class="stat-number">{{ bookings.length }}</div>
              <div class="stat-label">Total Bookings</div>
            </div>
          </div>
        </div>

        <!-- Enhanced Bookings Display -->
        <div class="bookings-container">
          <div v-if="bookingsLoading" class="loading-state">
            <div class="loading-spinner-large"></div>
            <p class="loading-text">Loading bookings...</p>
          </div>
          
          <div v-else-if="bookingsError" class="error-state">
            <div class="error-icon">⚠️</div>
            <p class="error-text">{{ bookingsError }}</p>
            <button class="action-btn secondary small" @click="refreshBookings">Retry</button>
          </div>
          
          <div v-else-if="bookings.length === 0" class="empty-state">
            <div class="empty-icon">📝</div>
            <p class="empty-text">No bookings found</p>
            <p class="empty-subtext">Bookings will appear here once customers make reservations</p>
          </div>
          
          <div v-else class="bookings-grid">
            <div v-for="booking in bookings" :key="booking.id" class="booking-card">
              <div class="booking-header">
                <div class="booking-id-section">
                  <span class="booking-label">Booking</span>
                  <span class="booking-id">#{{ booking.id }}</span>
                </div>
                <div class="booking-status-section">
                  <span :class="['status-badge', 'status-' + booking.status.toLowerCase()]">
                    {{ booking.status }}
                  </span>
                </div>
              </div>
              
              <div class="booking-content">
                <div class="booking-row">
                  <div class="booking-field">
                    <span class="field-label">Customer</span>
                    <span class="field-value customer-name">
                      {{ userNames[booking.userId] || 'Loading...' }}
                    </span>
                  </div>
                  <div class="booking-field">
                    <span class="field-label">Vehicle</span>
                    <span class="field-value vehicle-name">
                      {{ vehicleNames[booking.vehicleId] || 'Loading...' }}
                    </span>
                  </div>
                </div>
                
                <div class="booking-row">
                  <div class="booking-field">
                    <span class="field-label">Start Date</span>
                    <span class="field-value date-value">
                      {{ formatDate(booking.startDate) }}
                    </span>
                  </div>
                  <div class="booking-field">
                    <span class="field-label">End Date</span>
                    <span class="field-value date-value">
                      {{ formatDate(booking.endDate) }}
                    </span>
                  </div>
                </div>
                
                <div class="booking-row">
                  <div class="booking-field">
                    <span class="field-label">Total Price</span>
                    <span class="field-value price-value">
                      R{{ booking.totalPrice }}
                    </span>
                  </div>
                  <div class="booking-field">
                    <span class="field-label">Created</span>
                    <span class="field-value date-small">
                      {{ formatDate(booking.createdAt) }}
                    </span>
                  </div>
                </div>
                
                <div v-if="booking.specialRequest" class="booking-row full-width">
                  <div class="booking-field">
                    <span class="field-label">Special Request</span>
                    <span class="field-value special-request">
                      {{ booking.specialRequest }}
                    </span>
                  </div>
                </div>
                
                <div v-if="booking.status === 'cancelled' && booking.cancellationReason" class="booking-row full-width">
                  <div class="booking-field">
                    <span class="field-label">Cancellation Reason</span>
                    <span class="field-value cancellation-reason">
                      {{ booking.cancellationReason }}
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="booking-actions">
                <button class="action-btn secondary small" @click="viewBooking(booking)">
                  <span>View Details</span>
                </button>
                <button class="action-btn primary small" @click="editBooking(booking)">
                  <span>Edit</span>
                </button>
                <button 
                  v-if="booking.status === 'pending'" 
                  class="action-btn success small" 
                  @click="approveBooking(booking)"
                >
                  <span>Approve</span>
                </button>
                <button 
                  v-if="booking.status === 'pending' || booking.status === 'approved'" 
                  class="action-btn danger small" 
                  @click="cancelBooking(booking)"
                >
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>



      <!-- Manage Add-ons -->
      <section v-if="activeTab === 'addons'" class="dashboard-section">
        <div class="section-header1">
          <div class="section-title2">
            <h2>Manage Add-ons</h2>
            <p class="section-subtitle">Manage available rental add-ons and services</p>
          </div>
          <button class="action-btn primary" @click="showAddAddonModal = true">
            <span>Add New Add-on</span>
          </button>
        </div>
        
        <div class="cards-grid">
          <div v-if="addonsLoading" class="addon-card loading-card">
            <div class="card-image">
              <div class="image-skeleton"></div>
            </div>
            <div class="card-content">
              <div class="content-skeleton">
                <div class="skeleton-line title"></div>
                <div class="skeleton-line price"></div>
                <div class="skeleton-line status"></div>
              </div>
            </div>
          </div>
          
          <div v-else-if="addonsError" class="addon-card error-card">
            <div class="card-image">
              <div class="error-icon">⚠️</div>
            </div>
            <div class="card-content">
              <h3 class="card-title error">Error Loading Add-ons</h3>
              <p class="error-message">{{ addonsError }}</p>
            </div>
          </div>
          
          <div v-else v-for="addon in addons" :key="addon.id" class="addon-card">
            <div class="card-image">
              <img :src="addon.imageUrl || '/placeholder.svg?height=160&width=240'" :alt="addon.name" />
              <div class="image-overlay">
                <span :class="['availability-badge', addon.availability?.toLowerCase()]">
                  {{ addon.availability }}
                </span>
              </div>
            </div>
            <div class="card-content">
              <h3 class="card-title">{{ addon.name }}</h3>
              <p class="card-price">R{{ addon.price }} <span class="price-period">per day</span></p>
              <div class="card-actions">
                <button class="action-btn secondary small" @click="editAddon(addon)">
                  <span>Edit</span>
                </button>
                <button class="action-btn danger small" @click="deleteAddon(addon)">
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Manage Vehicles -->
      <section v-if="activeTab === 'vehicles'" class="dashboard-section">
        <div class="section-header1">
          <div class="section-title2">
            <h2>Manage Vehicles</h2>
            <p class="section-subtitle">Manage your vehicle fleet and availability</p>
          </div>
          <button class="action-btn primary" @click="showAddVehicleModal = true">
            <span>Add New Vehicle</span>
          </button>
        </div>
        
        <div class="cards-grid">
          <div v-if="vehiclesLoading" class="vehicle-card loading-card">
            <div class="card-image">
              <div class="image-skeleton"></div>
            </div>
            <div class="card-content">
              <div class="content-skeleton">
                <div class="skeleton-line title"></div>
                <div class="skeleton-line details"></div>
                <div class="skeleton-line price"></div>
              </div>
            </div>
          </div>
          
          <div v-else-if="vehiclesError" class="vehicle-card error-card">
            <div class="card-image">
              <div class="error-icon">⚠️</div>
            </div>
            <div class="card-content">
              <h3 class="card-title error">Error Loading Vehicles</h3>
              <p class="error-message">{{ vehiclesError }}</p>
            </div>
          </div>
          
          <div v-else v-for="vehicle in vehicles" :key="vehicle.id" class="vehicle-card">
            <div class="card-image">
              <img :src="vehicle.imageUrl || '/placeholder.svg?height=200&width=320'" :alt="vehicle.make + ' ' + vehicle.model" />
              <div class="image-overlay">
                <span :class="['availability-badge', vehicle.availability?.toLowerCase()]">
                  {{ vehicle.availability }}
                </span>
              </div>
            </div>
            <div class="card-content">
              <h3 class="card-title">{{ vehicle.make }} {{ vehicle.model }}</h3>
              <p class="card-details">{{ vehicle.year }} • {{ vehicle.color }}</p>
              <p class="card-price">R{{ vehicle.price }} <span class="price-period">per day</span></p>
              <div class="card-actions">
                <button class="action-btn secondary small" @click="editVehicle(vehicle)">
                  <span>Edit</span>
                </button>
                <button class="action-btn danger small" @click="removeVehicle(vehicle)">
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Toast Notifications -->
    <ToastNotifications ref="toastRef" />

    <!-- Modals -->
    <Teleport to="body">
      <!-- Edit Booking Modal -->
      <div v-if="isEditModalOpen" class="modal-overlay" @click="closeEditModal">
        <div class="modal-content modal-large" @click.stop>
          <div class="modal-header">
            <h3>Edit Booking #{{ selectedBooking?.id }}</h3>
            <button class="modal-close" @click="closeEditModal">&times;</button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveBookingChanges">
              <div class="form-group">
                <label for="editBookingPrice">Total Price (R)</label>
                <div class="price-display">
                  <span class="calculated-price">R{{ editingBookingCalculatedTotal.toLocaleString() }}</span>
                  <small class="price-note">*Calculated based on dates and extras</small>
                </div>
                <input 
                  type="number" 
                  id="editBookingPrice" 
                  v-model="editingBooking.totalPrice" 
                  min="0" 
                  step="0.01" 
                  required 
                  style="margin-top: 0.5rem;"
                />
              </div>
              
              <div class="form-group">
                <label for="editBookingStatus">Status</label>
                <select id="editBookingStatus" v-model="editingBooking.status" required>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="editStartDate">Start Date</label>
                  <input 
                    type="date" 
                    id="editStartDate" 
                    v-model="editingBooking.startDate" 
                    required 
                  />
                </div>
                <div class="form-group">
                  <label for="editEndDate">End Date</label>
                  <input 
                    type="date" 
                    id="editEndDate" 
                    v-model="editingBooking.endDate" 
                    required 
                  />
                </div>
              </div>
              
              <div class="form-group" v-if="editingBookingRentalDays > 0">
                <label>Rental Period</label>
                <div class="rental-period-display">
                  <span class="rental-days">{{ editingBookingRentalDays }} day(s)</span>
                  <span class="rental-dates">{{ formatDate(editingBooking.startDate) }} - {{ formatDate(editingBooking.endDate) }}</span>
                </div>
              </div>
              
              <div class="form-group">
                <label for="editSpecialRequest">Special Request</label>
                <textarea 
                  id="editSpecialRequest" 
                  v-model="editingBooking.specialRequest" 
                  rows="3" 
                  placeholder="Any special requests or notes..."
                ></textarea>
              </div>
              
              <div class="form-group">
                <label for="editAdminNotes">Admin Notes</label>
                <textarea 
                  id="editAdminNotes" 
                  v-model="editingBooking.adminNotes" 
                  rows="3" 
                  placeholder="Internal notes (not visible to customer)..."
                ></textarea>
              </div>
              
              <div class="form-group">
                <label>Optional Extras</label>
                <div class="extras-selection-container">
                  <div class="extras-grid">
                    <label v-for="addon in addons" :key="addon.id" class="extra-card">
                      <input 
                        type="checkbox" 
                        :value="addon.id" 
                        v-model="editingBooking.extras" 
                        class="extra-checkbox" 
                      />
                      <div class="extra-content">
                        <div class="extra-header">
                          <span class="extra-name">{{ addon.name }}</span>
                          <div class="checkbox-indicator">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                              <polyline points="20,6 9,17 4,12"></polyline>
                            </svg>
                          </div>
                        </div>
                        <span class="extra-price">R{{ addon.price }} per day</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              
              <!-- Price Breakdown -->
              <div class="form-group" v-if="editingBookingVehicle">
                <label>Price Breakdown</label>
                <div class="price-breakdown">
                  <div class="breakdown-item">
                    <span class="breakdown-label">Vehicle ({{ editingBookingVehicle.make }} {{ editingBookingVehicle.model }})</span>
                    <span class="breakdown-value">R{{ editingBookingVehicle.price }} × {{ editingBookingRentalDays }} days = R{{ (editingBookingVehicle.price * editingBookingRentalDays).toLocaleString() }}</span>
                  </div>
                  <div v-for="extra in editingBookingSelectedExtras" :key="extra.id" class="breakdown-item">
                    <span class="breakdown-label">{{ extra.name }}</span>
                    <span class="breakdown-value">R{{ extra.price }} × {{ editingBookingRentalDays }} days = R{{ (extra.price * editingBookingRentalDays).toLocaleString() }}</span>
                  </div>
                  <div class="breakdown-total">
                    <span class="breakdown-label">Total</span>
                    <span class="breakdown-value">R{{ editingBookingCalculatedTotal.toLocaleString() }}</span>
                  </div>
                </div>
              </div>
              
              <div class="modal-actions">
                <button type="button" class="action-btn secondary" @click="closeEditModal">
                  Cancel
                </button>
                <button type="submit" class="action-btn primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Add User Modal -->
      <div v-if="showAddUserModal" class="modal-overlay" @click="showAddUserModal = false">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>Add New User</h3>
            <button class="modal-close" @click="showAddUserModal = false">&times;</button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitAddUser">
              <div class="form-group">
                <label for="userName">Full Name</label>
                <input type="text" id="userName" v-model="newUser.name" required />
              </div>
              <div class="form-group">
                <label for="userEmail">Email</label>
                <input type="email" id="userEmail" v-model="newUser.email" required />
              </div>
              <div class="form-group">
                <label for="userRole">Role</label>
                <select id="userRole" v-model="newUser.role" required>
                  <option value="Customer">Customer</option>
                  <option value="Admin">Admin</option>
                  <option value="Moderator">Moderator</option>
                </select>
              </div>
              <div class="form-group">
                <label for="userPassword">Password</label>
                <input type="password" id="userPassword" v-model="newUser.password" required />
              </div>
              <div class="modal-actions">
                <button type="button" class="action-btn secondary" @click="showAddUserModal = false">Cancel</button>
                <button type="submit" class="action-btn primary">Add User</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- View User Modal -->
      <div v-if="showViewUserModal" class="modal-overlay" @click="showViewUserModal = false">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>User Details</h3>
            <button class="modal-close" @click="showViewUserModal = false">&times;</button>
          </div>
          <div class="modal-body">
            <div class="detail-card">
              <div class="detail-row">
                <span class="detail-label">Full Name:</span>
                <span class="detail-value">{{ selectedUser?.fullname || selectedUser?.name || 'N/A' }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value">{{ selectedUser?.email || 'N/A' }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Phone Number:</span>
                <span class="detail-value">{{ selectedUser?.phoneNumber || 'N/A' }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Role:</span>
                <span :class="['role-badge', selectedUser?.role ? selectedUser.role.toLowerCase() : 'default']">{{ selectedUser?.role || 'N/A' }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Age:</span>
                <span class="detail-value">{{ selectedUser?.age || 'N/A' }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Gender:</span>
                <span class="detail-value">{{ selectedUser?.gender || 'N/A' }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Emergency Contact:</span>
                <span class="detail-value">{{ selectedUser?.emergencyContact || 'N/A' }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Date Registered:</span>
                <span class="detail-value">{{ (selectedUser?.createdAt || selectedUser?.dateRegistered) ? formatDate(selectedUser.createdAt || selectedUser.dateRegistered) : 'N/A' }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">User ID:</span>
                <span class="detail-value">{{ selectedUser?.uid || selectedUser?.id || 'N/A' }}</span>
              </div>
              <!-- Additional fields that might exist -->
              <div v-if="selectedUser?.address" class="detail-row">
                <span class="detail-label">Address:</span>
                <span class="detail-value">{{ selectedUser.address }}</span>
              </div>
              <div v-if="selectedUser?.city" class="detail-row">
                <span class="detail-label">City:</span>
                <span class="detail-value">{{ selectedUser.city }}</span>
              </div>
              <div v-if="selectedUser?.country" class="detail-row">
                <span class="detail-label">Country:</span>
                <span class="detail-value">{{ selectedUser.country }}</span>
              </div>
              <div v-if="selectedUser?.postalCode" class="detail-row">
                <span class="detail-label">Postal Code:</span>
                <span class="detail-value">{{ selectedUser.postalCode }}</span>
              </div>
              <div v-if="selectedUser?.licenseNumber" class="detail-row">
                <span class="detail-label">License Number:</span>
                <span class="detail-value">{{ selectedUser.licenseNumber }}</span>
              </div>
              <div v-if="selectedUser?.licenseExpiry" class="detail-row">
                <span class="detail-label">License Expiry:</span>
                <span class="detail-value">{{ selectedUser.licenseExpiry ? formatDate(selectedUser.licenseExpiry) : 'N/A' }}</span>
              </div>
              <div v-if="selectedUser?.isVerified" class="detail-row">
                <span class="detail-label">Verification Status:</span>
                <span class="detail-value">{{ selectedUser.isVerified ? 'Verified' : 'Not Verified' }}</span>
              </div>
              <div v-if="selectedUser?.lastLogin" class="detail-row">
                <span class="detail-label">Last Login:</span>
                <span class="detail-value">{{ selectedUser.lastLogin ? formatDate(selectedUser.lastLogin) : 'N/A' }}</span>
              </div>
            </div>
            <div class="modal-actions">
              <button class="action-btn secondary" @click="showViewUserModal = false">Close</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete User Modal -->
      <div v-if="showDeleteUserModal" class="modal-overlay" @click="showDeleteUserModal = false">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>Delete User</h3>
            <button class="modal-close" @click="showDeleteUserModal = false">&times;</button>
          </div>
          <div class="modal-body">
            <div class="warning-card">
              <div class="warning-icon">⚠️</div>
              <div class="warning-content">
                <p>Are you sure you want to delete user <strong>{{ selectedUser?.fullname || selectedUser?.name || 'Unknown User' }}</strong>?</p>
                <p class="warning-text">This action cannot be undone.</p>
              </div>
            </div>
            <div class="modal-actions">
              <button class="action-btn secondary" @click="showDeleteUserModal = false">Cancel</button>
              <button class="action-btn danger" @click="confirmDeleteUser">Delete User</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Export Bookings Modal -->
      <div v-if="showExportModal" class="modal-overlay" @click="showExportModal = false">
        <div class="modal-content modal-large" @click.stop>
          <div class="modal-header">
            <h3>Export Bookings</h3>
            <button class="modal-close" @click="showExportModal = false">&times;</button>
          </div>
          <div class="modal-body">
            <!-- Export Summary -->
            <div class="export-summary">
              <div class="summary-card">
                <div class="summary-icon">📊</div>
                <div class="summary-content">
                  <h4>Export Summary</h4>
                  <p>Total bookings available: <strong>{{ bookings.length }}</strong></p>
                  <p>Selected date range: <strong>{{ getDateRangeLabel(exportDateRange) }}</strong></p>
                </div>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="exportFormat">Export Format</label>
                <select id="exportFormat" v-model="exportFormat">
                  <option value="csv">CSV (Comma Separated Values)</option>
                  <option value="excel">Excel (XLS)</option>
                  <option value="pdf">PDF (HTML Report)</option>
                </select>
                <small class="format-description">
                  {{ getFormatDescription(exportFormat) }}
                </small>
              </div>
              <div class="form-group">
                <label for="dateRange">Date Range</label>
                <select id="dateRange" v-model="exportDateRange">
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
                <small class="date-description">
                  {{ getDateRangeDescription(exportDateRange) }}
                </small>
              </div>
            </div>

            <!-- Export Preview -->
            <div class="form-group">
              <label>Export Preview</label>
              <div class="export-preview">
                <div class="preview-header">
                  <span class="preview-title">Sample data that will be exported:</span>
                  <span class="preview-count">{{ getFilteredBookingsCount() }} bookings</span>
                </div>
                <div class="preview-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>Customer</th>
                        <th>Vehicle</th>
                        <th>Status</th>
                        <th>Total Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="booking in getPreviewBookings()" :key="booking.id">
                        <td>#{{ booking.id }}</td>
                        <td>{{ userNames[booking.userId] || 'Loading...' }}</td>
                        <td>{{ vehicleNames[booking.vehicleId] || 'Loading...' }}</td>
                        <td>
                          <span :class="['status-badge', 'status-' + booking.status.toLowerCase()]">
                            {{ booking.status }}
                          </span>
                        </td>
                        <td>R{{ booking.totalPrice }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="modal-actions">
              <button class="action-btn secondary" @click="showExportModal = false">Cancel</button>
              <button class="action-btn primary" @click="exportBookings">
                <span>Export {{ getFilteredBookingsCount() }} Bookings</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- View Booking Modal -->
      <div v-if="showViewBookingModal" class="modal-overlay" @click="showViewBookingModal = false">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>Booking Details</h3>
            <button class="modal-close" @click="showViewBookingModal = false">&times;</button>
          </div>
          <div class="modal-body">
            <div class="detail-card">
              <div class="detail-row">
                <span class="detail-label">Booking ID:</span>
                <span class="detail-value">{{ selectedBooking?.id }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">User ID:</span>
                <span class="detail-value">{{ userNames[selectedBooking?.userId] || 'Loading...' }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Vehicle:</span>
                <span class="detail-value">{{ vehicleNames[selectedBooking?.vehicleId] || 'Loading...' }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Start Date:</span>
                <span class="detail-value">{{ formatDate(selectedBooking?.startDate) }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">End Date:</span>
                <span class="detail-value">{{ formatDate(selectedBooking?.endDate) }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Total Price:</span>
                <span class="detail-value">R{{ selectedBooking?.totalPrice }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Status:</span>
                <span :class="['status-badge', selectedBooking?.status.toLowerCase()]">{{ selectedBooking?.status }}</span>
              </div>
              <div class="detail-row" v-if="selectedBooking?.specialRequest">
                <span class="detail-label">Special Request:</span>
                <span class="detail-value">{{ selectedBooking?.specialRequest }}</span>
              </div>
              <div class="detail-row" v-if="selectedBooking?.adminNotes">
                <span class="detail-label">Admin Notes:</span>
                <span class="detail-value admin-notes">{{ selectedBooking?.adminNotes }}</span>
              </div>
              <div class="detail-row" v-if="selectedBooking?.status === 'cancelled'">
                <span class="detail-label">Cancellation Reason:</span>
                <span class="detail-value cancellation-reason">{{ selectedBooking?.cancellationReason || 'No reason provided' }}</span>
              </div>
              <div class="detail-row" v-if="selectedBooking?.status === 'cancelled'">
                <span class="detail-label">Cancelled By:</span>
                <span class="detail-value">{{ selectedBooking?.cancelledBy === 'admin' ? 'Administrator' : selectedBooking?.cancelledBy === 'user' ? 'Customer' : selectedBooking?.cancelledBy || 'System' }}</span>
              </div>
              <div class="detail-row" v-if="selectedBooking?.status === 'cancelled' && selectedBooking?.cancelledAt">
                <span class="detail-label">Cancelled At:</span>
                <span class="detail-value">{{ formatDateTime(selectedBooking?.cancelledAt) }}</span>
              </div>
              <div class="detail-row" v-if="selectedBooking?.extras && selectedBooking?.extras.length > 0">
                <span class="detail-label">Extras:</span>
                <span class="detail-value">
                  <span v-for="extra in selectedBooking?.extras" :key="extra" class="extra-badge">{{ addonNames[extra] || extra }}</span>
                </span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Created At:</span>
                <span class="detail-value">{{ formatDateTime(selectedBooking?.createdAt) }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Updated At:</span>
                <span class="detail-value">{{ formatDateTime(selectedBooking?.updatedAt) }}</span>
              </div>
            </div>
            <div class="modal-actions">
              <button 
                v-if="selectedBooking?.status === 'cancelled' && selectedBooking?.userId" 
                class="action-btn primary" 
                @click="emailCancelledBookingUser"
              >
                <span>📧 Email Customer</span>
              </button>
              <button class="action-btn secondary" @click="showViewBookingModal = false">Close</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Approve Booking Modal -->
      <div v-if="showApproveBookingModal" class="modal-overlay" @click="showApproveBookingModal = false">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>Approve Booking</h3>
            <button class="modal-close" @click="showApproveBookingModal = false">&times;</button>
          </div>
          <div class="modal-body">
            <div class="confirmation-card">
              <div class="confirmation-icon">✅</div>
              <div class="confirmation-content">
                <p>Are you sure you want to approve booking <strong>#{{ selectedBooking?.id }}</strong> for {{ userNames[selectedBooking?.userId] || 'Unknown User' }}?</p>
              </div>
            </div>
            <div class="modal-actions">
              <button class="action-btn secondary" @click="showApproveBookingModal = false">Cancel</button>
              <button class="action-btn success" @click="confirmApproveBooking">Approve Booking</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Cancel Booking Modal -->
      <div v-if="showCancelBookingModal" class="modal-overlay" @click="showCancelBookingModal = false">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>Cancel Booking</h3>
            <button class="modal-close" @click="showCancelBookingModal = false">&times;</button>
          </div>
          <div class="modal-body">
            <div class="warning-card">
              <div class="warning-icon">⚠️</div>
              <div class="warning-content">
                <p>Are you sure you want to cancel booking <strong>#{{ selectedBooking?.id }}</strong>?</p>
              </div>
            </div>
            <div class="form-group">
              <label for="cancellationReason">Cancellation Reason <span class="required">*</span></label>
              <textarea 
                id="cancellationReason" 
                v-model="cancellationReason" 
                rows="3" 
                placeholder="Enter reason for cancellation..." 
                required
              ></textarea>
              <small class="form-help">Please provide a clear reason for the cancellation. This will be visible to the customer.</small>
            </div>
            <div class="modal-actions">
              <button class="action-btn secondary" @click="showCancelBookingModal = false">Cancel</button>
              <button class="action-btn danger" @click="confirmCancelBooking">Cancel Booking</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Add-on Modal -->
      <div v-if="showAddAddonModal" class="modal-overlay" @click="showAddAddonModal = false">
        <div class="modal-content modal-large" @click.stop>
          <div class="modal-header">
            <h3>Add New Add-on</h3>
            <button class="modal-close" @click="showAddAddonModal = false">&times;</button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitAddAddon">
              <div class="form-row">
                <div class="form-group">
                  <label for="addonName">Add-on Name</label>
                  <input type="text" id="addonName" v-model="newAddon.name" required />
                </div>
                <div class="form-group">
                  <label for="addonPrice">Price per Day (R)</label>
                  <input type="number" id="addonPrice" v-model="newAddon.price" min="0" step="0.01" required />
                </div>
              </div>
              <div class="form-group">
                <label for="addonDescription">Description</label>
                <textarea id="addonDescription" v-model="newAddon.description" rows="3" required></textarea>
              </div>
              <div class="form-group">
                <label for="addonAvailability">Availability</label>
                <select id="addonAvailability" v-model="newAddon.availability" required>
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                  <option value="Limited">Limited</option>
                </select>
              </div>
              <div class="form-group">
                <label for="addonImage">Add-on Image</label>
                <div class="file-upload-area">
                  <input 
                    type="file" 
                    id="addonImage" 
                    ref="addonImageInput"
                    @change="handleAddonImageUpload" 
                    accept="image/*" 
                    class="file-input"
                  />
                  <label for="addonImage" class="file-upload-label">
                    <div class="upload-icon">📁</div>
                    <span v-if="!newAddon.imageFile">Choose Image</span>
                    <span v-else>{{ newAddon.imageFile.name }}</span>
                  </label>
                </div>
                <div class="image-preview" v-if="newAddon.imagePreview">
                  <img :src="newAddon.imagePreview" alt="Add-on Preview" />
                </div>
                <div v-if="addonImageUploading" class="upload-progress">
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: addonUploadProgress + '%' }"></div>
                  </div>
                  <span class="progress-text">Uploading... {{ addonUploadProgress }}%</span>
                </div>
              </div>
              <div class="modal-actions">
                <button type="button" class="action-btn secondary" @click="showAddAddonModal = false">Cancel</button>
                <button type="submit" class="action-btn primary" :disabled="addonImageUploading">Add Add-on</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Edit Add-on Modal -->
      <div v-if="showEditAddonModal" class="modal-overlay" @click="showEditAddonModal = false">
        <div class="modal-content modal-large" @click.stop>
          <div class="modal-header">
            <h3>Edit Add-on</h3>
            <button class="modal-close" @click="showEditAddonModal = false">&times;</button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitEditAddon">
              <div class="form-row">
                <div class="form-group">
                  <label for="editAddonName">Add-on Name</label>
                  <input type="text" id="editAddonName" v-model="editingAddon.name" required />
                </div>
                <div class="form-group">
                  <label for="editAddonPrice">Price per Day (R)</label>
                  <input type="number" id="editAddonPrice" v-model="editingAddon.price" min="0" step="0.01" required />
                </div>
              </div>
              <div class="form-group">
                <label for="editAddonDescription">Description</label>
                <textarea id="editAddonDescription" v-model="editingAddon.description" rows="3" required></textarea>
              </div>
              <div class="form-group">
                <label for="editAddonAvailability">Availability</label>
                <select id="editAddonAvailability" v-model="editingAddon.availability" required>
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                  <option value="Limited">Limited</option>
                </select>
              </div>
              <div class="form-group">
                <label for="editAddonImage">Add-on Image</label>
                <div class="file-upload-area">
                  <input 
                    type="file" 
                    id="editAddonImage" 
                    ref="editAddonImageInput"
                    @change="handleEditAddonImageUpload" 
                    accept="image/*" 
                    class="file-input"
                  />
                  <label for="editAddonImage" class="file-upload-label">
                    <div class="upload-icon">📁</div>
                    <span v-if="!editingAddon.imageFile">Change Image</span>
                    <span v-else>{{ editingAddon.imageFile.name }}</span>
                  </label>
                </div>
                <div class="image-preview" v-if="editingAddon.imagePreview || editingAddon.imageUrl">
                  <img :src="editingAddon.imagePreview || editingAddon.imageUrl" alt="Add-on Preview" />
                </div>
                <div v-if="editAddonImageUploading" class="upload-progress">
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: editAddonUploadProgress + '%' }"></div>
                  </div>
                  <span class="progress-text">Uploading... {{ editAddonUploadProgress }}%</span>
                </div>
              </div>
              <div class="modal-actions">
                <button type="button" class="action-btn secondary" @click="showEditAddonModal = false">Cancel</button>
                <button type="submit" class="action-btn primary" :disabled="editAddonImageUploading">Update Add-on</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Delete Add-on Modal -->
      <div v-if="showDeleteAddonModal" class="modal-overlay" @click="showDeleteAddonModal = false">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>Delete Add-on</h3>
            <button class="modal-close" @click="showDeleteAddonModal = false">&times;</button>
          </div>
          <div class="modal-body">
            <div class="warning-card">
              <div class="warning-icon">⚠️</div>
              <div class="warning-content">
                <p>Are you sure you want to delete the add-on <strong>{{ selectedAddon?.name }}</strong>?</p>
                <p class="warning-text">This action cannot be undone.</p>
              </div>
            </div>
            <div class="modal-actions">
              <button class="action-btn secondary" @click="showDeleteAddonModal = false">Cancel</button>
              <button class="action-btn danger" @click="confirmDeleteAddon">Delete Add-on</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Vehicle Modal -->
      <div v-if="showAddVehicleModal" class="modal-overlay" @click="showAddVehicleModal = false">
        <div class="modal-content modal-large" @click.stop>
          <div class="modal-header">
            <h3>Add New Vehicle</h3>
            <button class="modal-close" @click="showAddVehicleModal = false">&times;</button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitAddVehicle">
              <div class="form-row">
                <div class="form-group">
                  <label for="vehicleMake">Make</label>
                  <input type="text" id="vehicleMake" v-model="newVehicle.make" required />
                </div>
                <div class="form-group">
                  <label for="vehicleModel">Model</label>
                  <input type="text" id="vehicleModel" v-model="newVehicle.model" required />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="vehicleYear">Year</label>
                  <input type="number" id="vehicleYear" v-model="newVehicle.year" min="1900" :max="new Date().getFullYear() + 1" required />
                </div>
                <div class="form-group">
                  <label for="vehicleColor">Color</label>
                  <input type="text" id="vehicleColor" v-model="newVehicle.color" required />
                </div>
              </div>
              <div class="form-group">
                <label for="vehiclePrice">Price per Day (R)</label>
                <input type="number" id="vehiclePrice" v-model="newVehicle.price" min="0" step="0.01" required />
              </div>
              <div class="form-group">
                <label for="vehicleAvailability">Availability</label>
                <select id="vehicleAvailability" v-model="newVehicle.availability" required>
                  <option value="Available">Available</option>
                  <option value="Booked">Booked</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
              <div class="form-group">
                <label for="vehicleImage">Vehicle Image</label>
                <div class="file-upload-area">
                  <input 
                    type="file" 
                    id="vehicleImage" 
                    ref="vehicleImageInput"
                    @change="handleVehicleImageUpload" 
                    accept="image/*" 
                    class="file-input"
                    required
                  />
                  <label for="vehicleImage" class="file-upload-label">
                    <div class="upload-icon">📁</div>
                    <span v-if="!newVehicle.imageFile">Choose Image</span>
                    <span v-else>{{ newVehicle.imageFile.name }}</span>
                  </label>
                </div>
                <div class="image-preview" v-if="newVehicle.imagePreview">
                  <img :src="newVehicle.imagePreview" alt="Vehicle Preview" />
                </div>
                <div v-if="vehicleImageUploading" class="upload-progress">
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: vehicleUploadProgress + '%' }"></div>
                  </div>
                  <span class="progress-text">Uploading... {{ vehicleUploadProgress }}%</span>
                </div>
              </div>
              <div class="modal-actions">
                <button type="button" class="action-btn secondary" @click="showAddVehicleModal = false">Cancel</button>
                <button type="submit" class="action-btn primary" :disabled="vehicleImageUploading">Add Vehicle</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Edit Vehicle Modal -->
      <div v-if="showEditVehicleModal" class="modal-overlay" @click="showEditVehicleModal = false">
        <div class="modal-content modal-large" @click.stop>
          <div class="modal-header">
            <h3>Edit Vehicle</h3>
            <button class="modal-close" @click="showEditVehicleModal = false">&times;</button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitEditVehicle">
              <div class="form-row">
                <div class="form-group">
                  <label for="editVehicleMake">Make</label>
                  <input type="text" id="editVehicleMake" v-model="editingVehicle.make" required />
                </div>
                <div class="form-group">
                  <label for="editVehicleModel">Model</label>
                  <input type="text" id="editVehicleModel" v-model="editingVehicle.model" required />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="editVehicleYear">Year</label>
                  <input type="number" id="editVehicleYear" v-model="editingVehicle.year" min="1900" :max="new Date().getFullYear() + 1" required />
                </div>
                <div class="form-group">
                  <label for="editVehicleColor">Color</label>
                  <input type="text" id="editVehicleColor" v-model="editingVehicle.color" required />
                </div>
              </div>
              <div class="form-group">
                <label for="editVehiclePrice">Price per Day (R)</label>
                <input type="number" id="editVehiclePrice" v-model="editingVehicle.price" min="0" step="0.01" required />
              </div>
              <div class="form-group">
                <label for="editVehicleAvailability">Availability</label>
                <select id="editVehicleAvailability" v-model="editingVehicle.availability" required>
                  <option value="Available">Available</option>
                  <option value="Booked">Booked</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
              <div class="form-group">
                <label for="editVehicleImage">Vehicle Image</label>
                <div class="file-upload-area">
                  <input 
                    type="file" 
                    id="editVehicleImage" 
                    ref="editVehicleImageInput"
                    @change="handleEditVehicleImageUpload" 
                    accept="image/*" 
                    class="file-input"
                  />
                  <label for="editVehicleImage" class="file-upload-label">
                    <div class="upload-icon">📁</div>
                    <span v-if="!editingVehicle.imageFile">Change Image</span>
                    <span v-else>{{ editingVehicle.imageFile.name }}</span>
                  </label>
                </div>
                <div class="image-preview" v-if="editingVehicle.imagePreview || editingVehicle.imageUrl">
                  <img :src="editingVehicle.imagePreview || editingVehicle.imageUrl" alt="Vehicle Preview" />
                </div>
                <div v-if="editVehicleImageUploading" class="upload-progress">
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: editVehicleUploadProgress + '%' }"></div>
                  </div>
                  <span class="progress-text">Uploading... {{ editVehicleUploadProgress }}%</span>
                </div>
              </div>
              <div class="modal-actions">
                <button type="button" class="action-btn secondary" @click="showEditVehicleModal = false">Cancel</button>
                <button type="submit" class="action-btn primary" :disabled="editVehicleImageUploading">Update Vehicle</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Remove Vehicle Modal -->
      <div v-if="showRemoveVehicleModal" class="modal-overlay" @click="showRemoveVehicleModal = false">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>Remove Vehicle</h3>
            <button class="modal-close" @click="showRemoveVehicleModal = false">&times;</button>
          </div>
          <div class="modal-body">
            <div class="warning-card">
              <div class="warning-icon">⚠️</div>
              <div class="warning-content">
                <p>Are you sure you want to remove the vehicle <strong>{{ selectedVehicle?.make }} {{ selectedVehicle?.model }}</strong>?</p>
                <p class="warning-text">This action cannot be undone.</p>
              </div>
            </div>
            <div class="modal-actions">
              <button class="action-btn secondary" @click="showRemoveVehicleModal = false">Cancel</button>
              <button class="action-btn danger" @click="confirmRemoveVehicle">Remove Vehicle</button>
            </div>
          </div>
        </div>
      </div>


    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { userService } from '@/services/userService.js'
import { adminService } from '@/services/adminService.js'
import { sendCancellationEmail } from '@/services/contactService.js'
// Import logo for header
import LogoImage from '@/assets/Logos/FullLogo_Transparent_NoBuffer.png'
import { storage } from '@/services/firebaseConfig.js';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import ToastNotifications from '@/components/ToastNotif.vue'
import { getAuthToken } from '@/services/api.js'
import { authService } from '@/services/authService.js'

// Reactive data
const activeTab = ref('users')

// Toast notifications ref
const toastRef = ref(null)

const tabs = [
  { id: 'users', label: 'Manage Users' },
  { id: 'bookings', label: 'Manage Bookings' },
  { id: 'addons', label: 'Manage Add-ons' },
  { id: 'vehicles', label: 'Manage Vehicles' }
]

// Mock data
const users = ref([])
const usersLoading = ref(false)
const usersError = ref('')

const bookings = ref([])
const bookingsLoading = ref(false)
const bookingsError = ref('')

const vehicles = ref([])
const vehiclesLoading = ref(false)
const vehiclesError = ref('')

const addons = ref([])
const addonsLoading = ref(false)
const addonsError = ref('')

// Modal states
const showAddUserModal = ref(false)
const showViewUserModal = ref(false)
const showDeleteUserModal = ref(false)
const showExportModal = ref(false)
const showViewBookingModal = ref(false)
const showApproveBookingModal = ref(false)
const showCancelBookingModal = ref(false)
const showAddAddonModal = ref(false)
const showEditAddonModal = ref(false)
const showDeleteAddonModal = ref(false)
const showAddVehicleModal = ref(false)
const showEditVehicleModal = ref(false)
const showRemoveVehicleModal = ref(false)

// Edit booking modal state
const isEditModalOpen = ref(false)

// Selected items for modals
const selectedUser = ref(null)
const selectedBooking = ref(null)
const selectedAddon = ref(null)
const selectedVehicle = ref(null)

// Upload states
const vehicleImageUploading = ref(false)
const vehicleUploadProgress = ref(0)
const editVehicleImageUploading = ref(false)
const editVehicleUploadProgress = ref(0)
const addonImageUploading = ref(false)
const addonUploadProgress = ref(0)
const editAddonImageUploading = ref(false)
const editAddonUploadProgress = ref(0)

// Form data
const newUser = ref({ name: '', email: '', role: 'Customer', password: '' })
const newAddon = ref({ 
  name: '', 
  price: 0, 
  availability: 'Available',
  description: '', 
  imageFile: null,
  imagePreview: null,
  imageUrl: ''
})
const newVehicle = ref({ 
  name: '', 
  price: 0, 
  availability: 'Available',
  description: '', 
  imageFile: null,
  imagePreview: null,
  imageUrl: ''
})
const editingAddon = ref({ 
  id: '', 
  name: '', 
  price: 0, 
  availability: 'Available',
  description: '', 
  imageFile: null,
  imagePreview: null,
  imageUrl: ''
})
const editingVehicle = ref({ 
  id: '', 
  make: '', 
  model: '', 
  year: 0, 
  color: '', 
  price: 0, 
  availability: 'Available',
  imageFile: null,
  imagePreview: null,
  imageUrl: ''
})

// Edit booking form data
const editingBooking = ref({
  id: '',
  vehicleId: '',
  status: '',
  totalPrice: 0,
  startDate: '',
  endDate: '',
  specialRequest: '',
  adminNotes: '',
  extras: []
})

// Computed properties for price calculation
const editingBookingRentalDays = computed(() => {
  if (!editingBooking.value.startDate || !editingBooking.value.endDate) return 0
  const start = new Date(editingBooking.value.startDate)
  const end = new Date(editingBooking.value.endDate)
  const diffTime = Math.abs(end - start)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1
})

const editingBookingVehicle = computed(() => {
  if (!editingBooking.value.vehicleId) return null
  return vehicles.value.find(v => v.id === editingBooking.value.vehicleId)
})

const editingBookingSelectedExtras = computed(() => {
  return addons.value.filter(addon => editingBooking.value.extras.includes(addon.id))
})

const editingBookingCalculatedTotal = computed(() => {
  let total = 0

  // Add vehicle cost
  if (editingBookingVehicle.value && editingBookingRentalDays.value) {
    total += editingBookingVehicle.value.price * editingBookingRentalDays.value
  }

  // Add extras cost
  editingBookingSelectedExtras.value.forEach(extra => {
    total += extra.price * editingBookingRentalDays.value
  })

  return total
})

// Watchers to update total price when dates or extras change
watch([editingBookingRentalDays, editingBookingSelectedExtras], () => {
  if (editingBooking.value.id) {
    editingBooking.value.totalPrice = editingBookingCalculatedTotal.value
  }
}, { deep: true })

// Vehicle and Addon name mappings for bookings display
const vehicleNames = ref({})
const addonNames = ref({})
const vehicleNamesLoading = ref({})
const addonNamesLoading = ref({})

const exportFormat = ref('csv')
const exportDateRange = ref('all')
const cancellationReason = ref('')



// Refs for file inputs
const vehicleImageInput = ref(null)
const editVehicleImageInput = ref(null)
const addonImageInput = ref(null)
const editAddonImageInput = ref(null)

// Add after vehicleNames/addonNames
const userNames = ref({})
const userNamesLoading = ref({})

// Function to fetch user name by ID
async function fetchUserName(userId) {
  if (!userId || userNames.value[userId]) {
    return userNames.value[userId] || 'Unknown User';
  }
  if (userNamesLoading.value[userId]) {
    return 'Loading...';
  }
  userNamesLoading.value[userId] = true;
  try {
    const token = getAuthToken();
if (!token) throw new Error('No authentication token found.');
    const user = await userService.getUserById(userId, token);
    const name = user.fullname || user.name || user.email || userId;
    userNames.value[userId] = name;
    return name;
  } catch (error) {
    console.error('Error fetching user name:', error);
    userNames.value[userId] = 'Unknown User';
    return 'Unknown User';
  } finally {
    userNamesLoading.value[userId] = false;
  }
}

onMounted(async () => {
  usersLoading.value = true
  usersError.value = ''
  bookingsLoading.value = true
  bookingsError.value = ''
  vehiclesLoading.value = true
  vehiclesError.value = ''
  addonsLoading.value = true
  addonsError.value = ''
  const token = getAuthToken()
  if (!token) {
    usersError.value = 'No authentication token found.'
    bookingsError.value = 'No authentication token found.'
    vehiclesError.value = 'No authentication token found.'
    addonsError.value = 'No authentication token found.'
    usersLoading.value = false
    bookingsLoading.value = false
    vehiclesLoading.value = false
    addonsLoading.value = false
    return
  }
  // Fetch users
  try {
    const fetchedUsers = await userService.fetchAllUsers(token)
    users.value = fetchedUsers.map(u => ({
      id: u.id || u._id || u.uid || u.userId || u.email,
      name: u.fullname || u.name || `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.email,
      email: u.email,
      phoneNumber: u.phoneNumber || '',
      dateRegistered: u.dateRegistered || u.createdAt || u.registrationDate || '',
      role: u.role || 'Customer',
      // Store original data for detailed view
      originalData: u
    }))
  } catch (err) {
    usersError.value = err.message || 'Failed to fetch users.'
  } finally {
    usersLoading.value = false
  }
  // Fetch bookings
  try {
    const fetchedBookings = await adminService.fetchAllBookings(token)
    bookings.value = fetchedBookings.map(b => ({
      id: b.id || b._id || b.bookingId,
      userId: b.userId || b.userId || '',
      vehicleId: b.vehicleId || b.vehicleId || '',
      startDate: b.startDate || '',
      endDate: b.endDate || '',
      totalPrice: b.totalPrice || 0,
      status: b.status || 'pending',
      specialRequest: b.specialRequest || '',
      adminNotes: b.adminNotes || '',
      extras: b.extras || [],
      createdAt: b.createdAt || '',
      updatedAt: b.updatedAt || '',
      // Cancellation information
      cancellationReason: b.cancellationReason || '',
      cancelledBy: b.cancelledBy || '',
      cancelledAt: b.cancelledAt || '',
      // For display purposes, we'll keep some formatted fields
      user: b.userName || b.user || b.clientName || '',
      vehicle: b.vehicleName || b.vehicle || '',
      dates: b.dates || (b.startDate && b.endDate ? `${formatDate(b.startDate)} to ${formatDate(b.endDate)}` : '')
    }))
    
    // Load vehicle names for all bookings
    for (const booking of bookings.value) {
      if (booking.vehicleId) {
        fetchVehicleName(booking.vehicleId)
      }
    }
    // In onMounted, after loading bookings:
    for (const booking of bookings.value) {
      if (booking.userId) fetchUserName(booking.userId)
    }
  } catch (err) {
    bookingsError.value = err.message || 'Failed to fetch bookings.'
  } finally {
    bookingsLoading.value = false
  }
  // Fetch vehicles
  try {
    const fetchedVehicles = await adminService.fetchAllVehicles(token)
    vehicles.value = fetchedVehicles.map(v => ({
      id: v.id || v._id || v.vehicleId,
      make: v.make || '',
      model: v.model || '',
      year: v.year || new Date().getFullYear(),
      color: v.color || '',
      price: v.price || 0,
      availability: v.availability || v.status || 'Available',
      imageUrl: v.imageUrl || ''
    }))
  } catch (err) {
    vehiclesError.value = err.message || 'Failed to fetch vehicles.'
  } finally {
    vehiclesLoading.value = false
  }
  // Fetch addons
  try {
    const fetchedAddons = await adminService.fetchAllAddons(token)
    addons.value = (fetchedAddons || []).map(a => ({
      id: a.id || a._id || a.addonId,
      name: a.name || a.addonName || '',
      price: a.price || 0,
      availability: a.availability || 'Available',
      description: a.description || '',
      imageUrl: a.imageUrl || ''
    }))
  } catch (err) {
    addonsError.value = err.message || 'Failed to fetch add-ons.'
  } finally {
    addonsLoading.value = false
  }
})

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const logout = async () => {
  try {
    await authService.logout()
    toastRef.value?.showSuccess('Logged Out', 'Successfully logged out of admin dashboard')
  } catch (error) {
    console.error('Logout error:', error);
    toastRef.value?.showError('Logout Failed', error.message || 'Failed to logout')
  } finally {
    router.push('/');
  }
}

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  // Get day, month, year
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-GB', { month: 'short' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

function formatDateTime(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  // Get day, month, year, time
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-GB', { month: 'short' });
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day} ${month} ${year} ${hours}:${minutes}`;
}

// Function to fetch vehicle name by ID
async function fetchVehicleName(vehicleId) {
  if (!vehicleId || vehicleNames.value[vehicleId]) {
    return vehicleNames.value[vehicleId] || 'Unknown Vehicle';
  }
  
  if (vehicleNamesLoading.value[vehicleId]) {
    return 'Loading...';
  }
  
  vehicleNamesLoading.value[vehicleId] = true;
  
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found.');
    }
    
    const vehicle = await adminService.fetchVehicleById(vehicleId, token);
    const vehicleName = `${vehicle.make} ${vehicle.model}`;
    vehicleNames.value[vehicleId] = vehicleName;
    return vehicleName;
  } catch (error) {
    console.error('Error fetching vehicle name:', error);
    vehicleNames.value[vehicleId] = 'Unknown Vehicle';
    return 'Unknown Vehicle';
  } finally {
    vehicleNamesLoading.value[vehicleId] = false;
  }
}

// Function to fetch addon name by ID
async function fetchAddonName(addonId) {
  if (!addonId || addonNames.value[addonId]) {
    return addonNames.value[addonId] || 'Unknown Addon';
  }
  
  if (addonNamesLoading.value[addonId]) {
    return 'Loading...';
  }
  
  addonNamesLoading.value[addonId] = true;
  
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found.');
    }
    
    const addon = await adminService.fetchAddonById(addonId, token);
    
    // Handle different possible name fields
    const addonName = addon.name || addon.addonName || addon.title || 'Unknown Addon';
    addonNames.value[addonId] = addonName;
    return addonName;
  } catch (error) {
    addonNames.value[addonId] = 'Unknown Addon';
    return 'Unknown Addon';
  } finally {
    addonNamesLoading.value[addonId] = false;
  }
}

// Image upload handlers
const handleVehicleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    newVehicle.value.imageFile = file
    const reader = new FileReader()
    reader.onload = (e) => {
      newVehicle.value.imagePreview = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleEditVehicleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    editingVehicle.value.imageFile = file
    const reader = new FileReader()
    reader.onload = (e) => {
      editingVehicle.value.imagePreview = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleAddonImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    newAddon.value.imageFile = file
    const reader = new FileReader()
    reader.onload = (e) => {
      newAddon.value.imagePreview = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleEditAddonImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    editingAddon.value.imageFile = file
    const reader = new FileReader()
    reader.onload = (e) => {
      editingAddon.value.imagePreview = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// Firebase upload logic with folder parameter
const uploadImageToFirebase = (file, progressCallback, folder = 'vehicles') => {
  return new Promise((resolve, reject) => {
    const fileName = `${Date.now()}_${file.name}`;
    const imageRef = storageRef(storage, `${folder}/${fileName}`);
    const uploadTask = uploadBytesResumable(imageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Progress
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        progressCallback(progress);
      },
      (error) => {
        // Error
        reject(error);
      },
      async () => {
        // Complete
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};

// Refresh bookings function
const refreshBookings = async () => {
  bookingsLoading.value = true
  bookingsError.value = ''
  const token = getAuthToken()
  if (!token) {
    bookingsError.value = 'No authentication token found.'
    bookingsLoading.value = false
    toastRef.value?.showError('Authentication Error', 'No authentication token found.')
    return
  }
  try {
    const fetchedBookings = await adminService.fetchAllBookings(token)
    bookings.value = fetchedBookings.map(b => ({
      id: b.id || b._id || b.bookingId,
      userId: b.userId || b.userId || '',
      vehicleId: b.vehicleId || b.vehicleId || '',
      startDate: b.startDate || '',
      endDate: b.endDate || '',
      totalPrice: b.totalPrice || 0,
      status: b.status || 'pending',
      specialRequest: b.specialRequest || '',
      adminNotes: b.adminNotes || '',
      extras: b.extras || [],
      createdAt: b.createdAt || '',
      updatedAt: b.updatedAt || '',
      // Cancellation information
      cancellationReason: b.cancellationReason || '',
      cancelledBy: b.cancelledBy || '',
      cancelledAt: b.cancelledAt || '',
      user: b.userName || b.user || b.clientName || '',
      vehicle: b.vehicleName || b.vehicle || '',
      dates: b.dates || (b.startDate && b.endDate ? `${formatDate(b.startDate)} to ${formatDate(b.endDate)}` : '')
    }))
    
    // Load vehicle names for all bookings
    for (const booking of bookings.value) {
      if (booking.vehicleId) {
        fetchVehicleName(booking.vehicleId)
      }
      if (booking.userId) fetchUserName(booking.userId)
    }
    toastRef.value?.showSuccess('Bookings Refreshed', `Successfully loaded ${bookings.value.length} bookings`)
  } catch (err) {
    bookingsError.value = err.message || 'Failed to fetch bookings.'
    toastRef.value?.showError('Refresh Failed', err.message || 'Failed to fetch bookings.')
  } finally {
    bookingsLoading.value = false
  }
}

// Refresh users function
const refreshUsers = async () => {
  usersLoading.value = true
  usersError.value = ''
  const token = getAuthToken()
  if (!token) {
    usersError.value = 'No authentication token found.'
    usersLoading.value = false
    toastRef.value?.showError('Authentication Error', 'No authentication token found.')
    return
  }
  try {
    const fetchedUsers = await userService.fetchAllUsers(token)
    users.value = fetchedUsers.map(u => ({
      id: u.id || u._id || u.uid || u.userId || u.email,
      name: u.fullname || u.name || `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.email,
      email: u.email,
      phoneNumber: u.phoneNumber || '',
      dateRegistered: u.dateRegistered || u.createdAt || u.registrationDate || '',
      role: u.role || 'Customer',
      // Store original data for detailed view
      originalData: u
    }))
    toastRef.value?.showSuccess('Users Refreshed', `Successfully loaded ${users.value.length} users`)
  } catch (err) {
    usersError.value = err.message || 'Failed to fetch users.'
    toastRef.value?.showError('Refresh Failed', err.message || 'Failed to fetch users.')
  } finally {
    usersLoading.value = false
  }
}

// Modal functions
const viewUser = (user) => {
  // Use original data if available, otherwise fall back to mapped data
  selectedUser.value = user.originalData || user
  showViewUserModal.value = true
}

const deleteUser = (user) => {
  // Use original data if available, otherwise fall back to mapped data
  selectedUser.value = user.originalData || user
  showDeleteUserModal.value = true
}

const viewBooking = async (booking) => {
  selectedBooking.value = booking
  showViewBookingModal.value = true
  
  // Load addon names for the booking's extras
  if (booking.extras && booking.extras.length > 0) {
    for (const extraId of booking.extras) {
      if (extraId && !addonNames.value[extraId]) {
        fetchAddonName(extraId)
      }
    }
  }
}

const editBooking = (booking) => {
  selectedBooking.value = booking
  editingBooking.value = {
    id: booking.id,
    vehicleId: booking.vehicleId,
    status: booking.status,
    totalPrice: booking.totalPrice,
    startDate: booking.startDate,
    endDate: booking.endDate,
    specialRequest: booking.specialRequest || '',
    adminNotes: booking.adminNotes || '',
    extras: booking.extras || []
  }
  isEditModalOpen.value = true
}

const closeEditModal = () => {
  isEditModalOpen.value = false
  selectedBooking.value = null
  editingBooking.value = {
    id: '',
    status: '',
    totalPrice: 0,
    startDate: '',
    endDate: '',
    specialRequest: '',
    adminNotes: '',
    extras: []
  }
}

const saveBookingChanges = async () => {
  try {
    const token = getAuthToken()
    if (!token) {
      throw new Error('No authentication token found.')
    }

    // Prepare update data (exclude id)
    const updateData = { ...editingBooking.value }
    delete updateData.id

    // Call the adminService to update the booking
    const updatedBooking = await adminService.editBooking(editingBooking.value.id, updateData, token)

    // Update the booking in the local array
    const bookingIndex = bookings.value.findIndex(b => b.id === editingBooking.value.id)
    if (bookingIndex !== -1) {
      bookings.value[bookingIndex] = {
        ...bookings.value[bookingIndex],
        ...updatedBooking
      }
    }
    
    closeEditModal()
    toastRef.value?.showSuccess('Booking Updated', `Booking #${editingBooking.value.id} has been successfully updated`)
  } catch (error) {
    console.error('Error updating booking:', error)
    toastRef.value?.showError('Update Failed', error.message || 'Failed to update booking.')
  }
}

const approveBooking = (booking) => {
  selectedBooking.value = booking
  showApproveBookingModal.value = true
}

const cancelBooking = (booking) => {
  selectedBooking.value = booking
  showCancelBookingModal.value = true
}

const editAddon = (addon) => {
  selectedAddon.value = addon
  editingAddon.value = { 
    ...addon, 
    imageFile: null, 
    imagePreview: null 
  }
  showEditAddonModal.value = true
}

const deleteAddon = (addon) => {
  selectedAddon.value = addon
  showDeleteAddonModal.value = true
}

const editVehicle = (vehicle) => {
  selectedVehicle.value = vehicle
  editingVehicle.value = { 
    ...vehicle, 
    imageFile: null, 
    imagePreview: null 
  }
  showEditVehicleModal.value = true
}

const removeVehicle = (vehicle) => {
  selectedVehicle.value = vehicle
  showRemoveVehicleModal.value = true
}

// Form submission functions
const submitAddUser = () => {
  // Add API call here
  showAddUserModal.value = false
  newUser.value = { name: '', email: '', role: 'Customer', password: '' }
}

const confirmDeleteUser = async () => {
  try {
    const token = getAuthToken()
    if (!token) {
      throw new Error('No authentication token found.')
    }
    await adminService.deleteUser(selectedUser.value.uid || selectedUser.value.id, token)
    // Refresh the user list
    usersLoading.value = true
    usersError.value = ''
    try {
      const fetchedUsers = await userService.fetchAllUsers(token)
      users.value = fetchedUsers.map(u => ({
        id: u.id || u._id || u.uid || u.userId || u.email,
        name: u.fullname || u.name || `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.email,
        email: u.email,
        phoneNumber: u.phoneNumber || '',
        dateRegistered: u.dateRegistered || u.createdAt || u.registrationDate || '',
        role: u.role || 'Customer',
        // Store original data for detailed view
        originalData: u
      }))
    } catch (err) {
      usersError.value = err.message || 'Failed to fetch users.'
    } finally {
      usersLoading.value = false
    }
    showDeleteUserModal.value = false
    toastRef.value?.showSuccess('User Deleted', `User ${selectedUser.value.fullname || selectedUser.value.name || 'Unknown User'} has been successfully deleted`)
  } catch (error) {
    console.error('Error deleting user:', error)
    toastRef.value?.showError('Delete Failed', error.message || 'Failed to delete user.')
  }
}

const exportBookings = async () => {
  try {
    // Filter bookings based on date range
    let filteredBookings = [...bookings.value]
    const now = new Date()
    
    switch (exportDateRange.value) {
      case 'today': {
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        filteredBookings = bookings.value.filter(booking => {
          const bookingDate = new Date(booking.createdAt)
          return bookingDate >= today
        })
        break
      }
      case 'week': {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        filteredBookings = bookings.value.filter(booking => {
          const bookingDate = new Date(booking.createdAt)
          return bookingDate >= weekAgo
        })
        break
      }
      case 'month': {
        const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
        filteredBookings = bookings.value.filter(booking => {
          const bookingDate = new Date(booking.createdAt)
          return bookingDate >= monthAgo
        })
        break
      }
      case 'year': {
        const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
        filteredBookings = bookings.value.filter(booking => {
          const bookingDate = new Date(booking.createdAt)
          return bookingDate >= yearAgo
        })
        break
      }
      default: // 'all'
        filteredBookings = bookings.value
    }

    if (filteredBookings.length === 0) {
      toastRef.value?.showWarning('No Data', 'No bookings found for the selected date range')
      return
    }

    // Prepare data for export
    const exportData = await prepareBookingDataForExport(filteredBookings)

    // Export based on format
    switch (exportFormat.value) {
      case 'csv':
        exportToCSV(exportData)
        break
      case 'excel':
        exportToExcel(exportData)
        break
      case 'pdf':
        exportToPDF(exportData)
        break
      default:
        exportToCSV(exportData)
    }

    showExportModal.value = false
    toastRef.value?.showSuccess('Export Successful', `Successfully exported ${filteredBookings.length} bookings as ${exportFormat.value.toUpperCase()}`)
  } catch (error) {
    console.error('Export error:', error)
    toastRef.value?.showError('Export Failed', error.message || 'Failed to export bookings')
  }
}

// Prepare booking data for export
const prepareBookingDataForExport = async (bookingsToExport) => {
  const exportData = []
  
  for (const booking of bookingsToExport) {
    // Get user and vehicle names
    const userName = userNames.value[booking.userId] || await fetchUserName(booking.userId)
    const vehicleName = vehicleNames.value[booking.vehicleId] || await fetchVehicleName(booking.userId)
    
    // Get extras names
    const extrasNames = []
    if (booking.extras && booking.extras.length > 0) {
      for (const extraId of booking.extras) {
        const extraName = addonNames.value[extraId] || await fetchAddonName(extraId)
        extrasNames.push(extraName)
      }
    }

    exportData.push({
      'Booking ID': booking.id,
      'Customer Name': userName,
      'Vehicle': vehicleName,
      'Start Date': formatDate(booking.startDate),
      'End Date': formatDate(booking.endDate),
      'Total Price (R)': booking.totalPrice,
      'Status': booking.status,
      'Special Request': booking.specialRequest || 'N/A',
      'Admin Notes': booking.adminNotes || 'N/A',
      'Extras': extrasNames.join(', ') || 'None',
      'Created At': formatDateTime(booking.createdAt),
      'Updated At': formatDateTime(booking.updatedAt)
    })
  }
  
  return exportData
}

// Export to CSV
const exportToCSV = (data) => {
  if (data.length === 0) return
  
  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header] || ''
        // Escape commas and quotes in CSV
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`
        }
        return value
      }).join(',')
    )
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `rentaryde_bookings_${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Export to Excel (XLSX)
const exportToExcel = (data) => {
  if (data.length === 0) return
  
  // Create a simple HTML table that Excel can open
  const headers = Object.keys(data[0])
  let html = '<table border="1">'
  
  // Add headers
  html += '<tr>'
  headers.forEach(header => {
    html += `<th>${header}</th>`
  })
  html += '</tr>'
  
  // Add data rows
  data.forEach(row => {
    html += '<tr>'
    headers.forEach(header => {
      html += `<td>${row[header] || ''}</td>`
    })
    html += '</tr>'
  })
  
  html += '</table>'
  
  const blob = new Blob([html], { type: 'application/vnd.ms-excel' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `rentaryde_bookings_${new Date().toISOString().split('T')[0]}.xls`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Export to PDF
const exportToPDF = (data) => {
  if (data.length === 0) return
  
  // Create a simple HTML document for PDF
  const headers = Object.keys(data[0])
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>RentARyde Bookings Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #2D372D; text-align: center; margin-bottom: 30px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px; }
        th { background-color: #8B7355; color: white; font-weight: bold; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        .header { text-align: center; margin-bottom: 20px; }
        .logo { font-size: 24px; font-weight: bold; color: #8B7355; }
        .date { color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">RENTARYDE</div>
        <div class="date">Bookings Report - ${new Date().toLocaleDateString()}</div>
      </div>
      <table>
        <thead>
          <tr>
  `
  
  headers.forEach(header => {
    html += `<th>${header}</th>`
  })
  
  html += '</tr></thead><tbody>'
  
  data.forEach(row => {
    html += '<tr>'
    headers.forEach(header => {
      html += `<td>${row[header] || ''}</td>`
    })
    html += '</tr>'
  })
  
  html += '</tbody></table></body></html>'
  
  const blob = new Blob([html], { type: 'text/html' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `rentaryde_bookings_${new Date().toISOString().split('T')[0]}.html`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Helper functions for export modal
const getDateRangeLabel = (range) => {
  switch (range) {
    case 'today': return 'Today'
    case 'week': return 'This Week'
    case 'month': return 'This Month'
    case 'year': return 'This Year'
    default: return 'All Time'
  }
}

const getDateRangeDescription = (range) => {
  const now = new Date()
  switch (range) {
    case 'today': return `Bookings created on ${now.toLocaleDateString()}`
    case 'week': return `Bookings created in the last 7 days`
    case 'month': return `Bookings created in the last 30 days`
    case 'year': return `Bookings created in the last 12 months`
    default: return 'All bookings regardless of date'
  }
}

const getFormatDescription = (format) => {
  switch (format) {
    case 'csv': return 'Best for data analysis and spreadsheet applications'
    case 'excel': return 'Compatible with Microsoft Excel and similar applications'
    case 'pdf': return 'Formatted report suitable for printing and sharing'
    default: return ''
  }
}

const getFilteredBookingsCount = () => {
  const now = new Date()
  let filteredCount = bookings.value.length
  
  switch (exportDateRange.value) {
    case 'today': {
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      filteredCount = bookings.value.filter(booking => {
        const bookingDate = new Date(booking.createdAt)
        return bookingDate >= today
      }).length
      break
    }
    case 'week': {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      filteredCount = bookings.value.filter(booking => {
        const bookingDate = new Date(booking.createdAt)
        return bookingDate >= weekAgo
      }).length
      break
    }
    case 'month': {
      const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
      filteredCount = bookings.value.filter(booking => {
        const bookingDate = new Date(booking.createdAt)
        return bookingDate >= monthAgo
      }).length
      break
    }
    case 'year': {
      const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
      filteredCount = bookings.value.filter(booking => {
        const bookingDate = new Date(booking.createdAt)
        return bookingDate >= yearAgo
      }).length
      break
    }
  }
  
  return filteredCount
}

const getPreviewBookings = () => {
  const now = new Date()
  let filteredBookings = [...bookings.value]
  
  switch (exportDateRange.value) {
    case 'today': {
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      filteredBookings = bookings.value.filter(booking => {
        const bookingDate = new Date(booking.createdAt)
        return bookingDate >= today
      })
      break
    }
    case 'week': {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      filteredBookings = bookings.value.filter(booking => {
        const bookingDate = new Date(booking.createdAt)
        return bookingDate >= weekAgo
      })
      break
    }
    case 'month': {
      const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
      filteredBookings = bookings.value.filter(booking => {
        const bookingDate = new Date(booking.createdAt)
        return bookingDate >= monthAgo
      })
      break
    }
    case 'year': {
      const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
      filteredBookings = bookings.value.filter(booking => {
        const bookingDate = new Date(booking.createdAt)
        return bookingDate >= yearAgo
      })
      break
    }
  }
  
  // Return first 5 bookings for preview
  return filteredBookings.slice(0, 5)
}

const confirmApproveBooking = async () => {
  try {
    const token = getAuthToken()
    if (!token) {
      throw new Error('No authentication token found.')
    }

    // Call the adminService to approve the booking
    const updatedBooking = await adminService.approveBooking(selectedBooking.value.id, token)

    // Update the booking in the local array
    const bookingIndex = bookings.value.findIndex(b => b.id === selectedBooking.value.id)
    if (bookingIndex !== -1) {
      bookings.value[bookingIndex] = {
        ...bookings.value[bookingIndex],
        ...updatedBooking
      }
    }

    showApproveBookingModal.value = false
    toastRef.value?.showSuccess('Booking Approved', `Booking #${selectedBooking.value.id} has been successfully approved`)
  } catch (error) {
    console.error('Error approving booking:', error)
    toastRef.value?.showError('Approval Failed', error.message || 'Failed to approve booking.')
  }
}

const confirmCancelBooking = async () => {
  try {
    // Validate cancellation reason
    if (!cancellationReason.value || cancellationReason.value.trim() === '') {
      toastRef.value?.showError('Validation Error', 'Please provide a cancellation reason')
      return
    }

    const token = getAuthToken()
    if (!token) {
      throw new Error('No authentication token found.')
    }

    // Prepare cancellation data
    const cancellationData = {
      reason: cancellationReason.value.trim()
    }

    // Call the adminService to cancel the booking
    const updatedBooking = await adminService.cancelBooking(selectedBooking.value.id, cancellationData, token)

    // Update the booking in the local array
    const bookingIndex = bookings.value.findIndex(b => b.id === selectedBooking.value.id)
    if (bookingIndex !== -1) {
      bookings.value[bookingIndex] = {
        ...bookings.value[bookingIndex],
        ...updatedBooking
      }
    }

    // Send cancellation email to user (only if email notifications are enabled)
    try {
      // Get user settings to check email notification preferences
      let emailNotificationsEnabled = true // Default to true if we can't fetch settings
      try {
        const userSettings = await userService.getUserSettings(selectedBooking.value.userId, token)
        emailNotificationsEnabled = userSettings?.notifications?.emailNotificationsForBookings !== false
      } catch {
        // Keep default as true if we can't fetch settings
      }

      // Get user details for the email
      const user = users.value.find(u => u.id === selectedBooking.value.userId)
      if (user && user.email) {
        const cancellationEmailData = {
          name: user.name || 'Customer',
          email: user.email,
          bookingId: selectedBooking.value.id,
          vehicleName: vehicleNames.value[selectedBooking.value.vehicleId] || 'Unknown Vehicle',
          startDate: formatDate(selectedBooking.value.startDate),
          endDate: formatDate(selectedBooking.value.endDate),
          totalPrice: selectedBooking.value.totalPrice,
          cancellationReason: cancellationData.reason,
          cancelledBy: 'admin',
          cancelledAt: new Date().toISOString(),
          emailNotificationsEnabled: emailNotificationsEnabled
        }

        await sendCancellationEmail(cancellationEmailData)
      }
    } catch (emailError) {
      console.error('Failed to send cancellation email:', emailError)
      // Don't fail the cancellation if email fails, just log it
    }

    showCancelBookingModal.value = false
    cancellationReason.value = ''
    
    // Show appropriate message based on whether email was sent
    const user = users.value.find(u => u.id === selectedBooking.value.userId)
    if (user && user.email) {
      toastRef.value?.showWarning('Booking Cancelled', `Booking #${selectedBooking.value.id} has been cancelled with reason: "${cancellationData.reason}". Cancellation email sent to ${user.email}.`)
    } else {
      toastRef.value?.showWarning('Booking Cancelled', `Booking #${selectedBooking.value.id} has been cancelled with reason: "${cancellationData.reason}".`)
    }
  } catch (error) {
    console.error('Error cancelling booking:', error)
    toastRef.value?.showError('Cancellation Failed', error.message || 'Failed to cancel booking.')
  }
}

const submitAddAddon = async () => {
  try {
    if (newAddon.value.imageFile) {
      addonImageUploading.value = true
      const imageUrl = await uploadImageToFirebase(
        newAddon.value.imageFile,
        (progress) => { addonUploadProgress.value = progress },
        'addons'
      )
      newAddon.value.imageUrl = imageUrl
    }

    const token = getAuthToken()
    if (!token) {
      throw new Error('No authentication token found.')
    }

    // Prepare add-on data for API
    const addonData = {
      id: crypto.randomUUID(), // Generate a unique id for the add-on
      name: newAddon.value.name,
      price: newAddon.value.price,
      availability: newAddon.value.availability,
      description: newAddon.value.description,
      imageUrl: newAddon.value.imageUrl
    }

    // Call the adminService to create the add-on
    await adminService.createAddon(addonData, token)

    // Optionally, refresh the add-on list
    addonsLoading.value = true
    addonsError.value = ''
    try {
      const fetchedAddons = await adminService.fetchAllAddons(token)
      addons.value = (fetchedAddons || []).map(a => ({
        id: a.id || a._id || a.addonId,
        name: a.name || a.addonName || '',
        price: a.price || 0,
        availability: a.availability || 'Available',
        description: a.description || '',
        imageUrl: a.imageUrl || ''
      }))
    } catch (err) {
      addonsError.value = err.message || 'Failed to fetch add-ons.'
    } finally {
      addonsLoading.value = false
    }

    showAddAddonModal.value = false
    newAddon.value = {
      name: '',
      price: 0,
      availability: 'Available',
      description: '',
      imageFile: null,
      imagePreview: null,
      imageUrl: ''
    }
    toastRef.value?.showSuccess('Add-on Created', `Add-on "${newAddon.value.name}" has been successfully created`)
  } catch (error) {
    console.error('Error adding add-on:', error)
    toastRef.value?.showError('Creation Failed', error.message || 'Failed to add add-on.')
  } finally {
    addonImageUploading.value = false
    addonUploadProgress.value = 0
  }
}

const submitEditAddon = async () => {
  try {
    if (editingAddon.value.imageFile) {
      editAddonImageUploading.value = true
      const imageUrl = await uploadImageToFirebase(
        editingAddon.value.imageFile, 
        (progress) => { editAddonUploadProgress.value = progress },
        'addons'
      )
      editingAddon.value.imageUrl = imageUrl
    }

    const token = getAuthToken()
    if (!token) {
      throw new Error('No authentication token found.')
    }

    // Prepare update data (exclude id)
    const updateData = { ...editingAddon.value }
    delete updateData.id
    delete updateData.imageFile
    delete updateData.imagePreview

    // Call the adminService to update the add-on
    await adminService.updateAddon(editingAddon.value.id, updateData, token)

    // Refresh the add-on list
    addonsLoading.value = true
    addonsError.value = ''
    try {
      const fetchedAddons = await adminService.fetchAllAddons(token)
      addons.value = (fetchedAddons || []).map(a => ({
        id: a.id || a._id || a.addonId,
        name: a.name || a.addonName || '',
        price: a.price || 0,
        availability: a.availability || 'Available',
        description: a.description || '',
        imageUrl: a.imageUrl || ''
      }))
    } catch (err) {
      addonsError.value = err.message || 'Failed to fetch add-ons.'
    } finally {
      addonsLoading.value = false
    }

    showEditAddonModal.value = false
    toastRef.value?.showSuccess('Add-on Updated', `Add-on "${editingAddon.value.name}" has been successfully updated`)
  } catch (error) {
    console.error('Error editing addon:', error)
    toastRef.value?.showError('Update Failed', error.message || 'Failed to update add-on.')
  } finally {
    editAddonImageUploading.value = false
    editAddonUploadProgress.value = 0
  }
}

const confirmDeleteAddon = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found.')
    }
    await adminService.deleteAddon(selectedAddon.value.id, token)
    // Refresh the add-on list
    addonsLoading.value = true
    addonsError.value = ''
    try {
      const fetchedAddons = await adminService.fetchAllAddons(token)
      addons.value = (fetchedAddons || []).map(a => ({
        id: a.id || a._id || a.addonId,
        name: a.name || a.addonName || '',
        price: a.price || 0,
        availability: a.availability || 'Available',
        description: a.description || '',
        imageUrl: a.imageUrl || ''
      }))
    } catch (err) {
      addonsError.value = err.message || 'Failed to fetch add-ons.'
    } finally {
      addonsLoading.value = false
    }
    showDeleteAddonModal.value = false
    toastRef.value?.showSuccess('Add-on Deleted', `Add-on "${selectedAddon.value.name}" has been successfully deleted`)
  } catch (error) {
    console.error('Error deleting add-on:', error)
    toastRef.value?.showError('Delete Failed', error.message || 'Failed to delete add-on.')
  }
}

const submitAddVehicle = async () => {
  try {
    if (newVehicle.value.imageFile) {
      vehicleImageUploading.value = true;
      const imageUrl = await uploadImageToFirebase(
        newVehicle.value.imageFile,
        (progress) => { vehicleUploadProgress.value = progress; }
      );
      newVehicle.value.imageUrl = imageUrl;
    }

    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found.')
    }

    // Prepare vehicle data for API
    const vehicleData = {
      id: crypto.randomUUID(), // Generate a unique id for the vehicle
      make: newVehicle.value.make,
      model: newVehicle.value.model,
      year: newVehicle.value.year,
      color: newVehicle.value.color,
      price: newVehicle.value.price,
      availability: newVehicle.value.availability,
      imageUrl: newVehicle.value.imageUrl
    }

    // Call the adminService to create the vehicle
    await adminService.createVehicle(vehicleData, token)

    // Optionally, refresh the vehicle list
    vehiclesLoading.value = true
    vehiclesError.value = ''
    try {
      const fetchedVehicles = await adminService.fetchAllVehicles(token)
      vehicles.value = (fetchedVehicles || []).map(v => ({
        id: v.id || v._id || v.vehicleId,
        make: v.make || '',
        model: v.model || '',
        year: v.year || new Date().getFullYear(),
        color: v.color || '',
        price: v.price || 0,
        availability: v.availability || v.status || 'Available',
        imageUrl: v.imageUrl || ''
      }))
    } catch (err) {
      vehiclesError.value = err.message || 'Failed to fetch vehicles.'
    } finally {
      vehiclesLoading.value = false
    }

    showAddVehicleModal.value = false
    newVehicle.value = { 
      make: '', 
      model: '', 
      year: new Date().getFullYear(), 
      color: '', 
      price: 0, 
      availability: 'Available',
      imageFile: null,
      imagePreview: null,
      imageUrl: ''
    }
    toastRef.value?.showSuccess('Vehicle Added', `Vehicle ${newVehicle.value.make} ${newVehicle.value.model} has been successfully added`)
  } catch (error) {
    console.error('Error adding vehicle:', error)
    toastRef.value?.showError('Creation Failed', error.message || 'Failed to add vehicle.')
  } finally {
    vehicleImageUploading.value = false
    vehicleUploadProgress.value = 0
  }
}

const submitEditVehicle = async () => {
  try {
    if (editingVehicle.value.imageFile) {
      editVehicleImageUploading.value = true
      const imageUrl = await uploadImageToFirebase(
        editingVehicle.value.imageFile, 
        (progress) => { editVehicleUploadProgress.value = progress }
      )
      editingVehicle.value.imageUrl = imageUrl
    }

    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found.')
    }

    // Prepare update data (exclude id)
    const updateData = { ...editingVehicle.value }
    delete updateData.id
    delete updateData.imageFile
    delete updateData.imagePreview

    // Call the adminService to update the vehicle
    await adminService.updateVehicle(editingVehicle.value.id, updateData, token)

    // Refresh the vehicle list
    vehiclesLoading.value = true
    vehiclesError.value = ''
    try {
      const fetchedVehicles = await adminService.fetchAllVehicles(token)
      vehicles.value = (fetchedVehicles || []).map(v => ({
        id: v.id || v._id || v.vehicleId,
        make: v.make || '',
        model: v.model || '',
        year: v.year || new Date().getFullYear(),
        color: v.color || '',
        price: v.price || 0,
        availability: v.availability || v.status || 'Available',
        imageUrl: v.imageUrl || ''
      }))
    } catch (err) {
      vehiclesError.value = err.message || 'Failed to fetch vehicles.'
    } finally {
      vehiclesLoading.value = false
    }

    showEditVehicleModal.value = false
    toastRef.value?.showSuccess('Vehicle Updated', `Vehicle ${editingVehicle.value.make} ${editingVehicle.value.model} has been successfully updated`)
  } catch (error) {
    console.error('Error editing vehicle:', error)
    toastRef.value?.showError('Update Failed', error.message || 'Failed to update vehicle.')
  } finally {
    editVehicleImageUploading.value = false
    editVehicleUploadProgress.value = 0
  }
}

const confirmRemoveVehicle = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found.')
    }
    await adminService.deleteVehicle(selectedVehicle.value.id, token)
    // Refresh the vehicle list
    vehiclesLoading.value = true
    vehiclesError.value = ''
    try {
      const fetchedVehicles = await adminService.fetchAllVehicles(token)
      vehicles.value = (fetchedVehicles || []).map(v => ({
        id: v.id || v._id || v.vehicleId,
        make: v.make || '',
        model: v.model || '',
        year: v.year || new Date().getFullYear(),
        color: v.color || '',
        price: v.price || 0,
        availability: v.availability || v.status || 'Available',
        imageUrl: v.imageUrl || ''
      }))
    } catch (err) {
      vehiclesError.value = err.message || 'Failed to fetch vehicles.'
    } finally {
      vehiclesLoading.value = false
    }
    showRemoveVehicleModal.value = false
    toastRef.value?.showSuccess('Vehicle Removed', `Vehicle ${selectedVehicle.value.make} ${selectedVehicle.value.model} has been successfully removed`)
  } catch (error) {
    console.error('Error removing vehicle:', error)
    toastRef.value?.showError('Removal Failed', error.message || 'Failed to remove vehicle.')
  }
}









/**
 * Check availability for a specific date range using the new comprehensive system
 * @param {string} vehicleId - Vehicle ID
 * @param {string} startDate - Start date
 * @param {string} endDate - End date
 */




/**
 * Email customer about cancelled booking
 */
const emailCancelledBookingUser = () => {
  try {
    if (!selectedBooking.value?.userId) {
      toastRef.value?.showError('Email Error', 'No user information available for this booking')
      return
    }

    // Get user email from the userNames mapping or fetch it
    const userEmail = getUserEmail(selectedBooking.value.userId)
    
    if (!userEmail) {
      toastRef.value?.showError('Email Error', 'User email not found')
      return
    }

    // Create email subject and body
    const subject = `Booking #${selectedBooking.value.id} Cancellation - RentARyde`
    const body = createCancellationEmailBody(selectedBooking.value)
    
    // Open default email client
    const mailtoLink = `mailto:${userEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink, '_blank')
    
    toastRef.value?.showSuccess('Email Client Opened', 'Your default email client has been opened with a pre-filled message')
  } catch (error) {
    console.error('Error opening email client:', error)
    toastRef.value?.showError('Email Error', 'Failed to open email client')
  }
}

/**
 * Get user email by user ID
 * @param {string} userId - User ID
 * @returns {string|null} User email or null if not found
 */
const getUserEmail = (userId) => {
  // Try to find user in the users array
  const user = users.value.find(u => u.id === userId)
  if (user) {
    return user.email
  }
  
  // If not found in users array, try to get from userNames mapping
  // This is a fallback - in a real implementation, you might want to fetch the user data
  return null
}

/**
 * Create email body for cancelled booking
 * @param {Object} booking - Booking object
 * @returns {string} Email body text
 */
const createCancellationEmailBody = (booking) => {
  const vehicleName = vehicleNames.value[booking.vehicleId] || 'Unknown Vehicle'
  const cancellationReason = booking.cancellationReason || 'No specific reason provided'
  const cancelledBy = booking.cancelledBy === 'admin' ? 'our administration team' : 
                     booking.cancelledBy === 'user' ? 'you' : 'our system'
  
  let body = `Dear Customer,

We hope this email finds you well.

This is to inform you that your booking has been cancelled.

Booking Details:
- Booking ID: #${booking.id}
- Vehicle: ${vehicleName}
- Start Date: ${formatDate(booking.startDate)}
- End Date: ${formatDate(booking.endDate)}
- Total Amount: R${booking.totalPrice}

Cancellation Information:
- Cancelled By: ${cancelledBy}
- Cancellation Date: ${formatDateTime(booking.cancelledAt || new Date().toISOString())}
- Reason: ${cancellationReason}

If you have any questions about this cancellation or would like to make a new booking, please don't hesitate to contact us.

We apologize for any inconvenience this may have caused.

Best regards,
The RentARyde Team

---
This is an automated message regarding booking #${booking.id}.`

  return body
}


</script>

<style>
/* Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.admin-dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #F5E6D3 0%, #E8D5C4 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #2D372D;
}

/* Header Styles */
.dashboard-header {
  background: linear-gradient(135deg, #2D372D 0%, #1A2B1A 100%);
  color: #F5E6D3;
  padding: 1.5rem 0;
  box-shadow: 0 4px 20px rgba(45, 55, 45, 0.15);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo-image {
  height: 50px;
  width: auto;
  filter: brightness(1.1);
}

.logo-text-container {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.logo-text {
  font-size: 1.75rem;
  font-weight: 800;
  color: #F5E6D3;
  letter-spacing: 0.5px;
}

.admin-badge {
  font-size: 0.75rem;
  background: linear-gradient(135deg, #8B7355, #A0845C);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-weight: 600;
  color: #F5E6D3;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.header-btn {
  background: transparent;
  color: #F5E6D3;
  border: 2px solid rgba(245, 230, 211, 0.3);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.header-btn:hover {
  background: rgba(245, 230, 211, 0.1);
  border-color: #F5E6D3;
  transform: translateY(-1px);
}

.header-btn:active {
  transform: translateY(0);
}

/* Navigation Styles */
.dashboard-nav {
  background: #FFFFFF;
  border-bottom: 1px solid rgba(245, 230, 211, 0.5);
  padding: 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  padding: 0 2rem;
}

.nav-tab {
  background: none;
  border: none;
  padding: 1.25rem 2rem;
  font-weight: 600;
  color: #2D372D;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  position: relative;
  overflow: hidden;
}

.nav-tab::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(139, 115, 85, 0.1), rgba(160, 132, 92, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav-tab span {
  position: relative;
  z-index: 1;
}

.nav-tab:hover::before {
  opacity: 1;
}

.nav-tab.active {
  color: #8B7355;
  border-bottom-color: #8B7355;
  background: linear-gradient(135deg, rgba(139, 115, 85, 0.1), rgba(160, 132, 92, 0.1));
}

/* Main Content */
.dashboard-main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
}

.dashboard-section {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(245, 230, 211, 0.3);
  position: relative;
  overflow: hidden;
}

.dashboard-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #8B7355, #A0845C, #8B7355);
}

.section-header1 {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid rgba(245, 230, 211, 0.3);
}

.section-title2 h2 {
  color: #2D372D;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.2;
  text-align: center;
}

.section-subtitle {
  color: #8B7355;
  font-size: 1rem;
  font-weight: 500;
  opacity: 0.8;
}

.header-actions-group {
  display: flex;
  gap: 1rem;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.stat-card {
  background: linear-gradient(135deg, rgba(245, 230, 211, 0.3), rgba(232, 213, 196, 0.3));
  border: 1px solid rgba(139, 115, 85, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon.pending {
  background: linear-gradient(135deg, #FF9800, #f57c00);
}

.stat-icon.approved {
  background: linear-gradient(135deg, #4CAF50, #45a049);
}

.stat-icon.cancelled {
  background: linear-gradient(135deg, #F44336, #d32f2f);
}

.stat-icon.total {
  background: linear-gradient(135deg, #8B7355, #A0845C);
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #2D372D;
  line-height: 1;
  margin-bottom: 0.25rem;
}

.stat-label {
  color: #8B7355;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Bookings Container */
.bookings-container {
  background: #FFFFFF;
  border-radius: 12px;
  overflow: hidden;
}

/* Loading, Error, Empty States */
.loading-state,
.error-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.loading-spinner-large {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(139, 115, 85, 0.3);
  border-top: 4px solid #8B7355;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text,
.error-text,
.empty-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2D372D;
  margin-bottom: 0.5rem;
}

.error-text {
  color: #F44336;
}

.empty-subtext {
  color: #8B7355;
  font-size: 1rem;
}

.error-icon,
.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

/* Bookings Grid */
.bookings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

.booking-card {
  background: #FFFFFF;
  border: 2px solid rgba(245, 230, 211, 0.3);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.booking-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border-color: #8B7355;
}

.booking-header {
  background: linear-gradient(135deg, #2D372D, #1A2B1A);
  color: #F5E6D3;
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
}

.booking-id-section {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  
}

.booking-label {
  font-size: 0.8rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.booking-id {
  font-size: 1.1rem;
  font-weight: 700;
  font-family: 'Monaco', 'Menlo', monospace;
}

.booking-status-section {
  display: flex;
  align-items: center;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-pending {
  background: linear-gradient(135deg, #FF9800, #f57c00);
  color: #FFFFFF;
}

.status-approved {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: #FFFFFF;
}

.status-cancelled {
  background: linear-gradient(135deg, #F44336, #d32f2f);
  color: #FFFFFF;
}

.status-completed {
  background: linear-gradient(135deg, #8B7355, #A0845C);
  color: #F5E6D3;
}

.booking-content {
  padding: 1.5rem;
}

.booking-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.booking-row.full-width {
  grid-template-columns: 1fr;
}

.booking-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.field-label {
  font-size: 0.8rem;
  color: #8B7355;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.field-value {
  font-size: 0.95rem;
  color: #2D372D;
  font-weight: 500;
}

.customer-name,
.vehicle-name {
  font-weight: 600;
  color: #2D372D;
}

.price-value {
  font-weight: 700;
  color: #4CAF50;
  font-size: 1.1rem;
}

.date-value {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.9rem;
}

.date-small {
  font-size: 0.85rem;
  color: #8B7355;
}

.special-request {
  font-style: italic;
  color: #8B7355;
  background: rgba(245, 230, 211, 0.3);
  padding: 0.75rem;
  border-radius: 8px;
  border-left: 4px solid #8B7355;
}

  .cancellation-reason {
    font-style: italic;
    color: #dc3545;
    background: rgba(220, 53, 69, 0.1);
    padding: 0.75rem;
    border-radius: 8px;
    border-left: 4px solid #dc3545;
  }
  
  .required {
    color: #dc3545;
    font-weight: bold;
  }
  
  .form-help {
    color: #666;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    font-style: italic;
  }

.booking-actions {
  padding: 1rem 1.5rem;
  background: rgba(245, 230, 211, 0.2);
  border-top: 1px solid rgba(245, 230, 211, 0.5);
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

/* Action Buttons */
.action-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.action-btn span {
  position: relative;
  z-index: 1;
}

.action-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.action-btn:hover::before {
  left: 100%;
}

.action-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.action-btn.primary {
  background: linear-gradient(135deg, #8B7355, #A0845C);
  color: #F5E6D3;
  box-shadow: 0 4px 15px rgba(139, 115, 85, 0.3);
}

.action-btn.secondary {
  background: linear-gradient(135deg, #2D372D, #1A2B1A);
  color: #F5E6D3;
  box-shadow: 0 4px 15px rgba(45, 55, 45, 0.3);
}

.action-btn.success {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: #FFFFFF;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

.action-btn.danger {
  background: linear-gradient(135deg, #F44336, #d32f2f);
  color: #FFFFFF;
  box-shadow: 0 4px 15px rgba(244, 67, 54, 0.3);
}

.action-btn.small {
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  min-height: 36px;
}

/* Data Table Styles */
.data-table-container {
  background: #FFFFFF;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(245, 230, 211, 0.3);
}

.data-table {
  width: 100%;
}

/* Users Table Styles */
.users-table-header {
  display: grid;
  grid-template-columns: 2fr 2.5fr 1.5fr 1.2fr 2fr;
  background: linear-gradient(135deg, #2D372D, #1A2B1A);
  color: #F5E6D3;
}

.users-table-row {
  display: grid;
  grid-template-columns: 2fr 2.5fr 1.5fr 1.2fr 2fr;
  border-bottom: 1px solid rgba(245, 230, 211, 0.2);
  transition: all 0.3s ease;
}

.users-table-row:hover:not(.loading-row):not(.error-row) {
  background: linear-gradient(135deg, rgba(139, 115, 85, 0.05), rgba(160, 132, 92, 0.05));
  transform: translateX(4px);
}

.users-table-row:last-child {
  border-bottom: none;
}

.users-table-cell {
  padding: 1.25rem 1rem;
  display: flex;
  align-items: center;
  min-height: 60px;
  word-break: break-word;
}

.users-header-cell {
  font-weight: 700;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  justify-content: left;
}

.users-table-cell:first-child,
.users-header-cell:first-child {
  justify-content: flex-start;
  padding-left: 1.5rem;
}

.users-table-cell:last-child,
.users-header-cell:last-child {
  justify-content: center;
}

/* User Info Styles */
.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8B7355, #A0845C);
  color: #F5E6D3;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
}

.user-name {
  font-weight: 600;
  color: #2D372D;
}

.user-email {
  color: #8B7355;
  font-size: 0.9rem;
}

.date-text {
  color: #2D372D;
  font-size: 0.9rem;
}

/* Loading and Error States */
.loading-row,
.error-row {
  grid-column: 1 / -1;
}

.loading-cell,
.error-cell {
  justify-content: center;
  padding: 2rem;
  gap: 1rem;
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(139, 115, 85, 0.3);
  border-top: 3px solid #8B7355;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.error-text {
  color: #F44336;
  font-weight: 600;
}

/* Action Buttons in Table */
.action-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Badge Styles */
.role-badge,
.status-badge,
.availability-badge {
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
}

.role-badge.admin {
  background: linear-gradient(135deg, #8B7355, #A0845C);
  color: #F5E6D3;
}

.role-badge.customer {
  background: linear-gradient(135deg, #F5E6D3, #E8D5C4);
  color: #2D372D;
  border: 1px solid #8B7355;
}

.role-badge.moderator {
  background: linear-gradient(135deg, #A0845C, #B8926A);
  color: #F5E6D3;
}

.role-badge.client {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: #FFFFFF;
}

.role-badge.default {
  background: linear-gradient(135deg, #9E9E9E, #757575);
  color: #FFFFFF;
}

.status-badge.approved,
.availability-badge.available {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: #FFFFFF;
}

.status-badge.pending {
  background: linear-gradient(135deg, #FF9800, #f57c00);
  color: #FFFFFF;
}

.status-badge.cancelled {
  background: linear-gradient(135deg, #F44336, #d32f2f);
  color: #FFFFFF;
}

.availability-badge.booked,
.availability-badge.unavailable {
  background: linear-gradient(135deg, #8B7355, #A0845C);
  color: #F5E6D3;
}

.availability-badge.maintenance,
.availability-badge.limited {
  background: linear-gradient(135deg, #F44336, #d32f2f);
  color: #FFFFFF;
}

/* Cards Grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.addon-card,
.vehicle-card {
  background: #FFFFFF;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(245, 230, 211, 0.3);
  transition: all 0.3s ease;
  position: relative;
}

.addon-card:hover,
.vehicle-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
}

.card-image {
  height: 200px;
  background: linear-gradient(135deg, #F5E6D3, #E8D5C4);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.addon-card:hover .card-image img,
.vehicle-card:hover .card-image img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.card-content {
  padding: 1.5rem;
}

.card-title {
  color: #2D372D;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.card-details {
  color: #8B7355;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  font-weight: 500;
}

.card-price {
  color: #2D372D;
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.price-period {
  font-size: 0.875rem;
  color: #8B7355;
  font-weight: 500;
}

.card-actions {
  display: flex;
  gap: 0.75rem;
}

.card-actions .action-btn {
  flex: 1;
}

/* Loading and Error Cards */
.loading-card,
.error-card {
  opacity: 0.7;
}

.image-skeleton {
  width: 120px;
  height: 80px;
  background: linear-gradient(90deg, rgba(139, 115, 85, 0.1) 25%, rgba(139, 115, 85, 0.2) 50%, rgba(139, 115, 85, 0.1) 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
  border-radius: 8px;
}

.content-skeleton {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skeleton-line {
  height: 16px;
  background: linear-gradient(90deg, rgba(139, 115, 85, 0.1) 25%, rgba(139, 115, 85, 0.2) 50%, rgba(139, 115, 85, 0.1) 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
  border-radius: 4px;
}

.skeleton-line.title {
  width: 80%;
  height: 20px;
}

.skeleton-line.price {
  width: 60%;
  height: 18px;
}

.skeleton-line.details {
  width: 70%;
}

.skeleton-line.status {
  width: 50%;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.error-icon {
  font-size: 3rem;
  opacity: 0.5;
}

.card-title.error {
  color: #F44336;
}

.error-message {
  color: #F44336;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: #FFFFFF;
  border-radius: 16px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.modal-large {
  max-width: 700px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid rgba(245, 230, 211, 0.3);
}

.modal-header h3 {
  color: #2D372D;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #8B7355;
  cursor: pointer;
  padding: 0.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: rgba(139, 115, 85, 0.1);
  transform: rotate(90deg);
}

.modal-body {
  padding: 2rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(245, 230, 211, 0.3);
}

/* Form Styles */
.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2D372D;
  font-weight: 600;
  font-size: 0.9rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid rgba(245, 230, 211, 0.5);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #FFFFFF;
  color: #2D372D;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #8B7355;
  box-shadow: 0 0 0 3px rgba(139, 115, 85, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
}

/* File Upload Styles */
.file-upload-area {
  position: relative;
  margin-bottom: 1rem;
}

.file-input {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.file-upload-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border: 2px dashed #8B7355;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(245, 230, 211, 0.3), rgba(232, 213, 196, 0.3));
  color: #2D372D;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  gap: 0.5rem;
}

.file-upload-label:hover {
  background: linear-gradient(135deg, rgba(139, 115, 85, 0.1), rgba(160, 132, 92, 0.1));
  border-color: #A0845C;
  transform: translateY(-2px);
}

.upload-icon {
  font-size: 2rem;
  opacity: 0.7;
}

/* Image Preview */
.image-preview {
  margin-top: 1rem;
  border: 2px solid rgba(245, 230, 211, 0.5);
  border-radius: 12px;
  overflow: hidden;
  max-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F5E6D3;
}

.image-preview img {
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
}

/* Upload Progress */
.upload-progress {
  margin-top: 1rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(245, 230, 211, 0.5);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #8B7355, #A0845C);
  transition: width 0.3s ease;
  border-radius: 4px;
}

.progress-text {
  font-size: 0.875rem;
  color: #2D372D;
  font-weight: 600;
}

/* Detail Cards */
.detail-card {
  background: linear-gradient(135deg, rgba(245, 230, 211, 0.3), rgba(232, 213, 196, 0.3));
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.detail-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(245, 230, 211, 0.5);
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  color: #2D372D;
  font-weight: 600;
  min-width: 140px;
}

.detail-value {
  color: #8B7355;
  font-weight: 500;
  text-align: right;
}

.detail-value.admin-notes {
  background: linear-gradient(135deg, rgba(139, 115, 85, 0.1), rgba(160, 132, 92, 0.1));
  border: 1px solid rgba(139, 115, 85, 0.3);
  border-radius: 8px;
  padding: 0.75rem;
  margin-top: 0.5rem;
  font-style: italic;
  white-space: pre-wrap;
  word-break: break-word;
  text-align: left;
  max-width: 100%;
}

/* Warning and Confirmation Cards */
.warning-card,
.confirmation-card {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.warning-card {
  background: linear-gradient(135deg, rgba(244, 67, 54, 0.1), rgba(211, 47, 47, 0.1));
  border: 1px solid rgba(244, 67, 54, 0.3);
}

.confirmation-card {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(69, 160, 73, 0.1));
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.warning-icon,
.confirmation-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.warning-content,
.confirmation-content {
  flex: 1;
}

.warning-text {
  color: #F44336;
  font-style: italic;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.extra-badge {
  display: inline-block;
  background: linear-gradient(135deg, #8B7355, #A0845C);
  color: #F5E6D3;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  margin: 0.125rem;
  font-family: 'Monaco', 'Menlo', monospace;
}

/* Price Display Styles */
.price-display {
  background: linear-gradient(135deg, rgba(245, 230, 211, 0.3), rgba(232, 213, 196, 0.3));
  border: 1px solid rgba(139, 115, 85, 0.2);
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
}

.calculated-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #2D372D;
  display: block;
  margin-bottom: 0.25rem;
}

.price-note {
  color: #8B7355;
  font-size: 0.8rem;
  font-style: italic;
}

/* Price Breakdown Styles */
.price-breakdown {
  background: linear-gradient(135deg, rgba(245, 230, 211, 0.2), rgba(232, 213, 196, 0.2));
  border: 1px solid rgba(139, 115, 85, 0.2);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 0.5rem;
}

.breakdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(139, 115, 85, 0.1);
}

.breakdown-item:last-child {
  border-bottom: none;
}

.breakdown-label {
  color: #2D372D;
  font-weight: 500;
  font-size: 0.9rem;
}

.breakdown-value {
  color: #8B7355;
  font-weight: 600;
  font-size: 0.9rem;
  text-align: right;
}

.breakdown-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  margin-top: 0.5rem;
  border-top: 2px solid rgba(139, 115, 85, 0.3);
  font-weight: 700;
}

.breakdown-total .breakdown-label {
  font-size: 1rem;
  color: #2D372D;
}

.breakdown-total .breakdown-value {
  font-size: 1.1rem;
  color: #2D372D;
}

/* Rental Period Display Styles */
.rental-period-display {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(69, 160, 73, 0.1));
  border: 1px solid rgba(76, 175, 80, 0.3);
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.rental-days {
  font-size: 1.1rem;
  font-weight: 700;
  color: #2D372D;
}

.rental-dates {
  font-size: 0.9rem;
  color: #8B7355;
  font-weight: 500;
}

/* Extras Selection Styles */
.extras-selection-container {
  margin-top: 0.5rem;
}

.extras-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.75rem;
  max-height: 300px;
  overflow-y: auto;
  padding: 0.5rem;
  border: 2px solid rgba(245, 230, 211, 0.3);
  border-radius: 8px;
  background: rgba(245, 230, 211, 0.1);
}

.extra-card {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border: 2px solid rgba(139, 115, 85, 0.2);
  border-radius: 8px;
  background: #FFFFFF;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.extra-card:hover {
  border-color: #8B7355;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.extra-checkbox {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.extra-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  margin-left: 0.5rem;
}

.extra-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.extra-name {
  font-weight: 600;
  color: #2D372D;
  font-size: 0.9rem;
}

.extra-price {
  color: #8B7355;
  font-size: 0.8rem;
  font-weight: 500;
}

.checkbox-indicator {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(139, 115, 85, 0.3);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  background: #FFFFFF;
  color: transparent;
}

.extra-checkbox:checked + .extra-content .checkbox-indicator {
  background: linear-gradient(135deg, #8B7355, #A0845C);
  border-color: #8B7355;
  color: #F5E6D3;
}

.extra-checkbox:checked + .extra-content .extra-name {
  color: #8B7355;
}

  .extra-checkbox:checked + .extra-content .extra-price {
    color: #A0845C;
    font-weight: 600;
  }

/* Export Modal Styles */
.export-summary {
  margin-bottom: 2rem;
}

.summary-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(135deg, rgba(245, 230, 211, 0.3), rgba(232, 213, 196, 0.3));
  border: 1px solid rgba(139, 115, 85, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
}

.summary-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #8B7355, #A0845C);
  color: #F5E6D3;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.summary-content h4 {
  color: #2D372D;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.summary-content p {
  color: #8B7355;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.summary-content p:last-child {
  margin-bottom: 0;
}

.format-description,
.date-description {
  display: block;
  color: #8B7355;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  font-style: italic;
}

.export-preview {
  background: linear-gradient(135deg, rgba(245, 230, 211, 0.2), rgba(232, 213, 196, 0.2));
  border: 1px solid rgba(139, 115, 85, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 0.5rem;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(139, 115, 85, 0.2);
}

.preview-title {
  color: #2D372D;
  font-weight: 600;
  font-size: 0.9rem;
}

.preview-count {
  background: linear-gradient(135deg, #8B7355, #A0845C);
  color: #F5E6D3;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.preview-table {
  overflow-x: auto;
}

.preview-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.preview-table th,
.preview-table td {
  padding: 0.5rem;
  text-align: left;
  border-bottom: 1px solid rgba(139, 115, 85, 0.1);
}

.preview-table th {
  background: linear-gradient(135deg, #2D372D, #1A2B1A);
  color: #F5E6D3;
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.preview-table td {
  color: #2D372D;
  font-size: 0.8rem;
}

.preview-table tr:hover {
  background: rgba(245, 230, 211, 0.1);
}

.preview-table .status-badge {
  padding: 0.2rem 0.5rem;
  font-size: 0.7rem;
  min-width: 60px;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .header-content,
  .nav-container,
  .dashboard-main {
    max-width: 100%;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (max-width: 768px) {
  .dashboard-main {
    margin-top: 4rem;
  }

  .header-content {
    flex-direction: column;
    gap: 1rem;
    padding: 0 1rem;
  }

  .logo-text {
    font-size: 1.5rem;
  }

  .nav-container {
    flex-wrap: wrap;
    padding: 0 1rem;
  }

  .nav-tab {
    padding: 1rem 1.5rem;
    font-size: 0.875rem;
  }

  .dashboard-main {
    padding: 1.5rem 1rem;
  }

  .dashboard-section {
    padding: 1.5rem;
  }

  .section-header1 {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .section-title2 h2 {
    text-align: center;
    font-size: 1.5rem;
  }

  .bookings-grid {
    grid-template-columns: 1fr;
    padding: 0.5rem;
  }
  
  .booking-row {
    grid-template-columns: 1fr;
  }
  
  .booking-actions {
    flex-direction: column;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .header-actions-group {
    flex-direction: column;
    gap: 0.5rem;
  }

  /* Users Table Responsive */
  .users-table-header,
  .users-table-row {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .users-table-cell {
    padding: 0.75rem;
    font-size: 0.85rem;
    border-bottom: 1px solid rgba(245, 230, 211, 0.3);
    justify-content: flex-start;
  }

  .users-table-cell::before {
    content: attr(data-label);
    font-weight: 600;
    color: #8B7355;
    margin-right: 0.75rem;
    min-width: 80px;
    font-size: 0.8rem;
  }

  .users-header-cell {
    background: #8B7355;
    color: #F5E6D3;
    font-weight: 700;
  }

  .cards-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .modal-content {
    margin: 1rem;
    max-width: calc(100% - 2rem);
  }

  .modal-header,
  .modal-body,
  .modal-actions {
    padding: 1.5rem;
  }

  .detail-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .detail-label {
    min-width: auto;
  }

  .detail-value {
    text-align: left;
  }

  .detail-value.admin-notes {
    margin-top: 0.25rem;
    padding: 0.5rem;
    font-size: 0.9rem;
  }
  
  .detail-value.cancellation-reason {
    margin-top: 0.25rem;
    padding: 0.5rem;
    font-size: 0.9rem;
    background: rgba(220, 53, 69, 0.1);
    border-left: 3px solid #dc3545;
    border-radius: 4px;
    color: #721c24;
  }
  
  .extras-grid {
    grid-template-columns: 1fr;
    max-height: 250px;
  }
  
  .extra-card {
    padding: 0.5rem;
  }
  
  .extra-name {
    font-size: 0.85rem;
  }
  
  .extra-price {
    font-size: 0.75rem;
  }
  
  /* Export Modal Responsive */
  .summary-card {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }
  
  .preview-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .preview-table {
    font-size: 0.75rem;
  }
  
  .preview-table th,
  .preview-table td {
    padding: 0.25rem;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .booking-card {
    margin: 0 0.5rem;
  }
  
  .dashboard-section {
    padding: 1.5rem;
  }
}




</style>
