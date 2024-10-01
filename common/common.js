const ready = (callback) => document.addEventListener('DOMContentLoaded', callback)
const on = (selector, eventName, callback) => document.querySelectorAll(selector).forEach(el => el.addEventListener(eventName, callback))

const themes = [
  'default',
  'theme-curious',
  'theme-snail',
  'theme-sky'
]

ready(() => {
  let activeTheme = sessionStorage.getItem('theme') || 0
  const updateTheme = (targetTheme) => {
    const classes = document.querySelector('body').classList
    classes.remove(themes[activeTheme])
    activeTheme = targetTheme
    classes.add(themes[activeTheme])
    sessionStorage.setItem('theme', activeTheme)
  }
  updateTheme(activeTheme)
  
  on('#theme-switcher', 'click', () => {
    updateTheme((activeTheme + 1) % themes.length)
  })
})