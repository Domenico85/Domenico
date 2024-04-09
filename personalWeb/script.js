document.addEventListener('DOMContentLoaded', function() {
    var navToggle = document.querySelector('.main-nav-toggle');

    navToggle.addEventListener('click', function(event) {
        event.preventDefault();

        if (navToggle.classList.contains('active-menu')) {
            navToggle.classList.remove('active-menu');
        } else {
            navToggle.classList.add('active-menu');
        }
    });
});
