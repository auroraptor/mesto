export class UserInfo {
  constructor( { name, about }) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
  }

  getUserInfo() {
    this._info = {};

    this._info['name'] = this._name.textContent;
    this._info['job'] = this._about.textContent;

    return this._info;
  }

  setUserInfo({ name, job }) {
    this._name.textContent = name;
    this._about.textContent = job;
  }
}

// >>> the enter
