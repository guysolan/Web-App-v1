export default class Person {
    constructor(personElement) {
        this.personElement = personElement
        this.personKey = 'asdfasdfasdf'

        // Fundamentals
        this.gender = random()
        this.DOB = random()

        //   Vital
        this.bpm = gaussian()
        this.breathRate = gaussian()

    }
    
    biomarkers(type) {
        hashedVitals = encrypt(this.vitals)
        return hashedVitals
    }
}


class Phone {
    constructor(personKey) {
        this.personKey = personKey

        this.totalMemory = chooseFrom([512, 1, 2, 4]) //GB/TB
        this.cores = chooseFrom([4, 8, 16])
        this.clockSpeed = randomBetween([1, 6]) //Gigahertz
        this.drive = {
            video: [],
            audio: [],
            vitals: []
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


const person1 = new Person(personElement)
const phone1 = new Phone(person.personHash)


