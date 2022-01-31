const INITIAL_VELOCITY = 0.01
const VELOCITY_INCREASE = 0.0
const blue_spot = document.getElementById('blue-spot')
const green_spot = document.getElementById('green-spot')
const start_V = 0.01

export default class Ball {
  constructor(ballElem) {
    this.ballElem = ballElem
    this.reset()
  }

  get x() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"))
  }

  set x(value) {
    this.ballElem.style.setProperty("--x", value)
  }

  get y() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"))
  }

  set y(value) {
    this.ballElem.style.setProperty("--y", value)
  }

  rect() {
    return this.ballElem.getBoundingClientRect()
  }

  reset() {
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

  call(sensor_classname, spot, prob_on, prob_off, stop = false) {
    if (this.ballElem.classList.contains(sensor_classname)) {
      spot.classList.add('active')
      if (Math.round(randomNumberBetween(0, prob_off)) === 5) {
        if (stop) {
          this.start()
        }
        this.ballElem.classList.remove(sensor_classname)
      }
    } else {
      spot.classList.remove('active')
      if (Math.round(randomNumberBetween(0, prob_on)) === 5) {
        if (stop) {
          this.stop()
        }
        this.ballElem.classList.add(sensor_classname)
      }
    }
  }


  stop() {
    this.velocity = 0
  }

  start() {
    this.velocity = start_V
  }

  update(delta) {

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

    this.direction.x += changeX
    this.direction.y -= changeY

    this.call('video-call', blue_spot, 500, 80, true)
    this.call('audio-call', green_spot, 300, 80, false)


    this.x += (this.direction.x) * this.velocity * delta
    this.y += (this.direction.y) * this.velocity * delta

    this.velocity += VELOCITY_INCREASE * delta

  }
}

function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min
}