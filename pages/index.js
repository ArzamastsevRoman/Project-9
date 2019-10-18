const initialCards = [
	{
	  name: 'Архыз',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
	  name: 'Челябинская область',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
	  name: 'Иваново',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
	  name: 'Камчатка',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
	  name: 'Холмогорский район',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
	  name: 'Байкал',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	},
	{
	  name: 'Нургуш',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
	},
	{
	  name: 'Тулиновка',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
	},
	{
	  name: 'Остров Желтухина',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
	},
	{
	  name: 'Владивосток',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
	 }
  ];

const placesList = document.body.querySelector('.places-list');
const popupImg = document.querySelector('.popup__image');
const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');
const popupInputName = popupForm.elements.name;
const popupInputUrl = popupForm.elements.link;
const popupAddButton = popupForm.querySelector('button');
const popupButton = document.querySelector('.button');
const popupClose = popup.querySelector('.popup__close');
	

class Popup {
	constructor (container, button) {
		this.container = container;
		this.button = button;
		
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);

		this.container
			.querySelector('.popup__close')
			.addEventListener('click', this.close);

		if(this.button) {
			this.button.addEventListener('click', this.open);
		}
	}

	/* Можно лучше: лучше назвать методы глаголами open и close */
	open () {
		this.container.classList.add('popup_is-opened'); 
	}


 	close () {
		this.container.classList.remove('popup_is-opened');
	}
}

const newPopup = new Popup(popup, popupButton);

class PopupImage extends Popup {

	setImage (imgUrl) {
		this.container.querySelector('.popup__image-link').setAttribute('src', imgUrl);
	}
}

const popupImage = new PopupImage(popupImg);

class Card {

	constructor (name, link) {
		this.name = name;
		this.link = link;
		this.create ();
		this.remove = this.remove.bind(this);
		this.like = this.like.bind(this);
		this.showImage = this.showImage.bind(this);

		this.placeCard
			.querySelector('.place-card__like-icon')
			.addEventListener ('click', this.like);

		this.placeCard
			.querySelector('.place-card__delete-icon')
			.addEventListener('click', this.remove);
		this.placeCard
			.querySelector('.place-card__image')
			.addEventListener ('click', this.showImage);
	}

	create () {
		const placeCard = document.createElement('div');
		placeCard.classList.add('place-card');

		const placeCardImg = document.createElement('div');
		placeCardImg.classList.add('place-card__image');

		const btnDelete = document.createElement('button');
		btnDelete.classList.add('place-card__delete-icon');

		placeCardImg.appendChild(btnDelete);
		placeCard.appendChild(placeCardImg);
		
		const placeCardDescription = document.createElement('div');
		placeCardDescription.classList.add('place-card__description');
		
		const placeCardName = document.createElement('h3');
		placeCardName.classList.add('place-card__name');
		placeCardDescription.appendChild(placeCardName);
		
		const btnLike = document.createElement('button');
		btnLike.classList.add('place-card__like-icon');
		placeCard.appendChild(placeCardDescription);
		placeCardDescription.appendChild(btnLike);

		placeCardName.textContent = this.name;
		placeCardImg.setAttribute('style', `background-image: url(${this.link})`);

		this.placeCard = placeCard;
	}

	remove (e) {
		e.stopPropagation();
		this.placeCard.parentElement.removeChild(this.placeCard);
	}

	like () {
		this.placeCard.querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked');
	}

	showImage () {
		popupImage.setImage(this.link)
		popupImage.open()
	}
}
	
class CardList {
	constructor (container, array) {
		this.container = container;
		this.array = array;
		this.render();

		this.addCard = this.addCard.bind(this);
		this.render = this.render.bind(this);
		popupForm.addEventListener('submit', this.addCard);
		popupButton.addEventListener('click', this.diactivatedAddButton);
		popupForm.addEventListener('input', this.diactivatedAddButton);
	}

	addCard (e) {
		e.preventDefault();
		const {placeCard} = new Card(popupInputName.value, popupInputUrl.value);
		
		this.container.appendChild(placeCard);
		popup.classList.remove('popup_is-opened');
		popupForm.reset();
	}

  	diactivatedAddButton () {
		if (!popupInputName.checkValidity() || !popupInputUrl.checkValidity()) {
	  			popupAddButton.setAttribute('disable', true);
	  			popupAddButton.classList.add('popup__button_disable');
	  			popupAddButton.classList.remove('popup__button');
		} else {
	  			popupAddButton.removeAttribute('disabled');
	  			popupAddButton.classList.remove('popup__button_disable');
	  			popupAddButton.classList.add('popup__button');
		}
  	};
	

	render () {
		for (let i = 0; i < this.array.length; i++) {
			const { placeCard } = new Card(this.array[i].name, this.array[i].link);
			this.container.appendChild(placeCard);
		}
	}
}

class PopupInput extends Popup {

	constructor (container, button) {
		super (container, button)
		this.popupForm = this.container.querySelector('.popup__form');
		this.popupInputName = this.popupForm.elements.name;
		this.popupInputLink = this.popupForm.elements.link;
		this.save = this.save.bind(this);

		this.popupForm
			.addEventListener('submit', this.save);
	}

	open () {
		super.open()
		popupInputName.value = '';
		popupInputUrl.value = '';
	}

	close () {
		super.close()
		popupForm.querySelector('#error__title').textContent = '';
  		popupForm.querySelector('#error__link').textContent = '';
	}

	save (e) {
		e.preventDefault();
		api.addCard(this.popupForm.elements.name.value, this.popupForm.elements.link.value).then(res => { console.log(res); });
		if (e.key === 'Enter') {
	  		this.container.classList.remove('popup_is-opened');
		}
		this.container.classList.remove('popup_is-opened');
	}
}

const newPopupInput = new PopupInput (popup, popupButton);

const popupEdit = document.querySelector('#edit');
const EditButton = document.querySelector('.button__edit');

class PopupEdit extends Popup {
	constructor (container, button) {
		super (container, button)
		this.popupFormEdit = this.container.querySelector('#popupFormEdit');
		this.popupFormEditInputName = this.popupFormEdit.elements.name;
		this.popupFormEditInputAbout = this.popupFormEdit.elements.about;
		this.save = this.save.bind(this);

		this.popupFormEdit
			.addEventListener('submit', this.save);
	}

	open () {
		this.container.classList.add('popup_is-opened');
		this.popupFormEditInputName.value = userName.textContent;
  		this.popupFormEditInputAbout.value = userJob.textContent;
  	}


   	close () {
		this.container.classList.remove('popup_is-opened');
		popupFormEdit.querySelector('#error__name').textContent = '';
  		popupFormEdit.querySelector('#error__about').textContent = '';
  	}

  	save (e) {
		e.preventDefault();
		if (e.key === 'Enter') {
	  		this.container.classList.remove('popup_is-opened');
		}
		this.container.classList.remove('popup_is-opened');

		api.getInitialEdit(this.popupFormEditInputName.value, this.popupFormEditInputAbout.value)
			.then(res => { console.log(res); });
		api.getUser()
			.then(res => { userName.textContent = res.name; });
		api.getUser()
			.then(res => { userJob.textContent = res.about; });
	}
}

const newPopupEdit = new PopupEdit (popupEdit, EditButton);

class Api {

	constructor(url, token) {
		this.url = url;
		this.token = token;
    }

	getUser() {
		return fetch (`${this.url}/cohort3/users/me`, {
			method: 'GET',
			headers: {
				authorization: `${this.token}`,
				'Content-Type': 'application/json'
			}	
		})
		.then(res => {
			if(res.ok) {
				return res.json();
			}
			return Promise.reject(res.status);

		})
		.catch(err => { 
			console.log(err); 
		});
	}
			
	getInitialCards() {
		return fetch (`${this.url}/cohort3/cards`, {
			method: 'GET',
			headers: {
				authorization: `${this.token}`,
				'Content-Type': 'application/json'
			}	
		})
		.then(res => {
			if(res.ok) {
				return res.json();
			}
			return Promise.reject(res.status);
		})
	
		.catch(err => { 
			console.log(err); 
		});
	}

	getInitialEdit() {
		return fetch(`${this.url}/cohort3/users/me`, {
			method: 'PATCH',
			headers: {
				authorization: `${this.token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: newPopupEdit.popupFormEditInputName.value,
				about: newPopupEdit.popupFormEditInputAbout.value
			})
		})
		.then(res => {
			if(res.ok) {
				return res.json();
			} 
			return Promise.reject(res.status);
		})
		.catch(err => { console.log(err); });	
	}

	addCard(nameInput, urlInput) {
		return fetch(`${this.url}/cohort3/cards`, {
			method: 'POST',
			headers: {
				authorization: `${this.token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: nameInput,
				link: urlInput
			})
		})
		.then(res => {
			if(res.ok) {
				return res.json();
			}
			return Promise.reject(res.status);
		})
		.catch(err => { console.log(err); });
	}
}

const api = new Api('http://95.216.175.5', '26f2ac9c-9424-47a9-8a05-2d6b493d73bc');

api.getUser().then(res => { console.log(res); })
api.getInitialCards().then(data => { new CardList(placesList, data); })
api.getUser()
	.then(res => { userName.textContent = res.name; });
api.getUser()
	.then(res => { userJob.textContent = res.about; });


const userName = document.querySelector('.user-info__name');
const userJob = document.querySelector('.user-info__job');
const popupFormEdit = document.querySelector('#popupFormEdit');
const popupFormEditInputName = popupFormEdit.elements.name;
const popupFormEditInputAbout = popupFormEdit.elements.about;

const popupEditButton = popupEdit.querySelector('button');

const popupEditError = popupEdit.querySelector('.popup__error');

//функция деактивации кнопки popup edit

function diactivatedEditButton (){
  if (!popupFormEditInputName.checkValidity() || !popupFormEditInputAbout.checkValidity()) {
	popupEditButton.setAttribute('disable', true);
	popupEditButton.classList.add('popup__button-edit_disable');
	popupEditButton.classList.remove('popup__button-edit');
  } else {
	popupEditButton.removeAttribute('disable');
	popupEditButton.classList.remove('popup__button-edit_disable');
	popupEditButton.classList.add('popup__button-edit');
  }
};

popupFormEdit.addEventListener('input', diactivatedEditButton);

// функция закрывающая попап с изображением карточки
const popupImgClose = popupImg.querySelector('#image-close');
  popupImgClose.addEventListener('click', function() {
	popupImg.classList.remove('popup_is-opened');
  });

//валидация edit
( function () {

	function validateTextField(field){
  	if (field.value.length === 0) {
	 	return 'Это обязательное поле';
  	} else if (field.value.length <= 1 || field.value.length > 30) {
	  	return 'Должно быть от 2 до 30 символов';
  	}
  	return '';
	}
	
	const errorEditName = popupFormEdit.querySelector('#error__name');
	const errorEditAbout = popupFormEdit.querySelector('#error__about');

	popupFormEdit.addEventListener('input', () => {
  		const nameErrorText = validateTextField(popupFormEditInputName);
  		errorEditName.textContent = nameErrorText;
  		const aboutErrorText = validateTextField(popupFormEditInputAbout);
  		errorEditAbout.textContent = aboutErrorText;

  		if (nameErrorText === '' && aboutErrorText === '') {
	  		popupEditButton.removeAttribute('disabled');
	  		popupEditButton.classList.add('popup__button-edit');
  		}	else {
	  		popupEditButton.setAttribute('disabled', true);
	  		popupEditButton.classList.remove('popup__button-edit');
  		}
	});

}) ();

(function () {
	popupInputName.addEventListener('click', inputValidate);
	popupInputUrl.addEventListener('click', inputValidate);
	popupInputName.addEventListener('input', inputValidate);
  	popupInputUrl.addEventListener('input', inputValidate);


  	function inputValidate(e) {
  	validate(e.target);
}

function validate(element) {
  	const errorElement = popupForm.querySelector(`#error__${element.id}`);
  	console.log(element.validity);


  	if (element.validity.tooShort) {
		errorElement.textContent = 'Должно быть от 2 до 30 символов';
		element.parentNode.classList.remove('popup__input-content');
		element.parentNode.classList.add('popup__input-content_invalid');
  	} else if (element.validity.valueMissing) {
		errorElement.textContent = 'Это обязательное поле';
		element.parentNode.classList.remove('popup__input-content');
		element.parentNode.classList.add('popup__input-content_invalid');
  	} else {
		element.parentNode.classList.add('popup__input-content');
		element.parentNode.classList.remove('popup__input-content_invalid');
		errorElement.textContent = '';
  	}
}
})();

















































