export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._close = this._popup.querySelector('.popup__close-icon'); // насчет вот такого не уверена с другой стороны как это еще найти
  }

  open() {
    this._popup.classList.add('popup_opened'); // TODO исправить index.html popup_opened.css index.css index.js на popup_is-opened >>> i <3 bem >>> the enter
    documemnt.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this.setEvenetListeners);

  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener(this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.which === 27) {
      this.close();
    }
  }

  setEvenetListeners(evt) {
    if (evt.target === this._close || evt.target === this._popup) { // а если я добавляю этого слушателя на попап, мб просто писать this хотя не прокатит наверн дааа
      this.close();
    }
  }
}
