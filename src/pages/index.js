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

const handleMoveClick = (card) => {
  popupConfirm.setEventListeners(card);
  popupConfirm.open();
}

const handleLikeClick = (card) => {
  api.like(card, card.isLiked)
  .then((res) => {
    // console.log('dont u want to get better', res);
    card.like(res)})
  .catch((err) => { console.log(err)});
}

const userInfo = new UserInfo({ avatar: '.profile__avatar', name: '.name', about: '.about' });

api.getUserInfo()
.then((res) => {
  userInfo.setUserInfo(res);
  // console.log('who is ', userInfo);
})
.catch((err) => { console.log(err) });

// console.log('id XO', userInfo); // undefined

const cardList = new Section({
  renderer: (item) => {
    const newCard = new Card(item, '#card', {
      handleCardClick,
      handleMoveClick,
      handleLikeClick,
      handlePlanet: (param) => {return userInfo._id === param},
      blackHearts: (param) => { return param.some((_)=> { return userInfo._id === _['_id']})},
      }); // изменить

    return newCard.generateCard();
    }
  },
'.elements');

const renderAuro = () => {
  Promise.all([
    api.getUserInfo(),
    api.getInitialCards()
  ])
  .then(([userRes, cardsRes]) => {
    userInfo.setUserInfo(userRes)
    cardsRes.reverse().forEach((_) => cardList.addItem(_))
  })
}

renderAuro()

const popupEditProfile = new PopupWithForm('.profile-popup', {
  handleFormSubmit: (formData) => {
    api.editUserInfo(formData)
    .then((result) => {userInfo.setUserInfo(result)})
    .catch((err) => {console.log(err)}); // обновляет инфу
    }
  }, {
    buttonTextContent: 'Сохранить',
    buttonLoadingTextContent: 'Сохранение...'}
);

const popupAddNewItem = new PopupWithForm(
  '.new-item-popup', {
  handleFormSubmit: (formData, button) => {
    button.disabled = true;

    api.postNewCard(formData)
    .then((res) => {
      cardList.addItem(res);
    })
    .catch((err) => {console.log(err)});
    }
  }, {
    buttonTextContent: 'Создать',
    buttonLoadingTextContent: 'Сохранение...'}
);

const popupConfirm = new PopupWithConfirmation('.confirm-popup', {
  handleConfirmation: (card) => {
    api.deleteCard(card)
    .then((res) => {console.log('уродство этого кода неоспоримо'); card.remove()})
    .catch((err) => { console.log('err', err)});
  }
  }, {
  buttonTextContent: 'Да',
  buttonLoadingTextContent: 'Удаление...',
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
  }, {
    buttonTextContent: 'Сохранить',
    buttonLoadingTextContent: 'Сохранение...'}
);

api.getInitialCards()
.then((result) => console.log(result))
.catch((err) => console.log(err));

api.getUserInfo()
.then((result) => {console.log('and now', result)})
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
