export default class Sensor {
  constructor(sensorElem) {
    this.sensorElem = sensorElem
  }

  rect() {
    return this.sensorElem.getBoundingClientRect()
  }


}