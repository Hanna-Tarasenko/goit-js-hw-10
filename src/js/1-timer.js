import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateTimeSelector = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button');
const dayData = document.querySelector('span[data-days]');
const hoursData = document.querySelector('span[data-hours]');
const minutesData = document.querySelector('span[data-minutes]');
const secondsData = document.querySelector('span[data-seconds');

let userSelectedDate = null;
let timerInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const isDateValid = selectedDate >= new Date();
    if (!isDateValid) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
    }
    startBtn.disabled = !isDateValid;
    userSelectedDate = isDateValid ? selectedDate : userSelectedDate;
  },
};

flatpickr(dateTimeSelector, options);
startBtn.addEventListener('click', handleClick);
function handleClick() {
  if (!userSelectedDate) return;
  startBtn.disabled = true;
  dateTimeSelector.disabled = true;

  timerInterval = setInterval(() => {
    const timeDifference = userSelectedDate - new Date();
    if (timeDifference <= 0) {
      clearInterval(timerInterval);
      updateTimer(0, 0, 0, 0);
      dateTimeSelector.disabled = false;
      return;
    }
    const time = convertMs(timeDifference);
    updateTimer(time.days, time.hours, time.minutes, time.seconds);
  }, 1000);
}

function updateTimer(days, hours, minutes, seconds) {
  dayData.textContent = insertZero(days);
  hoursData.textContent = insertZero(hours);
  minutesData.textContent = insertZero(minutes);
  secondsData.textContent = insertZero(seconds);
}

function insertZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
