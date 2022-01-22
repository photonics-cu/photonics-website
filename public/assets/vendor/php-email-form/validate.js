(function () {
    "use strict";
    let forms = document.querySelectorAll('.php-email-form');
    forms.forEach(function (e) {
        e.addEventListener('submit', function (event) {
            event.preventDefault();

            let thisForm = this;

            thisForm.querySelector('.loading').classList.add('d-block');
            thisForm.querySelector('.error-message').classList.remove('d-block');
            thisForm.querySelector('.sent-message').classList.remove('d-block');

            let formData = new FormData(thisForm);

            php_email_form_submit(thisForm, formData);
        });
    });

    function php_email_form_submit(thisForm, formData) {
        const scriptURL = 'https://script.google.com/macros/s/AKfycbyK_GmoMSH0nPVod6YH7ZEXiVZT-8DdBFG1tSnJ3x8OHIIcUHXQgd9TMcM8IUnWQFAI/exec';

        fetch(scriptURL, {
                method: 'POST',
                body: formData
            })
            .then(() => {
                thisForm.querySelector('.loading').classList.remove('d-block');
                thisForm.querySelector('.sent-message').classList.add('d-block');
                thisForm.reset();
            })
            .catch(() => {
                displayError(thisForm);
            })
    }

    function displayError(thisForm) {
        thisForm.querySelector('.loading').classList.remove('d-block');
        thisForm.querySelector('.error-message').innerHTML = 'An error occured';
        thisForm.querySelector('.error-message').classList.add('d-block');
    }

})();
