const container = document.querySelector('#container');
const paragraph = document.createElement('p');
paragraph.textContent = "Hey, I'm red";
paragraph.setAttribute("style", "color:red;");
container.appendChild(paragraph);

const h3= document.createElement('h3');
h3.textContent = "I'm a blue h3";
h3.setAttribute("style", "color:blue;");
container.appendChild(h3);

const content2  = document.createElement('div');
content2.classList.add('content2');
const h1= document.createElement('h1');
h1.textContent = "I'm a div"
content2.appendChild(h1);
const anotherP= document.createElement('p');
anotherP.textContent = "ME TOO!"
content2.appendChild(anotherP);
content2.setAttribute('style', 'background-color:pink; border:1px solid black;text-align: center;');
container.appendChild(content2);

// function alertFuncion(e){
//   alert("YAY! YOU DID IT!");
// }
// const btn = document.querySelector("#btn");

// btn.addEventListener("click", function(e){
//   e.target.style.background = "blue";
// });

// buttons is a node list. It looks and acts much like an array.
const buttons = document.querySelectorAll("button");

// we use the .forEach method to iterate through each button
buttons.forEach((button) => {
  // and for each one we add a 'click' listener
  button.addEventListener("click", () => {
    alert(button.id);
  });
});
