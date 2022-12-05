import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const selectedDatesUnix = selectedDates[0].getTime();
      let id = null;

      if (Date.now() > selectedDatesUnix) {
          Notiflix.Notify.failure('Please choose a date in the future');

          buttonStartTimer.disable = true;
          return;
      } else {
          buttonStartTimer.disable = false;
      }
  },
};

const inputDataEl = document.querySelector('#datetime-picker');
flatpickr(inputDataEl, options);
const buttonStartTimer = document.querySelector('button[data-start]');
buttonStartTimer.addEventListener('click', () => {
    const timer = {
        timerDeadline: new Date(inputDataEl.value),
        intervalId: null,
        rootSelector: document.querySelector('.timer'),

            start() {
        this.intervalId = setInterval(() => {
            const ms = this.timerDeadline - Date.now();

            if (ms <= 0) {
                this.stop();

                return; 
            }

            const { days, hours, minutes, seconds } = this.convertMs(ms);

            this.rootSelector.querySelector('.js-timer__days').textContent = this.addLeadingZero(days);
            this.rootSelector.querySelector('.js-timer__hours').textContent = this.addLeadingZero(hours);
            this.rootSelector.querySelector('.js-timer__minutes').textContent = this.addLeadingZero(minutes);
            this.rootSelector.querySelector('.js-timer__seconds').textContent = this.addLeadingZero(seconds);
        }, 1000);
        },
        
        stop() {
        clearInterval(this.intervalId);
        },
        
        convertMs(ms) {

            const days = Math.floor(ms / 1000 / 60 / 60 / 24);
            const hours = Math.floor(ms / 1000 / 60 / 60) % 24;
            const minutes = Math.floor(ms / 1000 / 60) % 60; 
            const seconds = Math.floor(ms / 1000) % 60;
            
            return { days, hours, minutes, seconds };
        },        
        addLeadingZero(value) {
        return String(value).padStart(2, 0);
    },
};

timer.start();
})
