"use strict";
// Kanban Drag & Drop

const items = document.querySelectorAll('#divs-kanban');

const kanbans = document.querySelectorAll('.kanban');

const formNew = document.querySelector('.form-new');
const formThrown = document.querySelector('.form-thrown');
const formTrimmed = document.querySelector('.form-trimmed');
const formBisque = document.querySelector('.form-bisque');
const formGlazed = document.querySelector('.form-glazed');
const formGlazeFired = document.querySelector('.form-glazefired');

const kanbanNew = document.querySelector('.kanban-new');
const kanbanThrown = document.querySelector('.kanban-thrown');
const kanbanTrimmed = document.querySelector('.kanban-trimmed');
const kanbanBisque = document.querySelector('.kanban-bisque');
const kanbanGlazed = document.querySelector('.kanban-glazed');
const kanbanGlazeFired = document.querySelector('.kanban-glazefired');

// formThrown.action = `/api/v1/projects/${item}/updateKanban`;
// formThrown.submit();


items.forEach(function (item) {

    item.addEventListener('dragstart', (e) => {
        item.classList.add('dragging');
        console.log('dragstart');
    });

    item.addEventListener('dragend', (e) => {
        item.classList.remove('dragging');
        console.log('dragend');
    });
});

kanbans.forEach(function (kanban) {
    kanban.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const draggable = document.querySelector('.dragging');

        kanban.appendChild(draggable);

        if (kanban.classList.contains('kanban-new')) {
            formNew.action = `/api/v1/projects/${draggable.dataset.id}/updateKanban?_method=PUT`;
            formNew.submit();
            return;
        } else if (kanban.classList.contains('kanban-thrown')) {
            formThrown.action = `/api/v1/projects/${draggable.dataset.id}/updateKanban?_method=PUT`;
            formThrown.submit();
            return;
        } else if (kanban.classList.contains('kanban-trimmed')) {
            formTrimmed.action = `/api/v1/projects/${draggable.dataset.id}/updateKanban?_method=PUT`;
            formTrimmed.submit();
            return;
        } else if (kanban.classList.contains('kanban-bisque')) {
            formBisque.action = `/api/v1/projects/${draggable.dataset.id}/updateKanban?_method=PUT`;
            formBisque.submit();
            return;
        } else if (kanban.classList.contains('kanban-glazed')) {
            formGlazed.action = `/api/v1/projects/${draggable.dataset.id}/updateKanban?_method=PUT`;
            formGlazed.submit();
            return;
        } else if (kanban.classList.contains('kanban-glazefired')) {
            formGlazeFired.action = `/api/v1/projects/${draggable.dataset.id}/updateKanban?_method=PUT`;
            formGlazeFired.submit();
            return;
        }

    });
});

