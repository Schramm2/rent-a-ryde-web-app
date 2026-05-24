<template>
  <NavBar />
  <main class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-background">
        <img src="@/assets/Vehicles/IMG-20250527-WA0142.jpg" alt="4x4 Adventure Background" class="hero-image" />
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <h1 class="hero-title">Your Adventure<br>Starts Here</h1>
        <p class="hero-subtitle">Explore. Drive. Conquer.</p>
        
        <!-- Booking Search Bar -->
        <div class="booking-search-container">
          <div class="booking-search-bar">
            <div class="search-field">
              <label class="search-label">Pickup Date</label>
              <input 
                type="date" 
                v-model="searchForm.pickupDate" 
                class="search-input date-input"
                :min="today"
              />
            </div>
            
            <div class="search-field">
              <label class="search-label">Return Date</label>
              <input 
                type="date" 
                v-model="searchForm.returnDate" 
                class="search-input date-input"
                :min="searchForm.pickupDate || today"
              />
            </div>
            
            <div class="search-field">
              <label class="search-label">Vehicle Type</label>
              <select v-model="searchForm.vehicleType" class="search-input select-input">
                <option value="">Choose a Vehicle</option>
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
            </div>
            
            <button class="search-button" @click="handleSearch" :disabled="vehiclesLoading">
              <span class="search-button-text">Book Now</span>
            </button>
          </div>
        </div>
        
        <!-- <button class="hero-cta" @click="goToVehicles">Browse Vehicles</button> -->
      </div>
    </section>

    <!-- Why RentARyde Section -->
    <section class="why-section">
      <div class="container">
        <h2 class="section-title1">Why RentARyde?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <FontAwesomeIcon icon="fa-solid fa-shield-halved" style="font-size: 40px; color: #fff;" />
            </div>
            <h3 class="feature-title">Ruggedly Modified 4x4 Jimny</h3>
            <p class="feature-description">For the explorers, overlanders, and trail seekers that want to conquer any
              terrain.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <FontAwesomeIcon icon="fa-solid fa-globe-africa" style="font-size: 40px; color: #fff;" />
            </div>
            <h3 class="feature-title">Cross-Border Friendly</h3>
            <p class="feature-description">Explore beyond borders with our internationally approved rental fleet.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <FontAwesomeIcon icon="fa-solid fa-calendar-check" style="font-size: 40px; color: #fff;" />
            </div>
            <h3 class="feature-title">Easy Online Booking</h3>
            <p class="feature-description">Simple, fast, and secure online booking system for your convenience.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <FontAwesomeIcon icon="fa-solid fa-campground" style="font-size: 40px; color: #fff;" />
            </div>
            <h3 class="feature-title">Adventure Ready</h3>
            <p class="feature-description">Fully equipped vehicles with camping gear and off-road essentials.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <FontAwesomeIcon icon="fa-solid fa-tents" style="font-size: 40px; color: #fff;" />
            </div>
            <h3 class="feature-title">Camp With Confidence</h3>
            <p class="feature-description">Add on camping equipment available - just pack your sense of adventure.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <FontAwesomeIcon icon="fa-solid fa-binoculars" style="font-size: 40px; color: #fff;" />
            </div>
            <h3 class="feature-title">Adventures with Travis Duggan 4x4</h3>
            <p class="feature-description">From training to trail - explore KZN with the industry's finest.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Choose Your Ride Section -->
    <section class="vehicles-section">
      <div class="container">
        <h2 class="section-title1">Choose Your Ride</h2>
        <div class="vehicles-grid">
          <div class="vehicle-card" @click="goToVehicles">
            <div class="vehicle-image">
              <img src="@/assets/Vehicles/IMG-20250527-WA0152.jpg" alt="Suzuki Jimny 4x4" />
            </div>
            <div class="vehicle-info">
              <h3 class="vehicle-name">Suzuki Jimny 4x4</h3>
              <p class="vehicle-description">Compact but mighty, perfect for tight trails and urban adventures.</p>
              <div class="vehicle-features">
                <span class="feature-tag">Automatic</span>
                <span class="feature-tag">4WD</span>
                <span class="feature-tag">2 Seats</span>
              </div>
              <div class="vehicle-price">R1 600 per day</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Plan Your Adventure Section -->
    <section class="adventure-section">
      <div class="container">
        <div class="adventure-content">
          <div class="adventure-text">
            <h2 class="section-title1">Plan Your Adventure</h2>
            <p class="adventure-description">
              From the rugged mountains of the Drakensberg to the vast expanses of the Kalahari,
              South Africa offers endless opportunities for 4x4 adventures. Our vehicles are
              equipped with everything you need for multi-day expeditions.
            </p>
            <ul class="adventure-features">
              <li>GPS Navigation & Route Planning Assistance</li>
              <li>Camping Equipment Readily Available</li>
              <li>Trail Training & Support Available</li>
              <li>Comprehensive Assitance & Support</li>
            </ul>
            <button class="btn btn-secondary" @click="goToBookings">Book With Us Now!</button>
          </div>
          <div class="adventure-image">
            <img src="@/assets/Extras/468546418_10162032921262527_1190987150325886801_n.jpg"
              alt="Off-road map and trails" />
          </div>
        </div>
      </div>
    </section>

    <!-- Community Section -->
    <section class="connect-section">
      <div class="container">
        <div class="connect-content">
          <h2 class="section-title1">Connect With Us</h2>
          <p class="connect-description">
            Follow our adventures, get the latest updates, and join our community
            of off-road enthusiasts across all our social media platforms.
          </p>
          <div class="social-buttons">
            <a href="https://www.facebook.com/people/Rent-A-Ryde/61575497434092/" class="social-btn facebook"
              aria-label="Follow us on Facebook" target="_blank" rel="noopener noreferrer">
              <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </a>

            <a href="https://www.instagram.com/renta.ryde/" class="social-btn instagram"
              aria-label="Follow us on Instagram" target="_blank" rel="noopener noreferrer">
              <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>Instagram</span>
            </a>

            <a href="https://www.tiktok.com/@rent.a.ryde?lang=en-GB" class="social-btn tiktok"
              aria-label="Follow us on TikTok" target="_blank" rel="noopener noreferrer">
              <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
              <span>TikTok</span>
            </a>

            <a href="https://wa.me/+27721301912" class="social-btn whatsapp" aria-label="Contact us on WhatsApp"
              target="_blank" rel="noopener noreferrer">
              <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
  <Footer />
  <ToastNotif ref="toastRef" />
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
import Footer from '../components/FooterComp.vue'
import ToastNotif from '../components/ToastNotif.vue'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCampground, faShieldHalved, faGlobeAfrica, faCalendarCheck, faTents, faBinoculars } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { adminService } from '../services/adminService.js'

library.add(faCampground)
library.add(faShieldHalved)
library.add(faGlobeAfrica)
library.add(faCalendarCheck)
library.add(faTents)
library.add(faBinoculars)

const isLoading = ref(true)
const router = useRouter()

// Toast notification ref
const toastRef = ref(null)

// Vehicle data
const vehicles = ref([])
const vehiclesLoading = ref(false)
const vehiclesError = ref('')

// Search form reactive data
const searchForm = ref({
  pickupDate: '',
  returnDate: '',
  vehicleType: ''
})

// Get today's date in YYYY-MM-DD format
const today = computed(() => {
  const date = new Date()
  return date.toISOString().split('T')[0]
})

// Fetch vehicles on component mount
const fetchVehicles = async () => {
  vehiclesLoading.value = true
  vehiclesError.value = ''
  
  try {
    const token = sessionStorage.getItem('authToken')
    const fetchedVehicles = await adminService.fetchAllVehicles(token)
    vehicles.value = (fetchedVehicles || []).map(v => ({
      id: v.id || v._id || v.vehicleId,
      name: v.make && v.model ? `${v.make} ${v.model}` : v.name || '',
      price: typeof v.price === 'number' ? `R${v.price.toLocaleString()}` : (v.price || ''),
      dailyRate: typeof v.price === 'number' ? v.price : parseInt((v.price || '').replace(/\D/g, '')) || 0
    }))
    
    
  } catch (err) {
    const errorMessage = err.message || 'Failed to load vehicles.'
    vehiclesError.value = errorMessage
    console.error('Error fetching vehicles:', err)
    toastRef.value?.showError('Loading Failed', errorMessage)
  } finally {
    vehiclesLoading.value = false
  }
}

const goToVehicles = () => {
  router.push('/vehicles')
}

const goToBookings = () => {
  router.push('/bookings')
}

const handleSearch = () => {
  // Validate form
  if (!searchForm.value.pickupDate || !searchForm.value.returnDate) {
    toastRef.value?.showWarning('Missing Dates', 'Please select both pickup and return dates')
    return
  }
  
  if (!searchForm.value.vehicleType) {
    toastRef.value?.showWarning('No Vehicle Selected', 'Please select a vehicle type')
    return
  }
  
  // Validate date logic
  const pickupDate = new Date(searchForm.value.pickupDate)
  const returnDate = new Date(searchForm.value.returnDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  if (pickupDate < today) {
    toastRef.value?.showError('Invalid Pickup Date', 'Pickup date cannot be in the past')
    return
  }
  
  if (returnDate <= pickupDate) {
    toastRef.value?.showError('Invalid Return Date', 'Return date must be after pickup date')
    return
  }
  
  // Show success message
  toastRef.value?.showSuccess('Search Initiated', 'Redirecting to booking page with your selections')
  
  // Navigate to bookings with search parameters
  router.push({
    path: '/bookings',
    query: {
      pickup: searchForm.value.pickupDate,
      return: searchForm.value.returnDate,
      vehicle: searchForm.value.vehicleType
    }
  })
}

onMounted(() => {
  isLoading.value = false
  fetchVehicles()
})
</script>

<style scoped>
/* Global Styles */
.home {
  font-family: 'Arial', sans-serif;
  color: #2D372D;
  line-height: 1.6;
  margin-top: 4rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-title1 {
  font-size: 2.5rem;
  font-weight: 900;
  text-align: center;
  margin-bottom: 3rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #2D372D;
}

.btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
  text-decoration: none;
}

.btn-primary {
  background: #8B7355;
  color: #F5E6D3;
}

.btn-primary:hover {
  background: #A0845C;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(139, 115, 85, 0.3);
}

.btn-secondary {
  background: #2D372D;
  color: #F5E6D3;
}

.btn-secondary:hover {
  background: #3D473D;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(45, 55, 45, 0.3);
}

/* Hero Section */
.hero {
  position: relative;
  height: 100vh;
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
  transform: scaleX(-1);
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(45, 55, 45, 0.6);
  z-index: -1;
}

.hero-content {
  text-align: center;
  color: #F5E6D3;
  z-index: 1;
  max-width: 1200px;
  width: 100%;
  padding: 0 2rem;
}

.hero-title {
  font-size: 4rem;
  font-weight: 900;
  margin-top: -3rem;
  margin-bottom: 1rem;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-left: -6rem;
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 900;
  margin-bottom: 1rem;
  letter-spacing: 2px;
  color: #F5E6D3;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  text-align: left;
  margin-left: -6rem;
}

/* Booking Search Bar */
.booking-search-container {
  margin-bottom: 3rem;
  width: 100%;
  display: flex;
  justify-content: left;
  margin-left: -6rem;
}

.booking-search-bar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(139, 115, 85, 0.2);
  display: flex;
  align-items: end;
  gap: 1rem;
  max-width: 700px;
  width: 100%;
  transition: all 0.3s ease;
  flex-wrap: wrap;
}

.booking-search-bar:hover {
  transform: translateY(-2px);
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.4);
}

.search-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  min-width: 150px;
}

.search-label {
  font-size: 0.9rem;
  font-weight: 700;
  color: #2D372D;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.search-input {
  padding: 1rem;
  border: 2px solid #E5E5E5;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  color: #2D372D;
  background: white;
  transition: all 0.3s ease;
  outline: none;
  height: 56px;
  box-sizing: border-box;
}

.search-input:focus {
  border-color: #8B7355;
  box-shadow: 0 0 0 3px rgba(139, 115, 85, 0.1);
  transform: translateY(-1px);
}

.search-input:hover {
  border-color: #A0845C;
}

.date-input {
  cursor: pointer;
}

.select-input {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

.search-button {
  background: linear-gradient(135deg, #8B7355 0%, #A0845C 100%);
  color: #F5E6D3;
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;
  font-weight: 800;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 115, 85, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  flex-shrink: 0;
  align-self: end;
}

.search-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #A0845C 0%, #B8956A 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 115, 85, 0.4);
}

.search-button:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.search-button:active {
  transform: translateY(0);
}

.search-button-text {
  font-weight: 800;
}

.hero-cta {
  background: #8B7355;
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
  box-shadow: 0 4px 15px rgba(139, 115, 85, 0.3);
}

.hero-cta:hover {
  background: #A0845C;
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(139, 115, 85, 0.4);
}

/* Why Section */
.why-section {
  padding: 6rem 0;
  background: #F5E6D3;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 3px solid transparent;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  border-color: #8B7355;
}

.feature-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: #8B7355;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-icon img {
  width: 40px;
  height: 40px;
  filter: brightness(0) invert(1);
}

.feature-title {
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: #2D372D;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.feature-description {
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
}

/* Vehicles Section */
.vehicles-section {
  padding: 6rem 0;
  background: white;
}

.vehicles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
}

.vehicle-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 3px solid transparent;
  cursor: pointer;
}

.vehicle-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  border-color: #8B7355;
}

.vehicle-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.vehicle-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.vehicle-card:hover .vehicle-image img {
  transform: scale(1.05);
}

.vehicle-info {
  padding: 2rem;
}

.vehicle-name {
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: #2D372D;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.vehicle-description {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.vehicle-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.feature-tag {
  background: #F5E6D3;
  color: #2D372D;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.vehicle-price {
  font-size: 1.8rem;
  font-weight: 900;
  color: #8B7355;
  margin-bottom: 1.5rem;
}

/* Adventure Section */
.adventure-section {
  padding: 6rem 0;
  background: #2D372D;
  color: #F5E6D3;
}

.adventure-section .section-title1 {
  color: #F5E6D3;
}

.adventure-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.adventure-description {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.adventure-features {
  list-style: none;
  padding: 0;
}

.adventure-features li {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 500;
}

.adventure-features li::before {
  content: '✓';
  color: #8B7355;
  font-weight: bold;
  margin-right: 1rem;
  font-size: 1.2rem;
}

.adventure-image {
  height: 400px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.adventure-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Connect Section */
.connect-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, #8B7355 0%, #A0845C 100%);
}

.connect-section .section-title1 {
  color: #2D372D;
}

.connect-content {
  text-align: center;
}

.connect-description {
  font-size: 1.2rem;
  color: #2D372D;
  max-width: 700px;
  margin: 0 auto 3rem;
  line-height: 1.8;
}

.social-buttons {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.social-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: #2D372D;
  color: #F5E6D3;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  min-width: 180px;
  justify-content: center;
}

.social-btn:hover {
  background: #8B7355;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(139, 115, 85, 0.3);
}

.social-icon {
  width: 24px;
  height: 24px;
}

.social-btn.facebook:hover {
  background: #1877F2;
}

.social-btn.instagram:hover {
  background: #E4405F;
}

.social-btn.youtube:hover {
  background: #FF0000;
}

.social-btn.tiktok:hover {
  background: #000000;
}

.social-btn.whatsapp:hover {
  background: #25D366;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .hero-title {
    font-size: 3.5rem;
    margin-left: -6rem;
  }
  
  .hero-subtitle {
    margin-left: -6rem;
  }
  
  .booking-search-container {
    margin-left: -6rem;
  }
}

@media (max-width: 1024px) {
  .hero-title {
    font-size: 3rem;
    margin-left: 2rem;
  }
  
  .hero-subtitle {
    margin-left: 2rem;
  }
  
  .booking-search-container {
    margin-left: 2rem;
  }
  .search-button{
    align-self: flex-start;
  }
  .search-label{
    text-align: left;
  }
  
  
  .booking-search-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    padding: 1.2rem;
    max-width: 600px;
  }
}

@media (max-width: 768px) {
  .home {
    margin-top: 4rem;
  }

  .hero-title {
    font-size: 2.5rem;
    margin-left: 0;
    text-align: left;
  }

  .hero-subtitle {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    margin-left: 0;
    text-align: left;
  }

  /* Hide booking search bar on mobile */
  .booking-search-container {
    display: none;
  }

  .section-title1 {
    font-size: 2rem;
  }

  .adventure-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .adventure-section .section-title1 {
    font-size: 2rem;
  }

  .vehicles-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .container {
    padding: 0 1.5rem;
  }

  .social-buttons {
    gap: 1rem;
  }

  .social-btn {
    min-width: 150px;
    padding: 0.8rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
    text-align: left;
  }

  .hero-subtitle {
    font-size: 1rem;
    text-align: left;
  }

  .hero-cta {
    padding: 1rem 2rem;
    font-size: 1rem;
  }

  .section-title1 {
    font-size: 1.8rem;
  }
  
  /* Ensure booking search is hidden on very small screens */
  .booking-search-container {
    display: none;
  }
}
</style>