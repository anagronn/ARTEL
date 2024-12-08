
function showConsultModal() {
  const existingModal = document.querySelector('.modal-container');
  if (existingModal) existingModal.remove();
  const btn = document.querySelector('.close-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      existingModal.remove();
    });
  }
  const modalContainer = document.createElement('div');
  modalContainer.className = 'modal-container';
  modalContainer.innerHTML = `
  <div class="modal">
    <div class="close-btn" id="modal">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M6.78872 8L3.15217 4.36345L4.36436 3.15127L8.00091 6.78782L11.6375 3.15127L12.8496 4.36345L9.21309 8L12.8496 11.6365L11.6375 12.8487L8.00091 9.21218L4.36436 12.8487L3.15217 11.6365L6.78872 8Z"
            fill="#0060FE" />
        </svg>
      </div>
    <header class="modal-header">
      <h4 class="modal-heading">Получить консультацию</h4>
      <p class="modal-caption">Оставьте Ваши данные, и мы  Вами свяжемся</p>
    </header>
    <form class="modal-form">
      <div class="form-main">
      <div class="form-group">
        <label for="name" class="form-label">Имя</label>
        <input type="text" id="name" name="name" class="form-input" required>
      </div>
      <div class="form-group">
        <label for="phone" class="form-label">Номер телефона</label>
        <input type="tel" id="phone" name="phone" class="form-input" required>
      </div>
      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input type="email" id="email" name="email" class="form-input" required>
      </div>
      </div>
     <div class="form-footer">
      <button type="submit" class="button button-dark form-submit-button">Отправить</button>
      <p class="form-caption">Нажимая на кнопку, Вы принимаете политику конфиденциальности и даете согласие на обработку персональных данных.</p>
     </div>
    </form>
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

  const form = document.querySelector('.modal-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {};
    
    data['title'] = document.querySelector('.modal-heading').textContent;
    formData.forEach((value, key) => {
      data[key] = value;
    });

    saveDataToIndexedDB(data);

    const modal = document.querySelector('.modal-container');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'scroll';
      setTimeout(() => modal.remove(), 500);
    }

    alert('Ваши данные успешно сохранены! Мы с вами свяжемся в ближайшее время');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.consult').forEach((btn) => {
    btn.addEventListener('click', () => {
      showConsultModal();
    });
  });
});

