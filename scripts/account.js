const loggedInUserName = localStorage.getItem("loggedInUserName");
const hours = new Date().getHours();
const greetingElement = document.querySelector(".greeting");
let greetingMessage;

if (hours < 4) {
  greetingMessage = "Спокойной ночи, ";
} else if (hours < 12) {
  greetingMessage = "Доброе утро, ";
} else if (hours < 18) {
  greetingMessage = "Добрый день, ";
} else {
  greetingMessage = "Добрый вечер, ";
}


document.addEventListener("DOMContentLoaded", () => {
  document.querySelector('.logout').addEventListener("click", () => {
    localStorage.removeItem("loggedInUserName");
    window.location.href = "./main.html";
  });
  greetingElement.textContent = greetingMessage + loggedInUserName + '!';
  if (loggedInUserName !== 'Администратор') {
    createTimeline(projectStages, 'Офис-Дом');
    createTimeline(projectStages2, 'Склад класса А');
  }
  else {
    fetchDataFromIndexedDB();
  }
})

const projectStages = [
  { stage: "Подготовка и планирование", completed: true },
  { stage: "Проектирование", completed: true },
  { stage: "Закупка материалов", completed: false },
  { stage: "Строительство", completed: false },
  { stage: "Отделка", completed: false },
  { stage: "Проверка и сдача", completed: false }
];


const projectStages2 = [
  { stage: "Подготовка и планирование", completed: true },
  { stage: "Проектирование", completed: true },
  { stage: "Закупка материалов", completed: true },
  { stage: "Строительство", completed: true },
  { stage: "Отделка", completed: true },
  { stage: "Проверка и сдача", completed: false }
];


const createTimeline = (stages, projectName) => {
  const timelineContainer = document.createElement('div');
  timelineContainer.classList.add('timeline-container');

  const timeline = document.createElement('div');
  timeline.classList.add('timeline');


  const h5 = document.createElement('h5');
  h5.classList.add('heading');
  h5.textContent = `Ваш проект: ${projectName}`
  timelineContainer.appendChild(h5);
  timelineContainer.appendChild(timeline);

  document.querySelector('.account-wrapper').appendChild(timelineContainer);

  stages.forEach((stage, index) => {
    const timelineItem = document.createElement('div');
    timelineItem.classList.add('timeline-item');

    const stageCircle = document.createElement('div');
    stageCircle.classList.add('stage');
    stageCircle.textContent = index + 1;
    const stageContent = document.createElement('div');
    stageContent.classList.add('content');
    if (stage.completed) {
      stageContent.classList.add('completed');
    } else if (index === 0 || stages[index - 1].completed) {
      stageContent.classList.add('active');
    }

    stageContent.textContent = stage.stage;

    timelineItem.appendChild(stageCircle);
    timelineItem.appendChild(stageContent);
    timeline.appendChild(timelineItem);
  });
};

function fetchDataFromIndexedDB() {
  const request = indexedDB.open('ModalDataDB', 1);

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction('modalData', 'readonly');
    const store = transaction.objectStore('modalData');
    const getAllRequest = store.getAll();

    getAllRequest.onsuccess = () => {
      const data = getAllRequest.result;
      console.log('Fetched data:', data);
      displayDataOnPage(data);
    };

    getAllRequest.onerror = (event) => {
      console.error('Error fetching data:', event.target.error);
    };
  };

  request.onerror = (event) => {
    console.error('Error accessing IndexedDB:', event.target.error);
  };
}

function ensureDataContainer() {
  let container = document.getElementById('dataContainer');

  if (!container) {
    container = document.createElement('div');
    container.id = 'dataContainer';
    document.querySelector('.account-wrapper').appendChild(container);
    console.log('Элемент dataContainer был создан');
  }

  return container;
}


function displayDataOnPage(data) {
  const container = ensureDataContainer();
  container.innerHTML = '';
  if (data.length === 0) {
    container.style.display = 'block'
    const titleElement = document.createElement('h4');
    titleElement.textContent = 'Все запросы обработаны!';
    titleElement.style.position = 'relative'
    titleElement.style.width = '100%'
    titleElement.style.textAlign = 'center';
    container.appendChild(titleElement);
 }
  data.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('data-item');
    const titleElement = document.createElement('h4');
    titleElement.textContent = item.title || 'Без заголовка';
    titleElement.classList.add('data-title');
    div.appendChild(titleElement);

    const nameElement = document.createElement('p');
    nameElement.textContent = `Имя: ${item.name || 'Не указано'}`;
    nameElement.classList.add('data-name');
    div.appendChild(nameElement);

    const emailElement = document.createElement('p');
    emailElement.textContent = `Email: ${item.email || 'Не указано'}`;
    emailElement.classList.add('data-email');
    div.appendChild(emailElement);

    const phoneElement = document.createElement('p');
    phoneElement.textContent = `Телефон: ${item.phone || 'Не указано'}`;
    emailElement.classList.add('data-phone');
    div.appendChild(phoneElement);

    if (item.sendOptions) {
      const sendOptionsElement = document.createElement('p');
      sendOptionsElement.textContent = `Опции отправки: ${item.sendOptions || 'Не указаны'}`;
      div.appendChild(sendOptionsElement);
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.className = 'button button-dark';
    deleteButton.addEventListener('click', () => {
      deleteDataFromIndexedDB(item.id);
      div.remove();
    });
    div.appendChild(deleteButton);

    container.appendChild(div);
  });
}

function deleteDataFromIndexedDB(id) {
  const request = indexedDB.open('ModalDataDB', 1);

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction('modalData', 'readwrite');
    const store = transaction.objectStore('modalData');
    const deleteRequest = store.delete(id);

    deleteRequest.onsuccess = () => {
      console.log(`Данные с id ${id} успешно удалены`);
    };

    deleteRequest.onerror = (event) => {
      console.error('Ошибка при удалении данных:', event.target.error);
    };
  };

  request.onerror = (event) => {
    console.error('Ошибка доступа к IndexedDB:', event.target.error);
  };
}

