function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');
    popupElement.classList.add('popup_is-animated');
    document.addEventListener('keydown', closePopupByEsc);
};

function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEsc);
};

function closePopupByEsc(event) {
    if(event.key === 'Escape') {
       closePopup(document.querySelector('.popup_is-opened'));
    }
}

export { 
    openPopup, 
    closePopup 
};