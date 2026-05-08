const copyEmailButton = document.querySelector('#copy-email');
const interactiveName = document.querySelector('.interactive-name');
const revealTargets = document.querySelectorAll(
  '.card, .project-card, .section-heading, .footer, .hero-photo-card'
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
}

if (copyEmailButton) {
  copyEmailButton.addEventListener('click', async () => {
    const email = 'chetangips@gmail.com';

    try {
      await navigator.clipboard.writeText(email);
      const originalText = copyEmailButton.textContent;
      copyEmailButton.textContent = 'Copied';
      copyEmailButton.classList.add('copied');

      window.setTimeout(() => {
        copyEmailButton.textContent = originalText;
        copyEmailButton.classList.remove('copied');
      }, 1600);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  });
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
