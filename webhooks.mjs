import { spawn, spawnSync } from 'child_process'
import { mkdir, readdir } from 'fs/promises'
import { verify } from '@octokit/webhooks-methods'

export default async (ctx, next) => {
  const msg = ctx.request.body

  // check secret against env
  if(!(await verify(process.env.WEBHOOK_SECRET, ctx.request.rawBody, ctx.request.headers["x-hub-signature-256"]))) {
    console.log('bad webhook secret')
    ctx.response.status = 401
    return next()
  }
  
  // check event type
  const event = ctx.request.get('x-github-event')
  const repo = msg.repository.name
  console.log(`repo ${event} detected: ${repo}`)
  if(event !== 'push') {
    console.log(`ignoring repo ${event}`)
    ctx.response.status = 200
    return next()
  }

  // respond and continue
  ctx.response.status = 200
  next()

  const workingDirectory = `./hosted/${repo}`

  try {
    await readdir(workingDirectory)
  } catch (err) {
    // make sure directory exists
    console.log(`creating folder: ${repo}`)
    mkdir(workingDirectory)
    // clone repo
    spawnSync('git', ['clone', msg.repository.clone_url, '.'], {
      cwd: workingDirectory
    })
  }

  // pull latest code
  console.log(`repo pull: ${repo}`)
  spawnSync('git', ['pull'], {
    cwd: workingDirectory
  })

  // run initialization
  console.log(`repo setup: ${repo}`)
  spawnSync('npm', ['run', 'setup'], {
    cwd: workingDirectory
  })

  // start processes if needed
  console.log(`repo start: ${repo}`)
  spawn('npm', ['run', 'start'], {
    cwd: workingDirectory
  })

  console.log(`repo update finished: ${repo}`)
}