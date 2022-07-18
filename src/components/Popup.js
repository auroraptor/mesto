import { once } from "events";

export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._close = this._popup.querySelector('.popup__close-icon');

    // ну вот то как эта привязка здесь работает я всё еще считаю магией, и думаю, мне нужно время и осознание, чтобы перестать тонуть в этой 'капле в море контекста выполнения this 🌊' >>> the enter

    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened'); // TODO на досуге исправить index.html popup_opened.css index.css index.js на popup_is-opened >>> i <3 bem >>> the enter

    // options Дополнительный объект со свойствами:
    // once: если true, тогда обработчик будет автоматически удалён после выполнения.
      // непонятно но интересно но дальше я уже прочитала >> Для удаления обработчика следует использовать removeEventListener
      // просто возьми и начни читать этот учебник
      // шире вселенной незнание моё! >>> the enter

    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (event) => {
      if (event.target === this._popup || event.target === this._close) {
        this.close();
      }
    });
  }
}

// >>> the enter
