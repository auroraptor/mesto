import { Section } from '../components/Section.js';
import { FormValidator } from '../components/FormValidator.js';
import { UserInfo} from '../components/UserInfo.js'
import { Card } from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { initialCards } from '../utils/pictures.js';
import { data, editButton, addButton, images } from '../utils/constants.js';
import './index.css';

const editFormValidation = new FormValidator(data, '.edit-profile-form');
const addFormValidation = new FormValidator(data, '.new-item-form');

editFormValidation.enableValidation();
addFormValidation.enableValidation();

const handleCardClick = (name, link) => {
  const popupWithImage = new PopupWithImage('.image-zoomed-popup');
  popupWithImage.open(name, link);
  popupWithImage.setEventListeners();
}

const cardList = new Section({
  items: initialCards.reverse(),
  renderer: (item) => { // отвечает за создание и отрисовку данных на странице
    const newCard = new Card(item, '#card', handleCardClick);
    const element = newCard.generateCard();

    cardList.addItem(element);
    }
  },
'.elements'); // что-то я запуталась в переносе скобок на новые строчки вот здесь >>> the enter

cardList.renderItems();

const userInfo = new UserInfo({ name: '.name', about: '.job' });

const popupEditProfile = new PopupWithForm('.profile-popup', {
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
    }
  }
);

const popupAddNewItem = new PopupWithForm(
  '.new-item-popup', {
  handleFormSubmit: (formData) => {
    const card = new Card(formData, '#card', handleCardClick);
    const element = card.generateCard();
    cardList.addItem(element);
    }
  }
);

popupEditProfile.setEventListeners()
popupAddNewItem.setEventListeners();

editButton.addEventListener('click', () => {
  editFormValidation.goToReset();
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  popupEditProfile.open();
  }
);

addButton.addEventListener('click', () => {
  addFormValidation.goToReset();
  popupAddNewItem.open();
  }
);

// >>> the enter
