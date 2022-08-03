export class Api {
  // ⭐️ В чем задача класса?
    // общаться с сервером: отправлять ему GET POST PATCH PUT DELETE запросы и в своих методах возвращать ответы (которые еще надо будет как-то обрабатывать -- в index.js наверн -- и всеми этими развёернутыми-обработанными промисами-данными кормить другие классы)
      // интересно, а нужен будет 💭 promise.resolve() или это такое себе лишнее
  // 👾 Какие данные хранит класс?
    // хороший вопрос! ну, разметку он в себе точно не хранит, он слой, -- а дальше надо думоть что там в его конструкторе творить
  // 🎭 Классу нужны приватные или публичные методы?
    // публичные для отправки запросов и наверн еще какие-то бонусом, о существовании которых я пока даже не подозреваю
  // 🏛 Как устроена архитектура наследования?
    //никак. этот класс такой один без родителя без наследника >>> the enter

  constructor({ baseUrl, authorization }) {
    // тут будет какой-то код. Без медведей. ♞ >>> the enter
    this._baseUrl = baseUrl;
    // this._headers = headers;
    this._authorization = authorization;
  }

  getInitialCards() {
    // тут будет какой-то код. Без домино. 🂽 >>> the enter

    return fetch(`${this._baseUrl}cards`, {
      headers: {authorization: this._authorization}
    })
    .then((res) => {
      if (res.ok) {
      return res.json();
      }
      return Promise.reject(`err ${res.status}`)
    })
  }

  postNewCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: { authorization: this._authorization,
      'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`err ${res.status}`)
    })
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: {authorization: this._authorization}
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`err ${res.status}`);
    })
  }

  deleteCard(card) {
    return fetch(`${this._baseUrl}cards/${card['id']}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`err pls dnt mv m ${res.status}`)
    })
  }

  editUserInfo(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((res) => { // кажется это не нужно я запуталась
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`err ${res.status}`);
    })
  }

  editUserAvatar(avatar) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'content-type': 'application/json'
      },
      body: JSON.stringify(avatar)
    })
    .then((res) => {
      return (res.ok) ? res.json() : Promise.reject(`err ${res.status}`)
    })
  }

  like(card, isLiked) {
    return fetch(`${this._baseUrl}cards/${card.id}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: {
        authorization: this._authorization
      }
    })
    .then((res) => {
      return (res.ok) ? res.json() : Promise.reject(`err ♡ ${res.status}`)
    })
  }
}


