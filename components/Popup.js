export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._close = this._popup.querySelector('.popup__close-icon'); // насчет вот такого не уверена с другой стороны как это еще найти
    this._handle = this._handleEscClose; // непонятно где это вызывать пока непонятно потом будет понятно мб вот здесь начинает быть нужен bind() -- а я была кажется права и вот именно тут bind начинает быть нужен но я еще не поняла как его привязать
    this._set = this.setEventListeners;
  }

  open() {
    this._popup.classList.add('popup_opened'); // TODO исправить index.html popup_opened.css index.css index.js на popup_is-opened >>> i <3 bem >>> the enter

    this._set();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handle);
    this._popup.removeEventListener('click', this._set);
  }

  _handleEscClose() {
    console.log('keydown');
    console.log(event.key);
    if (event.key === 'Escape') {
      this.close.bind(this); // TODO потеря контекста разобраться
    }
  }

  setEventListeners() { // добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы. а почему мы его сделали публичным пока непонятно но думаю

    document.addEventListener('keydown', this._handle);

    this._popup.addEventListener('click', () => {
      console.log('click');
       if (event.target === this._popup || event.target === this._close) {
        this.close();
       }
    });
  }
}

