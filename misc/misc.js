const ready = (callback) => document.addEventListener('DOMContentLoaded', callback)
const on = (selector, eventName, callback) => document.querySelector(selector).addEventListener(eventName, callback)

ready(() => {
  document.getElementById('page-size').innerText = `${performance
    .getEntries()
    .reduce((acc, resource) => acc + resource.transferSize, 0)/1000} kb`
  document.getElementById('page-time').innerText = `${performance.now()} ms`
})