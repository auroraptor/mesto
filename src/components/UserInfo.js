export class UserInfo {
  constructor( { avatar, name, about }) {
    this._avatar = document.querySelector(avatar);
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

  setAvatar(ava) {
    this._avatar.src = ava;
  }
}

// >>> the enter
