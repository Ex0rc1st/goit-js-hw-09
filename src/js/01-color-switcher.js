const btnStartRef = document.querySelector('button[data-start]');
const btnStopRef = document.querySelector('button[data-stop]');

btnStopRef.disabled = true;

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStartRef.addEventListener('click', () => {
  btnStartRef.disabled = true;
  btnStopRef.disabled = false;

  timerId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
});

btnStopRef.addEventListener('click', () => {
  clearInterval(timerId);
  btnStartRef.disabled = false;
  btnStopRef.disabled = true;
});