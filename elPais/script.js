function updateDateTime() {
    var now = new Date();
    var datetimeElement = document.getElementById("datetime");
    datetimeElement.innerHTML = now.toLocaleString();
}

// Call the function initially and then set it to update every second
updateDateTime();
setInterval(updateDateTime, 1000);

const imagen = document.querySelector(".cambio")
console.log(imagen['src'])
//No cambiar nada mas arriba

//No cambiar esta line
console.log(imagen.src)


let images = ["img/3.jpeg", "img/4.jpeg", "img/8.jpeg"]

for (let i = 0; i < images.length; i++) {
    setTimeout(() => {
        imagen.src = images[i];
    }, 3000 * i);
};

function startImageLoop() {
    let currentIndex = 0;
    setInterval(() => {
        imagen.src=images[currentIndex];
        currentIndex= (currentIndex +1) % images.length;
    }, 3000);
}
startImageLoop();

function hiddenBanner(){

   let element = document.getElementById("overlay");
    element.classList.add("hidden");
}

document.getElementById("consent-button").addEventListener("click",hiddenBanner);




