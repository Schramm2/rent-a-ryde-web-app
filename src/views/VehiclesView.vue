<template>
  <NavBar />
  <main class="vehicles-page">
    <!-- Header Banner Section -->
    <section class="hero-banner">
      <div class="hero-background">
        <img :src="heroBg" alt="Ryder Background" class="hero-image" />
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <h1 class="hero-title">Meet Ryder</h1>
        <p class="hero-subtitle">Our ruggedly modified 4x4 Suzuki Jimny, built to conquer Southern Africa's toughest
          terrain.</p>
      </div>
    </section>

    <!-- Main Vehicle Showcase -->
    <section class="vehicle-showcase">
      <div class="container">
        <div class="vehicle-hero">
          <div class="vehicle-images">
            <div class="main-image">
              <img :src="vehicle.mainImage" :alt="vehicle.name" class="vehicle-main-img" />
              <div class="image-overlay">
                <span class="vehicle-tagline">{{ vehicle.tagline }}</span>
              </div>
            </div>
            <div class="image-gallery">
              <img v-for="(image, index) in vehicle.gallery" :key="index" :src="image"
                :alt="`${vehicle.name} view ${index + 1}`" class="gallery-thumb" @click="selectImage(image)" />
            </div>
          </div>

          <div class="vehicle-details">
            <h2 class="vehicle-name">{{ vehicle.name }}</h2>
            <p class="vehicle-description">{{ vehicle.description }}</p>

            <div class="vehicle-highlights">
              <h3 class="highlights-title">Key Features</h3>
              <ul class="highlights-list">
                <li v-for="highlight in vehicle.highlights" :key="highlight">
                  <span class="highlight-icon">✓</span>
                  {{ highlight }}
                </li>
              </ul>
            </div>

            <div class="vehicle-specs">
              <h3 class="specs-title">Specifications</h3>
              <div class="specs-grid">
                <div v-for="spec in vehicle.specifications" :key="spec.label" class="spec-item">
                  <span class="spec-label">{{ spec.label }}</span>
                  <span class="spec-value">{{ spec.value }}</span>
                </div>
              </div>
            </div>

            <div class="pricing-section">
              <div class="price-info">
                <span class="price">{{ vehicle.price }}</span>
                <span class="price-period">per day</span>
              </div>
              <p class="pricing-note">{{ vehicle.pricingNote }}</p>
            </div>

            <div class="action-buttons">
              <button class="btn-primary" @click="bookNow">
                Book Ryder Now
              </button>
              <button class="btn-secondary" @click="getQuote">
                Get Custom Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Deep Dive -->
    <section class="features-section">
      <div class="container">
        <h2 class="section-title">Why Choose Ryder?</h2>
        <div class="features-grid">
          <div v-for="feature in vehicle.detailedFeatures" :key="feature.title" class="feature-card">
            <div class="feature-icon">
              <span class="icon">{{ feature.icon }}</span>
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Availability Section -->
    <section class="availability-section">
      <div class="container">
        <div class="availability-content">
          <div class="availability-text">
            <h2 class="section-title">Ready for Your Adventure?</h2>
            <p class="availability-description">
              Ryder is available for daily, weekly, and extended rental periods.
              Perfect for exploring the Drakensberg, coastal routes, or venturing
              into Lesotho and beyond.
            </p>
            <ul class="availability-features">
              <li>Daily rentals from R1,600</li>
              <li>Seasonal discounts available</li>
              <li>Cross-border documentation assitance</li>
              <li>24/7 Contact Assistance</li>
              <!-- <li>Comprehensive insurance coverage</li> -->
            </ul>
          </div>
          <div class="availability-image">
            <img :src="availabilityImg" alt="Ryder on adventure trail" />
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Footer Banner -->
    <section class="cta-banner">
      <div class="cta-background">
        <img src="@/assets/Vehicles/IMG-20250527-WA0154.jpg" alt="Ready to Ryde Background" class="cta-image" />
        <div class="cta-overlay"></div>
      </div>
      <div class="cta-content">
        <h2 class="cta-title">Ready to Ryde?</h2>
        <p class="cta-subtitle">Book Ryder today and start your 4x4 adventure</p>
        <button class="btn-book-now" @click="bookNow">
          Book Ryder Now
        </button>
      </div>
    </section>
  </main>
  <Footer />
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import Footer from '../components/FooterComp.vue'
// Import images
import mainImg from '@/assets/Vehicles/IMG-20250527-WA0142.jpg'
import gallery1 from '@/assets/Vehicles/IMG-20250527-WA0144.jpg'
import gallery2 from '@/assets/Vehicles/IMG-20250527-WA0146.jpg'
import gallery3 from '@/assets/Vehicles/IMG-20250527-WA0152.jpg'
import gallery4 from '@/assets/Vehicles/IMG-20250527-WA0154.jpg'
import heroBg from '@/assets/Vehicles/IMG-20250527-WA0170.jpg'
import availabilityImg from '@/assets/Vehicles/IMG-20250527-WA0172.jpg'

// Single vehicle data - Ryder
const vehicle = reactive({
  name: 'Ryder',
  mainImage: mainImg,
  gallery: [mainImg, gallery1, gallery2, gallery3, gallery4],
  description: 'Meet Ryder, our ruggedly modified Suzuki Jimny designed for the ultimate off-road experience. This compact powerhouse has been specially prepared to handle everything from rocky mountain passes to sandy coastal trails, making it the perfect companion for your South African adventure.',
  tagline: 'Built for every road – and no road at all.',
  price: 'R1,600',
  pricingNote: 'Includes basic insurance, GPS, and emergency kit',
  highlights: [
    'Ruggedly modified for extreme terrain',
    'Compact size for tight trail navigation',
    'Fuel efficient for extended adventures',
    'Easy to drive - no special license required',
    'Higher clearance. Smoother lines. Effortless off-roading',
    'Rugged terrain tyres deliver maximum grip to tame any trail'
  ],
  specifications: [
    { label: 'Engine', value: '1.5L Petrol' },
    { label: 'Transmission', value: 'Automatic' },
    { label: 'Drive Type', value: '4WD' },
    { label: 'Seating', value: '2 Passengers' },
    { label: 'Fuel Tank', value: '40L' },
    { label: 'Ground Clearance', value: '210mm' }
  ],
  detailedFeatures: [
    {
      icon: '🏔️',
      title: 'Trail Ready',
      description: 'Modified suspension, reinforced chassis, and all-terrain tires for conquering any landscape.'
    },
    {
      icon: '🧭',
      title: 'Navigation Equipped',
      description: 'GPS navigation system with offline maps and popular trail routes pre-loaded.'
    },
    {
      icon: '⛺',
      title: 'Adventure Gear',
      description: 'Recovery equipment, first aid kit, and camping accessories available as add-ons.'
    },
    {
      icon: '🛡️',
      title: 'Safety First',
      description: 'Comprehensive insurance, 24/7 roadside assistance, and emergency communication device.'
    }
  ]
})

const selectedImage = ref(vehicle.mainImage)

const router = useRouter()

// Methods
const selectImage = (image) => {
  selectedImage.value = image
  vehicle.mainImage = image
}

const bookNow = () => {
  // Navigate to bookings page with Suzuki Jimney pre-selected
  router.push({
    path: '/bookings',
    query: { 
      preSelectVehicle: 'suzuki-jimney',
      vehicleName: 'Suzuki Jimney'
    }
  })
}

const getQuote = () => {
  router.push('/contact')
}
</script>
<style scoped>
/* Global Styles */
.vehicles-page {
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
  text-align: center;
  margin-bottom: 3rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #2D372D;
}

/* Hero Banner Section */
.hero-banner {
  position: relative;
  height: 60vh;
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
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  letter-spacing: 1px;
  color: #FFFFFF;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.5);
}

/* Vehicle Showcase Section */
.vehicle-showcase {
  padding: 6rem 0;
  background: white;
}

.vehicle-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.vehicle-images {
  position: sticky;
  top: 8rem;
}

.main-image {
  position: relative;
  margin-bottom: 1.5rem;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.vehicle-main-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  background: #8B7355;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.8), transparent);
  padding: 1rem 1.5rem 2rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.main-image:hover .image-overlay {
  opacity: 1;
}

.vehicle-tagline {
  color: #F5E6D3;
  font-style: italic;
  font-size: 1.1rem;
  font-weight: 500;
}

.image-gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
}

.gallery-thumb {
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #8B7355;
  border: 2px solid transparent;
}

.gallery-thumb:hover {
  border-color: #8B7355;
  transform: scale(1.05);
}

.vehicle-details {
  padding: 2rem 0;
}

.vehicle-name {
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  color: #2D372D;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.vehicle-description {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 3rem;
  line-height: 1.8;
}

.highlights-title,
.specs-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: #2D372D;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.highlights-list {
  list-style: none;
  padding: 0;
  margin-bottom: 3rem;
}

.highlights-list li {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 500;
}

.highlight-icon {
  width: 24px;
  height: 24px;
  color: #8B7355;
  margin-right: 1rem;
  flex-shrink: 0;
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.spec-item {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: #F5E6D3;
  border-radius: 8px;
}

.spec-label {
  font-weight: 600;
  color: #2D372D;
}

.spec-value {
  color: #8B7355;
  font-weight: 700;
}

.pricing-section {
  background: #F5E6D3;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 3rem;
  text-align: center;
}

.price-info {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.price {
  font-size: 2.5rem;
  font-weight: 900;
  color: #2D372D;
}

.price-period {
  font-size: 1rem;
  color: #666;
  font-weight: 500;
}

.pricing-note {
  font-size: 0.9rem;
  color: #666;
  font-style: italic;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.btn-primary,
.btn-secondary {
  flex: 1;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #8B7355;
  color: #F5E6D3;
}

.btn-primary:hover {
  background: #A0845C;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 115, 85, 0.3);
}

.btn-secondary {
  background: #2D372D;
  color: #F5E6D3;
}

.btn-secondary:hover {
  background: #3D473D;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(45, 55, 45, 0.3);
}

/* Features Section */
.features-section {
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

.icon {
  font-size: 2.2rem;
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-icon img,
.feature-icon svg {
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
  line-height: 1.6;
}

/* Availability Section */
.availability-section {
  padding: 6rem 0;
  background: white;
}

.availability-section .section-title {
  color: #2D372D;
}

.availability-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.availability-description {
  font-size: 1.1rem;
  
  line-height: 1.8;
}

.availability-features {
  margin-top: 2rem;
  list-style: none;
  padding: 0;
}

.availability-features li {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 500;
}

.availability-features li::before {
  content: '✓';
  color: #8B7355;
  font-weight: bold;
  margin-right: 1rem;
  font-size: 1.2rem;
}

.availability-image {
  height: 400px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.availability-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* CTA Banner */
.cta-banner {
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
  background: linear-gradient(135deg, #8B7355 0%, #A0845C 100%);
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
  max-width: 800px;
  padding: 0 2rem;
}

.cta-title {
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.cta-subtitle {
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  letter-spacing: 1px;
  color: #FFFFFF;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.5);
}

.btn-book-now {
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

.btn-book-now:hover {
  background: #A0845C;
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(139, 115, 85, 0.4);
}

/* iPad Specific Media Queries */
@media (min-width: 768px) and (max-width: 1024px) {
  .hero-title {
    font-size: 2.8rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .section-title {
    font-size: 2.2rem;
  }

  .container {
    padding: 0 3rem;
  }

  .vehicle-hero {
    gap: 3rem;
  }

  .vehicle-images {
    top: 6rem;
  }

  .vehicle-name {
    font-size: 2.5rem;
  }

  .specs-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .action-buttons {
    flex-direction: column;
    gap: 1rem;
  }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }

  .availability-content {
    gap: 3rem;
  }

  .availability-image {
    height: 350px;
  }

  .cta-title {
    font-size: 2.5rem;
  }

  .btn-book-now {
    padding: 1.1rem 2.5rem;
    font-size: 1.1rem;
  }

  .feature-card {
    padding: 2.2rem 1.8rem;
  }

  .main-image {
    margin-bottom: 1.2rem;
  }

  .vehicle-main-img {
    height: 350px;
  }

  .image-gallery {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.6rem;
  }

  .gallery-thumb {
    height: 70px;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.2rem;
  }
  .vehicles-page {
  
  margin-top: 4rem;
}

  .vehicle-hero {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .vehicle-images {
    position: static;
  }

  .vehicle-name {
    font-size: 2.2rem;
  }

  .specs-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .action-buttons {
    flex-direction: column;
    gap: 1rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .availability-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .availability-section .section-title {
    font-size: 2rem;
  }

  .container {
    padding: 0 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.8rem;
  }

  .vehicle-name {
    font-size: 1.8rem;
  }

  .price {
    font-size: 2rem;
  }

  .cta-title {
    font-size: 2rem;
  }

  .btn-book-now {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
}
</style>