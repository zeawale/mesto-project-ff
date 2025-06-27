// Импорты
import { modalOpen, modalClose, eventListener } from './modal.js';
import { createCard, cardDelete, cardLike } from './card.js';
import { enableValidation, clearValidation } from './validation.js';
import { getInitialCards, getUserInfo, updateAvatar, editProfileData, addCard} from './api.js';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 

// Валидация 
enableValidation(config);


// Объявление переменных

let userId;

const cardsList = document.querySelector('.places__list');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupList = document.querySelectorAll('.popup');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAvatar = document.querySelector('.popup_type_edit_image');
const popupFullImage = document.querySelector('.popup_type_image');

const captionPhotoPopupFullImage = popupFullImage.querySelector('.popup__caption');
const photoPopupFullImage = popupFullImage.querySelector('.popup__image');  

const editForm = document.querySelector('.popup_type_edit .popup__form');

const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_description');

const addForm = document.querySelector('.popup_type_new-card .popup__form');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const editImageForm = document.querySelector('.popup_type_edit_image .popup__form');
const avatarInput = editImageForm.querySelector('.popup__input_type_link');

const cardNameInput = addForm.querySelector('.popup__input_type_card-name');
const urlInput = addForm.querySelector('.popup__input_type_url');

// Получаем данные 

Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cards]) => {
      userId = userData._id;
      addCards(cards, userId);
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
    })
    .catch(err => console.log(`Ошибка: ${err}`));

// @todo: Функция добавления карточки
function addCards(initialCards, userId) {
  initialCards.forEach(function(item) { 
    const cardItem = createCard(item, cardDelete, cardLike, imageClick, userId);
    cardsList.append(cardItem);
})
}

// @todo: Обработка нажатий кнопок
addButton.addEventListener('click', function() {
  cardNameInput.value = '';
  urlInput.value = '';  
  clearValidation(popupNewCard, config);
  modalOpen(popupNewCard);
})

editButton.addEventListener('click', function() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent; 
  clearValidation(popupEdit, config);
  modalOpen(popupEdit);
})

profileImage.addEventListener('click', function(){
  avatarInput.value = '';
  clearValidation(popupAvatar, config);
  modalOpen(popupAvatar);

})

popupList.forEach(function(popup)  {
  popup.classList.add('popup_is-animated');
  eventListener(popup);
});

// @todo: Отправка форм
function editProfile(evt) {
    evt.preventDefault();
    loading(true, editForm);
    const name = nameInput.value;
    const job = jobInput.value; 
    editProfileData(name, job)
      .then((data) => {
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;
        modalClose(popupEdit);
      })
      .catch((err) => {
          console.log('Ошибка:', err);
      })
      .finally(() => {
        loading(false, editForm);
      });
};
editForm.addEventListener('submit', editProfile);

function addNewCard(evt) {
  evt.preventDefault();
  loading(true, addForm);
  const name = cardNameInput.value;
  const link = urlInput.value;
  addCard(name, link)
    .then((data) => {
      const card = createCard(data, cardDelete, cardLike, imageClick, userId);
      cardsList.prepend(card); 
      modalClose(popupNewCard);
      cardNameInput.value = '';
      urlInput.value = '';  
    })
    .catch((err) => {
        console.log('Ошибка:', err);
    })
    .finally(() => {
      loading(false, addForm)
    });
};
addForm.addEventListener('submit', addNewCard);

function editAvatar(evt) {
  evt.preventDefault();
  loading(true, editImageForm);
  const newAvatar = avatarInput.value;

  updateAvatar(newAvatar)
  .then((data) => {
    profileImage.style.backgroundImage = `url(${data.avatar})`;
    modalClose(popupAvatar);
    avatarInput.value = '';
  })
  .catch((err) => {
        console.log('Ошибка:', err);
  })
  .finally(() => {
      loading(false, editImageForm);
  });
};
editImageForm.addEventListener('submit', editAvatar);


// @todo: Попап по клику на карточку
function imageClick(item) {
  captionPhotoPopupFullImage.textContent = item.name; 
  photoPopupFullImage.src = item.link; 
  photoPopupFullImage.alt = item.name;
  modalOpen(popupFullImage);
};

// @todo: Состояние загрузки формы

function loading(isLoading, formElement) {
  const button = formElement.querySelector('.popup__button');
  if (isLoading) {
    button.setAttribute('data-text', button.textContent);
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = button.getAttribute('data-text');
    button.removeAttribute('data-text');
  };
};