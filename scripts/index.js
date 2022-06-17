// console.log('hello world');

// вспомнить всё или что я тут писала 10 дней спустя
// ну вот ниже у меня объявлен миллион переменных, которые я нахожу в dom + есть еще комментарий от ревьюера МОЖНО -- передавать в функцию создания карточки вместо двух аргументов один который содержит в себе сразу два параметра и тоже объявить его через const input

const page = document.querySelector('.page');
const profile = page.querySelector('.profile'); // профиль лучше один раз к документу обратиться так-то
const profilePopup = page.querySelector('.profile-popup'); // + секция поп-ап которую надо из секции превратить в div;
const newItemPopup = page.querySelector('.new-item-popup'); // форма добавления карточек
const imageZoomedPopup = page.querySelector('.image-zoomed-popup'); // третий div
const editButton = profile.querySelector('.profile__edit-button');
const saveButton = profilePopup.querySelector('.save-button');
const addButton = profile.querySelector('.add-button'); // вот моя кнопка добавления карточки, которая открывает imposter
const elements = page.querySelector('.elements'); // вот тут тоже не по бэм название но я не понимаю нейминг есть идея назвать эту переменную section
const card = page.querySelector('#card').content; // получить элемент template достучаться до содержимого, обратившись к свойству content
const photoIsOpened = imageZoomedPopup.querySelector('.popup__image'); // 7 строка 3 попап
const photoIsOpenedCaption = imageZoomedPopup.querySelector('.popup__caption'); // 7 строка 3 попап
const formEditProfile = page.querySelector('.edit-profile-form'); // Найти форму в DOM и лучше ее назвать наверное formProfile
const formNewItem = page.querySelector('.new-item-form'); // 17 и 18 строчки одно и то же выбрать 17
const closeIcons = page.querySelectorAll('.popup__close-icon'); // все крестики разом
const popups = page.querySelectorAll('.popup'); // выбрали все разом как можно объединить обработчики крестиков 122-129 строки
const nameInput = formEditProfile.querySelector('.form__item_input_name');  // поля формы
const jobInput = formEditProfile.querySelector('.form__item_input_job');
const newLocationInput = formNewItem.querySelector('.form__item_input_place'); // поля формы добавления новой карточки
const newLinkInput = formNewItem.querySelector('.form__item_input_link'); // а мб лучше будет в названии дописать еще Input newLocationInput и newLinkInput
const name = profile.querySelector('.name'); // поле имени в профиле
const job = profile.querySelector('.job'); // второе поле в профиле

// Данные лучше вынести в отдельный файл МОЖНО ЛУЧШЕ

// const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];

// // вот здесь был комментарий про деструктуризацию МОЖНО ЛУЧШЕ

function createCard(name, link) { // создает новую карточку деструктуризация мне все еще непонятна, поэтому продолжаю передавать по отдельности
  const cardElement = card.querySelector('.element').cloneNode(true);
  const photo = cardElement.querySelector('.element__photo');
  const title = cardElement.querySelector('.element__title');
  photo.src = link;
  photo.alt = name;
  title.textContent = name;

  const like = cardElement.querySelector('.like-button'); // лайк
  like.addEventListener('click', () => {
    like.classList.toggle('like-button_active');
  })

  const move = cardElement.querySelector('.element__delete-button'); // урна
  move.addEventListener('click', () => {
    const item = move.closest('.element');
    item.remove();
  });

  photo.addEventListener('click', () => { // картинка
    openPopup(imageZoomedPopup);
    photoIsOpened.src = link;
    photoIsOpened.alt = name;
    photoIsOpenedCaption.textContent = name;
  });
  return cardElement;
}

function renderCard(name, link) {
  elements.prepend(createCard(name, link));
}

// Лучше устанавливать на событие mousedown

function openPopup(popup) { // Она будет принимать в вызов любой попап
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', escapeFromPopup);
  document.addEventListener('mousedown', missClick);
}

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

// Следует либо передавать третьим аргументом объект селекторов только тех, что внутри себя использует hideInputError, либо вынести конфигурационный объект целиком в отдельную переменную в файл констант и использовать его и здесь и в файле validate.js

const resetForm = (formElement) => {
  const inputList = formElement.querySelectorAll('.popup__input');
  inputList.forEach( (inputElement) => {
    hideInputError(formElement, inputElement, {
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'});
  });
  formElement.reset();
}

// initialCards.reverse().forEach( item => {
//   const name = item.name;
//   const link = item.link;
//   renderCard(name, link);
// });

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
     if (evt.target.classList.contains('popup__close-icon')) {
        closePopup(popup);
      }
  });
});

// функция openEditProfilePopup заполняет поля «Имя» и «О себе» теми значениями, которые отображаются на странице и лучше ей другое название придумать но какое
// Функции следует называть с глагола и более конкретно. Например, для данной функции подойдет название openEditProfilePopup

function openEditProfilePopup() {
  resetForm(formEditProfile);

  enableValidation({formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'});

  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  openPopup(profilePopup);
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
// Названия методов и функций нужно начинать с глагола в начальной форме (такой пункт есть в чек-листе). Это обычная международная практика, чтобы функция говорила, что она делает. handleProfileFormSubmit

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;
    name.textContent = nameInputValue;
    job.textContent = jobInputValue;

    closePopup(profilePopup);
}

// функция обработчика отправки формы для создания новой карточки addNewItemSubmitHander
// Названия методов и функций нужно начинать с глагола в начальной форме (такой пункт есть в чек-листе). Это обычная международная практика, чтобы функция говорила, что она делает addNewItemFormSubmit

function addNewItemFormSubmit(evt) {
  evt.preventDefault();

  const newLocationValue = newLocationInput.value; // получила значения полей
  const newLinkValue = newLinkInput.value;

  renderCard(newLocationValue, newLinkValue);
  closePopup(newItemPopup);
}

editButton.addEventListener('click', openEditProfilePopup); // передавать в слушатель событий editButton вместо функции переключения модификатора
formEditProfile.addEventListener('submit', handleProfileFormSubmit);

addButton.addEventListener('click', () => { // начинаю слушать кнопку add-button
  resetForm(formNewItem);

  // При открытии формы добавления карточки также необходимо деактивировать кнопку сабмита, иначе после добавления карточки и последующего повторного открытия формы - кнопка активна - в результате чего есть возможность сделать сабмит с пустыми невалидными полями

  enableValidation({formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'});

  openPopup(newItemPopup); // вот здесь можно через таргет и ближайшего соседа с заданным классом сделать
});

formNewItem.addEventListener('submit', addNewItemFormSubmit);

