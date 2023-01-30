

const refs = {
  body: document.querySelector('body'),
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
};

let idIntervalColor = null;

refs.buttonStart.addEventListener('click', startColorChange);
refs.buttonStop.addEventListener('click', stopColorChange);

function startColorChange (){
  idIntervalColor = setInterval(getRandomHexColor, 1000);
  refs.buttonStart.disabled = true;
};

function stopColorChange () {
  clearInterval(idIntervalColor);
  refs.buttonStart.disabled=false;
}

function getRandomHexColor() {
  refs.body.style.backgroundColor=`#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
