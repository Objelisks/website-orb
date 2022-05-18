import Koa from 'koa'
import index from './index/index.mjs'
import serve from 'koa-static'
import Router from '@koa/router'
import mount from 'koa-mount'

const app = new Koa()
const router = new Router()

router.get('/', index)
app.use(mount('/', router.routes()))
app.use(mount('/', serve('./index')))

app.use(mount('/common', serve('./common')))

app.listen(3000)