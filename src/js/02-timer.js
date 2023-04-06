import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const dataStart = document.querySelector('[data-start]');

dataStart.setAttribute('disabled', true);
dataStart.addEventListener('click', onDataStartClick);

let date = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    dataStart.removeAttribute('disabled');
    date = selectedDates[0];
  },
};

flatpickr('#datetime-picker', options);

function onDataStartClick() {
  const time = setInterval(() => {
    const currentTime = date - new Date();
    if (currentTime < 0) {
      clearInterval(time);
      return;
    }
    const { days, hours, minutes, seconds } = convert(currentTime);
    dataDays.textContent = days;
    dataHours.textContent = hours;
    dataMinutes.textContent = minutes;
    dataSeconds.textContent = seconds;
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convert(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
