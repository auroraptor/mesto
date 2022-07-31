import { Section } from '../components/Section.js';
import { FormValidator } from '../components/FormValidator.js';
import { UserInfo} from '../components/UserInfo.js'
import { Card } from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
// import { initialCards } from '../utils/pictures.js';
import { editAvatarButton, editProfileButton, addButton, config,  formValidators } from '../utils/constants.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { Api } from '../components/Api.js';
import './index.css';
// При каждом запросе нужно передавать токен и идентификатор группы
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46/',
  authorization: 'b5225d24-020a-49f6-8bcd-ca1813713eea'
});














// данные в профиле должны рендерится по данным с сервера

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

// {likes: Array(3), _id: '62e3a0a837166c0a932ba184', name: 'My queendom come', link: 'https://openmoji.org/data/color/svg/2B50.svg', owner: {…}, …}
// createdAt: "2022-07-29T08:56:08.024Z"
// likes: (3) [{…}, {…}, {…}]
// link: "https://openmoji.org/data/color/svg/2B50.svg"
// name: "My queendom come"
// owner: {name: '103.5 Dawn FM', about: "You're almost there, but don't panic", avatar: 'https://pictures.s3.yandex.net/resources/JS___1__11_1587198298.png', _id: '2b4017af1b5aeebeeb7939f8', cohort: 'cohort-46'}
// _id: "62e3a0a837166c0a932ba184"
// [[Prototype]]: Object

const popupConfirm = new PopupWithConfirmation('.confirm-popup', {
  handleFormSubmit: (card) => {
    card.remove();
  }
 });

// Проверять себя. Во всем. Постоянно. Помнить про то, что проверка занимает гораздо меньше времени, чем сама работа, зато избавляет от чувсва досады, которое всегда приходит следом за невнимательностью. >>> the enter

const cardList = new Section({
  renderer: (item) => {
    const newCard = new Card(item, '#card', {
      handleCardClick: handleCardClick,
      handleMoveClick: handleMoveClick,
      handleLikeClick: (card) => {
        card.isLiked // undef
        // пока тут сложно поэтому оставлю на потом а сейчас перейду к рендеру урны
        ? api.unlike(card)
        .then((res) => {
        console.log('answer', res, 'dislike **', newCard.isliked);
        // newCard.iLikeToScore();
        newCard.likeButton.classList.remove('like-button_active');
        newCard.iLikeToScore.textContent = res[`likes`].length;
        console.log(res[`likes`].find((self) => { return self[`_id`] === res[`owner`][`_id`]}));
        return newCard.like()}) // вот тут будет логика счетчика лайков и смены цвета сердечка
        .catch((err) => { console.log(err)})
        : api.like(card)
        .then((res) => {
        console.log('likelikelike', res, 'like *** true', newCard.isliked);
        console.log(res[`likes`].find((self) => { return self[`_id`] === res[`owner`][`_id`]}));
        // newCard.iLikeToScore();
        newCard.iLikeToScore.textContent = res[`likes`].length;
        newCard.likeButton.classList.add('like-button_active');
        return newCard.like() }) // и здесб она же, а это значит что ее можно вынести в отдельную функцию
        .catch((err) => { console.log(err)});
      }});
    return newCard.generateCard();
    }
  },
'.elements');

const isLiked = (card) => {

}

// cardList.addItem({name: 'myLover', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg', likes: [...Array(1016)], _id: 9891 });
// cardList.addItem({name: 'Under the Water', link: 'https://openmoji.org/data/color/svg/2B50.svg', likes: [...Array(1217)], _id: 8402});

api.getInitialCards()
.then((res) => { return res.reverse().forEach((_) => cardList.addItem(_)) })
.catch((err) => {console.log('err', err)});



const userInfo = new UserInfo({ avatar: '.profile__avatar', name: '.name', about: '.about' });

const popupEditProfile = new PopupWithForm('.profile-popup', {
  handleFormSubmit: (formData) => {
    // TODO во время загрузки всего этого показывать другую кнопку
    api.editUserInfo(formData)
    .then((result) => {userInfo.setUserInfo(result)})
    .catch((err) => {console.log(err)}); // обновляет инфу
    }
  }
);

const popupAddNewItem = new PopupWithForm(
  '.new-item-popup', {
  handleFormSubmit: (formData) => {
    console.log(formData);
    api.postNewCard(formData)
    .then((res) => {cardList.addItem(res)})
    .catch((err) => {console.log(err)});
    }
  }
);

const popupEditAvatar = new PopupWithForm(
  '.avatar-popup', {
    handleFormSubmit: (formData) => {
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

editAvatarButton.addEventListener('click', () => { // TODO вот это надо заменить на кнопку другую и вообще миллион путей верстки есть
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
