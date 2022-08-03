import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
constructor(selector, {handleConfirmation}, {buttonTextContent, buttonLoadingTextContent}) {
  super(selector);
  this._button = this._popup.querySelector('.popup__button');

  this._handleConfirmation = handleConfirmation;
  this._buttonTextContent = buttonTextContent;
  this._buttonLoadingTextContent = buttonLoadingTextContent;

  this._button.textContent = this._buttonTextContent;
}

// я догадываюсь что это такой себе метод переписывать и то и другое 🐝➰
close() {
  super.close()

  this._button.textContent = this._buttonTextContent;
  this._button.removeEventListener('click', this._callback);
}

open() {
  super.open()

  this._button.addEventListener('click', this._callback);
}

setEventListeners(elem) {
  super.setEventListeners();

  this._callback = (evt) => {
    evt.preventDefault();
    this._button.textContent = this._buttonLoadingTextContent;
    this._handleConfirmation(elem);
    this.close();
  }
}

}
