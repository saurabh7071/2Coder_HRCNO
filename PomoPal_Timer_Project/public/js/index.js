
let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');
let longBreakTittle = document.getElementById('longbreak');

let workTime = 1;
let breakTime = 1;
let longBreakTime = 1;

let seconds = 0;
let totalSeconds = 0;
let breakCount = 0;
let breakTaken = false;

let currentMinutes = workTime - 1;
let remainingSeconds = 0;
let intervalId;

const clickSound = new Audio('/static/audio/hotel-bell-ding-1-174457.mp3');
const endingSound = new Audio('/static/audio/kitchen-timer-87485.mp3');

window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds < 10 ? "0" + seconds : seconds; // Add a leading zero if needed

    workTittle.classList.add('active');
};

function start() {
    document.getElementById('start').disabled = false;

    document.getElementById('start').style.display = "none";
    document.getElementById('pause').style.display = "inline-block";
    document.getElementById('reset').style.display = "inline-block";

    seconds = remainingSeconds || 59;
    playClickSound();

    let timerFunction = () => {
        document.getElementById('minutes').innerHTML = currentMinutes;
        document.getElementById('seconds').innerHTML = seconds < 10 ? "0" + seconds : seconds;

        totalSeconds = currentMinutes * 60 + seconds;

        if (totalSeconds === 12) {
            playEndingSound();
        }

        if (seconds < 0) {
            seconds = 59;
            currentMinutes = currentMinutes - 1;
        }

        seconds = seconds - 1;

        if (currentMinutes === -1) {
            clearInterval(intervalId);
            if (!breakTaken) {
                currentMinutes = breakTime - 1;
                breakCount++;
                breakTaken = true;

                workTittle.classList.remove('active');
                breakTittle.classList.add('active');
            } else {
                breakTaken = false;
                if (breakCount % 4 === 0) {
                    currentMinutes = longBreakTime - 1;
                    breakTittle.classList.remove('active');
                    longBreakTittle.classList.add('active');
                } else {

                    currentMinutes = workTime - 1;
                    breakTittle.classList.remove('active');
                    workTittle.classList.add('active');
                }

                breakCount++;
            }

            remainingSeconds = 0;
            start();
        }
    };

    intervalId = setInterval(timerFunction, 1000);
}

function pause() {
    document.getElementById('start').style.display = "inline-block";
    document.getElementById('pause').style.display = "none";
    document.getElementById('reset').style.display = "inline-block";

    remainingSeconds = seconds;

    clearInterval(intervalId);
}

function setLongBreak() {
    document.getElementById('start').style.display = "inline-block";
    document.getElementById('pause').style.display = "none";
    document.getElementById('reset').style.display = "inline-block";

    document.getElementById('minutes').innerHTML = longBreakTime;
    document.getElementById('seconds').innerHTML = seconds < 10 ? "0" + seconds : seconds;

    workTittle.classList.remove('active');
    breakTittle.classList.remove('active');
    longBreakTittle.classList.add('active');

    currentMinutes = longBreakTime - 1;
    breakTaken = true;

    function setWork() {
        document.getElementById('start').disabled = false;

        document.getElementById('minutes').innerHTML = workTime;
        document.getElementById('seconds').innerHTML = seconds < 10 ? "0" + seconds : seconds;

        workTittle.classList.add('active');
        breakTittle.classList.remove('active');
        longBreakTittle.classList.remove('active');

        currentMinutes = workTime - 1;
        remainingSeconds = 0;
        clearInterval(intervalId);

        document.getElementById('start').style.display = "inline-block";
        document.getElementById('pause').style.display = "none";
        document.getElementById('reset').style.display = "inline-block";
    }

    function setLongBreak() {
        document.getElementById('start').disabled = false;

        document.getElementById('minutes').innerHTML = longBreakTime;
        document.getElementById('seconds').innerHTML = seconds < 10 ? "0" + seconds : seconds;

        workTittle.classList.remove('active');
        breakTittle.classList.remove('active');
        longBreakTittle.classList.add('active');

        currentMinutes = longBreakTime - 1;
        remainingSeconds = 0;
        clearInterval(intervalId);

        document.getElementById('start').style.display = "inline-block";
        document.getElementById('pause').style.display = "none";
        document.getElementById('reset').style.display = "inline-block";
    }

    workTittle.onclick = setWork;

    longBreakTittle.onclick = setLongBreak;

}
longBreakTittle.onclick = setLongBreak;

// reset timer
function reset(event) {
    event.preventDefault(); // Prevent the default behavior of the button click

    // Stop the timer
    clearInterval(intervalId);

    // Reset timer variables
    seconds = 0;
    currentMinutes = workTime - 1;
    remainingSeconds = 0;
    breakCount = 0;
    breakTaken = false;

    // Update the display
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds < 10 ? "0" + seconds : seconds;

    // Remove active class from all session types
    workTittle.classList.remove('active');
    breakTittle.classList.remove('active');
    longBreakTittle.classList.remove('active');

    // Add active class to the work session
    workTittle.classList.add('active');

    // Change button display
    document.getElementById('start').style.display = "inline-block";
    document.getElementById('pause').style.display = "none";
    document.getElementById('reset').style.display = "none";

    // Clear the stored timer state
    localStorage.removeItem('timerState');
}

document.getElementById('reset').onclick = reset;

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}

function playEndingSound() {
    endingSound.currentTime = 0;
    endingSound.play();
}