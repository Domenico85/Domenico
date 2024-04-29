let nav = document.querySelector('.nav');
document.querySelector('.menu-toggle').onclick = function(){
  this.classList.toggle('active');
  nav.classList.toggle('active');
}