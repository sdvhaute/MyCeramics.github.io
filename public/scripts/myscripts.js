// Alert user of unsaved changes with browser alert message (only for forms that need validation)

"use strict";
(() => {
    const modified = new Set;
    const defaultValue = "defaultValue";
    const formNeedingValidation = document.querySelector('.validate-form');

    // store default values
    addEventListener("beforeinput", (evt) => {
        const target = evt.target;
        if (!(defaultValue in target || defaultValue in target.dataset)) {
            target.dataset[defaultValue] = ("" + (target.value || target.textContent)).trim();
        }
    });
    // detect input modifications
    addEventListener("input", (evt) => {
        const target = evt.target;
        let original;
        if (defaultValue in target) {
            original = target[defaultValue];
        } else {
            original = target.dataset[defaultValue];
        }
        if (original !== ("" + (target.value || target.textContent)).trim()) {
            if (!modified.has(target)) {
                modified.add(target);
            }
        } else if (modified.has(target)) {
            modified.delete(target);
        }
    });
    // clear modified inputs upon form submission
    
    
    formNeedingValidation.addEventListener("submit", (evt) => {
        modified.clear();
    });
    // warn before closing if any inputs are modified
    addEventListener("beforeunload", (evt) => {
        if (modified.size) {
            const unsaved_changes_warning = "Changes you made may not be saved.";
            evt.returnValue = unsaved_changes_warning;
            return unsaved_changes_warning;
        }
    });
})();


