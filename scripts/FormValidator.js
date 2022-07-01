export class FormValidator {
  constructor (data, form) {
    this._form = document.querySelector(`${form}`);
    this._inputList = Array.from(this._form.querySelectorAll(`${data['inputSelector']}`));
    this._button = this._form.querySelector(`${data['submitButtonSelector']}`);
    this._inactiveButtonClass = data['inactiveButtonClass'];
    this._inputErrorClass = data['inputErrorClass'];
    this._errorVisible = data['errorClass'];
  }

  enableValidation() {
    this._toggleButtonState();

    this._inputList.forEach( () => {
      this._setEventListener();
    });
  }

  goToReset() {
    this._inputList.forEach( (input) => {
      input.value = '';

      this._hideInputError();
      this._toggleButtonState();
    });
  }

  _setEventListener() {
    this._input.addEventListener('input', () => {
      this._isValid();
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
      this._input = input;
      return !this._input.validity.valid;
    });
  }

  _isValid() {
    if (!this._input.validity.valid) {
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
   // this._errorElement.textContent = ''; // а нужна ли эта строчка вообще если видимости нет, а когда ошибка в следующий раз будет показана, у нее будет уже другой textContent
  }

}

