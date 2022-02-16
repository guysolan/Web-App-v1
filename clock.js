export default class Clock{
    constructor(dateElem, sunMoonElem) {
        this.dateElem = dateElem;
        this.sunMoonElem = sunMoonElem;
    }

    passTime(){
        let currentDay = parseInt(this.dateElem.innerHTML)
        this.dateElem.innerHTML = String(currentDay + 1);
    }
}