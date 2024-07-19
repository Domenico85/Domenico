const listInfo = document.querySelector('.content-info');
const nextBtn = document.querySelector('.next-btn');
const listImg = document.querySelector('.slider-img');
const prevBtn = document.querySelector('.prev-btn');
const bgs = document.querySelectorAll('.bg');

let index = 0;
nextBtn.addEventListener('click', () => {
    index = Math.min(index + 1, 3);
    listInfo.style.transform = `translateY(${index * -25}%)`;
    listImg.style.transform = `translateY(${index * -100}%)`;
    bgs[index].classList.add('active');
})

prevBtn.addEventListener('click', () => {
    index = Math.max(index - 1, 0);
    listInfo.style.transform = `translateY(${index * -25}%)`;
    listImg.style.transform = `translateY(${index * -100}%)`;
    bgs[index + 1].classList.remove('active');
})