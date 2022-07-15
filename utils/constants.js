const data = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const page = document.querySelector('.page');
const profile = page.querySelector('.profile'); // профиль
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.add-button');

export { data, editButton, addButton };
