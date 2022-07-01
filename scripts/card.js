export class Card {
constructor(data, selector, func) {
  this._name = data.name;
  this._link = data.link;
  this._template = selector;
  this._opened = func;
}
// а стоит ли логику лайка вносить в конструктор isLiked как было в тренажере с песнями и что лучше

_getTemplate() {
  const cardElement = document
  .querySelector(this._template)
  .content
  .querySelector('.element')
  .cloneNode(true);

  // это все еще очень красиво но надо исправить да
  return cardElement;
}

_like() {
  // хоть Миша на продлёнке и говорил избавляться от querySelector и в очередной раз читал псалом про 'это жрёт производительность', но звучал он как всегда совершенно неубедительно, поэтому слушать я его конечно не буду и оставлю так все здесь во-первых, потому что это выглядит красиво, во-вторых, мне так проще читать собственный код, в-третьих, потому что это похоже на тренажер, а код из тренажера мне очень нравится <3 и в-четвертых, такого нет в нашем чек-листе, а я в своей работе отталкиваюсь именно от чек-листа а не от слов Миши на продлёнке. the enter
  this._element
  .querySelector('.like-button')
  .classList
  .toggle('like-button_active');
  // ну лан, сегодня уже не такая злая и мб даже перепишу это завтра но конечно мне все нравится
}

_zoomIn() {
  this._opened(); // ну вот передала я сюда какую-то функцию
}

_remove() {
  this._element.remove();
}

_setListeners() {
  this._element.querySelector('.like-button').addEventListener('click', () => {
    this._like();
  });
  this._element.querySelector('.element__delete-button').addEventListener('click', () => {
    this._remove();
  });
  this._photo.addEventListener('click', () => {
    this._zoomIn();
  })

}

generateCard() {
  this._element = this._getTemplate();
  this._photo = this._element.querySelector('.element__photo');
  this._setListeners();

  this._photo.src = this._link;
  this._photo.alt = this._name;
  this._element.querySelector('.element__title').textContent = this._name;

  //console.log(this._element);
  return this._element;
  }
}

