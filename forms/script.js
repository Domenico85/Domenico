const inputs = document.querySelectorAll('input:not(#password):not(#confirm_password)');
const validFields = ['.name', '.surname', '.phone-number', '.email',];
const notValidFields = ['.name', '.surname', '.phone-number', '.email'];
inputs.forEach((input, index) => {
    const imgValid = document.querySelector(validFields[index] + '-field .image-valid')
    const imgNotValid = document.querySelector(notValidFields[index] + '-field .image-not-valid')
    input.style.borderColor = '#007bff';

    input.addEventListener('input', function () {
        if (input.validity.valid) {
            input.style.borderColor = '#28a745';
            imgValid.style.display = 'inline';
            imgNotValid.style.display = 'none'
        } else {
            input.style.borderColor = '#dc3545';
            imgNotValid.style.display = 'inline';
            imgValid.style.display = 'none';
        }
    });
});

document.querySelector('form').reset();
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm_password');
const redColor = '#dc3545';
const mismatchText = document.createElement('p'); 
mismatchText.textContent = "*Passwords do not match";
mismatchText.style.color = redColor;
mismatchText.style.textAlign = 'initial';
passwordInput.style.borderColor = '#007bff';
confirmPasswordInput.style.borderColor = '#007bff';

passwordInput.addEventListener('input', validatePassword);
confirmPasswordInput.addEventListener('input', validatePassword);

function validatePassword() {
    if (passwordInput.value === confirmPasswordInput.value && passwordInput.value !== '') {
        console.log("SON IGUALes", passwordInput.value)
        passwordInput.style.borderColor = '#28a745';
        confirmPasswordInput.style.borderColor = '#28a745';
        mismatchText.style.display = 'none';
        
    } else {
        console.log("NO SON IGUALes", passwordInput.value)

        passwordInput.style.borderColor = redColor;
        confirmPasswordInput.style.borderColor = redColor;
        confirmPasswordInput.parentNode.appendChild(mismatchText);
        console.log(confirmPasswordInput)
    }
}


