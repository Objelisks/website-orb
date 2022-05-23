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