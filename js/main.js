/**
 * Tukuru Corporate Website - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // ----------------------------------------
  // Header scroll effect
  // ----------------------------------------
  const header = document.getElementById('header');

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  // ----------------------------------------
  // Mobile navigation
  // ----------------------------------------
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleNav = () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggleNav);

  // Close nav when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('active')) {
        toggleNav();
      }
    });
  });

  // ----------------------------------------
  // Smooth scroll for anchor links
  // ----------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ----------------------------------------
  // Scroll animation
  // ----------------------------------------
  const animateElements = document.querySelectorAll('.service-card, .flow-step, .company-table-wrapper, .contact-form');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach(element => {
    element.classList.add('scroll-animate');
    observer.observe(element);
  });

  // ----------------------------------------
  // Modal
  // ----------------------------------------
  const modal = document.getElementById('modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalTitle = document.getElementById('modal-title');
  const modalMessage = document.getElementById('modal-message');
  const modalClose = document.getElementById('modal-close');

  const showModal = (title, message) => {
    modalTitle.textContent = title;
    modalMessage.innerHTML = message;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const hideModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalClose.addEventListener('click', hideModal);
  modalOverlay.addEventListener('click', hideModal);

  // ----------------------------------------
  // Contact form handling
  // ----------------------------------------
  const contactForm = document.getElementById('contact-form');
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzsBXd5QHEmFa4zXIVXj8Q_t4OoXTX7qL0mAalnmzWbnRdQc2wx7kD3hZ5NTsVRh8tPIw/exec';

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    // 送信中の状態に変更
    submitButton.textContent = '送信中...';
    submitButton.disabled = true;

    // フォームデータの取得
    const formData = new FormData(contactForm);
    const data = {
      name: formData.get('name'),
      company: formData.get('company-name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message')
    };

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      // no-corsモードではレスポンスを確認できないため、送信成功とみなす
      showModal(
        'お問合せありがとうございます',
        '内容を確認次第、ご連絡いたします。<br>返信までに数日要することがありますがご了承ください。'
      );
      contactForm.reset();

    } catch (error) {
      console.error('Error:', error);
      showModal(
        '送信に失敗しました',
        '恐れ入りますが、時間をおいて再度お試しください。'
      );
    } finally {
      // ボタンを元に戻す
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  });
});
