import { Section } from '../components/Section.js';
import { FormValidator } from '../components/FormValidator.js';
import { UserInfo} from '../components/UserInfo.js'

import { Card } from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';

import { initialCards } from './pictures.js';



const data = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// сразу создам экземпляры валидации для каждой формы и включу ее вызовом публичного метода >>> the enter

const editFormValidation = new FormValidator(data, '.edit-profile-form');

editFormValidation.enableValidation();

const addFormValidation = new FormValidator(data, '.new-item-form');

addFormValidation.enableValidation();

// тут будет красиво, но не сразу >>> the enter

const page = document.querySelector('.page');
const profile = page.querySelector('.profile'); // профиль
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.add-button');


const handleCardClick = (name, link) => {
  const popupWithImage = new PopupWithImage('.image-zoomed-popup');
  popupWithImage.open(name, link);
  popupWithImage.setEventListeners();
}

const cardList = new Section({
  items: initialCards.reverse(),
  renderer: (item) => { // отвечает за создание и отрисовку данных на странице
    const newCard = new Card(item, '#card', handleCardClick); // создание вот тут менять
    const element = newCard.generateCard();

    cardList.addItem(element);
  },
}, '.elements');

cardList.renderItems();

const popupEditProfile = new PopupWithForm('.profile-popup',
  { handleFormSubmit: (formData) => {
  const userInfo = new UserInfo({name: '.name', about: '.job'});
  userInfo.setUserInfo(formData);
  }
});

popupEditProfile.setEventListeners()

const popupAddNewItem = new PopupWithForm(
  '.new-item-popup',
  {handleFormSubmit: (formData) => {
        const card = new Card(formData, '#card', handleCardClick);
        const element = card.generateCard();
        cardList.addItem(element);
        }
  }
)

popupAddNewItem.setEventListeners();

// function handleProfileFormSubmit(evt) { // вот эта функция бесполезная мб подскажет мне как через UserInfo добавить в инпуты данные
//     evt.preventDefault();
//     const nameInputValue = nameInput.value;
//     const jobInputValue = jobInput.value;
//     name.textContent = nameInputValue;
//     job.textContent = jobInputValue;

//     // closePopup(profilePopup);
// }

editButton.addEventListener('click', () => {
  editFormValidation.goToReset();
  popupEditProfile.open();
});

addButton.addEventListener('click', () => {
  addFormValidation.goToReset();
  popupAddNewItem.open();
});

// TODO с чем тут еще надо разобраться? поля формы редактирования профиля должны вставляться через userInfo.getInfo() в открытую форму редактирования профиля и Esc пока не работает теряется контекст >>> the enter


