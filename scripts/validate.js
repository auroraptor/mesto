// включение валидации вызовом enableValidation
// все настройки передаются при вызове функция enableValidation , которая включает валидацию, принимает на вход объект параметров, а затем
// передаёт параметры вложенным функциям;


// начнём же -- нам нужны три функции isValid проверить валидность инпута, показать или скрыть ошибку

const isValid = (formElement, inputElement, object) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, object);
  } else {
    hideInputError(formElement, inputElement, object);
  }
};

const showInputError = (formElement, inputElement, errorMessage, object) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(`${object['inputErrorClass']}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${object['errorClass']}`);
}

const hideInputError = (formElement, inputElement, object) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${object['inputErrorClass']}`);
  errorElement.classList.remove(`${object['errorClass']}`);
  errorElement.textContent = '';
};

const setEventListeners = (formElement, object) => {
  const inputList = Array.from(formElement.querySelectorAll(`${object['inputSelector']}`));
  const buttonElement = formElement.querySelector(`${object['submitButtonSelector']}`);

  toggleButtonState(inputList, buttonElement, object);

  inputList.forEach( (inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, object);
      toggleButtonState(inputList, buttonElement, object);
    });
  });
}

// допиши функции которых не хватает -- управление другими элементами DOM переключиение стилизации кнопки в зависимости от валидности инпутов
// проверим валидность формы и вызовем функцию toggleButtonState

const hasInvalidInput = (inputList) => { // вот здесь полом -- почему вторая форма всегда валидна?
  return inputList.some( (inputElement) => {
     return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, object) => {
  if (hasInvalidInput(inputList)) {
    // console.log('has invalid input:', hasInvalidInput(inputList));
    // console.log('means: button disabled');
    buttonElement.classList.add(`${object['inactiveButtonClass']}`);
    buttonElement.getAttribute('disabled', '');
  } else {
    // console.log('but')
    buttonElement.classList.remove(`${object['inactiveButtonClass']}`);
    buttonElement.removeAttribute('disabled');
    // console.log('chicken game');
  }
};


// объяви enableValidation, внутри собери все формы, перебери, передай каждую аргументом функции setEventListeners, которая найдет все поля ввода, переберёт и к каждому добавит слушателя; тут понять что такое деструктурирование объекта и как не попасть в лапы мутирования аргумента
const enableValidation = (object) => {

  const formList = Array.from(document.querySelectorAll(`${object['formSelector']}`));

  formList.forEach( (formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault(); // а надо ли эту строчку писать у меня отмена отправки формы есть и в index.js
    });
    setEventListeners(formElement, object);
  });
}

// про деструктуризацию и SPREAD OPERATOR я все еще не понимаю
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
