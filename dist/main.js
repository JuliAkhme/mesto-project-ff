(()=>{"use strict";var e=document.querySelector(".profile__edit-button"),t=document.querySelector(".popup_type_edit"),n=document.querySelector(".popup__input_type_name"),o=document.querySelector(".profile__title");n.value=o.textContent;var r=document.querySelector(".popup__input_type_description"),c=document.querySelector(".profile__description");r.value=c.textContent;var a=document.querySelector(".profile__add-button"),d=document.querySelector(".popup_type_new-card"),p=document.querySelectorAll(".popup"),u=document.querySelectorAll(".popup__close");function s(){d.classList.remove("popup_is-opened"),t.classList.remove("popup_is-opened"),m.classList.remove("popup_is-opened")}function i(e){"Escape"===e.key&&s()}p.forEach((function(e){e.addEventListener("mousedown",(function(e){e.target.closest(".popup__content")?e.stopPropagation():s()}))})),u.forEach((function(e){e.addEventListener("mousedown",s)})),document.querySelector(".content");var l=document.querySelector("#card-template").content,_=document.querySelector(".places__list"),m=document.querySelector(".popup_type_image");function y(e,t,n,o){var r=e.name,c=e.link,a=l.querySelector(".places__item").cloneNode(!0);return a.querySelector(".card__image").src=c,a.querySelector(".card__image").alt=r,a.querySelector(".card__title").textContent=r,a.querySelector(".card__delete-button").addEventListener("click",t),a.querySelector(".card__like-button").addEventListener("click",n),a.querySelector(".card__image").addEventListener("click",(function(){return o(r,c)})),a}function v(e){e.target.closest(".places__item").remove()}function q(e){var t=e.target;t.classList.contains("card__like-button--active")?t.classList.remove("card__like-button--active"):t.classList.add("card__like-button--active")}function S(e,t){m.classList.add("popup_is-opened"),m.classList.add("popup_is-animated");var n=l.querySelector(".places__item").cloneNode(!0);n.querySelector(".card__image").src=t,n.querySelector(".card__image").alt=e,n.querySelector(".card__title").textContent=e;var o=document.querySelector(".popup__image");o.src=n.querySelector(".card__image").src,o.alt=n.querySelector(".card__image").alt,document.querySelector(".popup__caption").textContent=n.querySelector(".card__title").textContent,document.addEventListener("keydown",i)}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){_.append(y(e,v,q,S))})),e.addEventListener("click",(function(){t.classList.add("popup_is-opened"),t.classList.add("popup_is-animated"),e.addEventListener("keydown",i)})),document.querySelector(".edit-profile__button").addEventListener("click",(function(e){e.preventDefault(),o.textContent=n.value,c.textContent=r.value,s()})),document.querySelector(".new-place__button").addEventListener("click",(function(e){e.preventDefault();var t={name:document.querySelector(".popup__input_type_card-name").value,link:document.querySelector(".popup__input_type_url").value};""===t.name||""===t.link?document.querySelector(".new-place__button").classList.add(disabled):_.prepend(y(t,v,q,S)),s(),this.form.reset()})),a.addEventListener("click",(function(){d.classList.add("popup_is-opened"),d.classList.add("popup_is-animated"),a.addEventListener("keydown",i)}))})();