import { spawnSync } from 'node:child_process'
import fs from 'node:fs'

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