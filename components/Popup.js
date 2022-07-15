export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._close = this._popup.querySelector('.popup__close-icon'); // насчет вот такого не уверена с другой стороны как это еще найти
    this._handle = this._handleEscClose; // непонятно где это вызывать пока непонятно потом будет понятно мб вот здесь начинает быть нужен bind() -- а я была кажется права и вот именно тут bind начинает быть нужен но я еще не поняла как его привязать
    this._set = this.setEventListeners;
  }

  open() {
    this._popup.classList.add('popup_opened'); // TODO исправить index.html popup_opened.css index.css index.js на popup_is-opened >>> i <3 bem >>> the enter
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handle);
    this._popup.removeEventListener('click', this._set);
  }

  _handleEscClose() {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener('keydown', this._handle.bind(this)); // почему именно здесь, а не внутри самого метода (ну почему не в конструкторе поняла) нужно привязку контекста делать я не понимаю но радуюсь что просто перестала терять этот контекст

    this._popup.addEventListener('click', () => {
       if (event.target === this._popup || event.target === this._close) {
        this.close();
       }
    });
  }
}

// >>> the enter
