// console.log('hello world');

// вспомнить всё или что я тут писала 10 дней спустя
// ну вот ниже у меня объявлен миллион переменных, которые я нахожу в dom + есть еще комментарий от ревьюера можно лучше -- передавать в функцию создания карточки вместо двух аргументов один который содержит в себе сразу два параметра и тоже объявить его через const input
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
// Желательно все константы (элементы DOM, которые никогда не меняются) были найдены 1 раз вверху файла. Элементы DOM, к которым идет обращение внутри JS-файла необходимо заранее вынести в переменную. Это хорошая практика, влияющая на производительность. Если сначала объявить переменную, внутри которой происходит поиск по DOM через querySelector. А после - обращаться к ней внутри, например, функции, то JavaScript не будет дважды выполнять поиск по DOM - элемент уже найден и находится в константе.
const photoIsOpened = imageZoomedPopup.querySelector('.popup__image'); // 7 строка 3 попап
const photoIsOpenedCaption = imageZoomedPopup.querySelector('.popup__caption'); // 7 строка 3 попап
const formEditProfile = page.querySelector('.edit-profile-form'); // Найти форму в DOM и лучше ее назвать наверное formProfile
const formNewItem = page.querySelector('.new-item-form'); // 17 и 18 строчки одно и то же выбрать 17
// const formNewItem = newItemPopup.querySelector('.form_new-item'); // а вот вторая форма imposter
const closeIcons = page.querySelectorAll('.popup__close-icon'); // все крестики разом
const popups = page.querySelectorAll('.popup'); // выбрали все разом как можно объединить обработчики крестиков 122-129 строки
const nameInput = formEditProfile.querySelector('.form__item_input_name');  // поля формы
const jobInput = formEditProfile.querySelector('.form__item_input_job');
const newLocationInput = formNewItem.querySelector('.form__item_input_place'); // поля формы добавления новой карточки
const newLinkInput = formNewItem.querySelector('.form__item_input_link'); // а мб лучше будет в названии дописать еще Input newLocationInput и newLinkInput
// const newItemButtonSubmit = formNewItem.querySelector('.form__submit-button'); // кажется эта строчка не нужна и правда не нужна
const name = profile.querySelector('.name'); // поле имени в профиле
const job = profile.querySelector('.job'); // второе поле в профиле

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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

function openPopup(popup) { // Она будет принимать в вызов любой попап
  popup.classList.add('popup_opened'); //и добавлять ему класс popup_opened, открывая его. Это нужно исправить во всем коде проекта.
 // enableValidation(); // проверка

  // вот эти строчки 95-99 нужны только чтобы 2 форма которая почему-то валидна (почему-то) имела неактивную кнопку в моменте первого открытия (если убрать этот код, то в момент первого открытия попапа форма валидна, а в след раз уже нет);
  if (popup.classList.contains('new-item-popup')) {
    const buttonElement = popup.querySelector('.popup__button');
    buttonElement.setAttribute('disabled', 'disabled');
    buttonElement.classList.add('popup__button_disabled');
  }

  document.addEventListener('keydown', escapeFromPopup);
  document.addEventListener('click', missClick);
}

const escapeFromPopup = (evt) => {
    if (evt.key === 'Escape') {
      const popup = document.querySelector('.popup_opened');
      closePopup(popup);
    }
};

const missClick = (evt) => {
  const popup = document.querySelector('.popup_opened');
  if (evt.target === popup) {
    closePopup(popup);
  }
}

function closePopup(popup) { // Она будет принимать в вызов любой попап
  popup.classList.remove('popup_opened');

  if (!popup.classList.contains('image-zoomed-popup')) {
    const formElement = popup.querySelector('.popup__form');
    const inputList = popup.querySelectorAll('.popup__input');
    inputList.forEach( (inputElement) => {
      hideInputError(formElement, inputElement);
    });
    formElement.reset(); // вот здесь еще скрывать сообщения об ошибках?
  }

  document.removeEventListener('keydown', escapeFromPopup);
  document.removeEventListener('click', missClick);

}


initialCards.reverse().forEach( item => {
  const name = item.name;
  const link = item.link;
  renderCard(name, link);
});

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
     if (evt.target.classList.contains('popup__close-icon')) {
        closePopup(popup);
      }
  });
});
// function toggleForm(element) {
//   element.classList.toggle('popup_opened');
// } // функция toggleForm манипулирует css-классом видимости попапа

// функция openedForm заполняет поля «Имя» и «О себе» теми значениями, которые отображаются на странице и лучше ей другое название придумать но какое
function openedForm() {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  openPopup(profilePopup);
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
// Названия методов и функций нужно начинать с глагола в начальной форме (такой пункт есть в чек-листе). Это обычная международная практика, чтобы функция говорила, что она делает. handleProfileFormSubmit
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    const nameInputValue = nameInput.value; // Получить значение полей jobInput и nameInput из свойства value
    const jobInputValue = jobInput.value;
    name.textContent = nameInputValue; // Вставить новые значения с помощью textContent
    job.textContent = jobInputValue;

    // toggleForm(profilePopup); // 5 строка
    closePopup(profilePopup);
}

// функция обработчика отправки формы для создания новой карточки addNewItemSubmitHander
// Названия методов и функций нужно начинать с глагола в начальной форме (такой пункт есть в чек-листе). Это обычная международная практика, чтобы функция говорила, что она делает addNewItemFormSubmit
function addNewItemFormSubmit(evt) {
  evt.preventDefault();

  const newLocationValue = newLocationInput.value; // получила значения полей
  const newLinkValue = newLinkInput.value;
  renderCard(newLocationValue, newLinkValue);
  // toggleForm(imposter); // 6 строка
  closePopup(newItemPopup);
}

// TODO можно реализовать закрытие попапа по клику на любую область вокруг, см Livecooding "Работа с DOM" вторая часть после 80 минут

editButton.addEventListener('click', openedForm); // передавать в слушатель событий editButton вместо функции переключения модификатора

// Прикрепить обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener('submit', handleProfileFormSubmit);

// начинаю слушать кнопку add-button
addButton.addEventListener('click', () => {
  openPopup(newItemPopup);
});
// и слушаю кнопку создания нового айтема Обработчик сабмита нужно навешивать только на тег form с событием submit, а не на кнопку сабмита с событием click, так как сабмит формы происходит ещё при нажатии Enter, и он не будет работать, если навесить обработчик клика на кнопку только. Это нужно исправить везде, где есть инпуты и форма
// newItemButtonSubmit.addEventListener('click', addNewItemFormSubmit);
formNewItem.addEventListener('submit', addNewItemFormSubmit);

