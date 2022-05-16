// console.log('hello world');

// найти профиль и поп-ап в DOM
const profile = document.querySelector('.profile');
const popup = document.querySelector('.popup');
// найти кнопкпи в DOM
const editButton = profile.querySelector('.profile__edit-button');
const closeIcon = popup.querySelector(".popup__close-icon");
const saveButton = popup.querySelector(".save-button");
// Найти форму в DOM
const formElement = document.querySelector('.form');
// Найти поля формы в DOM
const nameInput = formElement.querySelector('.input-name');
const jobInput = formElement.querySelector('.input-job');
// Выбрать элементы профиля, куда должны быть вставлены input значения полей формы
const name = profile.querySelector('.name');
const job = profile.querySelector('.job');

// функция togglePopup манипулирует css-классом видимости попапа
function togglePopup() {
  popup.classList.toggle('popup_opened');
}
// функция openedForm заполняет поля «Имя» и «О себе» теми значениями, которые отображаются на странице
function openedForm() {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  //  внести вызов функции togglePopup
  togglePopup();
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

    togglePopup();
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
closeIcon.addEventListener('click', togglePopup);
// Прикрепить обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
