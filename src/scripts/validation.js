export function enableValidation(config) {                        // Валидация
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach(function(formElement){
    const submitButton = formElement.querySelector(config.submitButtonSelector);
    setEventListeners(formElement, submitButton, config);
  });
};

function setEventListeners(formElement, submitButton, config) {               // Слушатель на кнопку и инпуты
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  inputList.forEach(function(inputElement){
    toggleButtonState(inputList, config, submitButton);
    inputElement.addEventListener('input', function(){
      isValid(inputElement, formElement, config);
      toggleButtonState(inputList, config, submitButton);
    });
});
};

function showInputError(formElement, inputElement, validationMessage, config) {     // Показать ошибку ввода
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = validationMessage;
  errorElement.classList.add(config.errorClass);   
};

function hideInputError(formElement, inputElement, config) {                      // Скрыть ошибку ввода
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
};

function isValid(inputElement, formElement, config) {                     // Проверка на ошибки ввода
  if (!inputElement.validity.valid) {
    if (inputElement.validity.patternMismatch && inputElement.dataset.errorMessage) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity('');
    }
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    inputElement.setCustomValidity('');
    hideInputError(formElement, inputElement, config );
  };
};

function hasInvalidInput(inputList) {               // Проверка на правильность заполнения всех полей
  return inputList.some(input => !input.validity.valid);
};

function toggleButtonState(inputList, config, submitButton) {       // Переключение кнопки 
  if (hasInvalidInput(inputList)) {
    submitButton.disabled = true;
    submitButton.classList.add(config.inactiveButtonClass);
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove(config.inactiveButtonClass);
  };
};

export function clearValidation(formElement, config) {            // Очистить валидацию
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitButton = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach(function(inputElement){
    hideInputError(formElement, inputElement, config);
});
toggleButtonState(inputList, config, submitButton);
};