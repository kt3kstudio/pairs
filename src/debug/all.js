// displaying current point
window.debug = window.debug || {};
debug.PointBox = {
    reset: function () {
    },
    getCount: function (gender0, gender1) {
        return parseInt(this.getTarget(gender0, gender1).text());
    },
    setCount: function (gender0, gender1, count) {
        this.getTarget(gender0, gender1).text(count);
    },
    countUp: function (gender0, gender1) {
        this.setCount(gender0, gender1, this.getCount(gender0, gender1) + 1);
    },
    reset: function () {
        this.setCount('f', 'f', 0);
        this.setCount('m', 'f', 0);
        this.setCount('f', 'm', 0);
        this.setCount('m', 'm', 0);
    },
    getTarget: function (gender0, gender1) {
        var genderPair = gender0 + gender1;
        return $('.point .' + genderPair);
    }
};

window.debug = window.debug || {};
debug.ScoreBox = {
    add: function (point) {
        this.setScore(this.getScore() + point);
    },
    getScore: function () {
        return parseInt(this.getTarget().text());
    },
    setScore: function (score) {
        this.getTarget().text(score);
    },
    reset: function () {
        this.setScore(0);
    },
    getTarget: function () {
        return $('.point .level-score');
    }
};
