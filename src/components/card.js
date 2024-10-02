import { likeUsersCard, unlikeUsersCard } from './api.js';
import { openDeleteCardPopup, handleLike } from '../index.js'

function createCard(name, link, likes, ownerId, cardId, userId, openImage) {
    const content = document.querySelector('.content'); 
    const cardTemplate = document.querySelector('#card-template').content; 
    const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true); 
    const image = placesItem.querySelector('.card__image');
    const imageCaption = placesItem.querySelector('.card__title');
    const deleteButton = placesItem.querySelector('.card__delete-button'); 
    const likeButton = placesItem.querySelector('.card__like-button'); 
    const likesCounter = placesItem.querySelector('.card__likes-counter');
    image.src = link;
    image.alt = name;
    imageCaption.textContent = name;
    likesCounter.textContent = likes.length;
    if(likes.some((user) => user._id === userId)) {
        likeButton.classList.add('card__like-button_is-active')
    }
    if(ownerId !== userId) {
        deleteButton.style.display = 'none'
    }
    deleteButton.addEventListener('click', () => openDeleteCardPopup(placesItem, cardId)); 
    likeButton.addEventListener('click', () => handleLike(likes, likeButton, likesCounter, cardId, userId)); 
    image.addEventListener('click', () => openImage(image)); 
    return placesItem; 
}

export { 
    createCard
}