import fs from 'node:fs'

const loadFiles = (folder) => {
  try {
  return fs.readdirSync(`./pics/umurangi/${folder}`).map(filename => `/pics/umurangi/${folder}/${filename}`)
  } catch {
    return []
  }
}

export default {
  "mauau": {
    "name": "mauau",
    "label": "mauau view (level 1)",
    "photos": loadFiles('mauau')
  },
  "otumoetai": {
    "name": "otumoetai",
    "label": "otumoetai (level 2)",
    "photos": loadFiles('otumoetai')
  },
  "kati": {
    "name": "kati",
    "label": "kati kati (level 3)",
    "photos": loadFiles('kati')
  },
  "strand": {
    "name": "strand",
    "label": "the strand (level 4)",
    "photos": loadFiles('strand')
  },
  "contact": {
    "name": "contact",
    "label": "contact (level 5)",
    "photos": loadFiles('contact')
  },
  "karangahake": {
    "name": "karangahake",
    "label": "karangahake (level 6)",
    "photos": loadFiles('karangahake')
  },
  "subway": {
    "name": "subway",
    "label": "subway (level 7)",
    "photos": loadFiles('subway')
  },
  "invasion": {
    "name": "invasion",
    "label": "invasion (level 8)",
    "photos": loadFiles('invasion')
  },
  "gamer": {
    "name": "gamer",
    "label": "gamer (level 9)",
    "photos": loadFiles('gamer')
  },
  "hangar": {
    "name": "hangar",
    "label": "hangar (level 10)",
    "photos": loadFiles('hangar')
  },
  "sewer": {
    "name": "sewer",
    "label": "sewer (level 11)",
    "photos": loadFiles('sewer')
  },
}