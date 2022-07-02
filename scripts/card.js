import { openPopup as dinosaur} from "./index.js"; // хоть здесь я могу применить эту прекрасную as  и придумать какое-то имя для функции, которое просто мне нравится >>> the enter артист эс <<<

export class Card {
constructor(data, selector) {
  this._name = data.name;
  this._link = data.link;
  this._template = document.querySelector(selector).content.children[0];
}

_getTemplate() {
  const cardElement = this._template.cloneNode(true);
  return cardElement;
}

_like() {
  // хоть Миша на продлёнке и говорил избавляться от querySelector и в очередной раз читал псалом про 'это жрёт производительность', но звучал он как всегда совершенно неубедительно, поэтому слушать я его конечно не буду и оставлю так все здесь во-первых, потому что это выглядит красиво, во-вторых, мне так проще читать собственный код, в-третьих, потому что это похоже на тренажер, а код из тренажера мне очень нравится <3 и в-четвертых, такого нет в нашем чек-листе, а я в своей работе отталкиваюсь именно от чек-листа а не от слов Миши на продлёнке. >>> the enter <<<
  this._element
  .querySelector('.like-button')
  .classList
  .toggle('like-button_active');
  // ну лан, сегодня уже не такая злая и мб даже перепишу это завтра но конечно мне это все еще очень нравится <3
}

_zoomIn() {
  const popup = document.querySelector('.image-zoomed-popup');

  popup.querySelector('.popup__image').src = this._photo.src;
  popup.querySelector('.popup__caption').textContent = this._photo.alt;
  dinosaur(popup); // как без экспорта через 3 параметр передавать эту функцию я не поняла поэтому здесь НУ ТАКОЕ >>> the enter <<<
}

_remove() {
  this._element.remove();
}

_setListeners() {
  this._element.querySelector('.like-button').addEventListener('click', () => {
    this._like(); // ну я понимаю что это в конструктор можно вынести и лучше так и сделать но пока для наглядности пусть будет
  });
  this._element.querySelector('.element__delete-button').addEventListener('click', () => {
    this._remove(); // это тож
  });
  this._photo.addEventListener('click', () => {
    this._zoomIn(); // зумим фотку с клятым экспортом
  });
}

generateCard() {
  this._element = this._getTemplate();
  this._photo = this._element.querySelector('.element__photo');
  this._setListeners();

  this._photo.src = this._link;
  this._photo.alt = this._name;
  this._element.querySelector('.element__title').textContent = this._name;

  return this._element;
  }
}

// здесь все кажется ок
