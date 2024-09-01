let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let hoursRef = document.querySelector("#hoursRef");
let minRef = document.querySelector("#minRef");
let secRef = document.querySelector("#secRef");
let milliRef = document.querySelector("#milliRef");
let int = null;
let lapCount = 1;
let lapList = document.querySelector(".lap-table-body");
let lastLapTime = 0;
let isRunning = false;
let isInitialState = true;

document.getElementById("toggle-timer").addEventListener("click", () => {
  if (isRunning) {
    clearInterval(int);
    document.getElementById("toggle-timer").textContent = "Start";
  } else {
    int = setInterval(displayTimer, 10);
    document.getElementById("toggle-timer").textContent = "Pause";
    document.getElementById("toggle-timer").classList.toggle("active");
    isRunning = true;
    saveStopwatchData();

    if (isInitialState) {
      isInitialState = false; // Timer has started, no longer in the initial state
      document.getElementById("lap-timer").disabled = false; // Enable lap button
    }
  }
  isRunning = !isRunning;
});

document.getElementById("reset-timer").addEventListener("click", () => {
  clearInterval(int);
  [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];

  hoursRef.innerHTML = "0";
  minRef.innerHTML = "00";
  secRef.innerHTML = "00";
  milliRef.innerHTML = "00";
  lapList.innerHTML = "";
  lapCount = 1;
  lastLapTime = 0;

  isRunning = false;
  isInitialState = true; // Reset to initial state
  document.getElementById("toggle-timer").textContent = "Start";
  document.getElementById("lap-timer").disabled = true;

  // hide lap container
  document.querySelector(".lap-container").classList.remove("active");
  localStorage.clear();
});

document.getElementById("lap-timer").addEventListener("click", () => {
  // Calculate the current lap time in milliseconds
  let currentLapTime =
    hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds;

  let lapHours = hoursRef.innerHTML;
  let lapMinutes = minRef.innerHTML;
  let lapSeconds = secRef.innerHTML;
  let lapMilliseconds = milliRef.innerHTML;

  // Calculate the difference between the current lap and the previous lap
  let lapDifference = currentLapTime - lastLapTime;

  // Format the lap difference to HH:MM:SS:MS
  let formattedLapDiff = formatLapTime(lapDifference);

  // Update the last lap time to the current one
  lastLapTime = currentLapTime;

  document.querySelector(".lap-container").classList.add("active");

  // Create a new list item for the lap and display the lap time and difference
  let lapRow = document.createElement("tr");

  let lapColCount = document.createElement("td");
  let lapColTime = document.createElement("td");
  let lapColTotalTime = document.createElement("td");

  lapColCount.innerHTML = lapCount;
  lapColTime.innerHTML = formattedLapDiff;
  lapColTotalTime.innerHTML = `${lapHours}:${lapMinutes}:${lapSeconds}:${lapMilliseconds}`;

  lapRow.appendChild(lapColCount);
  lapRow.appendChild(lapColTime);
  lapRow.appendChild(lapColTotalTime);

  lapList.insertBefore(lapRow, lapList.firstChild);

  // Increment the lap count
  lapCount++;
});

function displayTimer() {
  milliseconds += 10;
  if (milliseconds == 1000) {
    milliseconds = 0;
    seconds++;
    if (seconds == 60) {
      seconds = 0;
      minutes++;
      if (minutes == 60) {
        minutes = 0;
        hours++;
      }
    }
  }

  hoursRef.innerHTML = hours;
  minRef.innerHTML = minutes < 10 ? "0" + minutes : minutes;
  secRef.innerHTML = seconds < 10 ? "0" + seconds : seconds;
  milliRef.innerHTML = milliseconds < 10 ? "0" + milliseconds : milliseconds;
}

function formatLapTime(time) {
  let hours = Math.floor(time / 3600000);
  let minutes = Math.floor((time % 3600000) / 60000);
  let seconds = Math.floor((time % 60000) / 1000);
  let milliseconds = time % 1000;
  milliseconds = Math.floor(milliseconds / 10); // Convert to 2-digit format

  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms = milliseconds < 10 ? "0" + milliseconds : milliseconds;

  return `${h}:${m}:${s}:${ms}`;
}
