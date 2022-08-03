import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, {handleFormSubmit}, {buttonTextContent, buttonLoadingTextContent}) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._form = this._popup.querySelector('.form');

    this._button = this._popup.querySelector('.popup__button');
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
      input.value = info[`${input.id}`];
    });
  }

  setEventListeners() {
    super.setEventListeners();


    this._callback = (evt) => {

      evt.preventDefault();
      this._button.textContent = this._buttonLoadingTextContent;
      this._values = this._getInputValues(); // вот здесь не подходит
      this._handleFormSubmit(this._values, this._button);
      // console.log('🦀 this button', this._button, 'disabled', this._button.disabled);

      this.close();
    }

    this._form.addEventListener('submit', this._callback);
  }

  close() {
    super.close();

    this._button.disabled = false;
    this._button.textContent = this._buttonTextContent;
    this._form.reset();


    // ^ reset ^ восстанавливает стандартные значения всем элементам формы. Данный метод выполняет действие идентичное нажатию кнопки имеющей тип reset.
  }
}

// >>> the enter
