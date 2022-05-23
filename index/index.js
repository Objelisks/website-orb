const ready = (callback) => document.addEventListener('DOMContentLoaded', callback)
const on = (selector, eventName, callback) => document.querySelector(selector).addEventListener(eventName, callback)

const themes = [
  'theme-nature',
  'theme-blessing',
  'theme-woodblock'
]
const mouse = {x: 0, y: 0}
let x = 200
let y = 200
let rotate = 0
let trainOn = false

let activeTheme = sessionStorage.getItem('theme') || 0
const updateTheme = (targetTheme) => {
  const classes = document.querySelector('body').classList
  classes.remove(themes[activeTheme])
  activeTheme = targetTheme
  classes.add(themes[activeTheme])
  sessionStorage.setItem('theme', activeTheme)
}
updateTheme(activeTheme)

ready(() => {
  on('#theme-switcher', 'click', () => {
    updateTheme((activeTheme + 1) % themes.length)
  })

  on('#frog', 'click', () => {
    trainOn = !trainOn
    document.querySelectorAll('.train').forEach(train => {
      train.classList.toggle('visible', trainOn)
    })
  })

  document.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  })

  const moveTrain = () => {
    if(trainOn) {
      document.querySelectorAll('.train').forEach(train => {
        let dir = Math.atan2(mouse.y-y, mouse.x-x)-rotate
        if(dir < -Math.PI) dir += 2*Math.PI
        if(dir > Math.PI) dir -= 2*Math.PI
        rotate = (rotate + dir*0.1) % (2*Math.PI)
        x += Math.cos(rotate)
        y += Math.sin(rotate)
        train.style.setProperty('--rotate', `${rotate}rad`)
        train.style.setProperty('--pos-x', `${x}px`)
        train.style.setProperty('--pos-y', `${y}px`)
      })
    }
    requestAnimationFrame(moveTrain)
  }
  requestAnimationFrame(moveTrain)
})