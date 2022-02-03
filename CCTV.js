export default class CCTVs {
  constructor(sensorElem) {
    this.sensorElem = sensorElem
    this.sendingData = false
    this.currentView = currentView()
  }

  rect() {
    return this.sensorElem.getBoundingClientRect()
  }

  // input is an array of one or many peoples appearance/sounds
  sendData(input) {
    this.sendingData = true

    let outout = input

    return outout
  }
  
  spotPerson(person){
    this.currentView = currentView()
    this.currentView = this.currentView + person.biomarkers()
  }

  newView(){
    length = 400
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }
}

function  currentView() {
  length = 400
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}