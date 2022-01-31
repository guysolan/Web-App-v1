export default class Memory {
    constructor(name, stored=0) {
      this.name = name
      this.stored = stored
    }
    fill(rate){
      this.stored += rate
    }
  }