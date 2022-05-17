import Koa from 'koa'
import index from './index.mjs'
import serve from 'koa-static'
import Router from '@koa/router'

const app = new Koa()
const router = new Router()

router.get('/', index)

app.use(router.routes())
app.use(serve('.'))

app.listen(3000)