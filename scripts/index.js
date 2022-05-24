// console.log('hello world');

const profile = document.querySelector('.profile'); // профиль
const popup = document.querySelector('.popup'); // секция поп-ап которую надо из секции превратить в div;
const imposter = document.querySelector('.imposter'); // а эт второй div в котором форма добавления карточк;
// найти кнопкпи в DOM
const editButton = profile.querySelector('.profile__edit-button');
// TODO переписать функцию так чтобы все кнопки с этим классом работали так
// const closeIcon = popup.querySelector(".popup__close-icon");

// const closeIcon = popup.querySelector(".popup__close-icon");
const closeIcon = popup.querySelector(".popup__close-icon");

const card = document.querySelector('#card').content; // получить элемент template достучаться до содержимого, обратившись к свойству content
const elements = document.querySelector('.elements');

const closeIconNewItemForm = document.querySelector('.new-item-form__close-icon');
console.log(closeIconNewItemForm);

const saveButton = popup.querySelector(".save-button");
const addButton = profile.querySelector('.add-button');
console.log(addButton); //+
// Найти форму в DOM
const formElement = document.querySelector('.form');
const newItemForm = document.querySelector('.new-item-form');
console.log(newItemForm); //+
// Найти поля формы в DOM
const nameInput = formElement.querySelector('.form__item_input_name');
const jobInput = formElement.querySelector('.form__item_input_job');
const placeInput = newItemForm.querySelector('.form__item_input_place');
const linkInput = newItemForm.querySelector('.form__item_input_link');
console.log(placeInput, linkInput); //+
// наполнить поля формы new-item значениями по умолчанию
// placeInput.value = 'Название';
// Выбрать элементы профиля, куда должны быть вставлены input значения полей формы
const name = profile.querySelector('.name');
const job = profile.querySelector('.job');

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


initialCards.forEach( item => {
  // клонировать содержимое тега template
  let cardElement = card.querySelector('.element').cloneNode(true);
  //наполнить содержимым
  cardElement.querySelector('.element__photo').src = item.link;
  cardElement.querySelector('.element__title').textContent = item.name;
  // отобразить на странице
  elements.append(cardElement);
}); // а вот отсюда можно методом forEach пройти по массиву initialCard и создать 6 элемнтов карт на страницу при помощи template

//ФУНКЦИИ
// функция togglePopup манипулирует css-классом видимости попапа TODO переписать функцию DRY чтобы toggleElem все 3 попапа открывала
function togglePopup() {
  popup.classList.toggle('popup_opened');
}

function toggleForm(element) {
  element.classList.toggle('popup_opened');
} // функция toggleForm делает все то же что и togglePopup только не привязана к конкретному попапу

// функция openedForm заполняет поля «Имя» и «О себе» теми значениями, которые отображаются на странице
function openedForm() {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  //  внести вызов функции togglePopup
  // togglePopup();
  toggleForm(popup);
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получить значение полей jobInput и nameInput из свойства value
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;
    // Вставить новые значения с помощью textContent
    name.textContent = nameInputValue;
    job.textContent = jobInputValue;

    // togglePopup();
    toggleForm(popup);
}

// Пока что нужно удалить или закомментировать весь функционал, связанный с лайками. Он будет рассмотрен подробно уже в следующем спринте
// const likeButtons = document.querySelectorAll('.like-button'); // найти элементы кнопки лайка
// function toggleLike(array) {
//   // перебираем массив циклом
//   for (let i = 0; i < array.length; i++) {
//     // на каждый элемент массива вешаем обработчик клика
//     let like = array[i];
//     like.addEventListener('click', function() {
//       like.classList.toggle('like-button_active');
//     });
//   }
// }
// // вызываем функцию обработчика клика всех сердечек
// toggleLike(likeButtons);

// слушатель клика кнопки редактировать, закрыть по клику на крестик в правом верхнем углу

// TODO можно реализовать закрытие попапа по клику на любую область вокруг, см Livecooding "Работа с DOM" вторая часть после 80 минут

editButton.addEventListener('click', openedForm); // передавать в слушатель событий editButton вместо функции переключения модификатора

// Прикрепить обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

// начинаю слушать кнопку add-button
addButton.addEventListener('click', () => {
  toggleForm(imposter);
  // imposter.classList.toggle('popup_opened');
});

// TODO переписать функецию так чтобы она со всеми кнопками работала
// Смотри, когда идёт клик, в аргументы обработчику влетает браузерное событие - Event. У этого event есть поле target - элемент, по которому кликнули. В нашем случае - это будет кнопка с крестиком. Можно найти ближайший попап - это будет 100% именно сейчас открытый, и убрать класс именно у него.
closeIcon.addEventListener('click', () =>
{
  toggleForm(popup)
});

closeIconNewItemForm.addEventListener('click', () => {
  toggleForm(imposter);
  // imposter.classList.toggle('popup_opened');
});
