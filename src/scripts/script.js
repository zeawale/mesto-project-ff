import { initialCards } from './cards.js';
import { modalOpen, modalClose, eventListener } from './modal.js';
import { createCard, cardDelete, cardLike } from './card.js';

const cardsList = document.querySelector('.places__list');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popup = document.querySelectorAll('.popup');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEdit = document.querySelector('.popup_type_edit');

const formElement = document.querySelector('.popup__form');

const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

const addForm = document.querySelector('.popup_type_new-card .popup__form');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const cardNameInput = addForm.querySelector('.popup__input_type_card-name');
const urlInput = addForm.querySelector('.popup__input_type_url');

// @todo: Функция добавления карточки
function addCard(initialCards) {
  initialCards.forEach(function(item) { 
    const cardItem = createCard(item, cardDelete, cardLike, imageClick);
    cardsList.append(cardItem);
})
}

// @todo: Вывести карточки на страницу
addCard(initialCards);

// @todo: Обработка нажатий кнопок
addButton.addEventListener('click', function() {
  cardNameInput.value = '';
  urlInput.value = '';  
  modalOpen(popupNewCard);
})

editButton.addEventListener('click', function() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;  
  modalOpen(popupEdit);
})

popup.forEach(function(popup)  {
  eventListener(popup);
});

// @todo: Отправка форм
function handleFormSubmit(evt) {
    evt.preventDefault();
    const name = nameInput.value;
    const job = jobInput.value; 
    profileTitle.textContent = name;
    profileDescription.textContent = job;
    modalClose(popupEdit);

}
formElement.addEventListener('submit', handleFormSubmit);

function addNewCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardNameInput.value,
    link: urlInput.value
  };
  const card = createCard(newCard, cardDelete, cardLike, imageClick);
  cardsList.prepend(card); 
  modalClose(popupNewCard);
  cardNameInput.value = '';
  urlInput.value = '';  
}
addForm.addEventListener('submit', addNewCard);

// @todo: Попап по клику на карточку
function imageClick(item) {
  const popupImage = document.querySelector('.popup_type_image');
  const popupCaption = popupImage.querySelector('.popup__caption');
  const image = popupImage.querySelector('.popup__image');  
  popupCaption.textContent = item.name; 
  image.src = item.link; 
  image.alt = item.name;
  modalOpen(popupImage);
}

// @todo: Плавность попапов