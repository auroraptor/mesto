export class UserInfo {
  constructor( { avatar, name, about }) {
    this._avatar = document.querySelector(avatar);
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
  }

  getUserInfo() {
    this._info = {};

    // вот это надо поменять с textContent инпутов на то что приходит с сервера или хммммм
    this._info['name'] = this._name.textContent;
    this._info['about'] = this._about.textContent;
    return this._info;
  }

  // вот это устанавливает то что пришло с инпутов
  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
  }

  setAvatar(ava) {
    this._avatar.src = ava;
  }
}

// >>> the enter
