const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const displayEl = document.getElementById("timerDisplay");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");

let timer = null;
let remainingTime = 0;
let isPaused = false;

// populate dropdowns
for (let i = 0; i < 24; i++) {
  hoursEl.innerHTML += `<option value="${i}">${String(i).padStart(2,'0')}</option>`;
}
for (let i = 0; i < 60; i++) {
  minutesEl.innerHTML += `<option value="${i}">${String(i).padStart(2,'0')}</option>`;
  secondsEl.innerHTML += `<option value="${i}">${String(i).padStart(2,'0')}</option>`;
}

function formatTime(sec) {
  let h = Math.floor(sec / 3600);
  let m = Math.floor((sec % 3600) / 60);
  let s = sec % 60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function updateDisplay() {
  displayEl.textContent = formatTime(remainingTime);
}

function startTimer() {
  if (!isPaused) {
    let h = parseInt(hoursEl.value);
    let m = parseInt(minutesEl.value);
    let s = parseInt(secondsEl.value);
    remainingTime = h * 3600 + m * 60 + s;
  }
  if (remainingTime <= 0) return;

  startBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";
  stopBtn.style.display = "inline-block";

  timer = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      updateDisplay();
    } else {
      clearInterval(timer);
      alert("⏰ Time's up!");
      resetTimer();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isPaused = true;
  startBtn.innerHTML = `<i class="fas fa-play"></i>`;
  startBtn.style.display = "inline-block";
  pauseBtn.style.display = "none";
}

function stopTimer() {
  clearInterval(timer);
  resetTimer();
}

function resetTimer() {
  isPaused = false;
  remainingTime = 0;
  updateDisplay();
  startBtn.style.display = "inline-block";
  pauseBtn.style.display = "none";
  stopBtn.style.display = "none";
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
stopBtn.addEventListener("click", stopTimer);

updateDisplay();
