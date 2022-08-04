import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
constructor(config, { handleConfirmation, theEnterListener }) {
  super(config.selector);

  this._button = this._popup.querySelector(config.buttonSelector);
  this._buttonTextContent = config.buttonTextContent;
  this._button.textContent = this._buttonTextContent;
  this._buttonLoadingTextContent = config.buttonLoadingTextContent;

  this._handleConfirmation = handleConfirmation;
  this._theEnterListener = theEnterListener;
  }

  close() {
    super.close()

    this._button.textContent = this._buttonTextContent;
    this._button.removeEventListener('click', this._callback);
  }

  open() {
    super.open()

    document.addEventListener('keydown', this._theEnterListener);
    this._button.addEventListener('click', this._callback);
  }

  setEventListeners(elem) {
    super.setEventListeners();

    this._callback = (evt) => {
      evt.preventDefault();
      this._button.textContent = this._buttonLoadingTextContent;
      this._handleConfirmation(elem);
      elem = null;
      this.close();
    }

  }
}
