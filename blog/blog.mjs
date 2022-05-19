import html from 'nanohtml'
import Koa from 'koa'
import serve from 'koa-static'
import Router from '@koa/router'

const body = html`
<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="/common/styles.css" type="text/css" rel="stylesheet">
    <script src="./blog.js" type="module"></script>
  </head>
  <body>
    <h1>blog zone</h1>
  </body>
</html>
`

const blog = async (ctx, next) => {
  ctx.response.body = body.toString()
}

const app = new Koa()
const router = new Router()

router.get('/', blog)
app.use(router.routes())
app.use(serve('./index'))

export default app