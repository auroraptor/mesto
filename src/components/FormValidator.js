export class FormValidator {
  constructor (data, form) {
    // this._form = document.querySelector(`${form}`);
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(`${data['inputSelector']}`));
    this._button = this._form.querySelector(`${data['submitButtonSelector']}`);
    this._inactiveButtonClass = data['inactiveButtonClass'];
    this._inputErrorClass = data['inputErrorClass'];
    this._errorVisible = data['errorClass'];

    // намного удобнее через точку брать значения их объекта
      // спасибо! Я вижу, что через точку значение поля выглядит менее монструозно, но! во-первых, мне ['такое обращение'] помогает визуально отличать поля от вызовов методов, а еще я сейчас читаю грокаем алгоритмы, и вот там все примеры кода на языке python и к полям хэш-таблиц (тех же самых объектов в js -- если я конечно правильно понимаю смысл того что читаю хах) как раз через квадратные скобки обращения идут, и, кажется, это помогает мне читать >>> the enter
  }

  enableValidation() {
    this._toggleButtonState();
    this._setEventListeners();
  }

  _setEventListeners() {
    this._inputList.forEach( (input) => {

      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._inputList.forEach( (input) => {
      this._hideInputError(input);
    });

    this._toggleButtonState();
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._button.classList.add(this._inactiveButtonClass);
      this._button.setAttribute('disabled', 'disabled');
    } else {
      this._button.classList.remove(this._inactiveButtonClass);
      this._button.removeAttribute('disabled');
    }
  }

  _hasInvalidInput() {
    return this._inputList.some( input => {
      return !input.validity.valid;
    });
  }

  // input нужно передавать в вызов

  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  // _showInputError(input) {

  _showInputError(input) {
    this._errorElement = this._form.querySelector(`.${input.id}-error`);

    input.classList.add(this._inputErrorClass);

    this._errorElement.textContent = input.validationMessage;
    this._errorElement.classList.add(this._errorVisible);
  }

  // input нужно передавать в вызов, чтобы не делать в коде  this._input = input; постоянно

  _hideInputError(input) {
    this._errorElement = this._form.querySelector(`.${input.id}-error`);

    input.classList.remove(this._inputErrorClass);

    this._errorElement.classList.remove(this._errorVisible);
    this._errorElement.textContent = '';
  }
}

// как же сложно было совладать с этими инпутами, но я справилась благодаря подробной иструкции, спасибо! >>> the enter
