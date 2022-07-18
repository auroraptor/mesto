import { Section } from '../components/Section.js';
import { FormValidator } from '../components/FormValidator.js';
import { UserInfo} from '../components/UserInfo.js'
import { Card } from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { initialCards } from '../utils/pictures.js';
import { data, editButton, addButton } from '../utils/constants.js';
import './index.css';

const editFormValidation = new FormValidator(data, '.edit-profile-form');
const addFormValidation = new FormValidator(data, '.new-item-form');

editFormValidation.enableValidation();
addFormValidation.enableValidation();

// вынести этот экземпляр прочь из хендлера, тк его над лишь раз создавать (aaaaa :) >>> the enter

const popupWithImage = new PopupWithImage('.image-zoomed-popup');
popupWithImage.setEventListeners();

const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
}

const createCard = (item) => {
  const newCard = new Card(item, '#card', handleCardClick);

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

    const element = createCard(item);

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
    const element = createCard(formData);
    cardList.addItem(element);
    }
  }
);

popupEditProfile.setEventListeners()
popupAddNewItem.setEventListeners();

editButton.addEventListener('click', () => {
  editFormValidation.resetValidation();
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  popupEditProfile.open();
  }
);

addButton.addEventListener('click', () => {
  addFormValidation.resetValidation();
  popupAddNewItem.open();
  }
);

// >>> the enter
