import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const button = document.querySelector('button[data-start]');
const day = document.querySelector('.value[data-days]');
const hour = document.querySelector('.value[data-hours]');
const minute = document.querySelector('.value[data-minutes]');
const second = document.querySelector('.value[data-seconds]');

button.disabled = true;
let userSelectedDate = null;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const dayss = Math.floor(ms / day);
  const days = String(dayss).padStart(2, '0');
  // Remaining hours
  const hourss = Math.floor((ms % day) / hour);
  const hours = String(hourss).padStart(2, '0');
  // Remaining minutes
  const minutess = Math.floor(((ms % day) % hour) / minute);
  const minutes = String(minutess).padStart(2, '0');
  // Remaining seconds
  const secondss = Math.floor((((ms % day) % hour) % minute) / second);
  const seconds = String(secondss).padStart(2, '0');

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      iziToast.warning({
        backgroundColor: 'red',
        position: 'center',
        title: 'Caution',
        message: 'Please choose a date in the future',
      });
      selectedDates[0] = new Date();
    } else {
      button.disabled = false;
      userSelectedDate = selectedDates[0];
    }
  },
};

flatpickr(input, options);

function startCounter(event) {
  const temer = setInterval(() => {
    const currentDate = Date.now();
    const timerTime = userSelectedDate - currentDate;
    const counter = convertMs(timerTime);
    button.disabled = true;
    input.disabled = true;
    counterUpdate(counter);
    if (timerTime < 999) {
      clearInterval(temer);
      button.disabled = false;
      input.disabled = false;
    }
  }, 1000);

  function counterUpdate({ days, hours, minutes, seconds }) {
    day.textContent = days;
    hour.textContent = hours;
    minute.textContent = minutes;
    second.textContent = seconds;
  }
}
button.addEventListener('click', startCounter);
