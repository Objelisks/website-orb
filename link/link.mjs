import html from 'nanohtml'
import Koa from 'koa'
import serve from 'koa-static'
import Router from '@koa/router'
import {head, nav} from '../common.mjs'

const body = html`
<!doctype html>
<html>
  <head>
    ${head}
    <script>//:3</script>
  </head>
  <body>
    <h1 class="header">some cool places</h1>
    ${nav}
    <section>
      <article>
          <p><a href="https://wayward.site/">maggie</a></p>
          <p><a href="https://one-gross.online/">bcj</a></p>
          <p><a href="https://sowe.li/">casey</a></p>
          <p><a href="https://killpack.biz/">jordan</a></p>
          <p><a href="https://everest-pipkin.com/">everest</a></p>
      </article>
      <article>
        <p>
          <a href="https://objelisks.space"><img src="./files/objelisks-space-button.png" width="88" height="31" alt="objelisks.space" /></a>
          <textarea><a href="https://objelisks.space"><img src="https://objelisks.space/files/objelisks-space-button.png" width="88" height="31" alt="objelisks.space" /></a></textarea>
          <a href="https://objelisks.space"><img src="./files/objelisks-space-banner.png" width="608" height="160" alt="objelisks.space" /></a>
          <textarea><a href="https://objelisks.space"><img src="https://objelisks.space/files/objelisks-space-banner.png" width="608" height="160" alt="objelisks.space" /></a></textarea>
        </p>
      </article>
    </section>
  </body>
</html>
`

const link = async (ctx, next) => {
  ctx.response.body = body.toString()
}

const app = new Koa()
const router = new Router()

router.get('/', link)
app.use(router.routes())
app.use(serve('./link'))

export default app