import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDateRef = document.querySelector('#datetime-picker');
const buttonStartRef = document.querySelector('[data-start]');
const textDaysRef = document.querySelector('[data-days]');
const textHoursRef = document.querySelector('[data-hours]');
const textMinutesRef = document.querySelector('[data-minutes]');
const textSecondsRef = document.querySelector('[data-seconds]');

let selectedDate = null;
const timerIDs = {
  timerСountdown: null,
};

const setDisabledForButtonStart = state => {
  buttonStartRef.disabled = state;
};

const setDisabledForInputDate = state => {
  inputDateRef.disabled = state;
};

setDisabledForButtonStart(true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      selectedDate = null;
      setDisabledForButtonStart(true);
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      return;
    }

    selectedDate = selectedDates[0];
    setDisabledForButtonStart(false);
  },
};

const addLeadingZero = value => {
  return value.toString().padStart(2, 0);
};

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

const onButtonStartClick = () => {
  setDisabledForButtonStart(true);
  setDisabledForInputDate(true);
  timerIDs.timerСountdown = setInterval(() => {
    const delta = selectedDate - Date.now();
    if (delta <= 0) {
      clearInterval(timerIDs.timerСountdown);
      setDisabledForInputDate(false);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(delta);
    textDaysRef.textContent = addLeadingZero(days);
    textHoursRef.textContent = addLeadingZero(hours);
    textMinutesRef.textContent = addLeadingZero(minutes);
    textSecondsRef.textContent = addLeadingZero(seconds);
  }, 1000);
};

flatpickr(inputDateRef, options);

buttonStartRef.addEventListener('click', onButtonStartClick);
