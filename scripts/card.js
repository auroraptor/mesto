export class Card {
constructor(data, selector, openPopup) {
  this._name = data.name;
  this._link = data.link;

  // разметка может измениться в любой момент, а одно из правил, которого нужно придерживаться при написании кода - это его гибкость

    // this._template = document.querySelector(selector).content.children[0];
    // гибкость -- это правило, а разметка ненадежно изменчива! Вот этой строки не было среди ошибок, но поняв, что такое гибкость в написании кода, я решила, что и её надо изменить >>> the enter

  this._template = document.querySelector(selector).content.querySelector('.element');
  this._openPopup = openPopup;
  this._popup = document.querySelector('.image-zoomed-popup');
  this._image = this._popup.querySelector('.popup__image');
  this._caption = this._popup.querySelector('.popup__caption');
}

_getTemplate() {
  const cardElement = this._template.cloneNode(true);
  return cardElement;
}

_like() { // <3
  this._element
  .querySelector('.like-button')
  .classList
  .toggle('like-button_active');
}

  // Данные для открытия модального окна лучше взять из конструктора класса, это будут this._name и this._link
  // А элементы с классами image-zoomed-popup, popup__image, popup__caption лучше найти в конструкторе класса один раз, так как сейчас данные элементы ищутся при каждом клике на картинку в карточке, это лишняя нагрузка.

    // мне нравится, здорово >>> the enter

_zoomIn() {
  this._image.src = this._link;
  this._image.alt = this._name;

  // Найдите второй элемент так же в конструкторе класса и обращайтесь к нему напрямую

  this._caption.textContent = this._name;

      // Чтобы прокинуть функцию открытия в конструктор класса, вам нужно ее здесь принять так:
      // constructor(data, selector, openPopup)
      // Затем записать в this уже в теле конструктора:
      // this._openPopup = openPopup;
      // Готово, теперь можно ее использовать

       // как круто, получилось, спасибо! ^^ >>> the enter

  this._openPopup(this._popup);
}

_remove() {
  this._element.remove();

  // Лучше всего после удаления карточки очистить ссылку на DOM-элемент: this._element = null;
    // -- а мне больше нравится не прародитель всех сущностей, а undefined, я оставлю его, разницы ж не будет (надеюсь хех), в какой из двух примитивов скидывать значение этого приватного поля удаляемого элемента >>> the enter

  // this._element = undefined;

  // null является определённым значением отсутствия объекта, тогда как undefined обозначает неопределённость.
    // теперь я это запомню! Как сказал мой друг: ревью -- эт очень круто, потому что на ревью скажут такие вещи, которые не вычитаешь ^^ >>> the enter

  this._element = null;

}

_setListeners() {
  this._likeButton.addEventListener('click', () => {
    this._like();
  });
  this._deleteButton.addEventListener('click', () => {
    this._remove();
  });
  this._photo.addEventListener('click', () => {
    this._zoomIn();
  });
}

generateCard() {
  this._element = this._getTemplate();

  this._likeButton = this._element.querySelector('.like-button');
  this._deleteButton = this._element.querySelector('.element__delete-button');
  this._photo = this._element.querySelector('.element__photo');

  this._setListeners();

  this._photo.src = this._link;
  this._photo.alt = this._name;
  this._element.querySelector('.element__title').textContent = this._name;

  return this._element;
  }
}

// здесь все кажется ок >>> the enter
