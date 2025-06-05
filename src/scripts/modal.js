// @todo: Функция обработчик escape 
export function escapeListener(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    modalClose(popup);
  }
}

// @todo: Функция открытия попапа 
export function modalOpen(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', escapeListener);
}

// @todo: Функция закрытия попапа 
export function modalClose(popup) {
  document.removeEventListener('keydown', escapeListener);
  popup.classList.remove('popup_is-opened');
}

// @todo: Функция добавления слушателя
export function eventListener(popup) {
  popup.querySelector(".popup__close").addEventListener('click', function() {
    modalClose(popup);
  })
  popup.addEventListener("click", function(evt) {
    if (evt.target === popup) {
      modalClose(popup);
    }
  });
}
