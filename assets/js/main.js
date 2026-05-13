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
    const allLightboxImages = Array.from(document.querySelectorAll('[data-lightbox]'));
    let currentGroup = allLightboxImages; // colección actualmente en navegación
    let currentIndex = 0;

    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    function getGroupFor(img) {
      const groupName = img.getAttribute('data-lightbox-group');
      if (!groupName) return allLightboxImages;
      return allLightboxImages.filter(el => el.getAttribute('data-lightbox-group') === groupName);
    }

    function showImage(index) {
      if (!currentGroup.length) return;
      if (index < 0) index = currentGroup.length - 1;
      if (index >= currentGroup.length) index = 0;
      currentIndex = index;
      lightboxImg.src = currentGroup[currentIndex].src;
      lightboxImg.alt = currentGroup[currentIndex].alt || '';
    }

    function openLightboxFor(img) {
      currentGroup = getGroupFor(img);
      currentIndex = currentGroup.indexOf(img);
      if (currentIndex < 0) currentIndex = 0;
      lightboxImg.src = currentGroup[currentIndex].src;
      lightboxImg.alt = currentGroup[currentIndex].alt || '';
      lightbox.classList.add('active');
    }

    allLightboxImages.forEach((img) => {
      img.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openLightboxFor(img);
      });
      // If image is inside an event card, make the whole card clickable for lightbox
      const eventCard = img.closest('.event-card');
      if (eventCard) {
        eventCard.addEventListener('click', (e) => {
          if (e.target.closest('.lightbox')) return;
          openLightboxFor(img);
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

  // Video modal (News page)
  const videoModal = document.getElementById('video-modal');
  if (videoModal) {
    const videoPlayer = document.getElementById('video-modal-player');
    const videoSource = videoPlayer ? videoPlayer.querySelector('source') : null;
    const videoClose = document.getElementById('video-modal-close');

    function openVideo(src) {
      if (!videoPlayer) return;
      if (src && videoSource && videoSource.getAttribute('src') !== src) {
        videoSource.setAttribute('src', src);
        videoPlayer.load();
      }
      videoModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      // Intentamos reproducir automáticamente (puede fallar por políticas de autoplay)
      const playPromise = videoPlayer.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {/* el usuario puede pulsar play manualmente */});
      }
    }

    function closeVideo() {
      videoModal.classList.remove('active');
      if (videoPlayer) {
        videoPlayer.pause();
        try { videoPlayer.currentTime = 0; } catch (e) {}
      }
      document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-video]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openVideo(el.getAttribute('data-video'));
      });
    });

    if (videoClose) videoClose.addEventListener('click', closeVideo);
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideo();
    });
    document.addEventListener('keydown', (e) => {
      if (videoModal.classList.contains('active') && e.key === 'Escape') closeVideo();
    });
  }
});
