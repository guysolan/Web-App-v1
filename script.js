import CCTV from "./CCTV.js"
import Clock from "./clock.js"
import Person from "./person.js"
import * as maths from './maths.js'
import * as diseases from './disease-graph.js'


const me = new Person(document.getElementById("ball"))
let people = [me]

const dateElem = document.getElementById('day')
const sunMoonElem = document.getElementById('sun-and-moon')
let clock = new Clock(dateElem, sunMoonElem)


function morePeople(peeps, numberPeople) {
  for (let i = 1; i < numberPeople; i++) {
    peeps[i] = new Person(document.getElementById(`ball-${i}`))
  }
}

// Get ellipse shapes for CCTV areas
const ellipse1 = document.getElementById("ellipse1")
const ellipse2 = document.getElementById("ellipse2")
const ellipse3 = document.getElementById("ellipse3")

// Get the text elements to display memory stored
const audio_memory = document.getElementById('audio-memory')
const video_memory = document.getElementById('video-memory')
const total_memory = document.getElementById('total-memory')

const red_spot = document.getElementById('red-spot')
const heartRate = document.getElementById('heartRate')

const CCTV_1 = new CCTV(ellipse1)
const CCTV_2 = new CCTV(ellipse2)
const CCTV_3 = new CCTV(ellipse3)

const allCCTV = [CCTV_1, CCTV_2, CCTV_3]

// Messages to Guide the User

const continueBtn = document.getElementById('continue-btn')
const introWords1 = document.getElementById('intro-words-1')
const introWords2 = document.getElementById('intro-words-2')
const videoCallMessage = document.getElementById('video-call-message')
const phoneCallMessage = document.getElementById('phone-call-message')
const CCTVMessage = document.getElementById('CCTV-message')
const startLearning1 = document.getElementById('start-learning-1')
const startLearning2 = document.getElementById('start-learning-2')
const startLearning3 = document.getElementById('start-learning-3')
const startLearning4 = document.getElementById('start-learning-4')
const startLearning5 = document.getElementById('start-learning-5')
const startLearning6 = document.getElementById('start-learning-6')
const dataStoredMessage = document.getElementById('data-stored-message')
const introMorePeople = document.getElementById('intro-more-people')

let lastTime

// Initial 'me' Stats
console.log(`Female? ${me.female}`)
console.log(`Age ${me.getAge()} year old`)
console.log(`HR ${me.heartRate} per minute`)
console.log(`Temp ${me.bodyTemp} degrees C`)

let pause = false;
let introCount = 1


// Queue the non-randomly timed messages
let startIntro = 15;
let startLearning = 3500;
let startAddingPeople = 7500;

// Track which messages have popped up
let videoMessageShown = false;
let phoneMessageShown = false;
let CCTVMessageShown = false;
let dataStoredMessageShow = false


function update(time) {

  if (lastTime != null && pause !== true) {

    if (introCount%500 == 0){
      clock.passTime()

    }

    introCount++;

    if (introCount == startIntro) {
      showMessage(introWords1);
    } else if (introCount == startIntro + 1) {
      showMessage(introWords2)
    } else if (introCount == startAddingPeople) {
      showMessage(introMorePeople)
    } else if (introCount === startAddingPeople + 1) {
      morePeople(people, 18)
    } else if (introCount === startLearning) {
      showMessage(startLearning1)
    } 
    else if (introCount == startLearning+1){
      showMessage(startLearning2)
    }
    else if (introCount == startLearning+2){
      showMessage(startLearning3)
    }
    else if (introCount == startLearning+3){
      showMessage(startLearning4)
    }
    else if (introCount == startLearning+4){
      showMessage(startLearning5)
    }
    else if (introCount == startLearning+5){
      showMessage(startLearning6)
    }
    // if (videoMessageShown == false || phoneMessageShown == true || CCTVMessageShown == true) {
    //   if(dataStoredMessageShow = true){
    //     showMessage(dataStoredMessage)
    //   }
    // }

    if (videoMessageShown == false && me.personElement.classList.contains('video-call')) {
      showMessage(videoCallMessage)
      videoMessageShown = true
    }
    if (phoneMessageShown == false && me.personElement.classList.contains('phone-call')) {
      showMessage(phoneCallMessage)
      phoneMessageShown = true

    }
    if (CCTVMessageShown == false && me.personElement.classList.contains('CCTV')) {
      showMessage(CCTVMessage)
      CCTVMessageShown = true

    }




    const delta = time - lastTime

    // Change Background
    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    )

    diseases.updateGraph()

    people.forEach((person) => {
      person.updatePosition(delta)
    })


    let videoInMemory = new TextEncoder().encode(me.phone.drive.video).length / 1000
    let audioInMemory = new TextEncoder().encode(me.phone.drive.audio).length / 1000
    let totalInMemory = videoInMemory + audioInMemory
    videoInMemory = maths.twoDP(videoInMemory)
    audioInMemory = maths.twoDP(audioInMemory)
    totalInMemory = maths.twoDP(totalInMemory)
    total_memory.innerText = `Total Data Stored: ${totalInMemory} Kb`
    video_memory.innerText = `Video Data Stored: ${videoInMemory} Kb`
    audio_memory.innerText = `Audio Data Stored: ${audioInMemory} Kb`


    useCCTV(allCCTV, people)
    onVideoCall(people)
    onPhoneCall(people)

    lightIcon(me, 'blue-spot', 'video-call')
    lightIcon(me, 'red-spot', 'CCTV')
    lightIcon(me, 'green-spot', 'phone-call')


    document.documentElement.style.setProperty("--hue", hue + delta * 0.01)


  }

  lastTime = time
  window.requestAnimationFrame(update)
}

function onVideoCall(people) {
  people.forEach((person) => {
    if (person.personElement.classList.contains('video-call')) {
      person.phone.drive.video += sendVideo(person.biomarkers())
      person.phone.drive.audio += sendAudio(person.biomarkers())
    }
  })
}

function onPhoneCall(people) {
  people.forEach((person) => {
    if (person.personElement.classList.contains('phone-call')) {
      person.phone.drive.audio += sendAudio(person.biomarkers())
    }
  })
}

function sendVideo(biomarkers) {
  length = 400
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  result += biomarkers
  return result;
}

function sendAudio(biomarkers) {
  length = 100
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  result += biomarkers
  return result;
}


function lightIcon(person, icon_id, sensor_classname) {
  const spot = document.getElementById(icon_id)
  if (person.personElement.classList.contains(sensor_classname)) {
    spot.classList.add('active')
  } else {
    spot.classList.remove('active')
  }
}



function useCCTV(CCTV_cameras, people) {

  people.forEach((person) => {
    let person_rect = person.rect()

    let CCTVs_active = 0
    CCTV_cameras.forEach((CCTV) => {

      CCTV.currentView = CCTV.newView()

      let CCTV_rect = CCTV.rect()

      if (CCTV_rect.right >= person_rect.left && CCTV_rect.left <= person_rect.right && CCTV_rect.top <= person_rect.bottom && CCTV_rect.bottom >= person_rect.top) {

        CCTVs_active += 1
        person.personElement.classList.add('CCTV')
        CCTV.spotPerson(person)
        person.phone.drive.video += CCTV.currentView

      }
      if (CCTVs_active === 0) {
        person.personElement.classList.remove('CCTV')
      }
    })
  })
}



function showMessage(message) {
  pause = true;
  if (message){
    console.log(message)
  }
  message.classList.remove('hidden')
  message.classList.remove('hidden')

  continueBtn.classList.remove('hidden')
}

let allMessages = Array.from(document.querySelector('#all-messages').children);


continueBtn.addEventListener('click', function unPause() {
  pause = false;
  continueBtn.classList.add('hidden')
  allMessages.forEach((message) => {
    if (!(message.classList.contains('hidden'))) {
      message.classList.add('hidden')
    }
  })
})

window.requestAnimationFrame(update)