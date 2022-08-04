export class Card {
  constructor({name, link, likes, _id, owner}, selector, {handleCardClick, handleMoveClick, handleLikeClick, checkOwner, isLikedCard}) {
  this._name = name;
  this._link = link;
  this._likes = likes;
  this.id = _id;
  this._ownerId = owner[`_id`];
  this._isOwner = checkOwner(this._ownerId);
  this.isLiked = isLikedCard(this._likes);
  this._template = document.querySelector(selector).content.querySelector('.element');
  this._handleCardClick = handleCardClick;
  this._handleMoveClick = handleMoveClick.bind(this);
  this._handleLikeClick = handleLikeClick.bind(this);
}

_getTemplate() {
  const cardElement = this._template.cloneNode(true);
  return cardElement;
}

like(res) {
  this.likeButton.classList.toggle('like-button_active');
  this.iLikeToScore.textContent = res['likes'].length;
  this.isLiked = !this.isLiked;
}

remove() {
  this._element.remove();
}

_setListeners() {
  this.likeButton.addEventListener('click', () => {
    this._handleLikeClick(this);
  });


  if (this._isOwner) {
     this._deleteButton.addEventListener('click', () => {
    this._handleMoveClick(this);
    });
  }

  this._photo.addEventListener('click', () => {
    this._handleCardClick(this._name, this._link);
    // this._handleCardClick(this);
  });
}

generateCard() {
  this._element = this._getTemplate();

  this.likeButton = this._element.querySelector('.like-button');
  this.iLikeToScore = this._element.querySelector('.element__likes');
  this._photo = this._element.querySelector('.element__photo');
  this._deleteButton = this._element.querySelector('.element__delete-button');

  if (!this._isOwner) {
    this._deleteButton.remove();
  }

  if(this.isLiked) {
    this.likeButton.classList.add('like-button_active');
  }

  this._photo.src = this._link;
  this._photo.alt = this._name;
  this._element.querySelector('.element__title').textContent = this._name;
  this.iLikeToScore.textContent = this._likes.length;

  this._setListeners();

  return this._element;
  }
}

// >>> the enter
