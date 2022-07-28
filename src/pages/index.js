import { Section } from '../components/Section.js';
import { FormValidator } from '../components/FormValidator.js';
import { UserInfo} from '../components/UserInfo.js'
import { Card } from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { initialCards } from '../utils/pictures.js';
import { avatarButton, editButton, addButton, config, profile, formValidators } from '../utils/constants.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { Api } from '../components/Api.js';
import './index.css';

// данные в профиле должны рендерится по данным с сервера



// renderProfile(profile);

// Если будет интересно, можно универсально создать экземпляры валидаторов всех форм, поместив их все в один объект, а потом брать из него валидатор по атрибуту name, который задан для формы. Это очень универсально и для любого кол-ва форм подходит.
  // баааайт >>> the enter

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach( (form) => {
    const validator = new FormValidator(config, form);

    // ^ вот здесь ^ приходится менять конструктор класса валидации чтобы это заработало >>> the enter

    const formName = form.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

enableValidation(config); // мне нравится! вот только уверена что название upInTneValid опять не пройдет эххх ладно поменяю сразу >>> the enter

// вынести этот экземпляр прочь из хендлера, тк его над лишь раз создавать (aaaaa :) >>> the enter

const popupWithImage = new PopupWithImage('.image-zoomed-popup');
popupWithImage.setEventListeners();

const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
}

// описываю здесь логику удаления карточки через попап
const handleMoveClick = (card) => {

  popupConfirm.setEventListeners(card);
  popupConfirm.open(); // вот в него должны попадать данные карточки, которую удаляем, а значит нужен еще один наследник?
}

const popupConfirm = new PopupWithConfirmation('.confirm-popup', {
  handleFormSubmit: (card) => {
    card.remove();
  }
 });

const createCard = (item) => {
  const newCard = new Card(item, '#card', handleCardClick, handleMoveClick);

  return newCard.generateCard();
}

// Можно же вставлять карточку в начало с prepend, в конец с append, вообще не вставлять, а сделать массив готовых карточек, а потом уже вставить всё разом в DOM.
  // я это пойму, но не сразу >>> the enter
  // ааааа "можно" значит можно реализовать какие-то методы в слое Section которые и будут делать append вставку или создавать массив готовых карточек! >>> the enter
// И такой пункт есть в чек-листе. Скрин из него http://joxi.ru/xAeobK0cb8D1Gm -- 404 -- но наверн речь про это >> Функция выполняет только одну задачу, например, возвращает разметку карточки. -- каждый раз, когда я сама в одиночку прохожу сквозь чек-лист, мне кажется, будто все правильно и вот как надо, но, очевидно, моё стремление отправить работу на ревью мешает здесь, и я забываю про то что необходимо Проверять себя. Во всем. Постоянно. Помнить про то, что проверка занимает гораздо меньше времени, чем сама работа, зато избавляет от чувсва досады, которое всегда приходит следом за невнимательностью. >>> the enter

const cardList = new Section({
  items: initialCards.reverse(),
  renderer: (item) => { // отвечает за создание и отрисовку данных на странице

    // ххх ну вот даже что у меня ^ тут ^ стоит СОЗДАНИЕ&ОТРИСОВКА должно было б подвести меня к мысли что это значит 2 действия, а после вспомнить о том что круто, когда у функции одна ответственность одного действия -- я ещё научусь читать и понимать что пишу в своих же комментариях >>> the enter

    cardList.addItem(createCard(item));
    }
  },
'.elements');

cardList.renderItems();

const userInfo = new UserInfo({ avatar: '.profile__avatar', name: '.name', about: '.about' });

const popupEditProfile = new PopupWithForm('.profile-popup', {
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData); // вставляет на страницу то что пришло с формы
    // и вот возможно тут надо сделать так чтобы данные с сервера отображались
    console.log(userInfo.getUserInfo());
    // const info = userInfo.getUserInfo()
    // console.log(info);
    // вот здесь должен происходить наш запрос PATCH
    // api.editUserInfo(info);
    api.editUserInfo(userInfo.getUserInfo())
    .then((result) => {console.log('91', result)})
    .catch((err) => {console.log(err)}); // обновляет инфу

    }
  }
);

const popupAddNewItem = new PopupWithForm(
  '.new-item-popup', {
  handleFormSubmit: (formData) => {
    cardList.addItem(createCard(formData));
    }
  }
);

const popupEditAvatar = new PopupWithForm(
  '.avatar-popup', {
    handleFormSubmit: (formData) => {
      // вот тут еще образение к серверу понадобится
      userInfo.setAvatar(formData['avatar'])
    }
  }
);

// При каждом запросе нужно передавать токен и идентификатор группы
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46/',
  authorization: 'b5225d24-020a-49f6-8bcd-ca1813713eea'
});

api.getInitialCards()
.then((result) => console.log(result))
.catch((err) => console.log(err));

api.getUserInfo()
.then((result) => {console.log(result)})
.catch((err) => console.log(err));

// вот это ниже надо переделать и через экземпляр UserInfo а здесь я прост пробую это руками /// >>> the enter

const profileName = profile.querySelector('.name');
const profileAbout = profile.querySelector('.about');

api.getUserInfo()
.then((res) => { return profileName.textContent = res['name'] })
.catch((err) => console.log(err));

api.getUserInfo()
.then((res) => { return profileAbout.textContent = res['about']})
.catch((err) => console.log(err));


popupEditAvatar.setEventListeners();
popupEditProfile.setEventListeners()
popupAddNewItem.setEventListeners();

avatarButton.addEventListener('click', () => { // вот это надо заменить на кнопку другую
  formValidators['avatar-form'].resetValidation();
  popupEditAvatar.open();
})

editButton.addEventListener('click', () => {
  formValidators['profile-form'].resetValidation();
  // или вот эту строчку поменять
  // popupEditProfile.setInputValues(userInfo.getUserInfo());

  // console.log(api.getUserInfo().then((result) => {console.log('146', result)}).catch((err) => {console.log('146', err)}));
  api.getUserInfo()
  .then((res) => {
     return popupEditProfile.setInputValues({name: res['name'], about: res['about']});
    })
  .catch((err) => {console.log(' err', err)});

  // console.log('obj', obj);

  // popupEditProfile.setInputValues(info);

  popupEditProfile.open();
  }
);

addButton.addEventListener('click', () => {
  formValidators['new-item'].resetValidation();
  popupAddNewItem.open();
  }
);

// >>> the enter
