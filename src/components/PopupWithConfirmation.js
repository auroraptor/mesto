import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
constructor(selector, {handleFormSubmit}) {
  super(selector);
  this._form = this._popup.querySelector('.form');
  this._handleFormSubmit = handleFormSubmit;
}

setEventListeners(elem) {
  super.setEventListeners();

  this._callback = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(elem); // откуда он сюда придёт?
    this.close();
  }

  this._form.addEventListener('submit', this._callback); // а это не стакает слушателей интересно
}

}
