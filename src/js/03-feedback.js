const throttle = require('lodash.throttle');


const refs = {
    form: document.querySelector('.feedback-form'),
    email: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
    
};

const STORAGE_KEY = 'feedback-form-state';


refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onInputForm, 500));
window.addEventListener('load', populateTextarea);



function onFormSubmit(e) {
    e.preventDefault();
    const {
    elements: { email, message },
  } = e.currentTarget;
    console.log({ email: email.value, message: message.value });
   localStorage.removeItem(STORAGE_KEY);
   e.target.reset();
}

function onInputForm() {
    const message = refs.form.elements.message.value;
    const email = refs.form.elements.email.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ email,message }));
}

function populateTextarea() {
    const savedMessage = localStorage.getItem(STORAGE_KEY);
    if (savedMessage) {
        const savedMessagePars = JSON.parse(savedMessage)||{email:"", message:""};
        refs.email.value = savedMessagePars.email;
        refs.textarea.value = savedMessagePars.message;
    }
}























// const throttle = require("lodash.throttle");

// const refs = {
//   form: document.querySelector('.feedback-form'),
// };

// const LOCALSTORAGE_KEY = 'feedback-form-state';

// refs.form.addEventListener('input',throttle(onInputForm,500));
// refs.form.addEventListener('submit', onSubmitForm);
// window.addEventListener('load', updateOutputOnload);

// function onInputForm(e) {
//   e.preventDefault();
//   const message = refs.form.elements.message.value;
//   const email = refs.form.elements.email.value;
//   localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({ message, email }));
  
// }

// function updateOutputOnload(e) {
//   e.preventDefault();
//   const outputTextContent = localStorage.getItem(LOCALSTORAGE_KEY);
//   const outputObjectContent = JSON.parse(outputTextContent)||{email:"", message:""};
//   const { email, message } = outputObjectContent;
//   refs.form.elements.email.value = email;
//   refs.form.elements.message.value = message;
// }

// function onSubmitForm(e) {
//   e.preventDefault();
//   const {
//     elements: { email, message },
//   } = e.currentTarget;
//   console.log({email:email.value, message:message.value})
//   localStorage.clear();
//   refs.form.reset();
// }