document.addEventListener('DOMContentLoaded', function () {
    var navToggle = document.querySelector('.main-nav-toggle');
    var myLinks = document.querySelector('.myLinks');

    navToggle.addEventListener('click', function (event) {
        event.preventDefault();
        navToggle.classList.toggle('active-menu');
        myLinks.classList.toggle('myLinksActive');
    });

    function showMenu() {
        navToggle.classList.remove('active-menu');
        myLinks.classList.remove('myLinksActive');
    }

    let links = document.querySelectorAll(".myLinks a");

    links.forEach(link => {
        link.addEventListener("click", showMenu);
    });
});
