function hideBanner() {
    let element = document.getElementById("overlay");
    element.classList.add("hidden");
}
function processBanner() {

    hideBanner();
    localStorage.setItem("bannerHidden", "true");
}

document.getElementById("consent-button").addEventListener("click", processBanner);
document.getElementById("exit").addEventListener("click", hideBanner);
document.body.addEventListener("click", function (event) {
    const userClick = event.target;
    const closeElement = document.querySelector("#overlay");
    const closeBanner = (closeElement == userClick);
    if (closeBanner) {
        hideBanner();
    }

});

window.addEventListener("load", function () {
    let bannerHidden = localStorage.getItem("bannerHidden");
    if (bannerHidden === "true") {
        let element = document.getElementById("overlay");
        element.classList.add("hidden");
    }
});

var $ham = document.querySelector('.hamburger-container'),
		$pageBody = document.querySelector('.page-body');
	$ham.onclick = function () {
		if ($ham.classList.contains('open')) {
			$pageBody.classList.remove('open');
			$ham.classList.remove('open');
		} else {
			$pageBody.classList.add('open');
			$ham.classList.add('open');
		}
	};

	const menuLinks = document.querySelectorAll('.menu a');

function closeMenu() {
    const $pageBody = document.querySelector('.page-body');
    const $ham = document.querySelector('.hamburger-container');
    $pageBody.classList.remove('open');
    $ham.classList.remove('open');
}

menuLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        closeMenu();
        setTimeout(() => {
            window.location.href = link.href;
        }, 400);
        event.preventDefault();
    });
});