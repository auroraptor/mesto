export class Card {
  constructor({name, link, likes, _id, owner}, selector, {handleCardClick, handleMoveClick, handleLikeClick}) { // а вот это будет что-то про колбэк да? // переделать на объект надо data+handleCardClick
  this._name = name;
  this._link = link;
  this._likes = likes;
  this.id = _id;
  this._owner = owner;
  this._ownerId = owner[`_id`];
  // this._rendererHeart = rendererHeart;
  // this.isLiked = this._likes.some((self) => { return self[`_id`] === this[`owner`][`_id`] });
  this._isLiked = false;
  this.like = () => {
    this._isLiked = !this._isLiked;
  }
  this._template = document.querySelector(selector).content.querySelector('.element');
  this._handleCardClick = handleCardClick;
  this._handleMoveClick = handleMoveClick.bind(this);
  this._handleLikeClick = handleLikeClick.bind(this);
}

_getTemplate() {
  const cardElement = this._template.cloneNode(true);
  return cardElement;
}

remove() {
  this._element.remove();
}

dislike() {
  this.likeButton.classList.remove('like-button_active');
  this.iLikeToScore.textContent = this._likes.length;
  this.like()
}

pluslike() {
  this.iLikeToScore.textContent = this._likes.length;
  this.likeButton.classList.add('like-button_active');
  this.like()
}

_setListeners() {
  this.likeButton.addEventListener('click', () => {
    this._handleLikeClick(this);
  });


  this._deleteButton.addEventListener('click', () => {
    this._handleMoveClick(this); // а что ему надо передать? вот тут будет скользкое место с Promise.all[...] видимо
  });

  this._photo.addEventListener('click', () => {
    this._handleCardClick(this._name, this._link);
  });
}

// для того чтобы раскрассить лайк надо узнать айди юзера и в массиве лайков его искать
// class Card >>> this._isLiked = false;

isOwner() {
  return this._likes.some((elem) => {
    return elem['_id'] === this._ownerId;
  })
}

isLiked(userId) {
  console.log(' ♡ likes: ', this._likes);
  console.log('who is mr userID', userId);

  return this._likes.some((like) => {
    return like['_id'] === userId});
}

generateCard() {
  this._element = this._getTemplate();

  this.likeButton = this._element.querySelector('.like-button');
  this.iLikeToScore = this._element.querySelector('.element__likes');
  this._deleteButton = this._element.querySelector('.element__delete-button');
  this._photo = this._element.querySelector('.element__photo');

  this._setListeners();

  this._photo.src = this._link;
  this._photo.alt = this._name;
  this._element.querySelector('.element__title').textContent = this._name;
  this.iLikeToScore.textContent = this._likes.length;

  // TODO -><- сейчас цвет сердечка черный если создатель карточки ее лайкнул
    this.isOwner()
    // this.rendererHeart()
    ? this.likeButton.classList.add('like-button_active')
    : this.likeButton.classList.remove('like-button_active');

  return this._element;
  }
}

// >>> the enter
