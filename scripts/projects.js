const jsonUrl = './projects.json';
const catalogContainer = document.querySelector('.catalog-container');
const loadMoreBtn = document.querySelector('.more');

let projects = [];
let currentIndex = 0;
const projectsPerPage = 6;

function createCard(project) {
  const card = document.createElement('div');
  card.className = 'card-catalog';

  card.innerHTML = `
    <div class="card-image" style="background: url(${project.image}) no-repeat center; background-size: 130%;"></div>
    <div class="card-info">
      <p class="card-description">${project.description}</p>
      <div class="buy-project">
        <p class="price-project">${project.price} BYN</p>
        <p class="prev-price-project">${project.prevPrice} BYN</p>
        <button class="button button-dark buy-btn">Купить проект</button>
      </div>
    </div>
  `;

  return card;
}

function renderCards() {
  const nextProjects = projects.slice(currentIndex, currentIndex + projectsPerPage);
  nextProjects.forEach((project) => {
    const card = createCard(project);
    catalogContainer.appendChild(card);
  });
  currentIndex += projectsPerPage;

  if (currentIndex >= projects.length) {
    loadMoreBtn.style.display = 'none';
  }
  initializeBuyButtons();
}

async function loadProjects() {
  try {
    const response = await fetch(jsonUrl);
    const data = await response.json();
    projects = data;
    renderCards();
  } catch (error) {
    console.error('Ошибка загрузки JSON:', error);
  }
}

loadMoreBtn.addEventListener('click', renderCards);

const scrollToUpBtn = document.querySelector('.scroll-btn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollToUpBtn.style.display = 'flex';
  } else {
    scrollToUpBtn.style.display = 'none';
  }
});

scrollToUpBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  catalogContainer.innerHTML = '';
  currentIndex = 0;
  renderCards();
  loadMoreBtn.style.display = 'block';
});


function initializeBuyButtons() {
  const buyButtons = document.querySelectorAll('.buy-btn');

  buyButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.card-catalog');
      if (card) {
        const descriptionElement = card.querySelector('.card-description');
        const priceElement = card.querySelector('.price-project');
        showBuyModal(`Покупка проекта: <br> ${descriptionElement.textContent}`, `Стоимость проекта: ${priceElement.textContent}`);
      } else {
        const descriptionElement = button.closest('.our-work').querySelector('.our-work-name');
        showBuyModal(`Покупка проекта: <br> ${descriptionElement.textContent}`, `Стоимость проекта: 1000 BYN`);
      }
    });
  });
}

function showBuyModal(title, message) {
  const existingModal = document.querySelector('.modal-container');
  if (existingModal) existingModal.remove();

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
        <h4 class="modal-heading">${title}</h4>
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
        <h4 class="modal-price" style="font-size: 24px">${message}</h4>
          <button type="submit" class="button button-dark form-submit-button">Купить</button>
          <p class="form-caption">Мы принимаем оплату картами: <svg xmlns="http://www.w3.org/2000/svg" width="50" height="16" viewBox="0 0 50 16" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.94382 1.73551C8.33691 1.73301 9.50515 1.62077 10 3.40222C10.3333 4.60222 10.8643 6.56787 11.5929 9.29918H11.8897C12.6711 6.41964 13.2078 4.45399 13.5 3.40222C14 1.60222 15.25 1.73555 15.75 1.73555L19.6076 1.73555V14.5355H15.6758V6.99229H15.4122L13.2204 14.5355H10.2622L8.07045 6.9867H7.80679V14.5355H3.875V1.73555L7.94382 1.73551ZM25.2536 1.73555V9.28441H25.5672L28.2333 3.07704C28.7509 1.84176 29.8539 1.73555 29.8539 1.73555H33.6587V14.5355H29.6448V6.9867H29.3312L26.7173 13.1941C26.1998 14.4238 25.0445 14.5355 25.0445 14.5355H21.2397V1.73555H25.2536ZM47.5326 7.8182C46.9727 9.51059 45.2144 10.7226 43.2677 10.7226H39.0583V14.5355H35.2413V7.8182H47.5326Z" fill="#0F754E"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M43.4516 1.73556H35.041C35.2412 4.58527 37.5419 7.02481 39.9236 7.02481H47.7976C48.252 4.65636 46.6878 1.73556 43.4516 1.73556Z" fill="url(#paint0_linear_419_103)"/>
  <defs>
    <linearGradient id="paint0_linear_419_103" x1="1318.42" y1="334.452" x2="35.041" y2="334.452" gradientUnits="userSpaceOnUse">
      <stop stop-color="#1F5CD7"/>
      <stop offset="1" stop-color="#02AEFF"/>
    </linearGradient>
  </defs>
</svg> <svg xmlns="http://www.w3.org/2000/svg" width="40" height="16" viewBox="0 0 40 16" fill="none">
  <path d="M22.9633 1.6944H16.1592V14.1473H22.9633V1.6944Z" fill="#FF5A00"/>
  <path d="M16.6123 7.92087C16.6123 5.39081 17.7798 3.14528 19.5714 1.6944C18.2529 0.638284 16.5896 0 14.7754 0C10.4775 0 7 3.5426 7 7.92087C7 12.2991 10.4775 15.8417 14.7754 15.8417C16.5896 15.8417 18.2529 15.2035 19.5714 14.1473C17.7773 12.717 16.6123 10.4509 16.6123 7.92087Z" fill="#EB001B"/>
  <path d="M32.1427 7.92087C32.1427 12.2991 28.6652 15.8417 24.3674 15.8417C22.5531 15.8417 20.8898 15.2035 19.5713 14.1473C21.3855 12.6939 22.5305 10.4509 22.5305 7.92087C22.5305 5.39081 21.3629 3.14528 19.5713 1.6944C20.8873 0.638284 22.5506 0 24.3648 0C28.6652 0 32.1427 3.56567 32.1427 7.92087Z" fill="#F79E1B"/>
</svg> <svg xmlns="http://www.w3.org/2000/svg" width="50" height="16" viewBox="0 0 50 16" fill="none">
  <path d="M21.9554 14.4043H18.6611L20.7216 1.63682H24.0157L21.9554 14.4043Z" fill="#00579F"/>
  <path d="M33.8976 1.94895C33.2478 1.69062 32.2172 1.40539 30.9429 1.40539C27.6896 1.40539 25.3988 3.14385 25.3847 5.62932C25.3577 7.4631 27.0249 8.48162 28.2719 9.09306C29.5464 9.71786 29.9796 10.1257 29.9796 10.6826C29.9667 11.5379 28.9498 11.9322 28.0013 11.9322C26.6861 11.9322 25.9814 11.7289 24.9104 11.253L24.4766 11.0491L24.0156 13.9151C24.7883 14.2678 26.2118 14.5809 27.6896 14.5946C31.1462 14.5946 33.3966 12.883 33.4233 10.2343C33.4364 8.78093 32.556 7.66727 30.6581 6.75724C29.5059 6.17306 28.8002 5.77916 28.8002 5.18144C28.8137 4.63806 29.397 4.0815 30.6977 4.0815C31.7686 4.05424 32.5555 4.31221 33.1516 4.57036L33.4496 4.70593L33.8976 1.94895Z" fill="#00579F"/>
  <path d="M38.276 9.88123C38.5473 9.14776 39.5912 6.30899 39.5912 6.30899C39.5775 6.33625 39.862 5.56198 40.0246 5.08666L40.2549 6.18678C40.2549 6.18678 40.8787 9.24289 41.0142 9.88123C40.4993 9.88123 38.9267 9.88123 38.276 9.88123ZM42.3424 1.63682H39.7942C39.0085 1.63682 38.4115 1.86753 38.0724 2.69614L33.1792 14.4041H36.6358C36.6358 14.4041 37.2049 12.8283 37.3272 12.4889C37.7064 12.4889 41.0689 12.4889 41.5568 12.4889C41.6513 12.9372 41.9498 14.4041 41.9498 14.4041H45L42.3424 1.63682Z" fill="#00579F"/>
  <path d="M15.9097 1.63682L12.6835 10.343L12.3309 8.5773C11.7345 6.53989 9.86387 4.32628 7.77637 3.22562L10.7314 14.3908H14.2151L19.3931 1.63682H15.9097Z" fill="#00579F"/>
  <path d="M9.6879 1.63682H4.38772L4.3335 1.89479C8.46797 2.95429 11.2061 5.50818 12.3311 8.57784L11.1789 2.71004C10.9893 1.89461 10.4063 1.66372 9.6879 1.63682Z" fill="#FAA61A"/>
</svg></p>
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
  loadProjects().then(() => {
    initializeBuyButtons();
  });
});
