const ready = (callback) => document.addEventListener('DOMContentLoaded', callback)
const on = (selector, eventName, callback) => document.querySelector(selector).addEventListener(eventName, callback)

const themes = [
  'theme-nature',
  'theme-blessing',
  'theme-woodblock'
]
let activeTheme = 0

ready(() => {
  on('#theme-switcher', 'click', () => {
    const classes = document.querySelector('body').classList
    classes.remove(themes[activeTheme])
    activeTheme = (activeTheme + 1) % themes.length
    classes.add(themes[activeTheme])
  })

  let x = 200
  let y = 200
  let rotate = 0
  setInterval(() => {
    document.querySelectorAll('.train').forEach((train) => {
      train.style.setProperty('--rotate', `${rotate}deg`)
      train.style.setProperty('--pos-x', `${x}px`)
      train.style.setProperty('--pos-y', `${y}px`)
      rotate += 1
      x += Math.cos(rotate*Math.PI/180)
      y += Math.sin(rotate*Math.PI/180)
    })
  }, 10)
})