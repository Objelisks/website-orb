import Koa from 'koa'
import serve from 'koa-static'
import mount from 'koa-mount'
import index from './index/index.mjs'
import blog from './blog/blog.mjs'
import proj from './proj/proj.mjs'
import link from './link/link.mjs'
import misc from './misc/misc.mjs'
import chat from './chat/chat.mjs'
import pics from './pics/pics.mjs'
import webhookHandler from './webhooks.mjs'
import sendfile from 'koa-sendfile'
import bodyParser from 'koa-bodyparser'
import util from 'util'

const app = new Koa()

app.use(bodyParser())

app.use(mount('/', index))
app.use(mount('/blog', blog))
app.use(mount('/proj', proj))
app.use(mount('/link', link))
app.use(mount('/misc', misc))
app.use(mount('/chat', chat))
app.use(mount('/pics', pics))

app.use(mount('/common', serve('./common')))
app.use(mount('/regl-starter', serve('./hosted/regl-starter/dist')))
app.use(mount('/regl-starter', serve('./hosted/regl-starter/public')))

app.use(mount('/wwo/nature', (ctx) => sendfile(ctx, './files/nature.html')))
app.use(mount('/wwo/birds', (ctx) => sendfile(ctx, './files/birds.html')))
app.use(mount('/wwo/color', (ctx) => sendfile(ctx, './files/color.html')))

app.use(mount('/resume', (ctx) => sendfile(ctx, './files/tim-plummer-resume-2024.pdf')))

app.use(mount('/webhooks', webhookHandler))

app.listen(3000)
console.log('server running at', util.inspect('http://localhost:3000', {colors: true}))