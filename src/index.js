import './pages/index.css';

import { initialCards } from './components/cards.js';

import { 
    openPopup, 
    closePopup
} from './components/modals.js';

import { 
    createCard, 
    deleteCard, 
    likeCard 
} from './components/card.js';

const placesList = document.querySelector('.places__list');
const content = document.querySelector('.content');
const cardTemplate = document.querySelector('#card-template').content;
    
initialCards.forEach((element) => {
    placesList.append(createCard(element, deleteCard, likeCard, openImage));    
})

const editPopup = document.querySelector('.popup_type_edit');
const editPopupButton = document.querySelector('.profile__edit-button');
const addPopup = document.querySelector('.popup_type_new-card')
const addPopupButton = document.querySelector('.profile__add-button');
const image = placesList.querySelectorAll('.card__image');

document.addEventListener('click', (event) => {
    if(event.target === editPopupButton) {
        openPopup(editPopup);
    } else if(event.target === addPopupButton) {
        openPopup(addPopup);
    } else if(event.target === image) {
        openImage();
    }
})
   
function openImage(name, link) {
    const imagePopup = document.querySelector('.popup_type_image');
    imagePopup.classList.add('popup_is-opened');
    imagePopup.classList.add('popup_is-animated');
    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    placesItem.querySelector('.card__image').src = link;
    placesItem.querySelector('.card__image').alt = name;
    placesItem.querySelector('.card__title').textContent = name;
    const fullImage = document.querySelector('.popup__image'); 
    fullImage.src = placesItem.querySelector('.card__image').src;
    fullImage.alt = placesItem.querySelector('.card__image').alt;
    const fullImageCaption = document.querySelector('.popup__caption');
    fullImageCaption.textContent = placesItem.querySelector('.card__title').textContent;
    document.addEventListener('click', (imagePopup) => closePopup(imagePopup));
    document.addEventListener('keydown', (event) => {
        if(event.key === 'Escape') {
           closePopup(imagePopup);
        }
    });
}

const nameInput = document.querySelector('.popup__input_type_name');
const profileName = document.querySelector('.profile__title');
nameInput.value = profileName.textContent;
const jobInput = document.querySelector('.popup__input_type_description');
const profileDescription = document.querySelector('.profile__description');
jobInput.value = profileDescription.textContent;
const profileSaveButton = document.querySelector('.edit-profile__button');
profileSaveButton.addEventListener('click', saveProfileChanges);

function saveProfileChanges(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(editPopup);
}

const placeSaveButton = document.querySelector('.new-place__button');
placeSaveButton.addEventListener('click', addNewPlace);

function addNewPlace(event) {
    event.preventDefault();
    const newCard = {
        name: document.querySelector('.popup__input_type_card-name').value,
        link: document.querySelector('.popup__input_type_url').value
    }
    if (newCard.name === "" || newCard.link === "") {
        document.querySelector('.new-place__button').classList.add(disabled);
    } else {
        placesList.prepend(createCard(newCard, deleteCard, likeCard, openImage));
    }
    closePopup(addPopup);
    this.form.reset();
}

const popups = document.querySelectorAll('.popup');

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