export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._close = this._popup.querySelector('.popup__close-icon'); // насчет вот такого не уверена с другой стороны как это еще найти
  }

  open() {
    this._popup.classList.add('popup_opened'); // TODO исправить index.html popup_opened.css index.css index.js на popup_is-opened >>> i <3 bem >>> the enter
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this.setEvenetListeners);

  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener(this._handleEscClose);
    this._popup.removeEventListener(this.setEvenetListeners);
  }

  _handleEscClose(evt) {
    if (evt.which === 27) { // магическое значение!!! TODO вынести в константу и передать или использовать .key
      this.close();
    }
  }

  setEvenetListeners(evt) {
    if (evt.target === this._close || evt.target === this._popup) { // evt.target === this._popup а если я добавляю этого слушателя на попап, мб просто писать this хотя не прокатит наверн дааа evt.target === this я про такое проверить можно посмотрев this в консоли
      this.close();
    }
  }
}
