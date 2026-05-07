const copyEmailButton = document.querySelector('#copy-email');

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
