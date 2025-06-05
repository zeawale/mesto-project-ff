// @todo: Функция создания карточки
export function createCard(item, cardDelete, cardLike, imageClick) {
  const cardTemplate = document.getElementById('card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); 
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  
  cardElement.querySelector('.card__title').textContent = item.name; 
  cardElement.querySelector('.card__image').src = item.link; 
  cardElement.querySelector('.card__image').alt = item.name;

// @todo: Функции обработки действия
  deleteButton.addEventListener('click', function () {
      cardDelete(cardElement);
  }); 

  likeButton.addEventListener('click', function () {
    cardLike(likeButton);
  }); 

  cardImage.addEventListener('click', function () {
    imageClick(item);
  }); 
    return cardElement;
}

// @todo: Функция лайка карточки
export function cardLike(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

// @todo: Функция удаления карточки
export function cardDelete (cardElement) {
  cardElement.remove();
}