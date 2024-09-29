const ready = (callback) => document.addEventListener('DOMContentLoaded', callback)
const on = (selector, eventName, callback) => document.querySelector(selector).addEventListener(eventName, callback)

const TRAIN_SEP = 50
const mouse = {x: 0, y: 0}
let trainOn = false

ready(() => {
  on('#frog', 'click', () => {
    trainOn = !trainOn
    document.querySelectorAll('.train').forEach(train => {
      train.classList.toggle('visible', trainOn)
    })
  })

  document.addEventListener('mousemove', (event) => {
    mouse.x = event.pageX;
    mouse.y = event.pageY;
  })

  const moveTrain = () => {
    if(trainOn) {
      let previous = {x: 0, y: 0}
      document.querySelectorAll('.train1').forEach(train => {
        let x = parseFloat(train.style.getPropertyValue('--pos-x')) || 0
        let y = parseFloat(train.style.getPropertyValue('--pos-y')) || 0
        let rotate = parseFloat(train.style.getPropertyValue('--rotate')) || 0
        let dir = Math.atan2(mouse.y-y, mouse.x-x)-rotate
        let dist = Math.sqrt(Math.pow(mouse.y-y, 2) + Math.pow(mouse.x-x, 2))
        if(dir < -Math.PI) dir += 2*Math.PI
        if(dir > Math.PI) dir -= 2*Math.PI
        rotate = (rotate + dir*0.1) % (2*Math.PI)
        if(dist > TRAIN_SEP) {
          x += Math.cos(rotate)
          y += Math.sin(rotate)
        }
        previous = {x, y}
        train.style.setProperty('--rotate', `${rotate}rad`)
        train.style.setProperty('--pos-x', `${x}px`)
        train.style.setProperty('--pos-y', `${y}px`)
      })
      document.querySelectorAll('.train2').forEach(train => {
        let x = parseFloat(train.style.getPropertyValue('--pos-x')) || 0
        let y = parseFloat(train.style.getPropertyValue('--pos-y')) || 0
        let rotate = parseFloat(train.style.getPropertyValue('--rotate')) || 0
        let dir = Math.atan2(previous.y-y, previous.x-x)-rotate
        let dist = Math.sqrt(Math.pow(previous.y-y, 2) + Math.pow(previous.x-x, 2))
        if(dir < -Math.PI) dir += 2*Math.PI
        if(dir > Math.PI) dir -= 2*Math.PI
        rotate = (rotate + dir*0.1) % (2*Math.PI)
        if(dist > TRAIN_SEP) {
          x += Math.cos(rotate)
          y += Math.sin(rotate)
        }
        previous = {x, y}
        train.style.setProperty('--rotate', `${rotate}rad`)
        train.style.setProperty('--pos-x', `${x}px`)
        train.style.setProperty('--pos-y', `${y}px`)
      })
      document.querySelectorAll('.train3').forEach(train => {
        let x = parseFloat(train.style.getPropertyValue('--pos-x')) || 0
        let y = parseFloat(train.style.getPropertyValue('--pos-y')) || 0
        let rotate = parseFloat(train.style.getPropertyValue('--rotate')) || 0
        let dir = Math.atan2(previous.y-y, previous.x-x)-rotate
        let dist = Math.sqrt(Math.pow(previous.y-y, 2) + Math.pow(previous.x-x, 2))
        if(dir < -Math.PI) dir += 2*Math.PI
        if(dir > Math.PI) dir -= 2*Math.PI
        rotate = (rotate + dir*0.1) % (2*Math.PI)
        if(dist > TRAIN_SEP) {
          x += Math.cos(rotate)
          y += Math.sin(rotate)
        }
        train.style.setProperty('--rotate', `${rotate}rad`)
        train.style.setProperty('--pos-x', `${x}px`)
        train.style.setProperty('--pos-y', `${y}px`)
      })
    }
    requestAnimationFrame(moveTrain)
  }
  requestAnimationFrame(moveTrain)
})