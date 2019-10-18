(function () {
  //popupForm.addEventListener('load', inputValidate);  
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
    }
    else if (element.validity.valueMissing) {
      errorElement.textContent = 'Это обязательное поле';
      element.parentNode.classList.remove('popup__input-content');
      element.parentNode.classList.add('popup__input-content_invalid');
    }
    else {
      element.parentNode.classList.add('popup__input-content');
      element.parentNode.classList.remove('popup__input-content_invalid');
      errorElement.textContent = '';
    }
  }
})();
