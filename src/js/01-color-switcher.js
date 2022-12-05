
const startBtn = document.querySelector('button[data-start]');
// console.log(startBtn);
const stopBtn = document.querySelector('button[data-stop]');
// console.log(stopBtn);
let bodyEl = document.querySelector('body');
// console.log(bodyEl);

let timerId = null;
stopBtn.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener("click", () => {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(timerId);
});

console.log(bodyEl);