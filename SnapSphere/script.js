window.addEventListener('DOMContentLoaded', (event) => {
    const containerWidth = document.querySelector('.container').offsetWidth;
    const itemsContainer = document.querySelectorAll('.horizontal-scrolling-items, .horizontal-scrolling-items2');
    itemsContainer.forEach(container => {
        const itemsWidth = container.scrollWidth;
        const animationDuration = (itemsWidth / containerWidth) * 10;
        container.style.animationDuration = animationDuration + 's';
    });
});
