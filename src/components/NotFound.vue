<template>
    <div class="not-found-container">
      <div class="background-overlay"></div>
      <div class="content-wrapper">
        <div class="error-content">
          <div class="error-code">404</div>
          <h1 class="error-title">Page Not Found</h1>
          <p class="error-message">
            Looks like you've driven off the map...
          </p>
          <div class="image-container">
            <img 
              src="@/assets/Vehicles/1000088079.jpg" 
              alt="Off-road adventure - vehicle on rugged terrain" 
              class="adventure-image"
            />
          </div>
          <div class="cta-section">
            <button 
              class="home-button"
              @click="goHome"
              aria-label="Return to homepage"
            >
              <span class="button-icon">🏠</span>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const goHome = () => {
    // In a real app with Vue Router, this would be: router.push('/')
    router.push('/');
  };
  </script>
  
  <style scoped>
  .not-found-container {
    min-height: 100vh;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #2c3e2d 0%, #4a5d4e 50%, #3d4f41 100%);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    overflow: hidden;
  }
  
  .background-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(139, 125, 107, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(107, 142, 35, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
  
  .content-wrapper {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 800px;
    padding: 2rem;
  }
  
  .error-content {
    text-align: center;
    color: #f5f5dc;
  }
  
  .error-code {
    font-size: clamp(8rem, 15vw, 12rem);
    font-weight: 900;
    line-height: 0.8;
    color: #d2b48c;
    text-shadow: 
      0 0 20px rgba(210, 180, 140, 0.3),
      0 0 40px rgba(210, 180, 140, 0.2);
    margin-bottom: 1rem;
    letter-spacing: -0.05em;
  }
  
  .error-title {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    color: #f5f5dc;
    margin-bottom: 1rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    letter-spacing: 0.02em;
  }
  
  .error-message {
    font-size: clamp(1.1rem, 2.5vw, 1.4rem);
    color: #ddd8c7;
    margin-bottom: 2.5rem;
    font-weight: 400;
    line-height: 1.5;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .image-container {
    margin: 2.5rem 0;
    position: relative;
  }
  
  .adventure-image {
    width: 100%;
    max-width: 500px;
    height: 300px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(245, 245, 220, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background: linear-gradient(45deg, #3d4f41, #2c3e2d);
    border: 2px solid #6b8e23;
  }
  
  .adventure-image:hover {
    transform: translateY(-4px);
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(245, 245, 220, 0.2);
  }
  
 
  
  .home-button {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #6b8e23 0%, #556b2f 100%);
    color: #f5f5dc;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 
      0 4px 16px rgba(107, 142, 35, 0.3),
      0 0 0 1px rgba(245, 245, 220, 0.1);
    letter-spacing: 0.01em;
    position: relative;
    overflow: hidden;
  }
  
  .home-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s ease;
  }
  
  .home-button:hover::before {
    left: 100%;
  }
  
  .home-button:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 6px 20px rgba(107, 142, 35, 0.4),
      0 0 0 1px rgba(245, 245, 220, 0.2);
    background: linear-gradient(135deg, #7ba428 0%, #5f7332 100%);
  }
  
  .home-button:active {
    transform: translateY(0);
    box-shadow: 
      0 2px 8px rgba(107, 142, 35, 0.3),
      0 0 0 1px rgba(245, 245, 220, 0.1);
  }
  
  .home-button:focus {
    outline: none;
    box-shadow: 
      0 4px 16px rgba(107, 142, 35, 0.3),
      0 0 0 3px rgba(107, 142, 35, 0.3);
  }
  
  .button-icon {
    font-size: 1.2rem;
    transition: transform 0.3s ease;
  }
  
  .home-button:hover .button-icon {
    transform: translateX(-2px);
  }
  
  /* Mobile Responsiveness */
  @media (max-width: 768px) {
    .not-found-container {
      padding: 1rem;
    }
    
    .content-wrapper {
      padding: 1rem;
    }
    
    .error-code {
      font-size: clamp(6rem, 20vw, 8rem);
    }
    
    .error-title {
      font-size: clamp(1.5rem, 6vw, 2rem);
    }
    
    .error-message {
      font-size: clamp(1rem, 3vw, 1.2rem);
      margin-bottom: 2rem;
    }
    
    .adventure-image {
      height: 200px;
      max-width: 100%;
    }
    
    .home-button {
      padding: 0.875rem 1.5rem;
      font-size: 1rem;
    }
    
    .cta-section {
      margin-top: 2rem;
    }
  }
  
  @media (max-width: 480px) {
    .error-code {
      font-size: clamp(4rem, 25vw, 6rem);
    }
    
    .adventure-image {
      height: 150px;
    }
    
    .home-button {
      padding: 0.75rem 1.25rem;
      font-size: 0.95rem;
    }
  }
  
  /* Accessibility improvements */
  @media (prefers-reduced-motion: reduce) {
    .home-button,
    .adventure-image,
    .home-button::before,
    .button-icon {
      transition: none;
    }
  }
  
  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .error-code {
      color: #ffffff;
      text-shadow: none;
    }
    
    .error-title,
    .error-message {
      color: #ffffff;
    }
    
    .home-button {
      border: 2px solid #ffffff;
    }
  }
  </style>