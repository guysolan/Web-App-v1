import Phone from "./phone.js"
import * as maths from './maths.js'

const blue_spot = document.getElementById('blue-spot')
const green_spot = document.getElementById('green-spot')
const start_V = 0.005

const heartRate = document.getElementById('heartRate')
const breathingRate = document.getElementById('breathingRate')
const temperature = document.getElementById('temperature')

export default class Person {

    constructor(personElement) {
        this.personElement = personElement
        this.personElement.classList.remove('hidden')

        //Create a key to represent the users face
        this.personKey = 'asdfasdfasdf'

        this.phone = new Phone(this.personKey)

        // -------Inputs from NHS---------

        //Gender Randomly Assigned
        if (Math.round(Math.random()) === 1) {
            this.female = true
        } else {
            this.female = false
        }

        // 
        this.DOB = randomDate(new Date(1942, 0, 1), new Date(2024, 0, 1))

        //Age Randomly Assigned between 18 and 100
        this.age = randomNumberBetween(18, 100)

        //Heart Rate, Body Temp and Respitory Rate normally distrubuted and adjusted by age 
        this.heartRate = gaussian(79.1, 14.5) + (this.getAge() - 50) / (randomNumberBetween(3, 8))
        this.bodyTemp = gaussian(36.6, 0.149) - ((this.getAge() - 50) / 100) * (-0.021)
        this.breathingRate = gaussian(40, 5);

        this.resetPosition()
    }

    getAge() {
        let ageSeconds = (new Date(2042, 0, 1).getTime() - this.DOB.getTime())
        return Math.round(ageSeconds / 1000 / 60 / 60 / 24 / 365)
    }

    rect() {
        return this.personElement.getBoundingClientRect()
    }

    biomarkers() {
        return `encoded(${this.heartRate})encoded(${this.bodyTemp})encoded(${this.breathingRate})encoded(${this.bloodPressure}|`
    }

    takeCall(sensor_classname, spot, prob_on, prob_off, video = false) {
        if (this.personElement.classList.contains(sensor_classname)) {
            if (Math.round(randomNumberBetween(0, prob_off)) === 5) {
                if (video) {
                    this.start()
                }
                this.personElement.classList.remove(sensor_classname)
            }
        } else {
            spot.classList.remove('active')
            if (Math.round(randomNumberBetween(0, prob_on)) === 5) {
                if (video) {
                    this.stop()
                }
                this.personElement.classList.add(sensor_classname)
            }
        }
    }

    // ------------------------------------------
    // -----------------MOVEMENT-----------------
    // ------------------------------------------

    get x() {
        return parseFloat(getComputedStyle(this.personElement).getPropertyValue("--x"))
    }

    set x(value) {
        this.personElement.style.setProperty("--x", value)
    }

    get y() {
        return parseFloat(getComputedStyle(this.personElement).getPropertyValue("--y"))
    }

    set y(value) {
        this.personElement.style.setProperty("--y", value)
    }

    stop() {
        this.velocity = 0
    }

    start() {
        this.velocity = start_V
    }

    resetPosition() {
        this.x = 75 + (Math.random() - 0.5) * 40
        this.y = 50 + (Math.random() - 0.5) * 40
        this.direction = {
            x: 0
        }

        while (
            Math.abs(this.direction.x) <= 0.99
        ) {
            const heading = randomNumberBetween(0, 2 * Math.PI)
            this.direction = {
                x: Math.cos(heading),
                y: Math.sin(heading)
            }
        }
        // this.velocity = INITIAL_VELOCITY
        this.velocity = start_V
    }

    showVitals(){
        let hr = maths.twoDP(this.heartRate)
        let br = maths.twoDP(this.breathingRate)
        let temp = maths.twoDP(this.bodyTemp)
        heartRate.innerText = `| ${hr} |`
        breathingRate.innerText = `|  ${br} |`
        temperature.innerText = `|  ${temp} |`
      }

    updatePosition(delta) {

        if(Math.round(randomNumberBetween(0,120))==10){
            this.heartRate += this.heartRate*(randomNumberBetween(0,1)-0.5)*0.01
            this.breathingRate += this.breathingRate*(randomNumberBetween(0,1)-0.5)*0.01
            this.bodyTemp += this.bodyTemp*(randomNumberBetween(0,1)-0.5)*0.01
        }

        this.showVitals()

        let maxV = 0.5
        let changeF = maxV / 10

        let changeX = randomNumberBetween(-changeF, changeF)
        let changeY = randomNumberBetween(-changeF, changeF)


        if (this.direction.x > maxV) {
            // console.log('Too quick X')
            changeX = randomNumberBetween(-changeF, 0)
        } else if (this.direction.x < -maxV) {
            // console.log('Too quick X')
            changeX = randomNumberBetween(0, changeF)
        }

        if (this.direction.y > maxV) {
            // console.log('Too quick Y')
            changeY = randomNumberBetween(0, changeF)

        } else if (this.direction.x < -maxV) {
            // console.log('Too quick Y')
            changeY = randomNumberBetween(-changeF, 0)
        }

        let repulsePower = 2

        if (this.x < 55) {
            // console.log('too left')
            let closeLeft = ((this.x - 50) / repulsePower)
            changeX = randomNumberBetween(0, changeF) / closeLeft
        } else if (this.x > 90) {
            // console.log('too right')
            let closeRight = ((95 - this.x) / repulsePower)
            changeX = randomNumberBetween(-changeF, 0) / closeRight
        }

        if (this.y > 80) {
            // console.log('too low')
            let closeBottom = ((90 - this.y) / repulsePower)
            changeY = randomNumberBetween(0, changeF) / closeBottom
        } else if (this.y < 20) {
            // console.log('too high')
            let closeTop = ((this.y - 10) / repulsePower)
            changeY = randomNumberBetween(-changeF, 0) / closeTop
        }

        // -------------------------------------------------------------------------
        // ------------------------Take Video and Phone Calls-----------------------
        // -------------------------------------------------------------------------

        this.takeCall('video-call', blue_spot, 1200, 200, true)
        this.takeCall('phone-call', green_spot, 1000, 100, false)

        // ------------------------------------------------------------------------

        this.direction.x += changeX
        this.direction.y -= changeY

        this.x += (this.direction.x) * this.velocity * delta
        this.y += (this.direction.y) * this.velocity * delta

    }
}


function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min
}


function gaussian(mean, stdev) {
    let y2;
    let use_last = false;
    let y1;
    if (use_last) {
        y1 = y2;
        use_last = false;
    } else {
        let x1, x2, w;
        do {
            x1 = 2.0 * Math.random() - 1.0;
            x2 = 2.0 * Math.random() - 1.0;
            w = x1 * x1 + x2 * x2;
        } while (w >= 1.0);
        w = Math.sqrt((-2.0 * Math.log(w)) / w);
        y1 = x1 * w;
        y2 = x2 * w;
        use_last = true;
    }

    let retval = mean + stdev * y1;
    if (retval > 0)
        return retval;
    return -retval;
}