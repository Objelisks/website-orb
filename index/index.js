import fiver from './util.js'

const ready = (callback) => document.addEventListener('DOMContentLoaded', callback)
const on = (selector, eventName, callback) => document.querySelector(selector).addEventListener(eventName, callback)

const themes = [
  'theme-nature',
  'theme-blessing'
]
let activeTheme = 0

ready(() => {
  on('#theme-switcher', 'click', () => {
    const classes = document.querySelector('body').classList
    classes.remove(themes[activeTheme])
    activeTheme = (activeTheme + 1) % themes.length
    classes.add(themes[activeTheme])
  })
})