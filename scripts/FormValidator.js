export class FormValidator {
  constructor (data, form) {
    this._form = document.querySelector(`${form}`);
    this._inputList = Array.from(this._form.querySelectorAll(`${data['inputSelector']}`));
    this._button = this._form.querySelector(`${data['submitButtonSelector']}`);
    this._inactiveButtonClass = data['inactiveButtonClass'];
    this._inputErrorClass = data['inputErrorClass'];
    this._errorVisible = data['errorClass'];
  }

  //  В методе enableValidation вызывайте метод setEventListener, в котором вы пройдетесь по массиву с инпутами и вызовите на каждом элементе массива метод   this._isValid() <- он должен принимать в себя параметром инпут, и метод this._toggleButtonState(). Методы _showInputError и _hideInputError так же должны принимать параметром инпут, с которым им предстоит работать. Это нужно исправить таким способом, что не запутаться, какой конкретно инпут вы помещаете в this._input, так наглядно код будет более читабельнее и понятнее.

  enableValidation() {
    this._toggleButtonState();

    // В методе enableValidation вызывайте метод setEventListener

    this._setEventListeners();

  }

  // в котором вы пройдетесь по массиву с инпутами и вызовите на каждом элементе массива метод   this._isValid() <- он должен принимать в себя параметром инпут, и метод this._toggleButtonState()

  _setEventListeners() {
    this._inputList.forEach( (input) => {

      input.addEventListener('input', () => {
        this._input = input; // вот то что я так пишу это и облегчает чтение или нет надеюсь что да

        this._isValid(this._input);
        this._toggleButtonState(); // или вот эта строчка и есть второй параметр я не знаю но на всякий случай пока оставлю это здесь когда я вставляю это вторым параметром в _isValid(this._input, this._toggleButtonState()) ваще хтонь какая-то творится >>> the enter
      });
    });
  }

  goToReset() {
    this._inputList.forEach( (input) => {
      this._input = input;
      this._input.value = '';

      this._hideInputError();
      this._toggleButtonState();
    });
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
      this._input = input; // и вот снова она наверн это можно передать через параметр сюда как-то, но очевидно я испытываю трудности с этими передачами через параметр (я вообще до сих пор путаюсь в словах аргумент и параметр, но наставник сказал что это одно и то же, я стараюсь это помнить) >>> the enter
      return !this._input.validity.valid;
    });
  }

  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  }

  _showInputError() {
    this._errorElement = this._form.querySelector(`.${this._input.id}-error`);

    this._input.classList.add(this._inputErrorClass);

    this._errorElement.textContent = this._input.validationMessage;
    this._errorElement.classList.add(this._errorVisible);
  }

  _hideInputError() {
    this._errorElement = this._form.querySelector(`.${this._input.id}-error`);

    this._input.classList.remove(this._inputErrorClass);

    this._errorElement.classList.remove(this._errorVisible);
    this._errorElement.textContent = '';
  }
}

