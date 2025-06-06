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

// Add animation to cards on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
      }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

// Observe all cards for animation
document.querySelectorAll('.service-card, .contact-card, .gas-item').forEach(card => {
  observer.observe(card);
});

// Add hover effects to service cards
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
  });
});

// Add ripple effect to CTA button
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
  ctaButton.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
  });
}

// Mobile navigation toggle
function initMobileNav() {
  if (window.innerWidth <= 480 && !document.querySelector('.mobile-toggle')) {
      const nav = document.querySelector('nav');
      const navLinks = document.querySelector('.nav-links');
      
      const toggleButton = document.createElement('button');
      toggleButton.className = 'mobile-toggle';
      toggleButton.innerHTML = '☰';
      toggleButton.style.cssText = `
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #2c3e50;
          cursor: pointer;
      `;
      
      nav.insertBefore(toggleButton, navLinks);
      
      toggleButton.addEventListener('click', () => {
          navLinks.style.display = navLinks.style.display === 'none' ? 'flex' : 'none';
      });
      
      navLinks.style.display = 'none';
  }
}

// Add required CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
      to {
          transform: scale(4);
          opacity: 0;
      }
  }
  
  @media (max-width: 480px) {
      .mobile-toggle {
          display: block !important;
      }
      
      .nav-links {
          flex-direction: column !important;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          border-radius: 0 0 10px 10px;
          padding: 1rem;
          z-index: 1000;
      }
  }
`;
document.head.appendChild(style);

// Initialize mobile navigation
initMobileNav();
window.addEventListener('resize', initMobileNav);