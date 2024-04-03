function hideBannerTemporarily(){
     let element = document.getElementById("overlay");
     element.classList.add("hidden");
}
function hideBanner() {

    let element = document.getElementById("overlay");
    element.classList.add("hidden");
    localStorage.setItem("bannerHidden", "true");
}

document.getElementById("consent-button").addEventListener("click", hideBanner);
document.getElementById("exit").addEventListener("click", hideBannerTemporarily);
document.body.addEventListener("click", function(event){
    const userClick= event.target;
    const closeElement= document.querySelector("#overlay");
    const closeBanner= (closeElement == userClick);
    if (closeBanner){
        hideBannerTemporarily();
    }
    
});

window.addEventListener("load", function(){
    let bannerHidden = localStorage.getItem("bannerHidden");
    if (bannerHidden === "true"){
        let element = document.getElementById("overlay");
        element.classList.add("hidden");
    }
});

const imagen = document.querySelector(".cambio")
console.log(imagen['src'])
//No cambiar nada mas arriba

//No cambiar esta line
console.log(imagen.src)


let images = ["img/gato1.jpg","img/perro.jpg", "img/gatos2.webp", "img/perro1.jpg"]

for (let i = 0; i < images.length; i++) {
    setTimeout(() => {
        imagen.src = images[i];
    }, 3000 * i);
};

function startImageLoop() {
    let currentIndex = 0;
    setInterval(() => {
        imagen.src = images[currentIndex];
        currentIndex = (currentIndex + 1) % images.length;
    }, 3000);
}


startImageLoop();