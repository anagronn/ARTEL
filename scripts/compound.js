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

document.querySelectorAll('.compound-image').forEach((image) => {
  image.addEventListener('click', () => {
    const modalContainer = document.createElement('div');
  modalContainer.className = 'modal-container';
  modalContainer.innerHTML = `
    <div class="modal-compound">
    <img src="./assets/imgComp.png" alt="compound" class="compound-modal-image">
      <div class="close-btn" id="modal">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M6.78872 8L3.15217 4.36345L4.36436 3.15127L8.00091 6.78782L11.6375 3.15127L12.8496 4.36345L9.21309 8L12.8496 11.6365L11.6375 12.8487L8.00091 9.21218L4.36436 12.8487L3.15217 11.6365L6.78872 8Z"
            fill="#0060FE" />
        </svg>
      </div>
    </div>
  `;

  document.body.appendChild(modalContainer);
  setTimeout(() => modalContainer.classList.add('active'), 10);
  document.body.style.overflow = 'hidden';

  const closeBtn = modalContainer.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => {
    modalContainer.classList.remove('active');
    document.body.style.overflow = 'scroll';
    setTimeout(() => modalContainer.remove(), 500);
  });
  });
});
