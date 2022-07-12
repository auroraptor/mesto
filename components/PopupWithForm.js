import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this._callback = callback;
    this._inputValueList = {}; // ну вот так не надо очевидно
  }

  _getInputValues(inputList) { // откуда оно здесь появляется пока загадка
    inputList.forEach( (input) => {
      //this._inputValueList.push(item.textContent) // а можно сделать из этого объект и по уникальному айди инпута присваивать ключ а значение записывать как item.textContent
      this._inputValueList[`input.id`] = input.textContent;

      return this._inputValueList;
    });
  }

  setEvenetListeners() {
    super.setEvenetListeners();

    this.addEventListener('submit', this._callback);
  }

  close() {
    super.close(); // и снова перегрузили

    this.reset(); // а мб и так сработает но маловероятно тут надо форму получить
  }
}

// ладно, это пока мой код который в разработке понятно что пока ничего работать не будет и надо все переделывать, но давай смотреть на это как на черновик? Критику оставим на потом, продолжай писать код других классов, сейчас твоя задача -- позаботиться о количестве, а не о качестве >>> the enter
