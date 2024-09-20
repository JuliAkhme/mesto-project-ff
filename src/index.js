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
    
initialCards.forEach((element) => {
    placesList.append(createCard(element, deleteCard, likeCard, openImage));    
})

const editPopup = document.querySelector('.popup_type_edit');
const editPopupButton = document.querySelector('.profile__edit-button');
const addPopup = document.querySelector('.popup_type_new-card')
const addPopupButton = document.querySelector('.profile__add-button');
const imagePopup = document.querySelector('.popup_type_image');

editPopupButton.addEventListener('click', () => openPopup(editPopup));
addPopupButton.addEventListener('click', () => openPopup(addPopup));
   
function openImage(name, link) {
    openPopup(imagePopup);
    const fullImage = document.querySelector('.popup__image'); 
    fullImage.src = link;
    fullImage.alt = name;
    const fullImageCaption = imagePopup.querySelector('.popup__caption');
    fullImageCaption.textContent = name;
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