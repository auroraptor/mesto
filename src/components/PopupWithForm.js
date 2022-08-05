import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ selector, formSelector, inputSelector, buttonSelector, buttonTextContent, buttonLoadingTextContent}, {handleFormSubmit}) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = Array.from(this._popup.querySelectorAll(inputSelector));
    this._form = this._popup.querySelector(formSelector);

    this._button = this._popup.querySelector(buttonSelector);
    this._buttonTextContent = buttonTextContent;
    this._buttonLoadingTextContent = buttonLoadingTextContent;
    this._button.textContent = this._buttonTextContent;
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach( (input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setInputValues(info) {
    this._inputList.forEach( (input) => {
      input.value = info[input.id];
    });
  }

  setEventListeners() {
    super.setEventListeners();

    this._callback = (evt) => {
      evt.preventDefault();

      this._button.setAttribute('disabled', 'disabled');

      this._button.textContent = this._buttonLoadingTextContent;
      this._values = this._getInputValues();

      this._handleFormSubmit(this._values);

      // в классе PopupCongirm вынесен в отдельный метод, а здесь this._callback остался внутри setEventLiseners

    }

    this._form.addEventListener('submit', this._callback);
  }

  close() {
    super.close();

    this._button.textContent = this._buttonTextContent;
    this._form.reset();
  }
}

// >>> the enter
