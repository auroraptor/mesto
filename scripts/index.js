// console.log('hello world');

// При загрузке на странице должно быть 6 карточек, которые добавит JavaScript. Их названия и фотографии выберите сами или возьмите готовый массив:
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

// получить элемент template
// достучаться до содержимого, обратившись к свойству content
const card = document.querySelector('#card').content;
const elements = document.querySelector('.elements');


// а вот отсюда можно методом forEach пройти по массиву initialCard и создать 6 элемнтов карт на страницу при помощи template

initialCards.forEach( item => {
  // клонировать содержимое тега template
  let cardElement = card.querySelector('.element').cloneNode(true);
  //наполнить содержимым
  cardElement.querySelector('.element__photo').src = item.link;
  cardElement.querySelector('.element__title').textContent = item.name;
  // отобразить на странице
  elements.append(cardElement);
});


// найти профиль секцию элементов поп-ап в DOM
const profile = document.querySelector('.profile');
const popup = document.querySelector('.popup');
const imposter = document.querySelector('.imposter');
// найти кнопкпи в DOM
const editButton = profile.querySelector('.profile__edit-button');
// TODO переписать функцию так чтобы все кнопки с этим классом работали так
// const closeIcon = popup.querySelector(".popup__close-icon");
// TODO переписать функецию так чтобы она со всеми кнопками работала

// const closeIcon = popup.querySelector(".popup__close-icon");
const closeIcon = popup.querySelector(".popup__close-icon");
// const closeIcons = document.querySelectorAll('.popup__close-icon');
// closeIcons.forEach( item => {
//   item.closest.classList.add('popup_opened');
// });
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


// const placeInput =
// Выбрать элементы профиля, куда должны быть вставлены input значения полей формы
const name = profile.querySelector('.name');
const job = profile.querySelector('.job');

// наполнить поля формы new-item значениями по умолчанию
// placeInput.value = 'Название';

//ФУНКЦИИ
// функция togglePopup манипулирует css-классом видимости попапа TODO переписать функцию DRY чтобы toggleElem все 3 попапа открывала
function togglePopup() {
  popup.classList.toggle('popup_opened');
}

function toggleForm(element) {
  element.classList.toggle('popup_opened');
}

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
// closeIcon.addEventListener('click', togglePopup);
closeIcon.addEventListener('click', () =>
{
  toggleForm(popup)
});

// Прикрепить обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

// начинаю слушать кнопку add-button

addButton.addEventListener('click', () => {
  toggleForm(imposter);
  // imposter.classList.toggle('popup_opened');
});

closeIconNewItemForm.addEventListener('click', () => {
  toggleForm(imposter);
  // imposter.classList.toggle('popup_opened');

});
