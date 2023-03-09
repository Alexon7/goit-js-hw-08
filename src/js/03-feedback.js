import throttle from 'lodash.throttle';

const formData = {};
const refs = {
  form: document.querySelector('.feedback-form'),
  message: document.querySelector('.feedback-form textarea'),
  email: document.querySelector('input'),
};

const STORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput, 500));

populateMessage();

function onFormSubmit(evt) {
  if (refs.email.value === '' || refs.message.value === '') {
    alert('Заповніть усі поля!');
  } else {
    evt.preventDefault();
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    console.log(formData);
  }
}

function onTextareaInput(e) {
  formData[e.target.name] = e.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateMessage() {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (data) {
    email.value = data.email;
    message.value = data.message;
  }
}
