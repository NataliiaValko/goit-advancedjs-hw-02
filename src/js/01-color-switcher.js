const buttonStartRef = document.querySelector('[data-start]');
const buttonStopRef = document.querySelector('[data-stop]');
const bodyRef = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const timerIDs = {
  timerChangeColor: null,
};

const setDisableOnButton = timerID => {
  buttonStartRef.disabled = Boolean(timerID);
  buttonStopRef.disabled = !Boolean(timerID);
};

const onButtonStartClick = () => {
  timerIDs.timerChangeColor = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);

  setDisableOnButton(timerIDs.timerChangeColor);
};

const onButtonStopClick = () => {
  clearInterval(timerIDs.timerChangeColor);
  timerIDs.timerChangeColor = null;

  setDisableOnButton(timerIDs.timerChangeColor);
};

setDisableOnButton(timerIDs.timerChangeColor);

buttonStartRef.addEventListener('click', onButtonStartClick);

buttonStopRef.addEventListener('click', onButtonStopClick);
