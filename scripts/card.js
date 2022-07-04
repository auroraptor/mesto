export class Card {
constructor(data, selector, openPopup) {
  this._name = data.name;
  this._link = data.link;
  this._template = document.querySelector(selector).content.children[0];
  this._openPopup = openPopup;
  this._popup = document.querySelector('.image-zoomed-popup');
  this._image = this._popup.querySelector('.popup__image');
}

_getTemplate() {
  const cardElement = this._template.cloneNode(true);
  return cardElement;
}

_like() {
  this._element
  .querySelector('.like-button')
  .classList
  .toggle('like-button_active');
}

  // Данные для открытия модального окна лучше взять из конструктора класса, это будут this._name и this._link
  // А элементы с классами image-zoomed-popup, popup__image, popup__caption лучше найти в конструкторе класса один раз, так как сейчас данные элементы ищутся при каждом клике на картинку в карточке, это лишняя нагрузка.

    // мне нравится, здорово

_zoomIn() {
  this._image.src = this._link;
  this._image.alt = this._name;
  this._image.nextElementSibling.textContent = this._name;

  // я на 31 строке сделала поиск через следующего соседа потому что я внутри тега <figure> а у него кроме картинки может быть только figurecaption поэтому так тут лучше будет по моему мнению

      // Чтобы прокинуть функцию открытия в конструктор класса, вам нужно ее здесь принять так:
      // constructor(data, selector, openPopup)
      // Затем записать в this уже в теле конструктора:
      // this._openPopup = openPopup;
      // Готово, теперь можно ее использовать

       // как круто, получилось, спасибо! ^^

  this._openPopup(this._popup);
}

_remove() {
  this._element.remove();
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

// здесь все кажется ок
