const name= document.querySelector("#username");
const greetMeBtn = document.querySelector(".greet-btn");
const greetOutput = document.querySelector(".greeting");

greetMeBtn.addEventListener('click', (event)=>{
    greetOutput.innerText = `Hello ${name.value}`;
})