document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');

    inputs.forEach(input => {
        input.style.borderColor = '#007bff';

        input.addEventListener('input', function() {
            if (input.validity.valid) {
                input.style.borderColor = '#28a745';
            } else {
                input.style.borderColor = '#dc3545';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm_password');

    passwordInput.style.borderColor = '#007bff';
    confirmPasswordInput.style.borderColor = '#007bff';

    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validatePassword);

    function validatePassword() {
        if (passwordInput.value === confirmPasswordInput.value && passwordInput.value !== '') {
            passwordInput.style.borderColor = '#28a745';
            confirmPasswordInput.style.borderColor = '#28a745';
        } else {
            passwordInput.style.borderColor = '#dc3545';
            confirmPasswordInput.style.borderColor = '#dc3545';
        }
    }
});

