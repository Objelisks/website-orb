import html from 'nanohtml'
import raw from 'nanohtml/raw.js'
import mount from 'koa-mount'
import Koa from 'koa'
import serve from 'koa-static'
import Router from '@koa/router'
import {head, nav} from '../common.mjs'
import umurangi from './umurangi/umurangi.mjs'

const body = html`
<!doctype html>
<html>
  <head>
    ${head}
    <script src="/pics/pics.js" type="module"></script>
    <script>//:3</script>
  </head>
  <body>
    <h1 class="header">photo gallery</h1>
    ${nav}
    <section>
      <a href="/pics/umurangi">umurangi generation</a>
    </section>
  </body>
</html>
`

const pics = async (ctx, next) => {
  ctx.response.body = body.toString()
}

const app = new Koa()
const router = new Router()

router.get('/', pics)
app.use(router.routes())
app.use(serve('./pics'))

app.use(mount('/umurangi', umurangi))

export default app