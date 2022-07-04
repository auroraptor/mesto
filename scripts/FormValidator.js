export class FormValidator {
  constructor (data, form) {
    this._form = document.querySelector(`${form}`);
    this._inputList = Array.from(this._form.querySelectorAll(`${data['inputSelector']}`));
    this._button = this._form.querySelector(`${data['submitButtonSelector']}`);
    this._inactiveButtonClass = data['inactiveButtonClass'];
    this._inputErrorClass = data['inputErrorClass'];
    this._errorVisible = data['errorClass'];
  }

  // изменить валидацию перенести обход по инпутам в _setEventLisnerer!s а самой enableValidation его и вызывать

  enableValidation() {
    this._toggleButtonState();

    this._setEventListeners();
  }

  // это тож мой бэкап-код >>> TODO удалить

  // enableValidation() {
  //   this._toggleButtonState();
  //   // что надо делать? Надо писать!
  //   this._inputList.forEach( (input) => { // спрашивай себя: а нет ли здесь бессмыслицы?
  //    this._input = input; // почему эта строчка нужная странно непонятно но что-то с контекстом интересно почему оно так работает, но работает и ладно ^^
  //     this._setEventListener();
  //   });
  // }

  goToReset() {
    this._inputList.forEach( (input) => {
      input.value = '';

      this._hideInputError();
      this._toggleButtonState();
    });
  }

  _setEventListeners() {
    this._inputList.forEach( input => {
      this._input = input;

      this._input.addEventListener('input', () => {
        this._isValid(); // должен принимать в себя параметрами инпут + тоглить
        this._toggleButtonState();
      });
    });
  }

    // а это мой бэкап код >>> TODO удалить

  // _setEventListener() {
  //   this._input.addEventListener('input', () => {
  //     this._isValid();
  //     this._toggleButtonState();
  //   });
  // }

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
      this._input = input;
      return !this._input.validity.valid;
    });
  }

  _isValid() {
    if (!this._input.validity.valid) {
      this._showInputError();
      this._toggleButtonState(); // +
    } else {
      this._hideInputError();
      this._toggleButtonState(); // +
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

// получилось как мне кажется все красиво и здорово но это конечно мне ПОКА так кажется
