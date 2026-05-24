<template>
  <header class="navbar">
    <div class="navbar-container">
      <!-- Logo -->
      <div class="navbar-logo">
        <img 
          src="@/assets/Logos/FullLogo_Transparent_NoBuffer.png" 
          alt="RentARyde Logo" 
          class="logo-image" 
        />
        <span class="logo-text">RentARyde</span>
      </div>

      <!-- Desktop Navigation -->
      <nav class="navbar-nav" :class="{ 'navbar-nav--open': isMenuOpen }">
        <ul class="nav-links">
          <li><a href="/" class="nav-link">Home</a></li>
          <li><a href="/vehicles" class="nav-link">Vehicles</a></li>
          <li><a href="/bookings" class="nav-link">Bookings</a></li>
          <li><a href="/about" class="nav-link">About</a></li>
          <li><a href="/contact" class="nav-link">Contact</a></li>
          
          <!-- Dropdown Menu -->
          <li class="dropdown-container">
            <button 
              class="dropdown-trigger"
              @click="toggleDropdown"
              :class="{ 'dropdown-trigger--open': isDropdownOpen }"
              aria-label="More options"
            >
              <span class="dropdown-text">More</span>
              <ChevronDownIcon class="dropdown-icon" :class="{ 'rotate-180': isDropdownOpen }" />
            </button>
            
            <div 
              class="dropdown-menu"
              :class="{ 'dropdown-menu--open': isDropdownOpen }"
            >
              <ul class="dropdown-links">
                <li><a href="/training" class="dropdown-link" @click="closeDropdown">Training</a></li>
                <li><a href="/legal" class="dropdown-link" @click="closeDropdown">Legal Information</a></li>
                <li><a href="/faq" class="dropdown-link" @click="closeDropdown">FAQ</a></li>
                
                <li v-if="isAdmin"><a href="/admin" class="dropdown-link" @click="goToAdminDashboard">Admin Dashboard</a></li>
              </ul>
            </div>
          </li>
        </ul>

        <!-- Mobile Auth Buttons (inside mobile menu) -->
        <div class="mobile-auth" v-if="isMenuOpen && authIsReady">
          <template v-if="!isLoggedIn">
            <button class="btn btn-outline" @click="goToLogin" :disabled="isLoggingIn">
              <span v-if="isLoggingIn" class="spinner"></span>
              <span>Login</span>
            </button>
            <button class="btn btn-primary" @click="goToSignup" :disabled="isRegistering">
              <span v-if="isRegistering" class="spinner"></span>
              <span>Register</span>
            </button>
          </template>
                  <template v-else>
          <button class="btn btn-outline" @click="goToProfile" :disabled="isGoingToProfile">
            <span v-if="isGoingToProfile" class="spinner"></span>
            <UserIcon class="profile-icon" />
            <span>Profile</span>
          </button>
          <button class="btn btn-outline" @click="logout" :disabled="isLoggingOut">
            <span v-if="isLoggingOut" class="spinner"></span>
            <span>Logout</span>
          </button>
        </template>
        </div>
      </nav>

      <!-- Desktop Auth Buttons or Placeholder -->
      <div class="navbar-auth" v-if="authIsReady">
        <template v-if="!isLoggedIn">
          <button class="btn btn-outline" @click="goToLogin" :disabled="isLoggingIn">
            <span v-if="isLoggingIn" class="spinner"></span>
            <span>Login</span>
          </button>
          <button class="btn btn-primary" @click="goToSignup" :disabled="isRegistering">
            <span v-if="isRegistering" class="spinner"></span>
            <span>Register</span>
          </button>
        </template>
        <template v-else>
          <button class="btn btn-outline" @click="goToProfile" :disabled="isGoingToProfile">
            <span v-if="isGoingToProfile" class="spinner"></span>
            <UserIcon class="profile-icon" />
            <span>Profile</span>
          </button>
          <button class="btn btn-outline" @click="logout" :disabled="isLoggingOut">
            <span v-if="isLoggingOut" class="spinner"></span>
            <span>Logout</span>
          </button>
        </template>
      </div>
      <div class="navbar-auth-placeholder" v-else>
        <div class="shimmer"></div>
      </div>

      <!-- Mobile Menu Toggle -->
      <button 
        class="navbar-toggle"
        @click="toggleMenu"
        :class="{ 'navbar-toggle--open': isMenuOpen }"
        aria-label="Toggle navigation menu"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronDown as ChevronDownIcon, User as UserIcon } from 'lucide-vue-next'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/services/firebaseConfig.js'
import { db } from '@/services/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { authService } from '@/services/authService.js'

const router = useRouter()
const isMenuOpen = ref(false)
const isDropdownOpen = ref(false)

// Auth state
const isLoggedIn = ref(false)
const isAdmin = ref(false)
const authIsReady = ref(false)

// Loading states for auth buttons
const isLoggingIn = ref(false)
const isRegistering = ref(false)
const isLoggingOut = ref(false)
const isGoingToProfile = ref(false)

const checkAuth = async () => {
  const user = auth.currentUser
  
  if (user) {
    isLoggedIn.value = true
    // Check if user is admin
    try {
      const userDocRef = doc(db, 'users', user.uid)
      const userSnap = await getDoc(userDocRef)
      if (userSnap.exists() && userSnap.data().role === 'admin') {
        isAdmin.value = true
      } else {
        isAdmin.value = false
      }
    } catch (error) {
      console.error('Error checking admin role:', error)
      isAdmin.value = false
    }
  } else {
    isLoggedIn.value = false
    isAdmin.value = false
  }
}

const logout = async () => {
  isLoggingOut.value = true
  try {
    await authService.logout()
    router.push('/')
    isLoggedIn.value = false
    isAdmin.value = false
  } catch (error) {
    alert(error.message || 'Logout failed')
  } finally {
    isLoggingOut.value = false
  }
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  // Close dropdown when mobile menu toggles
  if (isMenuOpen.value) {
    isDropdownOpen.value = false
  }
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}

const closeMenu = () => {
  isMenuOpen.value = false
  isDropdownOpen.value = false
}

const goToLogin = () => {
  isLoggingIn.value = true
  router.push('/login').finally(() => {
    isLoggingIn.value = false
  })
}

const goToSignup = () => {
  isRegistering.value = true
  router.push('/signup').finally(() => {
    isRegistering.value = false
  })
}

const goToProfile = () => {
  isGoingToProfile.value = true
  router.push('/profile').finally(() => {
    isGoingToProfile.value = false
  })
}

const goToAdminDashboard = () => {
  router.push('/admin')
  closeMenu()
}

const handleResize = () => {
  if (window.innerWidth > 768) {
    isMenuOpen.value = false
    isDropdownOpen.value = false
  }
}

const handleClickOutside = (event) => {
  if (!event.target.closest('.dropdown-container')) {
    isDropdownOpen.value = false
  }
  if (!event.target.closest('.navbar-container') && isMenuOpen.value) {
    closeMenu()
  }
}

onMounted(() => {
  authIsReady.value = false;
  checkAuth();
  window.addEventListener('storage', () => checkAuth());
  window.addEventListener('resize', handleResize);
  document.addEventListener('click', handleClickOutside);

  // Listen to Firebase Auth state changes
  onAuthStateChanged(auth, () => {
    checkAuth();
    authIsReady.value = true;
  });
});

onUnmounted(() => {
  window.removeEventListener('storage', checkAuth)
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('click', handleClickOutside)
})
</script>
<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(45, 55, 45, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(139, 115, 85, 0.2);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  z-index: 1000;
  font-family: 'Arial', sans-serif;
  transition: all 0.3s ease;
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 2rem;
  position: relative;
  min-height: 80px;
}

.navbar-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  height: 100%;
  flex-shrink: 0;
  margin-left: -5rem;
}

.navbar-logo:hover {
  transform: scale(1.02);
}

.logo-image {
  height: 75px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15));
  transition: filter 0.3s ease;
  background: linear-gradient(135deg, #F5E6D3, #E8D5B5);
  border-radius: 12px;
  padding: 6px 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(139, 115, 85, 0.3);
}

.logo-image:hover {
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2));
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  border-color: rgba(139, 115, 85, 0.5);
}

.logo-text {
  font-size: 1.4rem;
  font-weight: 800;
  color: #F5E6D3;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-family: 'Arial Black', Arial, sans-serif;
  white-space: nowrap;
}

.navbar-nav {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 3rem;
  justify-content: center;
  align-items: center;
}

.nav-link {
  color: #F5E6D3;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  padding: 0.75rem 0;
  position: relative;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.nav-link:hover {
  color: #8B7355;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #8B7355, #A0845C);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover::after {
  width: 100%;
}

.navbar-auth {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-shrink: 0;
}

.btn {
  padding: 0.7rem 1.8rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn:hover::before {
  left: 100%;
}

.btn-outline {
  background: transparent;
  color: #F5E6D3;
  border: 2px solid #8B7355;
}

.btn-outline:hover {
  background: #8B7355;
  color: #F5E6D3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 115, 85, 0.3);
}

.btn-primary {
  background: linear-gradient(135deg, #8B7355, #A0845C);
  color: #F5E6D3;
  border: 2px solid transparent;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #A0845C, #B8926A);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(139, 115, 85, 0.4);
}

.profile-icon {
  width: 18px;
  height: 18px;
  color: inherit;
  transition: all 0.3s ease;
}

.navbar-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: background-color 0.3s ease;
  flex-shrink: 0;
}

.navbar-toggle:hover {
  background-color: rgba(139, 115, 85, 0.1);
}

.navbar-toggle:active {
  background-color: rgba(139, 115, 85, 0.2);
}

.hamburger-line {
  width: 100%;
  height: 3px;
  background: #F5E6D3;
  margin: 3px 0;
  transition: 0.3s;
  border-radius: 2px;
}

.navbar-toggle--open .hamburger-line:nth-child(1) {
  transform: rotate(-45deg) translate(-6px, 6px);
}

.navbar-toggle--open .hamburger-line:nth-child(2) {
  opacity: 0;
}

.navbar-toggle--open .hamburger-line:nth-child(3) {
  transform: rotate(45deg) translate(-6px, -6px);
}

/* Dropdown Styles */
.dropdown-container {
  position: relative;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #F5E6D3;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  padding: 0.75rem 0;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
  background: none;
  border: none;
  white-space: nowrap;
}

.dropdown-trigger:hover {
  color: #8B7355;
}

.dropdown-trigger::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #8B7355, #A0845C);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.dropdown-trigger:hover::after {
  width: 100%;
}

.dropdown-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}

.rotate-180 {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(45, 55, 45, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(139, 115, 85, 0.2);
  border-radius: 8px;
  padding: 1rem 0;
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  z-index: 1001;
}

.dropdown-menu--open {
  opacity: 1;
  visibility: visible;
}

.dropdown-links {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown-links li {
  margin: 0;
}

.dropdown-link {
  display: block;
  padding: 0.75rem 1.5rem;
  color: #F5E6D3;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.dropdown-link:hover {
  background: rgba(139, 115, 85, 0.2);
  color: #8B7355;
  padding-left: 2rem;
}

.dropdown-link:last-child {
  border-top: 1px solid rgba(139, 115, 85, 0.2);
  margin-top: 0.5rem;
  padding-top: 1rem;
}

/* Admin Dashboard Link Styling */
.dropdown-link[href="/admin"] {
  background: linear-gradient(135deg, rgba(139, 115, 85, 0.1), rgba(160, 132, 92, 0.1));
  border-left: 3px solid #8B7355;
  font-weight: 600;
}

.dropdown-link[href="/admin"]:hover {
  background: linear-gradient(135deg, rgba(139, 115, 85, 0.2), rgba(160, 132, 92, 0.2));
  border-left-color: #A0845C;
}

/* Mobile Auth Buttons */
.mobile-auth {
  display: none;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(139, 115, 85, 0.2);
  margin-top: 1rem;
  width: 100%;
}

.navbar-auth-placeholder {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 180px;
  height: 44px;
  justify-content: flex-end;
}
.shimmer {
  width: 120px;
  height: 36px;
  border-radius: 8px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f5e6d3 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite linear;
  opacity: 0.25;
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  border: 2.5px solid #8B7355;
  border-top: 2.5px solid #f5e6d3;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  vertical-align: middle;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@media (min-width: 1360px) and (max-width: 1440px) {
  .navbar-logo{
    margin-left: -1.5rem;
  }
  .nav-links{
    margin-left: 1rem;
    margin-right: 1rem;
    gap: 0.5rem;
  }
  
}
@media (min-width: 1280px) and (max-width: 1360px) {
  .navbar-container {
    padding: 0.75rem 1.5rem;
  }
  
  .navbar-logo {
    margin-left: -3rem;
  }
  
  .logo-text {
    font-size: 1.25rem;
  }
  
  .logo-image {
    height: 65px;
  }
  
  .nav-links {
    gap: 2rem;
    margin-left: 1rem;
    margin-right: 1rem;
  }
  
  .nav-link {
    font-size: 0.9rem;
  }
  
  .dropdown-trigger {
    font-size: 0.9rem;
  }
  
  .btn {
    padding: 0.65rem 1.6rem;
    font-size: 0.85rem;
  }
}

/* Tablet Styles */
@media (min-width: 769px) and (max-width: 1024px) {
  .navbar-container {
    padding: 0.75rem 1.5rem;
  }
  .navbar-logo {
    margin-left: -1rem;
  }
  
  .logo-text {
    font-size: 1.2rem;
    margin-right: 0.5rem;
  }
  
  .logo-image {
    height: 55px;
  }
  
  .nav-links {
    gap: 1.5rem;
  }
  
  .nav-link {
    font-size: 0.9rem;
  }
  
  .dropdown-trigger {
    font-size: 0.9rem;
  }
  
  .btn {
    padding: 0.6rem 1.4rem;
    font-size: 0.85rem;
  }
}

/* iPad Pro Specific Styles (1024px-1280px) */
@media (min-width: 1024px) and (max-width: 1280px) {
  .navbar-container {
    padding: 0.75rem 1.5rem;
  }
  
  .navbar-logo {
    margin-left: -0.5rem;
  }
  
  .logo-text {
    font-size: 1.15rem;
  }
  
  .logo-image {
    height: 60px;
    padding: 4px 6px;
  }
  
  .nav-links {
    gap: 2rem;
  }
  
  .nav-link {
    font-size: 0.85rem;
  }
  
  .dropdown-trigger {
    font-size: 0.85rem;
  }
  
  .btn {
    padding: 0.55rem 1.3rem;
    font-size: 0.8rem;
  }
}

/* Mobile Styles */
@media (max-width: 768px) {
  .navbar-container {
    padding: 0.75rem 1rem;
    min-height: 70px;
  }
  .navbar-logo {
    margin-left: -1rem;
  }

  .logo-text {
    font-size: 1.1rem;
    letter-spacing: 1px;
  }

  .logo-image {
    height: 50px;
    margin-left: 0.5rem;
  }

  .navbar-nav {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: rgba(45, 55, 45, 0.98);
    backdrop-filter: blur(15px);
    padding: 1.5rem;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    height: calc(100vh - 70px);
    overflow-y: auto;
    border-top: 1px solid rgba(139, 115, 85, 0.2);
  }

  .navbar-nav--open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-links {
    flex-direction: column;
    gap: 0;
    width: 100%;
    margin-bottom: 1rem;
  }

  .nav-links li {
    width: 100%;
  }

  .nav-link {
    width: 100%;
    padding: 1.25rem 0;
    border-bottom: 1px solid rgba(139, 115, 85, 0.2);
    font-size: 1.1rem;
    text-align: left;
    min-height: 44px;
    display: flex;
    align-items: center;
  }

  .nav-link::after {
    display: none;
  }

  .dropdown-container {
    width: 100%;
  }

  .dropdown-trigger {
    width: 100%;
    padding: 1.25rem 0;
    border-bottom: 1px solid rgba(139, 115, 85, 0.2);
    font-size: 1.1rem;
    text-align: left;
    justify-content: space-between;
    min-height: 44px;
  }

  .dropdown-trigger::after {
    display: none;
  }

  .dropdown-menu {
    position: static;
    transform: none;
    background: rgba(139, 115, 85, 0.1);
    border: none;
    border-radius: 0;
    box-shadow: none;
    margin: 0;
    padding: 0;
    min-width: auto;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease, opacity 0.3s ease;
  }

  .dropdown-menu--open {
    max-height: 300px;
    padding: 0.5rem 0;
  }

  .dropdown-link {
    padding: 1rem 1.5rem;
    font-size: 1rem;
    min-height: 44px;
    display: flex;
    align-items: center;
  }

  .dropdown-link:hover {
    padding-left: 2rem;
  }

  .dropdown-link:last-child {
    border-top: 1px solid rgba(139, 115, 85, 0.2);
    margin-top: 0.5rem;
    padding-top: 1rem;
  }

  /* Admin Dashboard Link Styling for Mobile */
  .dropdown-link[href="/admin"] {
    background: linear-gradient(135deg, rgba(139, 115, 85, 0.1), rgba(160, 132, 92, 0.1));
    border-left: 3px solid #8B7355;
    font-weight: 600;
  }

  .dropdown-link[href="/admin"]:hover {
    background: linear-gradient(135deg, rgba(139, 115, 85, 0.2), rgba(160, 132, 92, 0.2));
    border-left-color: #A0845C;
  }

  .navbar-auth {
    display: none;
  }

  .mobile-auth {
    display: flex;
  }

  .navbar-toggle {
    display: flex;
  }

  .btn {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    min-height: 44px;
  }
}

/* Small Mobile Styles */
@media (max-width: 480px) {
  .navbar-container {
    padding: 0.5rem 0.75rem;
    min-height: 65px;
  }

  .logo-text {
    font-size: 1rem;
    letter-spacing: 0.5px;
  }

  .logo-image {
    height: 45px;
  }

  .navbar-nav {
    top: 65px;
    height: calc(100vh - 65px);
    padding: 1rem;
  }

  .nav-link {
    padding: 1rem 0;
    font-size: 1rem;
  }

  .dropdown-trigger {
    padding: 1rem 0;
    font-size: 1rem;
  }

  .dropdown-link {
    padding: 0.875rem 1rem;
    font-size: 0.95rem;
  }

  .btn {
    padding: 0.875rem;
    font-size: 0.95rem;
  }

  .navbar-toggle {
    width: 40px;
    height: 40px;
  }
}

/* Large Desktop Styles */
@media (min-width: 1200px) {
  .nav-links {
    gap: 4rem;
  }
  
  .navbar-container {
    padding: 0.75rem 3rem;
  }
}

/* Landscape Mobile Styles */
@media (max-width: 768px) and (orientation: landscape) {
  .navbar-nav {
    height: calc(100vh - 60px);
    top: 60px;
  }
  
  .navbar-container {
    min-height: 60px;
  }
}

/* High DPI Displays */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .logo-image {
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Focus Styles for Accessibility */
.nav-link:focus,
.dropdown-trigger:focus,
.dropdown-link:focus,
.btn:focus,
.navbar-toggle:focus {
  outline: 2px solid #8B7355;
  outline-offset: 2px;
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .navbar {
    background: rgba(35, 45, 35, 0.95);
  }
}
</style>

