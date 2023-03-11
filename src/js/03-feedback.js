import throttle from 'lodash.throttle';

let formData = {};
const refs = {
  form: document.querySelector('.feedback-form'),
  message: document.querySelector('.feedback-form textarea'),
  email: document.querySelector('input'),
};

const STORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput, 500));

populateMessage();

function onTextareaInput(e) {
  let formData = localStorage.getItem(STORAGE_KEY);
  if (formData) {
    formData = JSON.parse(formData);
  } else {
    formData = {};
  }

  formData[e.target.name] = e.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  if (refs.email.value === '') {
    alert('Заповніть полe e-mail!');
  } else {
    evt.preventDefault();
    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
  }
}

function populateMessage() {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (data) {
    refs.email.value = data.email || '';
    refs.message.value = data.message || '';
  }
}
