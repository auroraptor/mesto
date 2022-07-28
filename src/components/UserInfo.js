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

  // вот это устанавливает то что пришло с инпутов -- не с инпутов теперь а с сервера
  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar; // вот это лишнее но как передать метод setAvatar в цепочке 🚃 🚃 🚃 api.getUserInfo я пока не поняла
  }

  setAvatar({ avatar }) {
    this._avatar.src = avatar;
  }
}

// >>> the enter
