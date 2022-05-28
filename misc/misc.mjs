import html from 'nanohtml'
import raw from 'nanohtml/raw.js'
import Koa from 'koa'
import serve from 'koa-static'
import Router from '@koa/router'
import {head, nav} from '../common.mjs'
import columbos from './columbos.mjs'

const columbo = html`
<article id="columbo">
  <h2>columbo rankings</h2>
  <ol>
    ${raw(columbos.map(columb =>
    html`<li><span>${columb.ep}</span> - <span>${columb.title}</span><p>${raw(columb.notes.replace(/\n/g, '<br>'))}</p></li>`
    ).join(''))}
  </ol>
</article>
`

const about = html`
<article id="about">
  <h2>about this web site</h2>
  <p>
    palettes:
    <ul>  
      <li><a href="https://lospec.com/palette-list/curiosities">curiosities</a></li>
      <li><a href="https://lospec.com/palette-list/snail-village">snail village</a></li>
      <li><a href="https://lospec.com/palette-list/blue-newspaper">blue newspaper</a></li>
    </ul>
  </p>
  <p>sustainably powered by <a href="https://greenhost.net/">dutch windmills</a>.</p>
  <p>total page size: <span id="page-size">?? KB</span>. loaded in <span id="page-time">?? ms</span>.</p>
</article>
`

const body = html`
<!doctype html>
<html>
  <head>
    ${head}
    <script src="./misc/misc.js" type="module"></script>
    <script>//:3</script>
  </head>
  <body>
    <h1 class="header">everything else</h1>
    ${nav}
    <section>
      <a href="#columbo">columbo</a>
      <a href="#about">about site</a>
    </section>
    <section>
      ${raw(columbo)}
      ${raw(about)}
    </section>
  </body>
</html>
`

const misc = async (ctx, next) => {
  ctx.response.body = body.toString()
}

const app = new Koa()
const router = new Router()

router.get('/', misc)
app.use(router.routes())
app.use(serve('./misc'))

export default app