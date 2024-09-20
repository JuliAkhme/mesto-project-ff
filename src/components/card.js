function createCard({name, link}, deleteCard, likeCard, openImage) {
    const content = document.querySelector('.content'); 
    const cardTemplate = document.querySelector('#card-template').content; 
    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true); 
    const image = placesItem.querySelector('.card__image');
    const imageCaption = placesItem.querySelector('.card__title');
    image.src = link;
    image.alt = name;
    imageCaption.textContent = name;
    const deleteButton = placesItem.querySelector('.card__delete-button'); 
    deleteButton.addEventListener('click', deleteCard); 
    const likeButton = placesItem.querySelector('.card__like-button'); 
    likeButton.addEventListener('click', likeCard); 
    image.addEventListener('click', () => openImage(name, link)); 
    return placesItem; 
}

function deleteCard(event) {
    const eventTarget = event.target;
    const placesItem =  eventTarget.closest('.places__item');
    placesItem.remove();
}

function likeCard(event) {
    const eventTarget = event.target;
    eventTarget.classList.toggle('card__like-button--active');
}

export { 
    createCard,
    deleteCard, 
    likeCard
}