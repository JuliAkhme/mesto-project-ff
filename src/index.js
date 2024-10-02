import './pages/index.css';

import { 
    openPopup, 
    closePopup
} from './components/modals.js';

import { 
    createCard 
} from './components/card.js';

import {
    enableValidation,
    clearValidation
} from './components/validation.js';

import {
    getUsersData,
    editUsersData,
    getCardsData,
    createUsersCard,
    deleteUsersCard,
    updateProfileAvatar,
    likeUsersCard, 
    unlikeUsersCard
} from './components/api.js'

const placesList = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const placePopup = document.querySelector('.popup_type_new-card')
const imagePopup = document.querySelector('.popup_type_image');

const avatarPopup = document.querySelector('.popup_type_edit-avatar');
const profileAvatar = document.querySelector('.profile__image');
const profileAvatarInput = document.querySelector('.popup__input_avatar');
const newAvatarForm = document.querySelector('.popup__form[name="new-avatar"]');

const profilePopupButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__input_type_name');
const profileName = document.querySelector('.profile__title');
const jobInput = document.querySelector('.popup__input_type_description');
const profileDescription = document.querySelector('.profile__description');
const profileEditForm = document.querySelector('.popup__form[name="edit-profile"]')
const placePopupButton = document.querySelector('.profile__add-button');

const placeNameInput = document.querySelector('.popup__input_type_card-name');
const placeLinkInput = document.querySelector('.popup__input_type_url');
const newPlaceForm = document.querySelector('.popup__form[name="new-place"]');

const fullImage = imagePopup.querySelector('.popup__image');
const fullImageCaption = imagePopup.querySelector('.popup__caption');

const deleteCardPopup = document.querySelector('.popup_type_confirm-delete');
const deleteCardForm = document.querySelector('.popup__form[name="delete-card"]');

const popups = document.querySelectorAll('.popup');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error-visible'
}

let userId;
let usersCardElement;
let usersCardId;

Promise.all([getUsersData(), getCardsData()])
.then(([userData, cardsData]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url('${userData.avatar}')`;
    userId = userData._id;
    cardsData.forEach((cardData) => {
        placesList.append(createCard(cardData.name, cardData.link, cardData.likes, cardData.owner._id, cardData._id, userId, openImage));    
    });
})
.catch((error) => {
    console.log(error);
})

function openImage(image) {
    openPopup(imagePopup);
    fullImage.src = image.src;
    fullImage.alt = image.alt;
    fullImageCaption.textContent = image.alt;
}

profilePopupButton.addEventListener('click', () => {
    openPopup(profilePopup);
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(profileEditForm, validationConfig);
});

profileEditForm.addEventListener('submit', saveProfileChanges);

function saveProfileChanges(event) {
    event.preventDefault();
    loadingTime(true, profilePopup)
    editUsersData({
        name: nameInput.value,
        about: jobInput.value
    })
    .then(() => {
        profileName.textContent = nameInput.value;
        profileDescription.textContent = jobInput.value;
        closePopup(profilePopup);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        loadingTime(false, profilePopup)
    })
}

profileAvatar.addEventListener('click', () => {
    openPopup(avatarPopup);
    clearValidation(newAvatarForm, validationConfig)
});

newAvatarForm.addEventListener('submit', saveNewAvatar);

function saveNewAvatar(event) {
    event.preventDefault();
    loadingTime(true, avatarPopup);
    updateProfileAvatar(profileAvatarInput.value)
    .then((data) => {
        profileAvatar.style.backgroundImage = `url('${data.avatar}')`;
        closePopup(avatarPopup)
        event.target.reset()
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        loadingTime(false, avatarPopup)
    })
}

placePopupButton.addEventListener('click', () => {
    openPopup(placePopup);
    clearValidation(newPlaceForm, validationConfig)
});

newPlaceForm.addEventListener('submit', addNewPlace);

function addNewPlace(event) {
    event.preventDefault();
    loadingTime(true, placePopup);
    createUsersCard({
        name: placeNameInput.value,
        link: placeLinkInput.value
    })
    .then((newCard) => {
        placesList.prepend(createCard(newCard.name, newCard.link, newCard.likes, newCard.owner._id, newCard._id, userId, openImage));
    })
    .then(() => {
        closePopup(placePopup);
        event.target.reset();
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        loadingTime(false, newPlaceForm)
    })
}

export function openDeleteCardPopup(placesItem, cardId) {
    openPopup(deleteCardPopup);
    usersCardElement = placesItem;
    usersCardId = cardId;
  }
  
deleteCardForm.addEventListener('submit', function (event) {
    event.preventDefault();
    deleteCard(usersCardElement, usersCardId);
  });
  
function deleteCard(placesItem, cardId) {
    loadingTime(true, deleteCardPopup);
    deleteUsersCard(cardId)
      .then(() => {
        placesItem.remove();
        closePopup(deleteCardPopup);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loadingTime(false, deleteCardPopup);
      })
  }

export function loadingTime(isLoading, popupElement) {
    const activeButton = popupElement.querySelector('.popup__button');
    if (isLoading) {
      activeButton.textContent = 'Сохранение...';
    } else {
      activeButton.textContent = activeButton.dataset.text;
    }
}

export function handleLike(likes, likeButton, likesCounter, cardId) {
    const isLikedByUser = likeButton.classList.contains('card__like-button_is-active');
    if((!isLikedByUser)) {
        likeUsersCard(cardId)
        .then((res) => {
            likesCounter.textContent = res.likes.length;
            likeButton.classList.toggle('card__like-button_is-active');
        })
        .catch((error) => {
          console.log(error);
        })
    } else {
        unlikeUsersCard(cardId)
        .then((res) => {
            likesCounter.textContent = res.likes.length;
            likeButton.classList.toggle('card__like-button_is-active');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

popups.forEach((popup) => {
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', () => {
       closePopup(popup);
    });
});

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (event) => {
        if (event.target.classList.contains('popup')) {
            closePopup(popup);
        }
    });
});

enableValidation(validationConfig);

