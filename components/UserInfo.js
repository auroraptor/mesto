export class UserInfo {
  constructor( { name, about }) {
    this._name = document.querySelector(name); // в документе искать или есть что-то удобней
    this._about = document.querySelector(about);
  }

  getUserInfo() { // а что в него попадает в этот метод хммм
    this._info = {};
    // тут будет какой-то код, чуваки
    return this._info; // возвращает объект с данными пользователя чтобы вставить его на страницу TODO реализовать
  }

  setUserInfo({ name, job }) {
    this._name.textContent = name;
    this._about.textContent = job;
  }
}

// TODO прописать метод getUserInfo >>> the enter
