function hideBanner(){
    let element = document.getElementById("overlay");
    element.classList.add("hidden");
}
function processBanner() {

   hideBanner();
   localStorage.setItem("bannerHidden", "true");
}

document.getElementById("consent-button").addEventListener("click", processBanner);
document.getElementById("exit").addEventListener("click", hideBanner);
document.body.addEventListener("click", function(event){
   const userClick= event.target;
   const closeElement= document.querySelector("#overlay");
   const closeBanner= (closeElement == userClick);
   if (closeBanner){
       hideBanner();
   }
   
});

window.addEventListener("load", function(){
   let bannerHidden = localStorage.getItem("bannerHidden");
   if (bannerHidden === "true"){
       let element = document.getElementById("#overlay");
       element.classList.add("hidden");
   }
});