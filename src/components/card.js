function createCard({name, link}, deleteCard, likeCard, openImage) {
    const content = document.querySelector('.content');
    const cardTemplate = document.querySelector('#card-template').content;
    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    placesItem.querySelector('.card__image').src = link;
    placesItem.querySelector('.card__image').alt = name;
    placesItem.querySelector('.card__title').textContent = name;
    const deleteButton = placesItem.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);
    const likeButton = placesItem.querySelector('.card__like-button');
    likeButton.addEventListener('click', likeCard);
    placesItem.querySelector('.card__image').addEventListener('click', () => openImage(name, link));
    return placesItem;
}

function deleteCard(event) {
    const eventTarget = event.target;
    const placesItem =  eventTarget.closest('.places__item');
    placesItem.remove();
}

function likeCard(event) {
    const eventTarget = event.target;
    if (!eventTarget.classList.contains('card__like-button--active')) {
        eventTarget.classList.add('card__like-button--active')
    } else {
        eventTarget.classList.remove('card__like-button--active')
    }
}

export { 
    createCard,
    deleteCard, 
    likeCard
}