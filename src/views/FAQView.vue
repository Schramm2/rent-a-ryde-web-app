<template>
  <NavBar />
  
    <main class="faq-page">
      <!-- Hero Banner Section -->
      <section class="hero-banner">
        <div class="hero-background">
          <img src="@/assets/Vehicles/DSC_0614.jpg" alt="FAQ Hero Image" class="hero-image" />
          <div class="hero-overlay"></div>
        </div>
        <div class="hero-content">
          <h1 class="hero-title">Frequently Asked Questions</h1>
          <p class="hero-subtitle">Everything you need to know before you Ryde.</p>
        </div>
      </section>
  
      <!-- FAQ Accordion Section -->
      <section class="faq-section">
        <div class="container">
          <div class="faq-header">
            <h2 class="section-title">Get Your Answers</h2>
            <p class="section-subtitle">
              Find quick answers to the most common questions about our 4x4 rental services, 
              booking process, and adventure experiences.
            </p>
          </div>
  
          <div class="faq-accordion">
            <div 
              v-for="(faq, index) in faqData" 
              :key="index"
              class="faq-item"
              :class="{ 'faq-item--open': openItems.includes(index) }"
            >
              <button 
                class="faq-question"
                @click="toggleFaq(index)"
                :aria-expanded="openItems.includes(index)"
              >
                <span class="question-text">{{ faq.question }}</span>
                <svg 
                  class="question-icon" 
                  :class="{ 'question-icon--rotated': openItems.includes(index) }"
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </button>
              
              <div 
                class="faq-answer"
                :class="{ 'faq-answer--open': openItems.includes(index) }"
              >
                <div class="answer-content">
                  <p v-html="faq.answer"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Call-to-Action Footer -->
      <section class="cta-footer">
        <div class="cta-background">
          <div class="cta-overlay"></div>
        </div>
        <div class="cta-content">
          <h2 class="cta-title">Still have questions? Contact us directly.</h2>
          <p class="cta-subtitle">
            Our team is ready to help you plan the perfect off-road adventure. 
            Get personalized assistance and expert advice.
          </p>
          <button class="cta-button" @click="handleContact">
            Get in Touch
          </button>
        </div>
      </section>
    </main>
    <Footer />
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import NavBar from '@/components/NavBar.vue'
  import Footer from '@/components/FooterComp.vue'
  
  const router = useRouter()
  
  // Reactive data for open FAQ items
  const openItems = ref([])
  
  // FAQ data
  const faqData = ref([
    {
      question: "What's included in my vehicle rental?",
      answer: "Your rental includes our ruggedly modified 4x4 Suzuki Jimny, comprehensive insurance coverage, 24/7 roadside assistance, and detailed route planning assistance."
    },
    {
      question: "Can I travel across borders with the rental vehicle?",
      answer: "Yes, cross-border travel is permitted to most SADC countries including Botswana, Namibia, Zimbabwe, and Zambia. Additional documentation and insurance are required, which we can arrange for you. Please inform us of your intended destinations at least 7 days before your rental period. Additional fees may apply for cross-border permits and insurance."
    },
    {
      question: "Do I need off-road driving experience?",
      answer: "While previous 4x4 experience is beneficial, it's not mandatory. We offer comprehensive training programs for beginners, including our Weekend Group Training and 1-on-1 sessions with certified instructors. All renters receive a thorough vehicle orientation covering 4x4 systems, recovery techniques, and safety protocols before departure."
    },
    {
      question: "What documents are required for rental?",
      answer: "You'll need a valid driver's license (held for minimum 2 years), valid passport or ID document, credit card for security deposit, and proof of address. International visitors require an International Driving Permit. All drivers must be between 21-70 years old and pass our verification process."
    },
    {
      question: "What happens if I break down or need assistance?",
      answer: "We provide 24/7 roadside assistance throughout South Africa and neighboring countries. Your rental includes GPS tracking for emergency location services, satellite communication device for remote areas, comprehensive recovery equipment, and access to our network of certified mechanics and recovery specialists."
    },
    {
      question: "How do I confirm or cancel a booking?",
      answer: "Bookings are confirmed upon receipt of full payment and signed rental agreement. Cancellations made 48+ hours before pickup receive full refund minus 10% processing fee. Cancellations within 48 hours incur 50% penalty. No-shows forfeit entire payment. We recommend travel insurance for unexpected changes."
    },
    {
      question: "What safety equipment is provided?",
      answer: "Every vehicle comes equipped with first aid kit, fire extinguisher, emergency beacon, recovery straps and shackles, high-lift jack, compressor, spare tire and a detailed safety manual. We also provide comprehensive safety briefing and emergency contact procedures."
    },
  ])
  
  // Methods
  const toggleFaq = (index) => {
    const itemIndex = openItems.value.indexOf(index)
    if (itemIndex > -1) {
      openItems.value.splice(itemIndex, 1)
    } else {
      openItems.value.push(index)
    }
  }
  
  const handleContact = () => {
    router.push('/contact')
  }
  </script>
  
  <style scoped>
  /* Global Styles */
  .faq-page {
      font-family: 'Arial', sans-serif;
      color: #2D372D;
      line-height: 1.6;
      margin-top: 5rem;
    }
    
    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 2rem;
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
      letter-spacing: 2px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }
    
    .hero-subtitle {
  font-size: 1.3rem;
  font-weight: 400;
  letter-spacing: 1px;
  color: #FFFFFF;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.5);
}
    
    /* FAQ Section */
    .faq-section {
      padding: 6rem 0;
      background: #F5E6D3;
    }
    
    .faq-header {
      text-align: center;
      margin-bottom: 4rem;
    }
    
    .section-title {
      font-size: 2.5rem;
      font-weight: 900;
      color: #2D372D;
      margin-bottom: 1.5rem;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    
    .section-subtitle {
      font-size: 1.2rem;
      color: #666;
      max-width: 700px;
      margin: 0 auto;
      line-height: 1.7;
    }
    
    .faq-accordion {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .faq-item {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }
    
    .faq-item:hover {
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
      border-color: rgba(139, 115, 85, 0.2);
    }
    
    .faq-item--open {
      border-color: #8B7355;
      box-shadow: 0 8px 25px rgba(139, 115, 85, 0.15);
    }
    
    .faq-question {
      width: 100%;
      padding: 1.5rem 2rem;
      background: none;
      border: none;
      text-align: left;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      transition: all 0.3s ease;
      position: relative;
      margin-bottom: 1rem;
    }
    
    .faq-question:hover {
      background: rgba(139, 115, 85, 0.05);
    }
    
    .faq-item--open .faq-question {
      background: rgba(139, 115, 85, 0.1);
      border-bottom: 1px solid rgba(139, 115, 85, 0.2);
    }
    
    .question-text {
      font-size: 1.1rem;
      font-weight: 700;
      color: #2D372D;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      line-height: 1.4;
    }
    
    .question-icon {
      width: 24px;
      height: 24px;
      color: #8B7355;
      transition: transform 0.3s ease;
      flex-shrink: 0;
    }
    
    .question-icon--rotated {
      transform: rotate(180deg);
    }
    
    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }
    
    .faq-answer--open {
      max-height: 500px;
    }
    
    .answer-content {
      padding: 0 2rem 2rem;
    }
    
    .answer-content p {
      color: #555;
      font-size: 1rem;
      line-height: 1.7;
      margin: 0;
    }
    
    /* CTA Footer */
    .cta-footer {
      position: relative;
      /* height: 50vh; */
      /* min-height: 400px; */
      padding: 4rem 0;
      display: flex;
      align-items: center;
      justify-content: center;
      
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
      letter-spacing: 0.5px;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
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
    
    /* Responsive Design */
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
      
      .section-subtitle {
        font-size: 1.1rem;
      }
      
      .container {
        padding: 0 3rem;
      }
      
      .faq-question {
        padding: 1.3rem 1.8rem;
      }
      
      .question-text {
        font-size: 1rem;
      }
      
      .answer-content {
        padding: 0 1.8rem 1.8rem;
      }
      
      .cta-title {
        font-size: 2.5rem;
      }
      
      .cta-subtitle {
        font-size: 1.1rem;
      }
      
      .cta-button {
        padding: 1.1rem 2.5rem;
        font-size: 1.1rem;
      }
      
      .faq-item {
        margin-bottom: 1.2rem;
      }
      
      .faq-accordion {
        gap: 1.2rem;
      }
    }
    
    @media (max-width: 768px) {
      .faq-page {
        margin-top: 4rem;
      }

      .hero-title {
        font-size: 2.5rem;
      }
      
      .hero-subtitle {
        font-size: 1.1rem;
      }
      
      .section-title {
        font-size: 2rem;
      }
      
      .section-subtitle {
        font-size: 1rem;
      }
      
      .faq-question {
        padding: 1.2rem 1.5rem;
      }
      
      .question-text {
        font-size: 0.95rem;
      }
      
      .answer-content {
        padding: 0 1.5rem 1.5rem;
      }
      
      .cta-title {
        font-size: 2.2rem;
      }
      
      .cta-subtitle {
        font-size: 1rem;
      }
      
      .container {
        padding: 0 1.5rem;
      }
    }
    
    @media (max-width: 480px) {
      .hero-title {
        font-size: 2rem;
      }
      
      .section-title {
        font-size: 1.8rem;
      }
      .faq-question {
        padding: 1rem 1.2rem;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
      
      .question-text {
        font-size: 0.9rem;
        line-height: 1.3;
      }
      
      .question-icon {
        align-self: flex-end;
        margin-top: -1.5rem;
      }
      
      .answer-content {
        padding: 0 1.2rem 1.2rem;
      }
      
      .cta-title {
        font-size: 1.8rem;
      }
      
      .cta-button {
        padding: 1rem 2rem;
        font-size: 1rem;
      }
      
      .container {
        padding: 0 1rem;
      }
    }
    
    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
      .faq-answer,
      .question-icon,
      .faq-item,
      .cta-button {
        transition: none;
      }
    }
    
    /* Focus states for accessibility */
    .faq-question:focus {
      outline: 2px solid #8B7355;
      outline-offset: 2px;
    }
    
    .cta-button:focus {
      outline: 2px solid #F5E6D3;
      outline-offset: 2px;
    }
  </style>
  
  