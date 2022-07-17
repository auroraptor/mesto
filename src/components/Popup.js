export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._close = this._popup.querySelector('.popup__close-icon');
    this._handle = this._handleEscClose;

    // непонятно где это вызывать -- пока непонятно потом будет понятно -- мб вот здесь начинает быть нужен bind() -- а я была кажется права и вот именно тут bind начинает быть нужен -- но я еще не поняла как его привязать -- а он оказался нужен неожиданно в setEventListeners >>> the enter

    this._set = this.setEventListeners;
  }

  open() {
    this._popup.classList.add('popup_opened'); // TODO на досуге исправить index.html popup_opened.css index.css index.js на popup_is-opened >>> i <3 bem >>> the enter
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
    document.addEventListener('keydown', this._handle.bind(this));

     // почему именно здесь нужен bind(this), а не внутри самого метода нужно привязку контекста делать (почему не в конструкторе я поняла), я не понимаю но радуюсь что просто перестала терять этот контекст >>> the enter

    this._popup.addEventListener('mousedown', () => {
       if (event.target === this._popup || event.target === this._close) {
        this.close();
       }
    });
  }
}

// >>> the enter
