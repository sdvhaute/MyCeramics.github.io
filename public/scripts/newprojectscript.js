"use strict";
// New Project Form Steps

const formSections = document.querySelectorAll('.form-section');

const nextButton = document.querySelector('#next-button');
const submitButton = document.querySelector('#submit-button');


nextButton.addEventListener('click', () => {
    formSections[1].classList.remove('section-nod');
    nextButton.classList.add('section-nod');
    console.log('next' + i);
});
