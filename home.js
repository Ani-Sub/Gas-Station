// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
          target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
          });
      }
  });
});

// Dynamic gas price updates (simulated)
function updateGasPrices() {
  const prices = {
      'regular-price': 3.29,
      'mid-price': 3.49,
      'premium-price': 3.69,
      'diesel-price': 3.89
  };
  
  // Simulate small price fluctuations
  Object.keys(prices).forEach(id => {
      const basePrice = prices[id];
      const fluctuation = (Math.random() - 0.5) * 0.20; // ±10 cents
      const newPrice = (basePrice + fluctuation).toFixed(2);
      const element = document.getElementById(id);
      if (element) {
          element.textContent = `$${newPrice}`;
      }
  });
}

// Update prices every 30 seconds (simulated real-time updates)
setInterval(updateGasPrices, 30000);

// Add animation to service cards on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
      }
  });
}, observerOptions);

// Observe all service cards
document.querySelectorAll('.service-card, .contact-card, .price-item').forEach(card => {
  observer.observe(card);
});

// Add interactive hover effects
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
  });
});

// Add click effect to CTA button
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
  ctaButton.addEventListener('click', function(e) {
      // Create ripple effect
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.6)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s linear';
      ripple.style.pointerEvents = 'none';
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => {
          ripple.remove();
      }, 600);
  });
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
      to {
          transform: scale(4);
          opacity: 0;
      }
  }
`;
document.head.appendChild(style);