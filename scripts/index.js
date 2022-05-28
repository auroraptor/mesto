// console.log('hello world');

const page = document.querySelector('.page');
const profile = page.querySelector('.profile'); // профиль лучше один раз к документу обратиться так-то
const popup = page.querySelector('.popup'); // секция поп-ап которую надо из секции превратить в div;
const imposter = page.querySelector('.imposter'); // а эт второй div в котором форма добавления карточк будет лучше если он станет popup_type_;
const figure = page.querySelector('.imagine-imposter'); // третий div
const editButton = profile.querySelector('.profile__edit-button');
const saveButton = popup.querySelector(".save-button");
const addButton = profile.querySelector('.add-button'); // вот моя кнопка добавления карточки, которая открывает imposter
const elements = page.querySelector('.elements'); // вот тут тоже не по бэм название но я не понимаю нейминг есть идея назвать эту переменную section
const card = page.querySelector('#card').content; // получить элемент template достучаться до содержимого, обратившись к свойству content
const formElement = page.querySelector('.form'); // Найти форму в DOM
const newItemForm = imposter.querySelector('.form_new-item'); // а вот вторая форма imposter
const closeIcons = page.querySelectorAll('.popup__close-icon'); // все крестики
const nameInput = formElement.querySelector('.form__item_input_name');  // поля формы
const jobInput = formElement.querySelector('.form__item_input_job');
const newLocation = newItemForm.querySelector('.form__item_input_place'); // поля формы добавления новой карточки
const newLink = newItemForm.querySelector('.form__item_input_link');
const newItemButtonSubmit = newItemForm.querySelector('.form__submit-button');
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

// пора уже создавать функцию renderCard
function renderCard(name, link) {
  let cardElement = card.querySelector('.element').cloneNode(true);
  let photo = cardElement.querySelector('.element__photo');
  let title = cardElement.querySelector('.element__title');
  photo.src = link;
  photo.alt = name;
  title.textContent = name;

  let like = cardElement.querySelector('.like-button'); // лайк
  like.addEventListener('click', () => {
    like.classList.toggle('like-button_active');
  })

  let move = cardElement.querySelector('.element__delete-button'); // урна
  move.addEventListener('click', () => {
    let item = move.closest('.element');
    item.remove();
  });

  photo.addEventListener('click', () => { // картинка
    figure.classList.toggle('popup_opened'); //+ тут все работает идем дальше и это 7 строка;
    let photoIsOpened = figure.querySelector('.popup__image'); // 7 строка 3 попап
    let photoIsOpenedCaption = figure.querySelector('.popup__caption'); // 7 строка 3 попап
    photoIsOpened.src = link;
    photoIsOpened.alt = name;
    photoIsOpenedCaption.textContent = name;
  });

  elements.prepend(cardElement);
}

initialCards.reverse().forEach( item => {
  let name = item.name;
  let link = item.link;
  renderCard(name, link);
});

// когда идёт клик, в аргументы обработчику влетает браузерное событие - Event. У этого event есть поле target - элемент, по которому кликнули. В нашем случае - это будет кнопка с крестиком. Можно найти ближайший попап - это будет 100% именно сейчас открытый, и убрать класс именно у него.
// console.log(closeIcons); // В NodeList элементы упорядочены, можно обратиться к свойству length и воспользоваться методом forEach
closeIcons.forEach( item => {
  console.log(item);
  item.addEventListener('click', (evt) => {
    const eventTarget = evt.target;
    const grandpa = eventTarget.parentElement.parentElement; //метод closest возвращает ближайший родительский элемент с переданным селектором. попробовать его здесь и так будет даже лучше
    toggleForm(grandpa);
  });
}); // урааааа работает но можно и лучше всегда можно лучше

function toggleForm(element) {
  element.classList.toggle('popup_opened');
} // функция toggleForm манипулирует css-классом видимости попапа

// функция openedForm заполняет поля «Имя» и «О себе» теми значениями, которые отображаются на странице и лучше ей другое название придумать но какое
function openedForm() {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  toggleForm(popup); // 5 строка
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    let nameInputValue = nameInput.value; // Получить значение полей jobInput и nameInput из свойства value
    let jobInputValue = jobInput.value;
    name.textContent = nameInputValue; // Вставить новые значения с помощью textContent
    job.textContent = jobInputValue;

    toggleForm(popup); // 5 строка
}

// функция обработчика отправки формы для создания новой карточки addNewItemSubmitHander
function newItemSubmitHandler(evt) {
  evt.preventDefault();

  let newLocationValue = newLocation.value; // получила значения полей
  let newLinkValue = newLink.value;
  renderCard(newLocationValue, newLinkValue);
  toggleForm(imposter); // 6 строка
}

// TODO можно реализовать закрытие попапа по клику на любую область вокруг, см Livecooding "Работа с DOM" вторая часть после 80 минут

editButton.addEventListener('click', openedForm); // передавать в слушатель событий editButton вместо функции переключения модификатора

// Прикрепить обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

// начинаю слушать кнопку add-button
addButton.addEventListener('click', () => {
  toggleForm(imposter); // 6 строка
});
// и слушаю кнопку создания нового айтема
newItemButtonSubmit.addEventListener('click', newItemSubmitHandler);
