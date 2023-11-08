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
import sendfile from 'koa-sendfile'

const app = new Koa()

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

app.use(mount('/resume', (ctx) => sendfile(ctx, './files/resume-tim-plummer-2023.html')))

app.listen(3000)