import { Section } from '../components/Section.js';
import { FormValidator } from '../components/FormValidator.js';
import { UserInfo} from '../components/UserInfo.js'
import { Card } from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { initialCards } from '../utils/pictures.js';
import { editAvatarButton, editProfileButton, addButton, config,  formValidators } from '../utils/constants.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { Api } from '../components/Api.js';
import './index.css';

// данные в профиле должны рендерится по данным с сервера

// Если будет интересно, можно универсально создать экземпляры валидаторов всех форм, поместив их все в один объект, а потом брать из него валидатор по атрибуту name, который задан для формы. Это очень универсально и для любого кол-ва форм подходит.
  // баааайт >>> the enter

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach( (form) => {
    const validator = new FormValidator(config, form);
    const formName = form.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

enableValidation(config);

const popupWithImage = new PopupWithImage('.image-zoomed-popup');
popupWithImage.setEventListeners();

const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
}

// описываю здесь логику удаления карточки через попап
const handleMoveClick = (card) => {
  popupConfirm.setEventListeners(card);
  popupConfirm.open();
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

// Проверять себя. Во всем. Постоянно. Помнить про то, что проверка занимает гораздо меньше времени, чем сама работа, зато избавляет от чувсва досады, которое всегда приходит следом за невнимательностью. >>> the enter

// api.getInitialCards()
// .then((res) => {
//   const cardList = new Section({
//     // вот здесь в айтемы должен приходить ответ с сервера в виде массива карточек
//     // items: initialCards.reverse(),
//     items: res,

//     renderer: (item) => {
//       cardList.addItem(createCard(item));
//       }
//     },
//   '.elements');
//   cardList.renderItems()
// })
// .catch((err) => {console.log(err)});

// При каждом запросе нужно передавать токен и идентификатор группы
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46/',
  authorization: 'b5225d24-020a-49f6-8bcd-ca1813713eea'
});

const cardList = new Section({
  // вот здесь в айтемы должен приходить ответ с сервера в виде массива карточек
  // items: initialCards.reverse(),
  // items: [],

  renderer: (item) => {
    cardList.addItem(createCard(item));
    }
  },
'.elements');

console.log(cardList._renderer);

// api.getInitialCards()
// .then((res) => { return cardList.renderItems(res) })
// .catch((err) => {console.log('err', err)});

const userInfo = new UserInfo({ avatar: '.profile__avatar', name: '.name', about: '.about' });

const popupEditProfile = new PopupWithForm('.profile-popup', {
  handleFormSubmit: (formData) => {
    // вот тут точн что-то не так
    // userInfo.setUserInfo(formData); // вставляет на страницу то что пришло с формы
    // и вот возможно тут надо сделать так чтобы данные с сервера отображались
    // console.log(userInfo.getUserInfo());
    // оооо кажется я поняла что тут надо делать -- передавать formData сначала в editUserInfo а уже потом все остальное
    api.editUserInfo(formData)
    .then((result) => {userInfo.setUserInfo(result)})
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
      // пришла инфа с формы -> кинули ее на сервер -> отобразили ответ сервера на странице
        // TODO добавить процесс ожидания и вот это все
      api.editUserAvatar(formData)
      .then((res) => {userInfo.setAvatar(res)})
      .catch((err) => {console.log(err)});
    }
  }
);



api.getInitialCards()
.then((result) => console.log(result))
.catch((err) => console.log(err));

api.getUserInfo()
.then((result) => {console.log(result)})
.catch((err) => console.log(err));

// установка всех данных профиля которые приходят с сервера
api.getUserInfo()
.then((res) => {
  return userInfo.setUserInfo(res)})
    // почему я передала в скобках res и это само собой превратилось в {name, about, avatar} я не поняла (ну то есть поняла, что это деструктуризация и "давай размотай меня по объектам") но то как оно работает для меня все еще похоже на магию а значит TODO почитать про деструктуризацию больше
.catch((err) => console.log(err));

popupEditAvatar.setEventListeners();
popupEditProfile.setEventListeners()
popupAddNewItem.setEventListeners();

editAvatarButton.addEventListener('click', () => { // вот это надо заменить на кнопку другую
  formValidators['avatar-form'].resetValidation();
  popupEditAvatar.open();
})

editProfileButton.addEventListener('click', () => {
  formValidators['profile-form'].resetValidation();

  api.getUserInfo()
  .then((res) => {
     return popupEditProfile.setInputValues(res);
    })
  .catch((err) => {console.log(' err', err)});

  popupEditProfile.open();
  }
);

addButton.addEventListener('click', () => {
  formValidators['new-item'].resetValidation();
  popupAddNewItem.open();
  }
);

// >>> the enter
