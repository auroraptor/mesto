import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, {handleFormSubmit} ) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit; // а это колбэк сабмита формы
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._form = this._popup.querySelector('.form');
  }


  _getInputValues() {
    this._formValues = {}; // у меня это было в конструкторе и я перенесла это в метод как в коде урока показано но не знаю как лучше >>> the enter
    this._inputList.forEach( (input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }





  setEventListeners() {
    super.setEventListeners();

    this._callback = (evt) => {
      evt.preventDefault();
      this._values = this._getInputValues();
      console.log(this._values);
      this._handleFormSubmit(this._values);
      this.close();
    }

    this._form.addEventListener('submit', this._callback);
  }

  close() {
    super.close(); // и снова перегрузили
    // this._form.removeEventListener('submit', this._callback); // а вот тут еще кажется должна быть очистка формы по заданию но она у меня пока в валидации форме лежит
    // Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
  }
}

// сбрасывать форму? >>> the enter
