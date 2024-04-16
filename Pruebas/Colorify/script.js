// function paint(color) {
//     const circle = document.getElementById('circleID');
//     circle.style = `background-color:${color}`;
//   }

function paint(color) {
    const circle = document.getElementById('circleID');
    if (color === 'random') {
        // Generate a random color
        const randomColor = getRandomColor();
        circle.style.backgroundColor = randomColor;
    } else {
        circle.style.backgroundColor = color;
    }
}

function getRandomColor() {
    // Generate random values for RGB
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    // Construct the CSS color string
    return `rgb(${r}, ${g}, ${b})`;
}
