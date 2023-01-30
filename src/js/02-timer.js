import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";
import "notiflix/dist/notiflix-3.2.6.min.css";


const refs = {
  dateTime: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  timerDays: document.querySelector('span[data-days]'),
  timerHours: document.querySelector('span[data-hours]'),
  timerMinutes: document.querySelector('span[data-minutes]'),
  timerSeconds: document.querySelector('span[data-seconds]'),
};

let endingTime = Date.now();
// console.log(endingTime)

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // minDate: "today",
  onClose(selectedDates) {
    if (selectedDates[0] < endingTime) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.startBtn.disabled = true;
      return 
    } else {
      endingTime = selectedDates[0];
      // console.log(endingTime);
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

class Timer {
  constructor({onTick}) {
    this.intervalId = null;

    // this.isActive = false;
    this.onTick = onTick;
    this.init();
  }

  init(){
    const time = this.convertMs(0);
    this.onTick(time)
  }

  start() {
    // if (this.isActive){
    //   return;
    // }
    // const startDate = Date.now();
    // this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();

      const deltaTime = endingTime - currentTime;
      console.log(deltaTime);

      const time = this.convertMs(deltaTime);

      this.onTick(time);

      if (deltaTime <= 1000){
        this.stop()
      }
    }, 1000);
  }

  stop(){
    clearInterval(this.intervalId);
    Notiflix.Notify.failure('The time has come');
    refs.startBtn.disabled = true;
    // this.isActive = false;
    const time = this.convertMs(0);
    this.onTick(time)
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = this.pad(Math.floor(ms / day));
    // Remaining hours
    const hours = this.pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  };
  
  pad (value){
    return String(value).padStart(2, '0');
  };
};

const timer = new Timer({
  onTick: apdateTimerFace,
});

refs.startBtn.addEventListener('click', timer.start.bind(timer));

function apdateTimerFace ({ days, hours, minutes, seconds }) {
  console.log(`${days} : ${hours} : ${minutes} : ${seconds}`);
  refs.timerDays.textContent = (`${days}`);
  refs.timerHours.textContent = (`${hours}`);
  refs.timerMinutes.textContent = (`${minutes}`);
  refs.timerSeconds.textContent = (`${seconds}`);
}

