const jsonUrl = './projects.json';
const catalogContainer = document.querySelector('.catalog-container');
const loadMoreBtn = document.querySelector('.more');

let projects = [];
let currentIndex = 0;
const projectsPerPage = 9;

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

document.addEventListener('DOMContentLoaded', () => {
  loadProjects(); 
});

loadMoreBtn.addEventListener('click', renderCards);
