export class Section {
  constructor({ renderer }, containerSelector) {
    // this._itemList = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Можно было бы сделать функцию renderer обычной функцией создания карточки (без вставки ее в DOM), тогда в методе addItem можно было бы сразу создавать карточку и тут же вставлять ее в DOM. Тогда в index.js не нужно было бы отдельно создавать функцию createCard, чтобы в 2х местах создавать карточки.

//  addItem(item) {
//   const card = this._renderer(item)
//   this._container.prepend(card);
// }

// А можно переиспользовать метод _renderer, чтобы создавать и вставлять карточку

  // renderCard(item) {
  //     this._renderer(item);
  // }

    // я попробовала и что-то запуталась TODO посомтри на это свежим взглядом >>> the enter

  renderItems(itemList) {
    itemList.forEach( (item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

// >>> the enter
