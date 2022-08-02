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
    card._isLiked // undefined костыль

    ? api.unlikePluto(card)
    .then((res) => {
      console.log('dont u want to get better', res);
      card.like(res);
  })
    .catch((err) => { console.log(err)})

    : api.like(card)
    .then((res) => {
    card.like(res)
    console.log('lets face the facts', res)
  })
    .catch((err) => { console.log(err)});
}

const cardList = new Section({
  renderer: (item) => {
    const newCard = new Card(item, '#card', {
      handleCardClick: handleCardClick,
      handleMoveClick: handleMoveClick,
      handleLikeClick: handleLikeClick
      });

      api.getUserInfo()
      .then((res) => {
        console.log('Denial of Service', newCard.isOwner(res['_id']));
        if (!newCard.isOwner(res['_id'])) {
          newCard._deleteButton.remove()
        } else if (item.likes.some((like) => { return like['_id'] === res['_id']})) {
          newCard._isLiked = true;
          newCard.likeButton.classList.add('like-button_active');
        }
      })
      .catch((err) => { console.log('418', err)});

    return newCard.generateCard();
    }
  },
'.elements');

const getInitialCards = () => {
  api.getInitialCards()
  .then((res) => {
  return res.reverse().forEach((_) => cardList.addItem(_)) })
  .catch((err) => {console.log('human after all', err)})
}

getInitialCards(); // а вот здесь происходит рендер карточек прямо у меня на глазах 👁 👄 👁

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

const popupConfirm = new PopupWithConfirmation('.confirm-popup', {
  handleFormSubmit: (card) => {
    api.deleteCard(card);
    card.remove();
  }
 });

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
