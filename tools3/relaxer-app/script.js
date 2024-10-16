const container = document.getElementById("container");
const text = document.getElementById("text");

const totalTime = 19000;
const breatheTime = 4000;
const holdTime = 7000;

function breatheAnimation() {
  text.innerText = "Breathe In!";
  container.className = "container grow";

  setTimeout(() => {
    text.innerText = "Hold";

    setTimeout(() => {
      text.innerText = "Breathe Out!";
      container.className = "container shrink";
    }, holdTime);
  }, breatheTime);
}

setInterval(breatheAnimation, totalTime);

breatheAnimation();

const audioPlayer = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const seekBar = document.getElementById("seekBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

window.addEventListener("load", () => {
  audioPlayer.play();
  audioPlayer.loop = true;
  playPauseBtn.textContent = "Pause";
});

playPauseBtn.addEventListener("click", () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.textContent = "Pause";
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = "Play";
  }
});

audioPlayer.addEventListener("timeupdate", () => {
  const currentTime = audioPlayer.currentTime;
  const duration = audioPlayer.duration;
  seekBar.value = (currentTime / duration) * 100;

  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
});

seekBar.addEventListener("input", () => {
  const seekTo = (seekBar.value / 100) * audioPlayer.duration;
  audioPlayer.currentTime = seekTo;
});

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
