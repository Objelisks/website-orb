import Koa from 'koa'
import serve from 'koa-static'
import mount from 'koa-mount'
import index from './index/index.mjs'
import blog from './blog/blog.mjs'
import proj from './proj/proj.mjs'

const app = new Koa()

app.use(mount('/', index))
app.use(mount('/blog', blog))
app.use(mount('/proj', proj))

app.use(mount('/common', serve('./common')))

app.listen(3000)