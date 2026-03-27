// ===== BAHAY DESIGN - Main JS =====

document.addEventListener('DOMContentLoaded', () => {
  // Header scroll effect
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // Mobile menu
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // Active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // Fade-in on scroll
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    fadeEls.forEach(el => observer.observe(el));
  }

  // Lightbox with prev/next navigation
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const lightboxImg = lightbox.querySelector('#lightbox-img');
    const lightboxImages = Array.from(document.querySelectorAll('[data-lightbox]'));
    let currentIndex = 0;

    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    function showImage(index) {
      if (index < 0) index = lightboxImages.length - 1;
      if (index >= lightboxImages.length) index = 0;
      currentIndex = index;
      lightboxImg.src = lightboxImages[currentIndex].src;
    }

    lightboxImages.forEach((img, i) => {
      img.addEventListener('click', () => {
        currentIndex = i;
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
      });
      // If image is inside an event card, make the whole card clickable for lightbox
      const eventCard = img.closest('.event-card');
      if (eventCard) {
        eventCard.addEventListener('click', (e) => {
          if (e.target.closest('.lightbox')) return;
          currentIndex = i;
          lightboxImg.src = img.src;
          lightbox.classList.add('active');
        });
      }
    });

    // Close on background click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target === lightboxImg) {
        lightbox.classList.remove('active');
      }
    });

    // Close button
    const closeBtn = lightbox.querySelector('.lightbox-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
      });
    }

    // Prev / Next buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentIndex - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentIndex + 1);
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
      if (e.key === 'ArrowRight') showImage(currentIndex + 1);
      if (e.key === 'Escape') lightbox.classList.remove('active');
    });
  }

  // Form submission with confirmation message
  document.querySelectorAll('.contact-form').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(form);
      const action = form.getAttribute('action');
      const successMsg = form.parentElement.querySelector('.form-success');

      fetch(action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok || response.status === 200) {
          form.reset();
          if (successMsg) {
            successMsg.classList.add('visible');
            setTimeout(() => successMsg.classList.remove('visible'), 6000);
          }
        }
      }).catch(() => {
        // Fallback: submit normally
        form.submit();
      });
    });
  });
});
