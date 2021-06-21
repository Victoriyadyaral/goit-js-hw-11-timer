const refs = {
    dateAddButton: document.querySelector('[data-action="add-date"]'),
    timerRemoveButton: document.querySelector('[data-action="remove-timer"]'),
    timer: document.querySelector('.timer'),
    daysTimer: document.querySelector('[data-value="days"]'),
    hoursTimer: document.querySelector('[data-value="hours"]'),
    minsTimer: document.querySelector('[data-value="mins"]'),
    secsTimer: document.querySelector('[data-value="secs"]'),
    currentDay: document.querySelector('[data-value="current-days"]'),
    currentMonth: document.querySelector('[data-value="current-month"]'),
    currentYear: document.querySelector('[data-value="current-year"]'),
    inputs: document.querySelectorAll('.form__input'),
};

class Timer {
    constructor() {
        this.intervaiId = null;
        this.isActive = false;
    }

    start() {
        if (this.isActive) {
      return;
        }
    
        const startTime = new Date(`${refs.currentYear.value}, ${refs.currentMonth.value}, ${refs.currentDay.value}`).getTime();
        if (startTime < Date.now() || isNaN(startTime)) {
            this.clearInput();
            return;
        }

        this.isActive = true;
        this.intervaiId = setInterval(() => {
                const currentTime = Date.now();
                const differenceTime = startTime - currentTime;
                const timeComponents = this.getTimeComponents(differenceTime);
                this.updateTimer(timeComponents);
        }, 1000)
    }

    stop() {
        clearInterval(this.intervaiId);
        this.isActive = false;
        this.clearInput();
        this.clearTimer();  
    }

    clearInput() {
        refs.currentYear.value = '';
        refs.currentMonth.value = '';
        refs.currentDay.value = '';
    }

    clearTimer() {
        refs.daysTimer.textContent = '00';
        refs.hoursTimer.textContent = '00';
        refs.minsTimer.textContent = '00';
        refs.secsTimer.textContent = '00';
}
    
    pad(value) {
    return String(value).padStart(2, '0');
    }
  
    getTimeComponents(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
}

  updateTimer ({ days, hours, mins, secs }) {
    refs.daysTimer.textContent = `${days}`;
    refs.hoursTimer.textContent = `${hours}`;
    refs.minsTimer.textContent = `${mins}`;
    refs.secsTimer.textContent = `${secs}`;
}
}

const timer = new Timer();

refs.dateAddButton.addEventListener('click', timer.start.bind(timer));
refs.timerRemoveButton.addEventListener('click', timer.stop.bind(timer));