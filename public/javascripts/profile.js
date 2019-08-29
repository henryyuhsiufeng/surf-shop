let newPasswordValue;
let confirmationValue;
const form = document.querySelector('form');
// could aslo be: const form document.gtElementById('update-profile');
const newPassword = document.getElementById('new-password');
const confirmation = document.getElementById('password-confirmation');
const validationMessage = document.getElementById('validation-message');
// contents are empty but will populate to show user information
function validatePasswords(message, add, remove) {
    validationMessage.textContent = message;
    validationMessage.classList.add(add);
    validationMessage.classList.remove(remove);
}

// check each time a user tries to type an input whether the passwords match
confirmation.addEventListener('input', e => {
    e.preventDefault();
    newPasswordValue = newPassword.value;
    confirmationValue = confirmation.value;
    if (newPasswordValue !== confirmationValue) {
        //arguments will be passed in validatePasswords method
        validatePasswords('Passwords must match!', 'color-red', 'color-green');
    } else {
        validatePasswords('Passwords match!', 'color-green', 'color-red');
    }
});

// backup if user tries to submit with incorrenct confirmation password
form.addEventListener('submit', e => {
    if (newPasswordValue !== confirmationValue) {
        // stops the default submit behavior of the form. In other words,
        // it stops the user from submitting the form. 
        e.preventDefault();
        const error = document.getElementById('error');
        // no error message, then we create a new one.
        if (!error) {
            const flashErrorH1 = document.createElement('h1');
            // color the text in H1 red
            flashErrorH1.classList.add('color-red');
            // attribute is id and "id" is error so that we can check it a second time around if they try to submit again
            flashErrorH1.setAttribute('id', 'error');
            flashErrorH1.textContent = 'Passwords must match!';
            const navbar = document.getElementById('navbar');
            // flashErrorH1 gets appended before the next sibling of navbar, 
            // which consequentyl makes it the new next sibling
            // *plug the h1 after the navbar
            navbar.parentNode.insertBefore(flashErrorH1, navbar.nextSibling);
        }
    }
});
