export class UserInfo {
  constructor({ avatar, name, about }) {
    this._avatar = document.querySelector(avatar);
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._id = _id;

    this.setAvatar(avatar);
  }

  setAvatar(avatar) {
    this._avatar.src = avatar;
  }

  getUserInfo() {
    this._info = {};

    this._info['name'] = this._name.textContent;
    this._info['about'] = this._about.textContent;
    this._info['avatar'] = this._avatar.src;
    this._info['id'] = this._id;

    return this._info;
  }
}

// >>> the enter
