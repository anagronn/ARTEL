function createDatabase() {
  const request = indexedDB.open('ModalDataDB', 1);

  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains('modalData')) {
      db.createObjectStore('modalData', { keyPath: 'id', autoIncrement: true });
      console.log('База данных создана и объектное хранилище "modalData" добавлено');
    } else {
      console.log('Объектное хранилище "modalData" уже существует');
    }
  };

  request.onerror = (event) => {
    console.error('Ошибка при открытии базы данных:', event.target.error);
  };

  request.onsuccess = () => {
    console.log('База данных успешно открыта');
  };
}

function saveDataToIndexedDB(data) {
  const request = indexedDB.open('ModalDataDB', 1);

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction('modalData', 'readwrite');
    const store = transaction.objectStore('modalData');
    const saveRequest = store.add(data);

    saveRequest.onsuccess = () => {
      console.log('Data saved successfully:', data);
    };

    saveRequest.onerror = (event) => {
      console.error('Error saving data:', event.target.error);
    };
  };

  request.onerror = (event) => {
    console.error('Error accessing IndexedDB:', event.target.error);
  };
}

document.addEventListener('DOMContentLoaded', () => {
  createDatabase();
});

document.querySelectorAll('.user-account').forEach((btn) => {
  btn.addEventListener('click', () => {
    const loggedInUserName = localStorage.getItem("loggedInUserName");
    if (loggedInUserName) {
      window.location.href = "./account.html";
    } else {
      window.location.href = "./enter.html";
    }
  })
})