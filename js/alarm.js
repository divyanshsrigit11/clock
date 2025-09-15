let alarmTime = null;
let alarmTimeout = null;
const status = document.getElementById("status");
const alarmSound = document.getElementById("alarmSound");

function setAlarm() {
  const input = document.getElementById("alarmTime").value;
  if (!input) {
    alert("Please select a time first!");
    return;
  }
  alarmTime = input;
  status.textContent = `Alarm set for ${alarmTime}`;
  
  checkAlarm();
}

function clearAlarm() {
  alarmTime = null;
  if (alarmTimeout) {
    clearTimeout(alarmTimeout);
  }
  alarmSound.pause();
  alarmSound.currentTime = 0;
  status.textContent = "No alarm set";
}

function checkAlarm() {
  if (!alarmTime) return;

  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // hh:mm format

  if (currentTime === alarmTime) {
    alarmSound.play();
    status.textContent = "⏰ Wake up! Alarm ringing!";
  }

  alarmTimeout = setTimeout(checkAlarm, 1000);
}
