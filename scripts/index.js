// @todo: Функция создания карточки
function createCard(item, cardDelete) {
  const cardTemplate = document.getElementById('card-template').content; //темплейт карточки
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); //клонирую темплейт
  const deleteButton = cardElement.querySelector('.card__delete-button'); //кнопка удаления

  cardElement.querySelector('.card__title').textContent = item.name; // имя карточки
  cardElement.querySelector('.card__image').src = item.link; // картинка карточки
  cardElement.querySelector('.card__image').alt = item.name; // описание карточки

// @todo: Функция обработки действия
deleteButton.addEventListener('click', function () {
    cardDelete(cardElement);
  }); 
  return cardElement;
}

// @todo: Функция добавления карточки
function addCard(initialCards) {
  const cardsList = document.querySelector('.places__list'); //список карточек
  initialCards.forEach(function(item) { // цикл по добавлению карточек
    const cardItem = createCard(item, cardDelete);
    cardsList.append(cardItem); // добавляю в список карточку
})
}

// @todo: Функция удаления карточки
function cardDelete (cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
addCard(initialCards);



