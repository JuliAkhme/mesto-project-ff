import './pages/index.css';

import { initialCards } from './components/cards.js';

import { 
    createCard, 
    deleteCard, 
    likeCard, 
    openImage,
    placesList 
} from './components/card.js';

import { 
    openEditPopup, 
    openAddPopup,
    saveProfileChanges, 
    addNewPlace,
    editPopupButton,
    addPopupButton 
} from './components/modals.js';

initialCards.forEach((element) => {
    placesList.append(createCard(element, deleteCard, likeCard, openImage));    
})

editPopupButton.addEventListener('click', openEditPopup);

const profileSaveButton = document.querySelector('.edit-profile__button');
profileSaveButton.addEventListener('click', saveProfileChanges);
    
const placeSaveButton = document.querySelector('.new-place__button');
placeSaveButton.addEventListener('click', addNewPlace);

addPopupButton.addEventListener('click', openAddPopup);