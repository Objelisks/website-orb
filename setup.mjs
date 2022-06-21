import { spawnSync } from 'node:child_process'
import fs from 'node:fs'

import sharp from 'sharp'
import umurangiData from './pics/umurangi/photos.mjs'

if(!fs.existsSync('./hosted/railyard')) {
  spawnSync('git', ['clone', 'https://github.com/Objelisks/railyard.git', './hosted/railyard'])
  spawnSync('npm', ['install'], {cwd: './hosted/railyard'})
}

if(!fs.existsSync('./hosted/wildflowerbot')) {
  spawnSync('git', ['clone', 'https://github.com/Objelisks/wildflowerbot.git', './hosted/wildflowerbot'])
  //install dependencies [canvas]
  //spawnSync('npm', ['install'], {cwd: './hosted/wildflowerbot'})
  //setup cron
}

if(!fs.existsSync('./hosted/regl-starter')) {
  spawnSync('git', ['clone', 'https://github.com/Objelisks/regl-starter.git', './hosted/regl-starter'])
  //install dependencies [canvas]
  spawnSync('npm', ['install'], {cwd: './hosted/regl-starter'})
  spawnSync('npm', ['run', 'build'], {cwd: './hosted/regl-starter'})
  //setup cron
}

const smallPath = path => path.replace('.png', '-small.png')

Object.values(umurangiData).forEach(level => {
  console.log('smallifying images in ', level.name)
  fs.readdirSync(`./pics/umurangi/${level.name}`)
    .filter(filename => filename.endsWith('.png') && !filename.endsWith('-small.png'))
    .forEach(filename => {
      if(!fs.existsSync(`./pics/umurangi/${level.name}/${smallPath(filename)}`)) {
        sharp(`./pics/umurangi/${level.name}/${filename}`)
          .resize(600)
          .jpeg()
          .toFile(`./pics/umurangi/${level.name}/${smallPath(filename)}`, () => console.log(`smallified ${filename}`))
      }
    })
})