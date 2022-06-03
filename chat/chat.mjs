import html from 'nanohtml'
import Koa from 'koa'
import serve from 'koa-static'
import bodyparser from 'koa-bodyparser'
import Router from '@koa/router'
import {head, nav} from '../common.mjs'
import fs from 'node:fs/promises'

const body = html`
<!doctype html>
<html>
  <head>
    ${head}
    <script>//:3</script>
  </head>
  <body>
    <h1 class="header">contact</h1>
    ${nav}
    <section>
      <article>
          <p>hi! if you wanna get in touch with me, you can do so at the following internet places:</p>
          <p>email: objelisks at gmail dot com</p>
          <p>mastodon: <a href="https://friend.camp/web/@objelisks">@objelisks@friend.camp</a></p>
          <p>
            <form name="send-message" method="post">
              <input name="message" type="text" placeholder="this text box"></input>
              <input type="submit" value="send"></input>
            </form>
          </p>
      </article>
    </section>
  </body>
</html>
`

const chat = async (ctx, next) => {
  ctx.response.body = body.toString()
}

const message = async (ctx, next) => {
  ctx.response.redirect('#')
  fs.appendFile('./messages.txt', `${ctx.request.ip}: ${ctx.request.body.message}\n\n`, {encoding: 'utf8'})
}

const app = new Koa()
const router = new Router()

router.get('/', chat)
router.post('/', bodyparser())
router.post('/', message)
app.use(router.routes())
app.use(serve('./chat'))

export default app