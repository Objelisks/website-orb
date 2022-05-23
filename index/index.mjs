import html from 'nanohtml'
import Koa from 'koa'
import serve from 'koa-static'
import Router from '@koa/router'
import {head, nav} from '../common.mjs'

const themeButton = html`
<section class="nav">
  <button id="theme-switcher">switch theme</button>
  <button id="frog">toggle train</button>
</section>
`

const train = html`
<div class="train" data-rotate="rotate(120deg)"><div class="stack"></div><div class="stack"></div><div class="stack"></div><div class="stack"></div></div>
`

const body = html`
<!doctype html>
<html>
  <head>
    ${head}
    <link href="/styles.css" type="text/css" rel="stylesheet">
    <script src="./index.js" type="module"></script>
  </head>
  <body>
    <h1 class="header">welcome to objelisks space</h1>
    ${nav}
    <section>
      <article>
        <p>hi this is my web site and my name is tim.</p>
        <p>you'll find here a bunch of projects and toys and some of my thoughts.</p>
      </article>
    </section>
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