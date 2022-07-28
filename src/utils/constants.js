const addButtonImage = new URL('../images/__add-button.svg', import.meta.url);
const avatarImage = new URL('../images/__avatar.jpg', import.meta.url);
const closeIconImage = new URL('../images/__close-icon.svg', import.meta.url);
const editButtonImage = new URL('../images/__edit-button.svg', import.meta.url);
const likeActiveImage = new URL('../images/__like_active.svg', import.meta.url);
const likeDisabledImage = new URL('../images/__like_disabled.svg', import.meta.url);
const logoColorBlackImage = new URL('../images/__logo_color_black.svg', import.meta.url);
const logoColorWhiteImage = new URL('../images/__logo_color_white.svg', import.meta.url);
const moveImage = new URL('../images/__move.svg', import.meta.url);

// avatar вставлен с помощью тега img и обращается в атрибуте src к пути ./images/__avatar.jpg. Если запустить проект на локальном сервере, изображение не загрузится

const images = [
  {name: 'add button', image: addButtonImage},
  {name: 'avatar', image: avatarImage},
  {name: 'close icon', image: closeIconImage},
  {name: 'edit button', image: editButtonImage},
  {name: 'like', image: likeActiveImage},
  {name: 'dislike', image: likeDisabledImage},
  {name: 'black logo', image: logoColorBlackImage},
  {name: 'white logo', image: logoColorWhiteImage},
  {name: 'move', image: moveImage},
]

// config для создания объекта валидации всех форм

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const formValidators = {};

const page = document.querySelector('.page');
const profile = page.querySelector('.profile'); // профиль
const editAvatarButton = profile.querySelector('.edit-button__avatar');
const editProfileButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.add-button');

export { editAvatarButton, editProfileButton, addButton, config, profile, formValidators };
