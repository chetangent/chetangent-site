const interactiveName = document.querySelector('.interactive-name');
const revealTargets = document.querySelectorAll(
  '.card, .page-card, .project-card, .section-heading, .footer, .hero-photo-card, .page-hero'
);

if (interactiveName) {
  const nameText = interactiveName.textContent ?? '';
  const lettersMarkup = Array.from(nameText)
    .map((character, index) => {
      if (character === ' ') {
        return '<span class="name-wave-letter name-wave-space" aria-hidden="true"></span>';
      }

      return `<span class="name-wave-letter" style="--letter-index:${index}" aria-hidden="true">${character}</span>`;
    })
    .join('');

  interactiveName.setAttribute('aria-label', nameText.trim());
  interactiveName.textContent = '';
  interactiveName.insertAdjacentHTML('afterbegin', lettersMarkup);

  const waveLetters = Array.from(interactiveName.querySelectorAll('.name-wave-letter'));

  const updateWave = (pointerX) => {
    waveLetters.forEach((letter) => {
      if (letter.classList.contains('name-wave-space')) {
        return;
      }

      const rect = letter.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const distance = Math.abs(pointerX - centerX);
      const normalized = Math.max(0, 1 - distance / 120);
      const lift = Math.pow(normalized, 1.6);
      letter.style.setProperty('--lift', lift.toFixed(3));
    });
  };

  const resetWave = () => {
    waveLetters.forEach((letter) => {
      letter.style.setProperty('--lift', '0');
    });
  };

  interactiveName.addEventListener('mousemove', (event) => {
    updateWave(event.clientX);
  });

  interactiveName.addEventListener('mouseleave', resetWave);
  interactiveName.addEventListener('touchend', resetWave);
}

if (revealTargets.length && 'IntersectionObserver' in window) {
  revealTargets.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${Math.min(index * 70, 280)}ms`);
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: '0px 0px -8% 0px',
    }
  );

  revealTargets.forEach((element) => {
    revealObserver.observe(element);
  });
}
