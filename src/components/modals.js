import { 
    createCard, 
    deleteCard, 
    likeCard, 
    openImage,
    imagePopup,
    placesList 
} from './card.js';

const editPopupButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');

const nameInput = document.querySelector('.popup__input_type_name');
const profileName = document.querySelector('.profile__title');
nameInput.value = profileName.textContent;

const jobInput = document.querySelector('.popup__input_type_description');
const profileDescription = document.querySelector('.profile__description');
jobInput.value = profileDescription.textContent;

const addPopupButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_new-card');

const popups = document.querySelectorAll('.popup');
const popupCloseButton = document.querySelectorAll('.popup__close');

function handleClosePopups() {
    addPopup.classList.remove('popup_is-opened');
    editPopup.classList.remove('popup_is-opened');
    imagePopup.classList.remove('popup_is-opened');
}

function closeOnEscape (event) {
    const key = event.key;
    if (key === 'Escape') {
        handleClosePopups();
    }    
}

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (event) => {
        const eventTarget = event.target;
        if (eventTarget.closest('.popup__content')) {
            event.stopPropagation();
        } else {
            handleClosePopups();
        }
    })
})

popupCloseButton.forEach((button) => {
    button.addEventListener('mousedown', handleClosePopups)
})

function openEditPopup () {
    editPopup.classList.add('popup_is-opened');
    editPopup.classList.add('popup_is-animated');
    editPopupButton.addEventListener('keydown', closeOnEscape);
}

function saveProfileChanges(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    handleClosePopups();
}

function openAddPopup() {
    addPopup.classList.add('popup_is-opened');
    addPopup.classList.add('popup_is-animated');
    addPopupButton.addEventListener('keydown', closeOnEscape);
}
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
    handleClosePopups();
    this.form.reset();
}

export { 
    openEditPopup, 
    openAddPopup,
    saveProfileChanges, 
    handleClosePopups, 
    addNewPlace, 
    closeOnEscape,
    editPopupButton,
    addPopupButton 
}