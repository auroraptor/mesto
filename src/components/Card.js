export class Card {
  constructor({name, link, likes, _id}, selector, {handleCardClick, handleMoveClick, handleLikeClick}) { // а вот это будет что-то про колбэк да? // переделать на объект надо data+handleCardClick
  this._name = name;
  this._link = link;
  this._likes = likes;
  this.id = _id;
  // this.isLiked = this._likes.find((self) => { return self[`${_id}`] === this.id });
  this.isLiked = false;
  this.like = () => {
    this.isLiked = !this.isLiked;
  }
  this._template = document.querySelector(selector).content.querySelector('.element');
  this._handleCardClick = handleCardClick;
  this._handleMoveClick = handleMoveClick.bind(this);
  this._handleLikeClick = handleLikeClick.bind(this);
}

// isLiked() {
//   return this._likes.find((self) => {return self[`${this.id}`]});
// }

_getTemplate() {
  const cardElement = this._template.cloneNode(true);
  return cardElement;
}

// _like() { // <3 уже нашла на 43 >>> the enter
//   this._likeButton
//   .classList
//   .toggle('like-button_active');

//   console.log('_like method', this._likes);
//   console.log('card.id', this.id);
//   this._iLikeToScore.textContent = this._likes.length;
//   !this.isLiked;
// }

// iLikeToScore() {
//   console.log('score', this._iLikeToScore);
//   this.isLiked
//   ? this._likeButton
//   .classList
//   .add('like-button_active')
//   : this._likeButton
//   .classList
//   .remove('like-button_active');

//   return this._iLikeToScore.textContent = this._likes.length;
// }
// вот этот метод стоит изменить чтобы вместо удаления карточки он открывал попап нужный мне и сделать это надо через связывание слабое
// а теперь он вообще не нужен TODO удалить
remove() {
  this._element.remove();
}

_setListeners() {
  this._likeButton.addEventListener('click', () => {
    this._handleLikeClick(this);
    // this._like();
  });

  // ниже я меняю метод с удаления элемента на открытие попапа который подтвердит удаление
  // this._deleteButton.addEventListener('click', () => {
  //   this._remove();
  // });

  this._deleteButton.addEventListener('click', () => {
    // this._remove();
    this._handleMoveClick(this); // а что ему надо передать? вот тут будет скользкое место с Promise.all[...] видимо
  });

  this._photo.addEventListener('click', () => {
    this._handleCardClick(this._name, this._link);
  });
}

generateCard() {
  this._element = this._getTemplate();

  // Поля классов (так называемые классовые переменные с this) доступны везде по коду класса и внутри любого метода, особенно, если это поле класса было создано в конструкторе. Поэтому не нужно их передавать в вызовы методов этого же класса, так как мы можем внутри метода использовать эту переменную с this.
  this._likeButton = this._element.querySelector('.like-button');
  this.iLikeToScore = this._element.querySelector('.element__likes');
  this._deleteButton = this._element.querySelector('.element__delete-button');
  this._photo = this._element.querySelector('.element__photo');

  this.likeButton = this._element.querySelector('.like-button');

  this._setListeners();

  this._photo.src = this._link;
  this._photo.alt = this._name;
  this._element.querySelector('.element__title').textContent = this._name;
  this.iLikeToScore.textContent = this._likes.length;

  // if (this._likes.some((self) => {
  //   return self[`_id`] === this[`owner`][`_id`];
  // })) {
  //   this._likeButton
  //   .classList
  //   .add('like-button_active')
  //  } else {
  //   this._likeButton
  //   .classList
  //   .remove('like-button_active');}
    // console.log('взлетит', this._likes);
    // console.log('element', this._likes.forEach((elem) => {console.log(elem[`_id`])}));
    // console.log('isOwner', this._likes.some((elem) => {
    //   return elem[`_id`] === this[`owner`][`_id`];
    // }))
    // console.log('♡ 78 like score', this._likes.length);
    // console.log('♡ ♡ ♡', this.isLiked);

  return this._element;
  }
}

// >>> the enter
