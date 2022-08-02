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



const move = () => {
  api.getUserInfo()
  .then((res) => console.log('ID', res._id))
  .catch((err) => console.log(err));
}

move();

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
// api.deleteCard('62e6a0d41aedd50a87b38b8a');

// Проверять себя. Во всем. Постоянно. Помнить про то, что проверка занимает гораздо меньше времени, чем сама работа, зато избавляет от чувсва досады, которое всегда приходит следом за невнимательностью. >>> the enter

// добавим сюда немного логики 👾 -- что мне нужно знать у карточки? поле isOwner пригодится чтобы определить среди всех лайков есть ли лайк автора и в зависимости от этого красить сердечко

// давай подумаем над логикой рендера корзины удаления
// 1. сравнить user.id с card.owner.id
// 2. если они совпадают, рисовать урну

// создать что-то про юзера

const user = (value) => { console.log('value', value); return value };

 api.getUserInfo()
  .then((res) => {
    console.log(res)
    return user(res) })
  .catch((err) => {return err})


const cardList = new Section({
  renderer: (item) => {
    const newCard = new Card(item, '#card', {
      handleCardClick: handleCardClick,
      handleMoveClick: handleMoveClick,
      handleLikeClick: (card) => {

        newCard._isLiked // undefined костыль

        // api.getUserInfo()
        // .then((res) => {
        //   console.log('method isLiked', newCard.isLiked(res['_id']));
        //   return newCard.isLiked(res['_id'])})
        // .catch((err) => {console.log(err)}) // хочу чтобы это условие возвращало мне булевое значение по поторому я буду отправлять реквест

        ? api.unlikePluto(card)
        .then((res) => {
          console.log('dont u want to get better', res);
        // newCard.likeButton.classList.remove('like-button_active');
        // newCard.iLikeToScore.textContent = res[`likes`].length;
        // newCard.like()
        newCard.dislike()
      })
        .catch((err) => { console.log(err)})

        : api.like(card)
        .then((res) => {
        newCard.iLikeToScore.textContent = res[`likes`].length;
        newCard.likeButton.classList.add('like-button_active');
        newCard.like()
        console.log('lets face the facts', res)
        // newCard.pluslike()
      })
        .catch((err) => { console.log(err)});
      },
      // rendererHeart: () => {
      //   api.getUserInfo()
      //   .then((res) => {
      //     newCard.isLiked(res[`_id`])
      //   })
      //   .catch((err) => {console.log(err)})
      // }
      });

      // console.log('88 getUserInfo', Promise.result(api.getUserInf>o()
      // .then((res) => { return newCard.isLiked(res['_id'])})
      // .catch((err) => {console.log(err)}))); // а как вытащить результат Promise.result из промиса 🤔


      // console.log('api', api.getUserInfo()
      // .then((res) => {newCard.isLiked(res[`id`])})
      // .catch((err) => { console.log(err)});
// )

    return newCard.generateCard();
    }
  },
'.elements');

api.getUserInfo()
.then((res) => {console.log('99', res['_id'])})
.catch((err) => {console.log(err)});

api.getInitialCards()
.then((res) => {
  return res.reverse().forEach((_) => cardList.addItem(_)) })
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
