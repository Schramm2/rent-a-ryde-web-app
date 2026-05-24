<template>
  <NavBar />
  <main class="about-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-background">
        <img src="@/assets/Vehicles/IMG-20250511-WA0027.jpg" alt="About Hero Image" class="hero-image" />
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <h1 class="hero-title">Who We Are</h1>
        <p class="hero-subtitle">Pioneering self-drive off-road adventures across South Africa.</p>
      </div>
    </section>

    <!-- Mission Statement Section -->
    <section class="mission-section">
      <div class="container">
        <div class="mission-content">
          <div class="mission-text">
            <h2 class="section-title">Our Mission</h2>
            <p class="mission-description">
              At RentARyde, we believe that every adventurer deserves access to reliable, ruggedly equipped 4x4 vehicles 
              that can conquer South Africa's most challenging terrains. Our mission is to enable off-road enthusiasts, 
              explorers, and adventure seekers to discover the untamed beauty of our country with confidence and safety.
            </p>
            <p class="mission-description">
              We provide meticulously maintained, fully equipped rental vehicles that are ready for anything – from 
              navigating the Drakensberg's rocky passes to exploring the vast Karoo or crossing into neighboring countries 
              for the ultimate African adventure.
            </p>
          </div>
          <div class="mission-image">
            <img src="@/assets/Extras/history_drakensberg2-1000x600.jpg" alt="Our Mission" class="mission-img" />
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="features-section">
      <div class="container">
        <h2 class="section-title centered">Why Choose RentARyde</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
              </svg>
            </div>
            <h3 class="feature-title">Real 4x4 Performance</h3>
            <p class="feature-description">
              Our vehicles are genuinely modified for off-road performance, not just show. Every Ryde is equipped 
              with proper 4WD systems, lifted suspension, and all-terrain capabilities.
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h3 class="feature-title">Border-Ready Fleet</h3>
            <p class="feature-description">
              All our vehicles come with proper cross-border documentation and insurance coverage, making your 
              adventures into Lesotho, Botswana, and beyond completely hassle-free.
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
              </svg>
            </div>
            <h3 class="feature-title">Transparent Pricing</h3>
            <p class="feature-description">
              No hidden fees, no surprises. We have everything you need for peace of mind when 4x4ing.
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,6L10.25,11L13.1,14.8L11.5,16C9.81,13.75 7,10 7,10L1,4L4,1L10,7C10,7 13.75,9.81 16,11.5L14.8,13.1L11,10.25L6,14H14V22H16V14H22V12H14V6Z"/>
              </svg>
            </div>
            <h3 class="feature-title">Adventure-First Philosophy</h3>
            <p class="feature-description">
              We're not just a rental company – we're fellow adventurers who understand what you need. Every vehicle 
              is prepared by people who live and breathe off-road exploration.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- History/Story Section -->
    <section class="story-section">
      <div class="container">
        <div class="story-content">
          <div class="story-image">
            <img src="@/assets/Vehicles/1000088079.jpg" alt="Our Story" class="story-img" />
          </div>
          <div class="story-text">
            <h2 class="section-title">Our Story</h2>
            <p class="story-description">
              RentARyde was born from a simple frustration: finding a reliable 4x4 rental that could actually handle 
              South Africa's diverse and challenging terrain. As passionate off-road enthusiasts ourselves, we knew 
              there had to be a better way.
            </p>
            <p class="story-description">
              What started as a single modified Suzuki Jimny has grown into a mission to make authentic off-road 
              adventures accessible to everyone. We've spent years perfecting our approach, from vehicle modifications 
              to route planning, ensuring every customer gets the adventure they're looking for.
            </p>
            <blockquote class="founder-quote">
              "Every trail tells a story. We just provide the vehicle to get you there safely."
              <cite>- The RentARyde Team</cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="cta-section">
      <div class="cta-background">
        <img src="@/assets/Vehicles/IMG-20250527-WA0180.jpg" alt="Join the Off-Road Movement" class="cta-image" />
        <div class="cta-overlay"></div>
      </div>
      <div class="cta-content">
        <h2 class="cta-title">Join the Off-Road Movement</h2>
        <p class="cta-subtitle">Ready to discover what lies beyond the beaten path?</p>
        <button class="cta-button" @click="browseVehicles">
          Browse Vehicles
        </button>
      </div>
    </section>
  </main>
  <Footer />
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
import Footer from '../components/FooterComp.vue'
import { useRouter } from 'vue-router'
// Methods
const browseVehicles = () => {
  router.push('/vehicles')
}
const router = useRouter()
</script>

<style scoped>
/* Global Styles */
.about-page {
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
    margin-bottom: 2rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  
  .section-title.centered {
    text-align: center;
    margin-bottom: 4rem;
  }
  
  /* Hero Section */
  .hero-section {
    position: relative;
    height: 60vh;
    min-height: 500px;
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
    font-size: 4rem;
    font-weight: 900;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 4px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  .hero-subtitle {
  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: 1px;
  color: #FFFFFF;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.5);
  line-height: 1.6;
}
  
  /* Mission Section */
  .mission-section {
    padding: 6rem 0;
    background: white;
  }
  
  .mission-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }
  
  .mission-text {
    padding-right: 2rem;
  }
  
  .mission-description {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 1.5rem;
    line-height: 1.8;
    
  }
  
  .mission-image {
    height: 400px;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
  
  .mission-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: #8B7355;
  }
  
  /* Features Section */
  .features-section {
    padding: 6rem 0;
    background: #F5E6D3;
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 3rem;
  }
  
  .feature-card {
    background: white;
    padding: 3rem 2rem;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border: 3px solid transparent;
  }
  
  .feature-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
    border-color: #8B7355;
  }
  
  .feature-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 2rem;
    background: linear-gradient(135deg, #8B7355, #A0845C);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 25px rgba(139, 115, 85, 0.3);
  }
  
  .icon {
    width: 40px;
    height: 40px;
    color: #F5E6D3;
  }
  
  .feature-title {
    font-size: 1.4rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    color: #2D372D;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .feature-description {
    color: #666;
    line-height: 1.7;
    font-size: 1rem;
  }
  
  /* Story Section */
  .story-section {
    padding: 6rem 0;
    background: #2D372D;
    color: #F5E6D3;
  }
  
  .story-section .section-title {
    color: #F5E6D3;
  }
  
  .story-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }
  
  .story-image {
    height: 450px;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  }
  
  .story-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: #8B7355;
  }
  
  .story-text {
    padding-left: 2rem;
  }
  
  .story-description {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    line-height: 1.8;
    color: #F5E6D3;
  }
  
  .founder-quote {
    background: rgba(139, 115, 85, 0.2);
    padding: 2rem;
    border-radius: 12px;
    border-left: 4px solid #8B7355;
    margin-top: 2rem;
    font-style: italic;
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  .founder-quote cite {
    display: block;
    margin-top: 1rem;
    font-weight: 600;
    color: #8B7355;
    font-style: normal;
  }
  
  /* CTA Section */
  .cta-section {
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
    color: #f5e6d3be;
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
    color: #f5e6d3;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  .cta-subtitle {
    font-size: 1.2rem;
    margin-bottom: 2.5rem;
    letter-spacing: 1px;
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
      font-size: 3.5rem;
    }
    
    .hero-subtitle {
      font-size: 1.3rem;
    }
    
    .section-title {
      font-size: 2.2rem;
    }
    
    .container {
      padding: 0 3rem;
    }
    
    .mission-content {
      gap: 3rem;
    }
    
    .mission-text {
      padding-right: 1.5rem;
    }
    
    .mission-image {
      height: 350px;
    }
    
    .story-text {
      padding-left: 1.5rem;
    }
    
    .story-image {
      height: 350px;
    }
    
    .features-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 2.5rem;
    }
    
    .feature-card {
      padding: 2.5rem 1.8rem;
    }
    
    .cta-title {
      font-size: 2.5rem;
    }
    
    .cta-button {
      padding: 1.1rem 2.5rem;
      font-size: 1.1rem;
    }
    
    .founder-quote {
      font-size: 1.1rem;
      padding-left: 1.5rem;
    }
  }
  
  @media (max-width: 768px) {
    .about-page {
      margin-top: 4rem;
    }

    .hero-title {
      font-size: 2.5rem;
    }
    
    .hero-subtitle {
      font-size: 1.2rem;
    }
    
    .section-title {
      font-size: 2rem;
    }
    
    .mission-content,
    .story-content {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    
    .mission-text {
      padding-right: 0;
    }
    
    .mission-image {
      height: 300px;
    }
    
    .story-text {
      padding-left: 0;
    }
    
    .story-image {
      height: 300px;
    }
    
    .features-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    
    .feature-card {
      padding: 2.5rem 1.5rem;
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
    .section-title{
      text-align: center;
    }
    .story-description{
      text-align: center;
    }
    
    .hero-subtitle {
      font-size: 1rem;
    }
    
    .section-title {
      font-size: 1.8rem;
    }
    .mission-description{
      text-align: center;
    }
    
    .mission-image,
    .story-image {
      height: 250px;
    }
    
    .feature-card {
      padding: 2rem 1.5rem;
    }
    
    .feature-title {
      font-size: 1.2rem;
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
