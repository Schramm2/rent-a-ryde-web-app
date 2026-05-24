<template>
  <footer class="footer">
    <!-- Main Footer Section -->
    <div class="footer-main">
      <div class="container">
        <div class="footer-content">
          <!-- Logo & Brand Section -->
          <div class="footer-brand">
            <div class="footer-logo">
              <img src="@/assets/Logos/FullLogo_Transparent_NoBuffer.png" alt="RentARyde Logo" class="logo-image" />
              <span class="logo-text">RentARyde</span>
            </div>
            <p class="brand-tagline">
              Your gateway to authentic South African off-road adventures.
              Explore the untamed beauty of our country with confidence.
            </p>
          </div>

          <!-- Navigation Links -->
          <div class="footer-nav">
            <h3 class="footer-title">Quick Links</h3>
            <ul class="nav-list">
              <li><a href="/" class="footer-link">Home</a></li>
              <li><a href="/vehicles" class="footer-link">Vehicles</a></li>
              <li><a href="/bookings" class="footer-link">Bookings</a></li>
              <li><a href="/about" class="footer-link">About</a></li>
              <li><a href="/contact" class="footer-link">Contact</a></li>
            </ul>
          </div>

          <!-- Contact Information -->
          <div class="footer-contact">
            <h3 class="footer-title">Get in Touch</h3>
            <div class="contact-info">
              <div class="contact-item">
                <div class="contact-icon">
                  <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div class="contact-details">
                  <span class="contact-label">Email</span>
                  <a href="mailto:enquiries@rentaryde.co.za" class="contact-value">enquiries@rentaryde.co.za</a>
                </div>
              </div>

              <div class="contact-item">
                <div class="contact-icon">
                  <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <div class="contact-details">
                  <span class="contact-label">Phone</span>
                  <a href="tel:+27721301912" class="contact-value">+27 72 130 1912</a>
                </div>
              </div>

              <div class="contact-item">
                <div class="contact-icon">
                  <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                  </svg>
                </div>
                <div class="contact-details">
                  <span class="contact-label">Office Hours</span>
                  <span class="contact-value">Mon–Fri, 08:00–17:00</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Media & CTA -->
          <div class="footer-social">
            <h3 class="footer-title">Follow Our Adventures</h3>
            <div class="social-links">
              <a href="https://www.instagram.com/renta.ryde/" class="social-link instagram"
                aria-label="Follow us on Instagram" target="_blank" rel="noopener noreferrer">
                <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a href="https://www.facebook.com/people/Rent-A-Ryde/61575497434092/" class="social-link facebook"
                aria-label="Follow us on Facebook" target="_blank" rel="noopener noreferrer">
                <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a href="https://wa.me/+27721301912" class="social-link whatsapp" aria-label="Contact us on WhatsApp"
                target="_blank" rel="noopener noreferrer">
                <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
              </a>
            </div>

            <!-- Optional Badge/Certification
              <div class="footer-badge">
                <img src="PLACEHOLDER" alt="Certification Badge" class="badge-image" />
              </div> -->
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Copyright Bar -->
    <div class="footer-bottom">
      <div class="container">
        <div class="bottom-content">
          <div class="copyright">
            <p>&copy; 2025 RentARyde. All rights reserved.</p>
          </div>
          <div class="legal-links">
            <a href="/legal" class="legal-link">Privacy Policy</a>
            <span class="separator">|</span>
            <a href="/legal" class="legal-link">Terms of Service</a>
          </div>
          <div class="creator-credit">
            <a href="https://www.linkedin.com/in/matthew-schramm-476523253" class="credit-link" target="_blank" rel="noopener noreferrer" aria-label="Matthew Schramm LinkedIn">
              <svg class="linkedin-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 20h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76 0-.97.78-1.76 1.75-1.76s1.75.79 1.75 1.76c0 .97-.78 1.76-1.75 1.76zm15.25 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z"/></svg>
              <span class="credit-text">Created by Matthew Schramm</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>

</script>
<style scoped>
/* Global Footer Styles */
.footer {
  font-family: 'Arial', sans-serif;
  color: #F5E6D3;
  background: #2D372D;
  margin-top: auto;
  width: 100vw;
  overflow-x: hidden;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Main Footer Section */
.footer-main {
  padding: 4rem 0 2rem;
  border-bottom: 1px solid rgba(139, 115, 85, 0.3);
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

/* Brand Section */
.footer-brand {
  max-width: 400px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.logo-image {
  height: 75px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15));
  transition: filter 0.3s ease;
  background: linear-gradient(135deg, #F5E6D3, #E8D5B5);
  border-radius: 12px;
  padding: 4px 8px;
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
  font-size: 1.5rem;
  font-weight: 800;
  color: #F5E6D3;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-family: 'Arial Black', Arial, sans-serif;
}

.brand-tagline {
  color: rgba(245, 230, 211, 0.8);
  line-height: 1.6;
  font-size: 0.95rem;
}

/* Footer Titles */
.footer-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: #F5E6D3;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Navigation Section */
.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-list li {
  margin-bottom: 0.75rem;
}

.footer-link {
  color: rgba(245, 230, 211, 0.8);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
}

.footer-link:hover {
  color: #8B7355;
  padding-left: 0.5rem;
}

.footer-link::before {
  content: '';
  position: absolute;
  left: -0.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 2px;
  background: #8B7355;
  transition: width 0.3s ease;
}

.footer-link:hover::before {
  width: 0.25rem;
}

/* Contact Section */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.contact-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #8B7355, #A0845C);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(139, 115, 85, 0.3);
}

.icon {
  width: 20px;
  height: 20px;
  color: #F5E6D3;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.contact-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(245, 230, 211, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.contact-value {
  color: rgba(245, 230, 211, 0.9);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.contact-value:hover {
  color: #8B7355;
}

/* Social Media Section */
.social-links {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.social-link {
  width: 45px;
  height: 45px;
  background: rgba(139, 115, 85, 0.2);
  border: 2px solid rgba(139, 115, 85, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(245, 230, 211, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.social-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.social-link.instagram:hover {
  background: rgba(225, 48, 108, 0.2);
  border-color: #E1306C;
  color: #E1306C;
}

.social-link.facebook:hover {
  background: rgba(24, 119, 242, 0.2);
  border-color: #1877F2;
  color: #1877F2;
}

.social-link.whatsapp:hover {
  background: rgba(37, 211, 102, 0.2);
  border-color: #25D366;
  color: #25D366;
}

.social-icon {
  width: 22px;
  height: 22px;
}

/* Footer Badge */
.footer-badge {
  margin-top: 1rem;
}

.badge-image {
  height: 60px;
  width: auto;
  object-fit: contain;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.badge-image:hover {
  opacity: 1;
}

/* Bottom Copyright Bar */
.footer-bottom {
  background: rgba(0, 0, 0, 0.2);
  padding: 1.5rem 0;
}

.bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright p {
  margin: 0;
  color: rgba(245, 230, 211, 0.7);
  font-size: 0.9rem;
}

.legal-links {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.legal-link {
  color: rgba(245, 230, 211, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.legal-link:hover {
  color: #8B7355;
}

.separator {
  color: rgba(245, 230, 211, 0.4);
}

.creator-credit {
  margin-top: 0.5rem;
  text-align: right;
  font-size: 0.75rem;
  opacity: 0.55;
  letter-spacing: 0.2px;
}
.credit-link {
  color: rgba(245, 230, 211, 0.5);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  transition: color 0.2s;
}
.credit-link:hover {
  color: #8B7355;
}
.linkedin-icon {
  width: 15px;
  height: 15px;
  vertical-align: middle;
  opacity: 0.7;
}
.credit-text {
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.1px;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
  }

  .footer-brand {
    grid-column: 1 / -1;
    max-width: none;
    margin-bottom: 1rem;
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .footer-brand {
    text-align: center;
  }

  .footer-logo {
    justify-content: center;
  }

  .contact-item {
    justify-content: center;
  }

  .social-links {
    justify-content: center;
  }

  .bottom-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .legal-links {
    justify-content: center;
  }

  .container {
    padding: 0 1.5rem;
  }
}

@media (max-width: 480px) {
  .footer-main {
    padding: 3rem 0 1.5rem;
  }

  .logo-text {
    font-size: 1.3rem;
  }

  .logo-image {
    height: 50px;
  }

  .footer-title {
    font-size: 1rem;
  }

  .social-links {
    gap: 0.75rem;
  }

  .social-link {
    width: 40px;
    height: 40px;
  }

  .social-icon {
    width: 18px;
    height: 18px;
  }

  .container {
    padding: 0 1rem;
  }
}

@media (max-width: 600px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.2rem;
    text-align: center;
  }

  .footer-main {
    padding: 2rem 0 1rem;
  }

  .logo-image {
    height: 40px;
  }

  .logo-text {
    font-size: 1.1rem;
  }

  .footer-title {
    font-size: 0.95rem;
  }

  .brand-tagline,
  .contact-label,
  .contact-value {
    font-size: 0.85rem;
  }

  .social-links {
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }

  .contact-info {
    gap: 0.7rem;
  }

  .contact-item {
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
  }

  .footer-link,
  .legal-link {
    font-size: 0.85rem;
  }

  .container {
    padding: 0 0.5rem;
  }
}

/* iPad Specific Media Queries */
@media (min-width: 768px) and (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 2.5rem;
  }

  .footer-brand {
    max-width: 350px;
  }

  .footer-logo {
    margin-bottom: 1.2rem;
  }

  .logo-image {
    height: 55px;
  }

  .logo-text {
    font-size: 1.4rem;
  }

  .brand-tagline {
    font-size: 0.9rem;
  }

  .footer-title {
    font-size: 1rem;
    margin-bottom: 1.2rem;
  }

  .footer-link {
    font-size: 0.9rem;
    margin-bottom: 0.6rem;
  }

  .contact-info {
    gap: 1rem;
  }

  .contact-item {
    gap: 0.8rem;
  }

  .contact-icon {
    width: 35px;
    height: 35px;
  }

  .icon {
    width: 18px;
    height: 18px;
  }

  .contact-label {
    font-size: 0.75rem;
  }

  .contact-value {
    font-size: 0.9rem;
  }

  .social-links {
    gap: 0.8rem;
    margin-bottom: 1.5rem;
  }

  .social-link {
    width: 40px;
    height: 40px;
  }

  .social-icon {
    width: 20px;
    height: 20px;
  }

  .container {
    padding: 0 3rem;
  }

  .footer-main {
    padding: 3rem 0 1.5rem;
  }

  .footer-bottom {
    padding: 1.5rem 0;
  }

  .bottom-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .legal-links {
    justify-content: center;
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-brand {
    max-width: 100%;
    text-align: center;
  }

  .footer-logo {
    justify-content: center;
    margin-bottom: 1rem;
  }

  .logo-image {
    height: 50px;
  }

  .logo-text {
    font-size: 1.3rem;
  }

  .brand-tagline {
    font-size: 0.9rem;
  }

  .footer-title {
    font-size: 1rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  .nav-list {
    text-align: center;
  }

  .footer-link {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .contact-info {
    gap: 1rem;
  }

  .contact-item {
    gap: 0.8rem;
    justify-content: center;
  }

  .contact-icon {
    width: 35px;
    height: 35px;
  }

  .icon {
    width: 18px;
    height: 18px;
  }

  .contact-label {
    font-size: 0.75rem;
  }

  .contact-value {
    font-size: 0.9rem;
  }

  .social-links {
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .social-link {
    width: 40px;
    height: 40px;
  }

  .social-icon {
    width: 20px;
    height: 20px;
  }

  .container {
    padding: 0 1.5rem;
  }

  .footer-main {
    padding: 2.5rem 0 1.5rem;
  }

  .footer-bottom {
    padding: 1rem 0;
  }

  .bottom-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .legal-links {
    justify-content: center;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .footer-main {
    padding: 2rem 0 1rem;
  }

  .logo-text {
    font-size: 1.1rem;
  }

  .logo-image {
    height: 45px;
  }

  .footer-title {
    font-size: 0.9rem;
  }

  .social-links {
    gap: 0.8rem;
  }

  .social-link {
    width: 35px;
    height: 35px;
  }

  .social-icon {
    width: 18px;
    height: 18px;
  }

  .container {
    padding: 0 1rem;
  }
}
</style>