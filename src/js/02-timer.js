import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputDateTimeRef = document.querySelector('#datetime-picker');
const btnStartRef = document.querySelector('button[data-start]');
btnStartRef.disabled = true;
const secondsRef = document.querySelector('span[data-seconds]');
const minutesRef = document.querySelector('span[data-minutes]');
const hoursRef = document.querySelector('span[data-hours]');
const daysRef = document.querySelector('span[data-days]');
const timerHtmlRef = document.querySelector('.timer');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStartRef.disabled = true;
    } else {
      btnStartRef.disabled = false;
    }
  },
};

flatpickr(inputDateTimeRef, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

btnStartRef.addEventListener('click', () => {
  let timer = setInterval(() => {
    let countdown = new Date(inputDateTimeRef.value) - new Date();
    btnStartRef.disabled = true;
    if (countdown >= 0) {
      let timeObject = convertMs(countdown);
      daysRef.textContent = addLeadingZero(timeObject.days);
      hoursRef.textContent = addLeadingZero(timeObject.hours);
      minutesRef.textContent = addLeadingZero(timeObject.minutes);
      secondsRef.textContent = addLeadingZero(timeObject.seconds);
      if (countdown <= 10000) {
        timerHtmlRef.style.color = 'tomato';
      }
    } else {
      Notiflix.Notify.success('Countdown finished');
      timerHtmlRef.style.color = 'black';
      clearInterval(timer);
    }
  }, 1000);
});