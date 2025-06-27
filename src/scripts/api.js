const config = {                            // Конфиг
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-41', 
  headers: {
    authorization: '88434e81-a9c5-4e3b-a96f-04c73a6cdee8',
    'Content-Type': 'application/json'
  }
};

function checkResponse(res) {               // Проверка на ошибки
  if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
};

export function getUserInfo() {               // Получение данных пользователя
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(checkResponse);
};

export function getInitialCards() {           // Получение карточек с сервера
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(checkResponse);
};

export function sendLike(cardId) {              // Постановка лайка
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT', 
    headers: config.headers
  }).then(checkResponse);
};

export function deleteLike(cardId) {            // Удаление лайка
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE', 
    headers: config.headers
  }).then(checkResponse);
};

export function updateAvatar(avatarUrl) {       // Обновление аватара
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH', 
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  }).then(checkResponse);
};

export function editProfileData(name, about) {      // Изменение данных профиля
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH', 
    headers: config.headers,
    body: JSON.stringify({
      name,
      about
    })
  }).then(checkResponse);
};

export function addCard(name, link) {         // Добавление карточки
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST', 
    headers: config.headers,
    body: JSON.stringify({
      name,
      link
    })
  }).then(checkResponse);
};

export function deleteUserCard(cardId) {      // Удаление карточки пользователя
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }).then(checkResponse);
};
