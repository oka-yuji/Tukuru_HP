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
  // Contact form handling
  // ----------------------------------------
  const contactForm = document.getElementById('contact-form');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // フォームデータの取得
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    // ここでフォーム送信処理を実装
    // 現在はUIのみ。後日Google Form連携等を追加予定

    console.log('Form data:', data);

    // 仮の送信完了メッセージ
    alert('お問い合わせありがとうございます。\n\n※現在、フォーム送信機能は準備中です。\nメールでのお問い合わせをお願いいたします。');

    // フォームリセット
    // contactForm.reset();
  });
});
