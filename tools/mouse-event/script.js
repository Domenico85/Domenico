const containerElement = document.querySelector(".container");

window.addEventListener("mousemove", (event) => {
  //   console.log(event);
  containerElement.innerHTML = ` 
    <div class="mouse-event">
        ${event.clientX}
        <h4>Mouse X Position(px)</h4>
      </div>
      <div class="mouse-event">
        ${event.clientY}
        <h4>Mouse Y Position(px)</h4>
      </div>`;
});
