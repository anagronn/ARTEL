document.querySelectorAll('.compound-btn').forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
    const details = button.closest('.compound-item').nextElementSibling;
    if (details && details.classList.contains('compound-details')) {
      if (!details.classList.contains('active')) {
        details.style.display = 'flex';
        setTimeout(() => {
          details.classList.add('active');
        }, 100);
      } else {
        details.classList.remove('active');
        setTimeout(() => {
          details.style.display = 'none';
        }, 300);
      }
    }
  });
});
