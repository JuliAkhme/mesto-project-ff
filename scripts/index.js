const content = document.querySelector('.content');
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function createCard(name, link, deleteCard) {
    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    placesItem.querySelector('.card__image').src = link;
    placesItem.querySelector('.card__title').textContent = name;
    const deleteButton = placesItem.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard); 
    return placesItem;
}

function deleteCard(evt) {
    const eventTarget = evt.target;
    const placesItem =  eventTarget.closest('.places__item');
    placesItem.remove();
}

initialCards.forEach((element) => {
    placesList.append(createCard(element.name, element.link, deleteCard));
})