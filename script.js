/* ==========================================================================
   Ismam Jahan — Author Portfolio Website
   Interactive JavaScript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Interactive Cursor Glow Spotlight Tracker with Smooth Physics
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let isMoving = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isMoving) {
        isMoving = true;
        cursorGlow.classList.add('active');
        requestAnimationFrame(animateGlow);
      }
    });

    document.addEventListener('mouseleave', () => {
      cursorGlow.classList.remove('active');
      isMoving = false;
    });

    function animateGlow() {
      if (!isMoving) return;
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      cursorGlow.style.left = `${currentX}px`;
      cursorGlow.style.top = `${currentY}px`;
      requestAnimationFrame(animateGlow);
    }
  }

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = mobileMenu.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
      }
    });

    // Close menu when clicking links
    document.querySelectorAll('.mobile-nav-links .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  // Active Link Highlighting on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 130;
      const sectionHeight = section.offsetHeight;
      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Modals
  const readerModal = document.getElementById('readerModal');
  const audioModal = document.getElementById('audioModal');
  const orderModal = document.getElementById('orderModal');
  const authorRequestModal = document.getElementById('authorRequestModal');

  // Reader Modal Controls
  window.openReaderModal = function(bookTitle) {
    if (!readerModal) return;
    const titleElem = document.getElementById('readerModalTitle');
    if (titleElem) titleElem.textContent = bookTitle || 'নির্জন জলছবি — নমুনা পাঠ';
    readerModal.classList.add('active');
  };

  // Audio Modal Controls
  window.openAudioModal = function() {
    if (!audioModal) return;
    audioModal.classList.add('active');
  };

  // Order Modal Controls
  window.openOrderModal = function(bookTitle) {
    if (!orderModal) return;
    const titleElem = document.getElementById('orderModalTitle');
    if (titleElem) titleElem.textContent = bookTitle ? `সংগ্রহ করুন: ${bookTitle}` : 'বই সংগ্রহ করুন';
    orderModal.classList.add('active');
  };

  // Request Author Profile Modal
  window.openAuthorRequestModal = function() {
    if (!authorRequestModal) return;
    authorRequestModal.classList.add('active');
  };

  // Close Modals
  document.querySelectorAll('.modal-close, .modal-overlay').forEach(element => {
    element.addEventListener('click', (e) => {
      if (e.target === element || element.classList.contains('modal-close')) {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
      }
    });
  });

  // Audio Player Play/Pause Simulation
  const audioPlayBtn = document.getElementById('audioPlayBtn');
  const audioWrapper = document.querySelector('.audio-player-wrapper');
  let isPlaying = false;

  if (audioPlayBtn && audioWrapper) {
    audioPlayBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      if (isPlaying) {
        audioWrapper.classList.add('playing');
        audioPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
        showToast('🎧 অডিও প্লেয়ারে কবিতা আবৃত্তি প্লে হচ্ছে...');
      } else {
        audioWrapper.classList.remove('playing');
        audioPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
        showToast('⏸️ অডিও পজ করা হয়েছে');
      }
    });
  }

  // Toast Notification System
  window.showToast = function(message) {
    let toast = document.getElementById('toastAlert');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastAlert';
      toast.className = 'toast-alert';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fas fa-info-circle text-cyan-400"></i> <span>${message}</span>`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  };

  // Copy Poem Text Action with Author Credit
  window.copyPoem = function(button, poemText, bookSource, authorName) {
    const sourceText = bookSource ? ` (বই: ${bookSource})` : '';
    const authorText = authorName || 'Ismam Jahan';
    const fullTextToCopy = `${poemText.trim()}\n\n— ${authorText}${sourceText}`;

    navigator.clipboard.writeText(fullTextToCopy).then(() => {
      showToast('✨ কবিতাটি লেখক ক্রেডিটসহ কপি করা হয়েছে!');
      const origText = button.innerHTML;
      button.innerHTML = '<i class="fas fa-check text-green-400"></i> কপি হয়েছে';
      setTimeout(() => {
        button.innerHTML = origText;
      }, 2500);
    }).catch(err => {
      showToast('কপি করা সম্ভব হয়নি');
    });
  };

  // Heart Like Counter
  window.toggleLike = function(button) {
    let countElem = button.querySelector('.like-count');
    let currentCount = parseInt(countElem.textContent, 10) || 0;
    
    if (button.classList.contains('liked')) {
      button.classList.remove('liked');
      countElem.textContent = currentCount - 1;
      showToast('লাইক সরানো হয়েছে');
    } else {
      button.classList.add('liked');
      countElem.textContent = currentCount + 1;
      showToast('❤️ কবিতায় ভালোবাসা প্রদান করার জন্য ধন্যবাদ!');
    }
  };

  // Recite Audio Simulation
  window.recitePoem = function(title) {
    openAudioModal();
    showToast(`🎙️ "${title}" আবৃত্তি প্লে করা হচ্ছে...`);
  };

  // Order Form Submit
  const orderForm = document.getElementById('orderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('🎉 আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে! খুব শীঘ্রই আপনার সাথে যোগাযোগ করা হবে।');
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
      orderForm.reset();
    });
  }

  // Request Author Profile Form Submit
  const authorRequestForm = document.getElementById('authorRequestForm');
  if (authorRequestForm) {
    authorRequestForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('✨ আপনার প্রোফাইল রিকোয়েস্ট সফলভাবে জমা হয়েছে! আমাদের টিম আপনার সাথে কথা বলবে।');
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
      authorRequestForm.reset();
    });
  }
});
