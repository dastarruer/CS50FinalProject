// A timer to time the amount of time the user spends typing
export const timer = {
    startTime: null,
    timerInterval: null,
    elapsedTime: null,

    startTimer: function () {
        this.startTime = new Date().getTime();
        this.timerInterval = setInterval(() => {
            this.elapsedTime = (new Date().getTime() - this.startTime) / 1000;
        }, 1000);
    },

    stopTimer: function () {
        clearInterval(this.timerInterval);
    },
}
