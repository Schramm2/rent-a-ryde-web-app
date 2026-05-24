<template>
  <NavBar />
  <main class="training-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-background">
        <img src="@/assets/Promos/Screenshot_20250509_103642_WhatsAppBusiness.jpg" alt="Training Hero Image"
          class="hero-image" />
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <h1 class="hero-title">Train for the Trails</h1>
        <p class="hero-subtitle">Gain the skills and confidence to conquer any off-road journey.</p>
        <div class="hero-stats">
          <div class="training-stat-item">
            <span class="training-stat-number">500+</span>
            <span class="training-stat-label">Drivers Trained</span>
          </div>
          <div class="training-stat-item">
            <span class="training-stat-number">15+</span>
            <span class="training-stat-label">Years Experience</span>
          </div>
          <div class="training-stat-item">
            <span class="training-stat-number">100%</span>
            <span class="training-stat-label">Safety Record</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Training Programs Section -->
    <section class="programs-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title1">Master the Art of Off-Road Driving</h2>
          <p class="section-subtitle1">
            Professional training programs designed to transform novice drivers into confident off-road adventurers.
          </p>
        </div>

        <div class="programs-grid">
          <div v-for="program in trainingPrograms" :key="program.id" class="program-card">
            <div class="training-card-image">
              <img :src="program.image" :alt="program.title" class="program-image" />
              <div class="training-card-overlay">
                <span class="program-duration">{{ program.duration }}</span>
              </div>
            </div>
            <div class="training-card-content">
              <h3 class="program-title">{{ program.title }}</h3>
              <p class="program-description">{{ program.description }}</p>

              <div class="program-details">
                <div class="detail-section">
                  <h4 class="detail-title">What's Included:</h4>
                  <ul class="feature-list">
                    <li v-for="feature in program.features" :key="feature" class="feature-item">
                      <!-- <span class="feature-bullet">&#8226;</span> -->
                      {{ feature }}
                    </li>
                  </ul>
                </div>

                <div class="detail-section">
                  <h4 class="detail-title">Schedule:</h4>
                  <ul class="schedule-list">
                    <li v-for="scheduleItem in program.schedule" :key="scheduleItem" class="schedule-item">
                      <svg class="schedule-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path
                          d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                        <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                      </svg>
                      {{ scheduleItem }}
                    </li>
                  </ul>
                </div>

                <div class="detail-section">
                  <h4 class="detail-title">Venue:</h4>
                  <p class="venue-text">{{ program.venue }}</p>
                </div>
              </div>

              <div class="card-footer">
                <div class="program-price">
                  <span class="price-currency">R</span>
                  <span class="price-amount">{{ program.price }}</span>
                </div>
                <!-- <button 
                  class="program-button"
                  :class="{ 'coming-soon': program.comingSoon }"
                  @click="handleProgramClick(program)"
                >
                  {{ program.comingSoon ? 'Coming Soon' : 'Book Now' }}
                </button> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Training Matters Section -->
    <section class="importance-section">
      <div class="container">
        <div class="importance-content">
          <div class="importance-text">
            <h2 class="section-title1">Why Professional Training Matters</h2>
            <div class="text-content">
              <p class="importance-paragraph">
                Off-road driving in Southern Africa presents unique challenges that require specialized skills and
                knowledge.
                From navigating rocky mountain passes in the Drakensberg to crossing sandy riverbeds in the Kalahari,
                each terrain demands specific techniques and safety protocols.
              </p>
              <p class="importance-paragraph">
                Our comprehensive training programs ensure you're not just renting a vehicle – you're gaining the
                expertise
                to handle any situation with confidence. Whether you're planning a weekend getaway or an extended
                cross-border expedition, proper training is your foundation for safe, enjoyable adventures.
              </p>
              <div class="benefits-list">
                <div class="training-benefit-item">
                  <svg class="training-benefit-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span>Enhanced Safety & Confidence</span>
                </div>
                <div class="training-benefit-item">
                  <svg class="training-benefit-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span>Vehicle Protection & Longevity</span>
                </div>
                <div class="training-benefit-item">
                  <svg class="training-benefit-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span>Access to Remote Destinations</span>
                </div>
              </div>
            </div>
          </div>
          <div class="importance-image">
            <img src="@/assets/Promos/PHOTO-2022-10-18-10-13-22-pxcxgxoqab0vvwu1fq72uv48deljlbfod5z11r5oxc.jpg"
              alt="Professional 4x4 Training" class="training-image" />
            <div class="image-badge">
              <span class="badge-text">Certified Instructors</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call-to-Action Section -->
    <section class="cta-section">
      <div class="cta-background">
        <img src="@/assets/Promos/e41d587a-47fb-4440-b487-88c10e6b1bc6.jpg" alt="Adventure Training CTA"
          class="cta-image" />
        <div class="cta-overlay"></div>
      </div>
      <div class="cta-content">
        <h2 class="cta-title">Adventure Smarter. Train with RentARyde.</h2>
        <p class="cta-subtitle">
          Ready to elevate your off-road skills? Join hundreds of adventurers who've transformed their driving with our
          expert training.
        </p>
        <button class="cta-button" @click="registerInterest">
          Get In Touch!
        </button>
        <p class="cta-note">Get notified when new training sessions become available</p>
      </div>
    </section>
  </main>

  <Footer />
</template>

<script setup>
import { ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/FooterComp.vue'
import { useRouter } from 'vue-router'

// Training programs data
const trainingPrograms = ref([
  {
    id: 1,
    title: 'Weekend Group – 4x4 Driver Training',
    description: 'Whether you are a beginner or a seasoned 4x4 driver, this course is great for learning the basic concepts of 4x4ing, in a safe and controlled environment.',
    duration: '5+ Hours',
    price: '3,800',
    image: require('@/assets/Promos/IMG_3481-2048x1536.jpg'),
    venue: 'Clifton Canyon 4x4 Track (NU Driving Range, Hillcrest)',
    schedule: [
      '7:45 am – Meet at the Clifton Canyon 4x4 Track',
      '8:00 am – Training starts',
      '13:00 pm – Training ends'
    ],
    features: [
      'Rental of our Rugged 4x4 Jimny',
      'Expert off-road training with Travis Duggan, certified and experienced',
      'Hands-on driving on inclines, off-camber and technical terrain'
    ],
    comingSoon: false
  },
  {
    id: 2,
    title: '4x4 Trail Experience – Valley of 1000 Hills',
    description: 'Join Travis and his team for an unforgettable family-friendly 4x4 adventure through the breathtaking Valley of 1000 Hills, ending with a relaxing braai or picnic at Mqeku Picnic Site!',
    duration: '7+ Hours',
    price: '2,850',
    image: require('@/assets/Promos/178000387_146808977447359_4265558744602302715_n-1.jpg'),
    venue: 'Valley of 1000 Hills',
    schedule: [
      '07:00 am – Meet at Engen Garage Polo Pony (Assagay)',
      '12:15 pm – Arrive at Mqeku Picnic Site and enjoy a braai or picnic',
      '14:15 pm – Depart for Hillcrest'
    ],
    features: [
      'Rental of our Rugged 4x4 Jimny',
      'A journey along the 4x4 River Route, with cross axle holes, steep gradients, water crossings',
      'Scenic stop at Toleni Falls',
      'Hands-on driving experience in real off-road conditions',
      'Bring along your food, drinks, cozzies and catering equipment'
    ],
    comingSoon: false
  },
  {
    id: 3,
    title: '1-on-1 Driver Training with Travis (Weekday)',
    description: 'Join Travis for 1-on-1 introductory 4x4 driver training designed to give you confidence and control over your vehicle! Master the basics of 4x4 driving in a private, hands-on training session.',
    duration: '3.5 Hours',
    price: '5,200',
    image: require('@/assets/Promos/IMG_3444-1024x768.jpg'),
    venue: 'Clifton Canyon 4x4 Track (NU Driving Range, Hillcrest)',
    schedule: [
      '08:55 am – Meet at venue',
      '09:00 am – Training starts',
      '12:30 pm – Training ends'
    ],
    features: [
      'Rental of our Rugged 4x4 Jimny',
      'Understanding 4x4 systems and how to engage them',
      'Diff-lock use and cross axle holes',
      'Steep gradients and side slopes',
      'Reverse stall exercise / downhill assist / crawl',
      'Water crossings discussion'
    ],
    comingSoon: false
  }
])

// Methods
// const handleProgramClick = (program) => {
//   if (program.comingSoon) {
//     alert('This program is coming soon! Register your interest to be notified.')
//   } else {
//     // Future implementation: router.push(`/training/${program.id}`)
//   }
// }

const router = useRouter()
const registerInterest = () => {
  router.push('/contact')
}
</script>

<style scoped>
/* Global Styles */
.training-page {
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

.section-title1 {
  font-size: 2.5rem;
  font-weight: 900;
  color: #2D372D;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
}

.section-subtitle1 {
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
  line-height: 1.7;
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 70vh;
  min-height: 600px;
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
  max-width: 900px;
  padding: 0 2rem;
}

.hero-title {
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero-subtitle {
  font-size: 1.4rem;
  font-weight: 400;
  margin-bottom: 3rem;
  letter-spacing: 1px;
  color: #FFFFFF;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.5);
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-top: 3rem;
}

.training-stat-item {
  text-align: center;
}

.training-stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 900;
  color: #8B7355;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.training-stat-label {
  display: block;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 0.5rem;
  color: #FFFFFF;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.5);
}

/* Programs Section */
.programs-section {
  padding: 6rem 0;
  background: #F5E6D3;
}

.section-header {
  margin-bottom: 4rem;
}

.programs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
}

.program-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 3px solid transparent;
}

.program-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  border-color: #8B7355;
}

.training-card-image {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.program-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: linear-gradient(135deg, #8B7355, #A0845C);
  transition: transform 0.3s ease;
}

.program-card:hover .program-image {
  transform: scale(1.05);
}

.training-card-overlay {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(45, 55, 45, 0.9);
  color: #F5E6D3;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.training-card-content {
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.program-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: #2D372D;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.program-description {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

.program-features {
  margin-bottom: 2rem;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.6rem;
  font-size: 0.85rem;
  color: #555;
  line-height: 1.4;
  padding-left: 0;
}

.feature-icon {
  width: 12px;
  height: 12px;
  color: #8B7355;
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.feature-bullet {
  color: #8B7355;
  font-size: 1.1em;
  margin-right: 0.5em;
  line-height: 1.2;
  display: inline-block;
  width: 1em;
  text-align: center;
}

.schedule-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.schedule-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  color: #555;
  line-height: 1.4;
  padding-left: 0;
}

.schedule-icon {
  width: 12px;
  height: 12px;
  color: #8B7355;
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid #E5E5E5;
}

.program-price {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.price-currency {
  font-size: 1.2rem;
  font-weight: 700;
  color: #8B7355;
}

.price-amount {
  font-size: 1.8rem;
  font-weight: 900;
  color: #2D372D;
}

.program-button {
  background: linear-gradient(135deg, #8B7355, #A0845C);
  color: #F5E6D3;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.program-button:hover {
  background: linear-gradient(135deg, #A0845C, #B8926A);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 115, 85, 0.4);
}

.program-button.coming-soon {
  background: #999;
  cursor: not-allowed;
}

.program-button.coming-soon:hover {
  background: #999;
  transform: none;
  box-shadow: none;
}

/* Importance Section */
.importance-section {
  padding: 6rem 0;
  background: white;
}

.importance-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.importance-text .section-title1 {
  text-align: left;
  margin-bottom: 2rem;
}

.text-content {
  margin-bottom: 2rem;
}

.importance-paragraph {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.8;
}

.benefits-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.training-benefit-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 600;
  color: #2D372D;
}

.training-benefit-icon {
  width: 20px;
  height: 20px;
  color: #8B7355;
}

.importance-image {
  position: relative;
  height: 500px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.training-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #8B7355;
}

.image-badge {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  background: rgba(45, 55, 45, 0.9);
  color: #F5E6D3;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.badge-text {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* CTA Section */
.cta-section {
  position: relative;
  height: 60vh;
  min-height: 500px;
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
  max-width: 700px;
  padding: 0 2rem;
}

.cta-title {
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.cta-subtitle {
  font-size: 1.3rem;
  margin-bottom: 2.5rem;
  letter-spacing: 0.5px;
  color: #FFFFFF;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.5);
  line-height: 1.6;
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
  margin-bottom: 1rem;
}

.cta-button:hover {
  background: linear-gradient(135deg, #A0845C, #B8926A);
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(139, 115, 85, 0.4);
}

.cta-note {
  font-size: 0.9rem;
  color: rgba(245, 230, 211, 0.8);
  font-style: italic;
}

/* iPad Specific Media Queries */
@media (min-width: 768px) and (max-width: 1024px) {
  .hero-title {
    font-size: 3.5rem;
  }

  .hero-subtitle {
    font-size: 1.3rem;
  }

  .hero-stats {
    gap: 3rem;
  }

  .training-stat-number {
    font-size: 2.2rem;
  }

  .section-title1 {
    font-size: 2.2rem;
  }

  .container {
    padding: 0 3rem;
  }

  .programs-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .program-card {
    max-width: 400px;
    margin: 0 auto;
  }

  .training-card-image {
    height: 200px;
  }

  .training-card-content {
    padding: 1.8rem;
  }

  .program-title {
    font-size: 1.3rem;
  }

  .importance-content {
    gap: 3rem;
  }

  .importance-text .section-title1 {
    font-size: 2rem;
  }

  .importance-image {
    height: 350px;
  }

  .cta-title {
    font-size: 2.5rem;
  }

  .cta-button {
    padding: 1.1rem 2.5rem;
    font-size: 1.1rem;
  }

  .feature-list {
    gap: 0.8rem;
  }

  .feature-item {
    padding: 0.8rem;
  }

  .schedule-list {
    gap: 1rem;
  }

  .schedule-item {
    padding: 1rem;
  }

  .card-footer {
    padding: 1.5rem 1.8rem;
  }

  .program-price {
    font-size: 1.8rem;
  }
}

@media (max-width: 768px) {
  .training-page {
    margin-top: 4rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-stats {
    flex-direction: column;
    gap: 2rem;
  }

  .training-stat-number {
    font-size: 2rem;
  }

  .section-title1 {
    font-size: 2rem;
  }

  .programs-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .importance-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .importance-text .section-title1 {
    text-align: center;
  }

  .importance-image {
    height: 300px;
  }

  .cta-title {
    font-size: 2.5rem;
  }

  .container {
    padding: 0 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .section-title1 {
    font-size: 1.8rem;
  }

  .program-card {
    margin: 0 1rem;
  }

  .card-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .program-button {
    width: 100%;
  }

  .cta-title {
    font-size: 2rem;
  }

  .container {
    padding: 0 1rem;
  }
}

.program-details {
  margin-bottom: 2rem;
}

.detail-section {
  margin-bottom: 1.2rem;
}

.detail-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #2D372D;
  margin-bottom: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.schedule-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.schedule-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  color: #555;
  line-height: 1.4;
  padding-left: 0;
}

.schedule-icon {
  width: 12px;
  height: 12px;
  color: #8B7355;
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.venue-text {
  color: #666;
  font-size: 0.85rem;
  font-weight: 500;
  margin: 0;
  line-height: 1.4;
}

/* Adjust card height for more content */
.program-card {
  display: flex;
  flex-direction: column;
}

.program-details {
  flex: 1;
}
</style>
