export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._itemList = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._itemList.forEach( (item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

// >>> the enter
