// First declare the constants
const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds
const alarmSound = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
const buttonClickSound = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
const switchModeSound = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');

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
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
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
    
    startButton.textContent = 'Pause';
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = WORK_TIME;
    statusText.textContent = 'Work Time';
    startButton.textContent = 'Start';
    toggleButton.textContent = 'Rest Mode';
    updateDisplay();
}

function timerComplete() {
    clearInterval(timerId);
    timerId = null;
    startButton.textContent = 'Start';
    alarmSound.play();
    switchMode();
}

function timerTick() {
    timeLeft--;
    updateDisplay();
    
    if (timeLeft === 0) {
        timerComplete();
    }
}

startButton.addEventListener('click', () => {
    buttonClickSound.play();
    if (timerId === null) {
        startTimer();
    } else {
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
    }
});

resetButton.addEventListener('click', () => {
    buttonClickSound.play();
    resetTimer();
});

toggleButton.addEventListener('click', () => {
    switchModeSound.play();
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
    }
    switchMode();
});

// Initialize the display
timeLeft = WORK_TIME;
updateDisplay();

// Add this function to test the sound
function testSound() {
    alarmSound.play();
}

// For easier testing from console
window.testSound = testSound;

// Add these test functions
function testAllSounds() {
    console.log("Testing alarm sound...");
    alarmSound.play();
    
    setTimeout(() => {
        console.log("Testing button click sound...");
        buttonClickSound.play();
    }, 1000);
    
    setTimeout(() => {
        console.log("Testing switch mode sound...");
        switchModeSound.play();
    }, 2000);
}

// Make it available in console
window.testAllSounds = testAllSounds; 