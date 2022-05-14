// console.log('hello world');

// найти профиль и поп-ап в DOM
const profile = document.querySelector('.profile');
const popup = document.querySelector('.popup');
// найти кнопкпи в DOM
const editButton = profile.querySelector('.edit-button');
const closeIcon = popup.querySelector(".close-icon");
const saveButton = popup.querySelector(".save-button");
// функция togglePopup манипулирует css-классом видимости попапа
function togglePopup() {
  popup.classList.toggle('popup__opened');
}
// открыть попап по клику кнопки редактировать и закрыть по клику на крестик в правом верхнем углу
// TODO можно реализовать закрытие попапа по клику на любую область вокруг, см Livecooding "Работа с DOM" вторая часть после 80 минут
editButton.addEventListener('click', togglePopup);
closeIcon.addEventListener('click', togglePopup);

// наука -- способ отточить разум для познания мира значит НАУКА -- ЭТО ПРОЦЕДУРА СОПРОВОЖДАЕМАЯ КОНКРЕТНЫМИ ДЕЙСТВИЯМИ. НАУКА -- ЭТО МЕТОД ПОЗНАНИЯ МИРА -- я пока оставлю это себе здесь как напоминание но перед сдачей проекта на ревью обязательно сотру тк это не относится напрямую к проектной работе;

// Найти форму в DOM
const formElement = document.querySelector('.form');
// Найти поля формы в DOM
const nameInput = formElement.querySelector('.form__name-input');
const jobInput = formElement.querySelector('.form__job-input');
// Выбрать элементы профиля, куда должны быть вставлены input значения полей формы
const name = profile.querySelector('.name');
const job = profile.querySelector('.job');
// функция openedForm заполняет поля «Имя» и «О себе» теми значениями, которые отображаются на странице
function openedForm() {
  nameInput.value = name.innerText;
  jobInput.value = job.innerText;
}

openedForm();

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

// Прикрепить обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
