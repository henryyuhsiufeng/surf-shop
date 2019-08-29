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
