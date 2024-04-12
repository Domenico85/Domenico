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

var btn = document.querySelectorAll('.btn');

for (var i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', function() {
        if (this.classList.contains('active')) {
            this.classList.remove('active');
            this.classList.add('not-active');
        } else {
            this.classList.remove('not-active');
            this.classList.add('active');
        }
    });
}
