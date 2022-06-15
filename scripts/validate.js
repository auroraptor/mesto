// включение валидации вызовом enableValidation
// все настройки передаются при вызове функция enableValidation , которая включает валидацию, принимает на вход объект параметров, а затем
// передаёт параметры вложенным функциям;


// начнём же -- нам нужны три функции isValid проверить валидность инпута, показать или скрыть ошибку

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

  const buttonElement = formElement.querySelector('.popup__button');

  toggleButtonState(formElement, buttonElement);

  inputList.forEach( (inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(formElement, buttonElement);

      // isValid(formElement, inputElement);
    });
  });
}

// допиши функции которых не хватает -- управление другими элементами DOM переключиение стилизации кнопки в зависимости от валидности инпутов
// проверим валидность формы и вызовем функцию toggleButtonState

function hasInvalidInput(inputList) { // вот здесь полом почему вторая форма всегда валидна?
  return inputList.some( (inputElement) => {
    return !inputElement.validity.valid; // что это значит
  });
}

function toggleButtonState(formElement, buttonElement) {
  if (!formElement.checkValidity()) {
    buttonElement.classList.add('popup__button_disabled');
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.classList.remove('popup__button_disabled');
    buttonElement.removeAttribute('disabled');
  }
}

// toggleButtonState(inputs2, button2);

// объяви enableValidation, внутри собери все формы, перебери, передай каждую аргументом функции setEventListeners, которая найдет все поля ввода, переберёт и к каждому добавит слушателя; тут понять что такое деструктурирование объекта и как не попасть в лапы мутирования аргумента

const enableValidation = () => {
  const formList = document.querySelectorAll('.popup__form');
  formList.forEach( (formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
}
// про деструктуризацию и SPREAD OPERATOR я все еще не понимаю
// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// });

enableValidation();
