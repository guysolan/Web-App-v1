export default class videoCall {
    constructor() {
      this.sendingData = false
    }

    // input is an array of one or many peoples appearance/sounds
    sendData(input) {
      this.sendingData = true
  
      let outout = input
  
      return outout
    }

    sendVideo(){
      length = 400
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
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