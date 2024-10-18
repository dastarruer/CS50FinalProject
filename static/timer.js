// A timer to time the amount of time the user spends typing
export const timer = {
    startTime: null,
    timerInterval: null,
    elapsedTimeMinutes: null,

    startTimer: function () {
        this.startTime = new Date().getTime();
        this.timerInterval = setInterval(() => {
            // Rounds to two decimal points
            this.elapsedTimeMinutes =
                Math.round(((new Date().getTime() - this.startTime) / 1000 / 60) * 100) / 100;
            document.getElementById("timer").innerHTML =
                this.elapsedTimeMinutes;
        }, 1000);
    },

    stopTimer: function () {
        clearInterval(this.timerInterval);
    },
};
