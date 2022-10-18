"use strict";
// Count nr of items-index page
const sections = document.querySelectorAll('.section-cards');

sections.forEach((section) => {

    const countCards = section.querySelectorAll('.card').length;

    const sectionLabel = section.querySelector('.section-label');

    sectionLabel.innerHTML = sectionLabel.innerHTML + ' ( ' + countCards + ' )';

    if (countCards === 0) {
        section.classList.add('nod')
    }
})


// FILTER INDEX PAGE //

const sectionNew = document.querySelector('#section-new');
const sectionThrown = document.querySelector('#section-thrown');
const sectionTrimmed = document.querySelector('#section-trimmed');
const sectionBisque = document.querySelector('#section-bisque');
const sectionGlazed = document.querySelector('#section-glazed');
const sectionGlazefired = document.querySelector('#section-glazefired');

const sectionCards = document.querySelectorAll('.section-cards');
const checkFilter = document.querySelector('#filterparams');


checkFilter.addEventListener('change', (event) => {

    const selectedOption = event.target.value;
    console.log(selectedOption)

    sectionCards.forEach(sectionCard => {
        sectionCard.classList.add('nod');
    });

    switch (selectedOption) {
        case 'new':
            sectionNew.classList.remove('nod');
            break;
        case 'thrown':
            sectionThrown.classList.remove('nod');
            break;
        case 'trimmed':
            sectionTrimmed.classList.remove('nod');
            break;
        case 'bisque':
            sectionBisque.classList.remove('nod');
            break;
        case 'glazed':
            sectionGlazed.classList.remove('nod');
            break;
        case 'glazefired':
            sectionGlazefired.classList.remove('nod');
            break;
        case '':
            sectionCards.forEach(sectionCard => {
                sectionCard.classList.remove('nod');
            });
            break;
    };
});
