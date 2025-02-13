// First declare the constants
const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

// Sound constants with custom sounds
const startStopSound = new Audio('sounds/start-stop.mp3');
const switchModeSound = new Audio('sounds/switch-mode.mp3');
const workCompleteSound = new Audio('sounds/work-complete.mp3');
const restCompleteSound = new Audio('sounds/rest-complete.mp3');

// Optional: Preload the sounds
startStopSound.load();
switchModeSound.load();
workCompleteSound.load();
restCompleteSound.load();

// Then initialize variables using those constants
let timeLeft = WORK_TIME;
let timerId = null;
let isWorkTime = true;

// Get DOM elements
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const toggleButton = document.getElementById('toggle-mode');
const statusText = document.getElementById('status-text');

// Set initial button text
toggleButton.textContent = 'Rest Mode';

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update the display elements
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Update the page title
    document.title = `(${timeString}) Pomodoro Timer`;
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    statusText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    toggleButton.textContent = isWorkTime ? 'Rest Mode' : 'Work Mode';
    updateDisplay();
}

function startTimer() {
    if (timerId !== null) return;
    
    if (!timeLeft) {
        timeLeft = WORK_TIME;
    }
    
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft === 0) {
            timerComplete();
        }
    }, 1000);
    
    startStopSound.play();
    startButton.textContent = 'Pause';
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
    startStopSound.play();
    startButton.textContent = 'Start';
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    updateDisplay();
    startButton.textContent = 'Start';
}

function toggleMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    updateDisplay();
    switchModeSound.play();
    toggleButton.textContent = isWorkTime ? 'Rest Mode' : 'Work Mode';
    statusText.textContent = isWorkTime ? 'Work Time' : 'Rest Time';
}

function timerComplete() {
    clearInterval(timerId);
    timerId = null;
    
    if (isWorkTime) {
        workCompleteSound.play();
    } else {
        restCompleteSound.play();
    }
    
    startButton.textContent = 'Start';
}

function timerTick() {
    timeLeft--;
    updateDisplay();
    
    if (timeLeft === 0) {
        timerComplete();
    }
}

startButton.addEventListener('click', () => {
    if (timerId === null) {
        startTimer();
    } else {
        pauseTimer();
    }
});

resetButton.addEventListener('click', resetTimer);
toggleButton.addEventListener('click', toggleMode);

// Initialize the display
timeLeft = WORK_TIME;
updateDisplay(); 