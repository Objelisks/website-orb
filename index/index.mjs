import html from 'nanohtml'
import Koa from 'koa'
import serve from 'koa-static'
import Router from '@koa/router'

const themeButton = html`
<section>
  <button id="theme-switcher">switch theme</button>
</section>
`

const train = html`
<aside class="train" data-rotate="rotate(120deg)"><div class="stack"></div><div class="stack"></div><div class="stack"></div><div class="stack"></div></aside>
`

const body = html`
<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="/common/styles.css" type="text/css" rel="stylesheet">
    <script src="./index.js" type="module"></script>
  </head>
  <body>
    <h1>welcome to objelisks space</h1>
    ${themeButton}
    ${train}
  </body>
</html>
`

const index = async (ctx, next) => {
  ctx.response.body = body.toString()
}

const app = new Koa()
const router = new Router()

router.get('/', index)
app.use(router.routes())
app.use(serve('./index'))

export default app