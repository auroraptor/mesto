import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector); // вот здесь я вызвала конструктор родителя а ниже обращаюсь через super к  this._popup а если мне к кнопке надо обратиться то как это сделать?
    this._image = super.querySelector('.popup__image');
    this._caption = super.querySelector('.popup__caption');
  } // ошибка слепого кода -- а существует ли она? TODO this._popup можно обратиться

  open({ name, link }) {
   super.open(); // это перегрузка метода -- расширение функциональности родительского класса в наследнике

   this._image.src = link;
   this._image.alt = `Изображение ${name}`;
   this._caption.textContent = name;
  }
}
