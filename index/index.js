const ready = (callback) => document.addEventListener('DOMContentLoaded', callback)
const on = (selector, eventName, callback) => document.querySelector(selector).addEventListener(eventName, callback)

const themes = [
  'theme-nature',
  'theme-blessing',
  'theme-woodblock'
]
let activeTheme = 0
const mouse = {x: 0, y: 0}
let x = 200
let y = 200
let rotate = 0

ready(() => {
  on('#theme-switcher', 'click', () => {
    const classes = document.querySelector('body').classList
    classes.remove(themes[activeTheme])
    activeTheme = (activeTheme + 1) % themes.length
    classes.add(themes[activeTheme])
  })

  document.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  })

  const moveTrain = () => {
    document.querySelectorAll('.train').forEach((train) => {
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
    requestAnimationFrame(moveTrain)
  }
  requestAnimationFrame(moveTrain)
})