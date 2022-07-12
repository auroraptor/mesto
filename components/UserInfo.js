export class UserInfo {
  constructor( { name, about }) {
    this._name = something.querySelector(name); // в документе искать или есть что-то удобней
    this._about = something.querySelector(about); // TODO это псевдокод исправь
    this._info = {};
  }

  getUserInfo() { // а что в него попадает в этот метод хммм
    // тут будет какой-то код

    return this._info; // возвращает объект с данными пользователя
  }

  setUserInfo({ name, job }) {
    this._name.textContent = name;
    this._about.textContent = job;
  }
}
