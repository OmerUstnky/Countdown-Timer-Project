const remaningDiv = document.getElementById('remaningDiv');
const remaningForm = document.getElementById('formDiv');
const dateInput = document.getElementById('date-picker');
const timeDiv = document.getElementById('timeDiv');
const timeSpans = document.querySelectorAll('span');
const resetButton = document.getElementById('reset');
const complete = document.querySelector('.complete');
const returnButton = document.querySelector('.returnButton');

let chosenDate = '';
let currentDateValue = new Date().getTime();
let currentTimeInterval;
let localStorageTime;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const today = new Date().toISOString().split('T')[0]; // bu kısım bugunun tarihini tut
dateInput.setAttribute('min', today);

function updateDOM() {
    currentTimeInterval = setInterval(() => {
        const current = currentDateValue - new Date().getTime();
        const days = Math.floor(current / day);
        const hours = Math.floor((current % day) / hour);
        const minutes = Math.floor((current % hour) / minute);
        const seconds = Math.floor((current % minute) / second);
        
        timeSpans[0].textContent = `${days}`;
        timeSpans[1].textContent = `${hours}`;
        timeSpans[2].textContent = `${minutes}`;
        timeSpans[3].textContent = `${seconds}`;

        if (current < 0) {
            remaningDiv.hidden = true;
            timeDiv.hidden = true;
            complete.hidden = false;
            clearInterval(currentTimeInterval);
        }
    }, -1000); 
}

function calculateTime(e) {
    e.preventDefault();
    chosenDate = dateInput.value;
    localStorageTime = {
        date: chosenDate,
    };
    localStorage.setItem('time', JSON.stringify(localStorageTime));

    if (chosenDate == '') {
        alert('Lütfen Tarih Giriniz...');
    } else {
        currentDateValue = new Date(chosenDate).getTime();
        updateDOM();
        remaningDiv.hidden = true;
        timeDiv.hidden = false;
    }
}

remaningForm.addEventListener('submit', calculateTime);

function resette() {
    clearInterval(currentTimeInterval);
    remaningDiv.hidden = false;
    timeDiv.hidden = true;
    complete.hidden = true;
    localStorage.removeItem('time'); 
}

resetButton.addEventListener('click', resette);
returnButton.addEventListener('click', resette);

function refleshTime() {
    if (localStorage.getItem('time')) {
        localStorageTime = JSON.parse(localStorage.getItem('time'));
        chosenDate = localStorageTime.date;
        currentDateValue = new Date(chosenDate).getTime();
        remaningDiv.hidden = true;
        timeDiv.hidden = false;
        updateDOM();
    }
}

refleshTime();