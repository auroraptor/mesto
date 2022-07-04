// console.log('hello world');

import { Card } from './card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './pictures.js';

const data = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// сразу создам экземпляры валидации для каждой формы и включу ее вызовом публичного метода

const editFormValidation = new FormValidator(data, '.edit-profile-form');

editFormValidation.enableValidation();

const addFormValidation = new FormValidator(data, '.new-item-form');

addFormValidation.enableValidation();

// ну вот ниже у меня объявлен миллион переменных, которые я нахожу в dom + есть еще комментарий от ревьюера МОЖНО -- передавать в функцию создания карточки вместо двух аргументов один который содержит в себе сразу два параметра и тоже объявить его через const input

// тут будет красиво, но не сразу

const page = document.querySelector('.page');
const profile = page.querySelector('.profile'); // профиль лучше один раз к документу обратиться так-то
const profilePopup = page.querySelector('.profile-popup'); // + секция поп-ап которую надо из секции превратить в div;
const newItemPopup = page.querySelector('.new-item-popup'); // форма добавления карточек
const imageZoomedPopup = page.querySelector('.image-zoomed-popup'); // третий div
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.add-button'); // вот моя кнопка добавления карточки, которая открывает imposter

// const editProfileButtonSubmit = profilePopup.querySelector('.edit-profile-form__button');
// const newItemButtonSubmit = newItemPopup.querySelector('.new-item-form__button');

const elements = page.querySelector('.elements'); // вот тут тоже не по бэм название но я не понимаю нейминг есть идея назвать эту переменную section
// const card = page.querySelector('#card').content; // получить элемент template достучаться до содержимого, обратившись к свойству content
// const photoIsOpened = imageZoomedPopup.querySelector('.popup__image'); // 7 строка 3 попап
// const photoIsOpenedCaption = imageZoomedPopup.querySelector('.popup__caption'); // 7 строка 3 попап
const formEditProfile = page.querySelector('.edit-profile-form'); // Найти форму в DOM и лучше ее назвать наверное formProfile
const formNewItem = page.querySelector('.new-item-form'); // 17 и 18 строчки одно и то же выбрать 17
// const closeIcons = page.querySelectorAll('.popup__close-icon'); // все крестики разом
const popups = page.querySelectorAll('.popup'); // выбрали все разом как можно объединить обработчики крестиков 122-129 строки
const nameInput = formEditProfile.querySelector('.form__item_input_name');  // поля формы
const jobInput = formEditProfile.querySelector('.form__item_input_job');
const newLocationInput = formNewItem.querySelector('.form__item_input_place'); // поля формы добавления новой карточки
const newLinkInput = formNewItem.querySelector('.form__item_input_link'); // а мб лучше будет в названии дописать еще Input newLocationInput и newLinkInput
const name = profile.querySelector('.name'); // поле имени в профиле
const job = profile.querySelector('.job'); // второе поле в профиле

// дальше получше TODO удалить лишнее

function openPopup(popup) { // Она будет принимать в вызов любой попап как передать ее в виде третего аргумента в конструктор класса я не поняла поэтому тупо экспортирую и там использую
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', escapeFromPopup);
  document.addEventListener('mousedown', missClick);
}

const generateCard = (data) => {
  const newCard = new Card(data, '#card', openPopup);

  return newCard.generateCard();

  // elements.prepend(newCard.generateCard()); // ооо какая я молодец нашла место это! тут была ошибочка потому что я забыла ВЫЗВАТЬ метот generateCard()

    // Создайте функцию, которая будет вставлять карточку в контейнер. Вызывать ее будете в функции-сабмите формы добавления карточки и при рендере базовых 6 карточек
}

const addCard = (data) => {
  elements.prepend(generateCard(data));
}

initialCards.reverse().forEach( data => {
  addCard(data);
});

const escapeFromPopup = (evt) => {
    if (evt.key === 'Escape') {
      const popup = page.querySelector('.popup_opened'); // TODO вместо page найти ближайшего соседа события evt.target с заданным классом
      closePopup(popup);
    }
};

const missClick = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', escapeFromPopup);
  document.removeEventListener('mousedown', missClick);
}

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
     if (evt.target.classList.contains('popup__close-icon')) {
        closePopup(popup);
      }
  });
});

function openEditProfilePopup() {
  editFormValidation.goToReset();

  nameInput.value = name.textContent;
  jobInput.value = job.textContent;

  openPopup(profilePopup);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;
    name.textContent = nameInputValue;
    job.textContent = jobInputValue;

    closePopup(profilePopup);
}

function addNewItemFormSubmit(evt) {
  evt.preventDefault();

  const data = {
    name: newLocationInput.value,
    link: newLinkInput.value
  }

  // const card = generateCard(data);

  addCard(data);
  closePopup(newItemPopup);
}

editButton.addEventListener('click', openEditProfilePopup);
formEditProfile.addEventListener('submit', handleProfileFormSubmit);

addButton.addEventListener('click', (evt) => { // начинаю слушать кнопку add-button
  addFormValidation.goToReset();

  openPopup(newItemPopup); // вот здесь можно через таргет и ближайшего соседа с заданным классом сделать
});

formNewItem.addEventListener('submit', addNewItemFormSubmit);


