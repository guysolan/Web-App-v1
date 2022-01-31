export default class Sensor {

    sensorElem: HTMLElement
    spot: HTMLElement
    dataStream: number
    // value: string

    constructor(sensorElem, spot, dataStream) {
      this.sensorElem = sensorElem
      this.spot = spot
      this.dataStream = dataStream
    }

    get height() {
      return parseFloat(getComputedStyle(this.sensorElem).getPropertyValue("height"))
    }
  
    set height(value: any) {
      this.sensorElem.style.setProperty("--x", value)
    }


    rect() {
      return this.sensorElem.getBoundingClientRect()
    }

    printDataFlow(terminalText, dataStream){
      if (this.spot.classList.contains('active')){
        dataStream += 4.8
        console.log(dataStream)
        terminalText.innerText = `Incoming Video Data: ${dataStream} Mb`
      } else {}
        // terminalText.innerText =  `Incoming Video Data: 0 Mb`
    }
}