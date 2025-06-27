import { sendLike, deleteLike, deleteUserCard} from './api.js'

// @todo: Функция создания карточки
export function createCard(item, cardDelete, cardLike, imageClick, userId) {
  const cardTemplate = document.getElementById('card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); 
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  let likeCount = cardElement.querySelector('.card__like-count');
  if (item.owner._id !== userId) {
    deleteButton.remove();
  };
  if (item.likes.some(user => user._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  };

  likeCount.textContent = item.likes.length;
  cardElement.querySelector('.card__title').textContent = item.name; 
  cardElement.querySelector('.card__image').src = item.link; 
  cardElement.querySelector('.card__image').alt = item.name;

// @todo: Функции обработки действия
  deleteButton.addEventListener('click', function () {
    cardDelete(item._id, cardElement);
  }); 

  likeButton.addEventListener('click', function () {
    cardLike(item._id, likeButton, likeCount);
  }); 

  cardImage.addEventListener('click', function () {
    imageClick(item);
  }); 
    return cardElement;
}

// @todo: Функция лайка карточки
export function cardLike(cardId, likeButton, likeCount) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const likeAction = isLiked ? deleteLike : sendLike;

  likeAction(cardId)
  .then(item => {
    likeButton.classList.toggle('card__like-button_is-active');
    likeCount.textContent = item.likes.length
  })
  .catch(err => console.log('Ошибка: ', err));
};

// @todo: Функция удаления карточки
export function cardDelete (cardId, cardElement) {
  deleteUserCard(cardId)
  .then(() => {
    cardElement.remove();
  })
  .catch(err => console.log('Ошибка: ', err));
};