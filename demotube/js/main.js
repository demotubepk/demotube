/* ============================================================
   DemoTube – Main JavaScript (ES6)
   ============================================================ */

'use strict';

/* ============================================================
   DARK / LIGHT MODE TOGGLE
   ============================================================ */
const initTheme = () => {
  const savedTheme = localStorage.getItem('demotube-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
};

const updateThemeIcon = (theme) => {
  const toggleBtns = document.querySelectorAll('[data-theme-toggle]');
  toggleBtns.forEach(btn => {
    const icon = btn.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  });
};

const toggleTheme = () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('demotube-theme', next);
  updateThemeIcon(next);
};

document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
  btn.addEventListener('click', toggleTheme);
});

/* ============================================================
   STICKY NAVBAR
   ============================================================ */
const initStickyNav = () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
};

/* ============================================================
   MOBILE NAVIGATION
   ============================================================ */
const initMobileNav = () => {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!menuBtn || !mobileNav) return;

  let isOpen = false;

  const openMenu = () => {
    isOpen = true;
    menuBtn.classList.add('active');
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    isOpen = false;
    menuBtn.classList.remove('active');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  };

  menuBtn.addEventListener('click', () => isOpen ? closeMenu() : openMenu());

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (isOpen && !menuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
      closeMenu();
    }
  });
};

/* ============================================================
   ACTIVE NAV LINK HIGHLIGHTING
   ============================================================ */
const initActiveNav = () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link-custom, .mobile-nav .nav-link-custom').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (
      href === currentPage ||
      (currentPage === '' && href === 'index.html') ||
      (href !== 'index.html' && currentPage.includes(href.replace('.html', '')))
    ) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
};

/* ============================================================
   SCROLL TO TOP BUTTON
   ============================================================ */
const initScrollTop = () => {
  const btn = document.querySelector('.scroll-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};

/* ============================================================
   SMOOTH SCROLLING (Anchor links)
   ============================================================ */
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
};

/* ============================================================
   FAQ ACCORDION
   ============================================================ */
const initFAQ = () => {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // Open first by default
  const first = document.querySelector('.faq-item');
  if (first) first.classList.add('open');
};

/* ============================================================
   TESTIMONIAL SWIPER SLIDER
   ============================================================ */
const initTestimonialSwiper = () => {
  if (typeof Swiper === 'undefined') return;
  if (!document.querySelector('.testimonial-swiper')) return;

  new Swiper('.testimonial-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });
};

/* ============================================================
   COURSE SEARCH (Frontend Filter)
   ============================================================ */
const initCourseSearch = () => {
  const searchInput = document.querySelector('#courseSearch');
  const courseCards = document.querySelectorAll('.course-item');
  if (!searchInput || courseCards.length === 0) return;

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();

    courseCards.forEach(card => {
      const title = (card.querySelector('.course-card-title')?.textContent || '').toLowerCase();
      const instructor = (card.querySelector('.course-instructor-name')?.textContent || '').toLowerCase();
      const category = (card.dataset.category || '').toLowerCase();

      const matches = title.includes(query) || instructor.includes(query) || category.includes(query) || query === '';
      card.style.display = matches ? '' : 'none';
    });

    // Show no results message
    const noResults = document.querySelector('#noResultsMsg');
    const visibleCards = [...courseCards].filter(c => c.style.display !== 'none');
    if (noResults) {
      noResults.style.display = visibleCards.length === 0 ? 'block' : 'none';
    }
  });
};

/* ============================================================
   CATEGORY FILTER (Courses Page)
   ============================================================ */
const initCategoryFilter = () => {
  const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
  const courseItems = document.querySelectorAll('.course-item[data-category]');
  if (!filterBtns.length || !courseItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      courseItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
          item.style.animation = 'fadeIn 0.4s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
};

/* ============================================================
   CURRICULUM MODULE TOGGLE (Course Details)
   ============================================================ */
const initCurriculum = () => {
  document.querySelectorAll('.module-header').forEach(header => {
    header.addEventListener('click', () => {
      const module = header.closest('.curriculum-module');
      const lessons = module?.querySelector('.module-lessons');
      const icon = header.querySelector('.module-toggle-icon');

      if (!module || !lessons) return;

      const isOpen = module.classList.contains('open');

      if (isOpen) {
        module.classList.remove('open');
        lessons.style.maxHeight = '0';
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        module.classList.add('open');
        lessons.style.maxHeight = lessons.scrollHeight + 'px';
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  // Open first module
  const firstModule = document.querySelector('.curriculum-module');
  if (firstModule) {
    firstModule.classList.add('open');
    const lessons = firstModule.querySelector('.module-lessons');
    const icon = firstModule.querySelector('.module-toggle-icon');
    if (lessons) lessons.style.maxHeight = lessons.scrollHeight + 'px';
    if (icon) icon.style.transform = 'rotate(180deg)';
  }
};

/* ============================================================
   MODULE LESSONS (inline setup)
   ============================================================ */
const initModuleLessons = () => {
  document.querySelectorAll('.module-lessons').forEach(lessons => {
    lessons.style.maxHeight = '0';
    lessons.style.overflow = 'hidden';
    lessons.style.transition = 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
  });
};

/* ============================================================
   CONTACT FORM (Mock Submit)
   ============================================================ */
const initContactForm = () => {
  const form = document.querySelector('#contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const originalText = btn.textContent;

    btn.disabled = true;
    btn.textContent = 'Sending...';

    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Message Sent! ✓';
      btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

      form.reset();

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
      }, 3000);
    }, 1500);
  });
};

/* ============================================================
   NEWSLETTER FORM (Mock Submit)
   ============================================================ */
const initNewsletterForm = () => {
  const form = document.querySelector('#newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const input = form.querySelector('input[type="email"]');
    const originalText = btn.textContent;

    if (!input.value) return;

    btn.disabled = true;
    btn.textContent = '✓ Subscribed!';
    btn.style.background = '#10b981';
    input.value = '';

    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = originalText;
      btn.style.background = '';
    }, 3000);
  });
};

/* ============================================================
   SCROLL REVEAL ANIMATIONS (using AOS)
   ============================================================ */
const initScrollReveal = () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }
};

/* ============================================================
   COUNTER ANIMATION (About Stats)
   ============================================================ */
const animateCounter = (el, target, duration = 2000, suffix = '') => {
  let start = 0;
  const increment = target / (duration / 16);
  const step = () => {
    start += increment;
    if (start >= target) {
      el.textContent = target.toLocaleString() + suffix;
    } else {
      el.textContent = Math.floor(start).toLocaleString() + suffix;
      requestAnimationFrame(step);
    }
  };
  requestAnimationFrame(step);
};

const initCounters = () => {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        const target = parseInt(entry.target.dataset.count);
        const suffix = entry.target.dataset.suffix || '';
        animateCounter(entry.target, target, 2000, suffix);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
};

/* ============================================================
   SEARCH BAR TOGGLE (Navbar)
   ============================================================ */
const initNavSearch = () => {
  const searchBtn = document.querySelector('#navSearchBtn');
  const searchOverlay = document.querySelector('#searchOverlay');
  const searchClose = document.querySelector('#searchClose');
  const searchInput = document.querySelector('#globalSearch');

  if (!searchBtn || !searchOverlay) return;

  searchBtn.addEventListener('click', () => {
    searchOverlay.style.display = 'flex';
    setTimeout(() => {
      searchOverlay.style.opacity = '1';
      searchInput?.focus();
    }, 10);
  });

  const closeSearch = () => {
    searchOverlay.style.opacity = '0';
    setTimeout(() => {
      searchOverlay.style.display = 'none';
    }, 300);
  };

  searchClose?.addEventListener('click', closeSearch);

  searchOverlay?.addEventListener('click', (e) => {
    if (e.target === searchOverlay) closeSearch();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearch();
  });
};

/* ============================================================
   HERO ANIMATION (CSS-driven, just add class)
   ============================================================ */
const initHeroAnimation = () => {
  const heroContent = document.querySelector('.hero-content');
  const heroImage = document.querySelector('.hero-image-wrapper');

  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    setTimeout(() => {
      heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 100);
  }

  if (heroImage) {
    heroImage.style.opacity = '0';
    heroImage.style.transform = 'translateX(30px)';
    setTimeout(() => {
      heroImage.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
      heroImage.style.opacity = '1';
      heroImage.style.transform = 'translateX(0)';
    }, 100);
  }
};

/* ============================================================
   RATING STARS HELPER
   ============================================================ */
const renderStars = (rating) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
};

/* ============================================================
   KEYBOARD ACCESSIBILITY
   ============================================================ */
const initKeyboardNav = () => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });
};

/* ============================================================
   INIT ALL
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initStickyNav();
  initMobileNav();
  initActiveNav();
  initScrollTop();
  initSmoothScroll();
  initFAQ();
  initModuleLessons();
  initCurriculum();
  initCourseSearch();
  initCategoryFilter();
  initContactForm();
  initNewsletterForm();
  initScrollReveal();
  initCounters();
  initNavSearch();
  initHeroAnimation();
  initKeyboardNav();

  // Swiper needs to load first
  window.addEventListener('load', () => {
    initTestimonialSwiper();
  });
});

/* ============================================================
   CSS Keyframe injection for JS-triggered animations
   ============================================================ */
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .keyboard-nav *:focus {
    outline: 2px solid var(--primary) !important;
    outline-offset: 2px !important;
  }
`;
document.head.appendChild(style);
