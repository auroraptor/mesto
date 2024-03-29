import { Section } from '../components/Section.js';
import { FormValidator } from '../components/FormValidator.js';
import { UserInfo } from '../components/UserInfo.js'
import { Card } from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { editAvatarButton, editProfileButton, addButton, configValid, configUserInfo, configPopupAddNewItem, configPopupWithConfirm, configPopupEditAvatar, configPopupEditProfile, formValidators } from '../utils/constants.js';
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

enableValidation(configValid);

const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
}

const handleMoveClick = (card) => {
  popupConfirm.setOpenCallback(card);
  popupConfirm.open();
}

const handleLikeClick = (card) => {
  api.like(card, card.isLiked)
  .then((res) => { card.like(res) })
  .catch((err) => { console.log(err) });
}

const userInfo = new UserInfo(configUserInfo);

const cardList = new Section({
  renderer: (item) => {
    const newCard = new Card(item, '#card', {
      handleCardClick,
      handleMoveClick,
      handleLikeClick,
      checkOwner: (id) => { return userInfo['_id'] === id },
      isLikedCard: (likes) => { return likes.some((like) => { return userInfo['_id'] === like['_id']})},
      });

    return newCard.generateCard();
    }
  },
'.elements');

const renderItems = () => {
  Promise.all([
    api.getUserInfo(),
    api.getInitialCards()
  ])
  .then(([userRes, cardsRes]) => {
    userInfo.setUserInfo(userRes)
    cardsRes.reverse().forEach((card) => cardList.addItem(card))
  })
}

renderItems();

const popupEditProfile = new PopupWithForm(
  configPopupEditProfile, {
  handleFormSubmit: (formData) => {

    api.editUserInfo(formData)
    .then((result) => {
      userInfo.setUserInfo(result);
      popupEditProfile.close();
    })
    .catch((err) => {console.log(err)});
    }
  }
);

const popupAddNewItem = new PopupWithForm(
  configPopupAddNewItem, {
  handleFormSubmit: (formData) => {
    api.postNewCard(formData)
    .then((res) => {
      cardList.addItem(res);
      popupAddNewItem.close();
    })
    .catch((err) => { console.log(err) });
    }
  },
);

const popupWithImage = new PopupWithImage('.image-zoomed-popup');

const popupConfirm = new PopupWithConfirmation(
  configPopupWithConfirm, {
  handleConfirmation: (card) => {
    api.deleteCard(card)
    .then(() => {
      card.remove();
      popupConfirm.close();
    })
    .catch((err) => { console.log('err', err)});
  },
  }
);

const popupEditAvatar = new PopupWithForm(
  configPopupEditAvatar, {
    handleFormSubmit: (formData) => {
      api.editUserAvatar(formData)
      .then((res) => {
        userInfo.setAvatar(res['avatar']);
        popupEditAvatar.close();
      })
      .catch((err) => {console.log(err)});
    }
  }
);

popupWithImage.setEventListeners();
popupEditAvatar.setEventListeners();
popupEditProfile.setEventListeners();
popupAddNewItem.setEventListeners();
popupConfirm.setEventListeners();

editAvatarButton.addEventListener('click', (e) => {
  e.target.setAttribute('aria-expanded', true);

  formValidators['avatar-form'].resetValidation();
  popupEditAvatar.open();
});

editProfileButton.addEventListener('click', (e) => {
  e.target.setAttribute('aria-expanded', true);

  formValidators['profile-form'].resetValidation();
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  popupEditProfile.open();
  }
);

addButton.addEventListener('click', (e) => {
  e.target.setAttribute('aria-expanded', true);

  formValidators['new-item'].resetValidation();
  popupAddNewItem.open();
  }
);

// >>> the enter
