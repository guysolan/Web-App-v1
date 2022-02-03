export default class Phone {
    constructor(personKey) {
        this.personKey = personKey

        // this.totalMemory = chooseFrom([512, 1, 2, 4]) //GB/TB
        // this.cores = chooseFrom([4, 8, 16])
        // this.clockSpeed = randomBetween([1, 6]) //Gigahertz
        this.drive = {
            video: '',
            audio: '',
            vitals: {}
        }
        this.space = {
            video: new TextEncoder().encode(this.drive.video).length/1000,
            audio: new TextEncoder().encode(this.drive.audio).length/1000,
            vitals: new TextEncoder().encode(this.drive.vitals).length/1000,
            // total: this.space.video+this.space.audio+this.space.vitals 
        }
    }

    writeToFile(type, data) {
        this.drive[type].append(data)
    }

    extractVitalsFromVideo(x1_hashed) {
        vitals = {
            BPM: 12,
            Temperature: 36.9
        }
        return vitals
    }
    
    extractVitalsFromAudio(y1_hashed) {
    
        decryption = decryptt(hash)
    
        vitals = {
            BPM: 12,
            Temperature: 36.9
        }
        return vitals
    }
}