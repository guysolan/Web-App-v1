import Ball from "./Ball.js"
import Sensor from "./sensor.js"
import Memory from "./memory.js"

const ball = new Ball(document.getElementById("ball"))

const ellipse1 = document.getElementById("ellipse1")
const ellipse2 = document.getElementById("ellipse2")
const ellipse3 = document.getElementById("ellipse3")

const red_spot = document.getElementById('red-spot')
const green_spot = document.getElementById('blue-spot')
const blue_spot = document.getElementById('green-spot')

const blob_1 = new Sensor(ellipse1)
const blob_2 = new Sensor(ellipse2)
const blob_3 = new Sensor(ellipse3)

const videoMemory = new Memory('Video')
const audioMemory = new Memory('Audio')

const terminal_para = document.getElementById('terminal-para')
// const CCTVData = document.getElementById('cctv-data')
const micData = document.getElementById('mic-data')

const vidRate = 7 / 8;
const audioRate = 0.32 / 8;

let lastTime

function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime
    ball.update(delta)
    // computerPaddle.update(delta, ball.y)
    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    )

    checkCollision(blob_1, red_spot)
    checkCollision(blob_2, red_spot)
    checkCollision(blob_3, red_spot)

    // CCTV_blob.printDataFlow(micData)
    // microphone_blob.printDataFlow(CCTVData,cctvDataStream)

    streamData(videoMemory, vidRate, red_spot)
    streamData(audioMemory, audioRate, green_spot)
    streamData(videoMemory, vidRate, blue_spot)
    // Adjust audio rate for time not spent speaking on video call
    streamData(audioMemory, audioRate / 5, blue_spot)

    document.documentElement.style.setProperty("--hue", hue + delta * 0.01)

  }

  lastTime = time
  window.requestAnimationFrame(update)
}

// function checkCollision(ob1, ob2){
// //   let rect = ellipse.rect()
// //   let rect = ellipse.rect()

//     if (rect.right >= ball.rect().left && rect.left <= ball.rect().right && rect.top <= ball.rect().bottom && rect.bottom >= ball.rect().top) {
//     spot.classList.add('active')
//     console.log(ellipse)
//     terminal_para.innerText = `Spotted by CCTV Camera`
//     }
// }

function checkCollision(ellipse, spot) {
  let rect = ellipse.rect()

  if (rect.right >= ball.rect().left && rect.left <= ball.rect().right && rect.top <= ball.rect().bottom && rect.bottom >= ball.rect().top) {
    spot.classList.add('active')
    console.log(ellipse)
    terminal_para.innerText = `Spotted by CCTV Camera`



  } else {
    spot.classList.remove('active')
    terminal_para.innerText = ``
  }
}

function streamData(memory, rate, spot) {
  if (spot.classList.contains('active')) {
    console.log('Streaming')

    memory.fill(rate)
    console.log(`${memory.name} stored: ${memory.stored} Mb`)
    return memory.stored
  }
}

window.requestAnimationFrame(update)