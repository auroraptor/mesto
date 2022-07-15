export class Card {
  constructor({place, link}, selector, handleCardClick) { // а вот это будет что-то про колбэк да? // переделать на объект надо data+handleCardClick
  this._name = place;
  this._link = link;
  this._template = document.querySelector(selector).content.querySelector('.element');
  this._handleCardClick = handleCardClick;

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

_remove() {
  this._element.remove();
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
    this._handleCardClick(this._name, this._link);
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
  // console.log(this._name);
  this._element.querySelector('.element__title').textContent = this._name;

  return this._element;
  }
}

// >>> the enter
