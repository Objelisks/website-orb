import html from 'nanohtml'
import raw from 'nanohtml/raw.js'
import Koa from 'koa'
import serve from 'koa-static'
import mount from 'koa-mount'
import Router from '@koa/router'
import {head, nav} from '../../common.mjs'
import photoGallery from '../../photoGallery.mjs'
import photosData from './photos.mjs'

const app = new Koa()
const router = new Router()

const page = (content) => html`
<!doctype html>
<html>
  <head>
    ${head}
    <script>//:3\\\\</script>
  </head>
  <body>${content}</body>
</html>
`

const levelGallery = async (ctx, next) => {
  const level = ctx.params.level
  const photos = photosData[level].photos
  ctx.response.body = page(photoGallery(photos)).toString()
}

const levelUrl = (slug) => `/pics/umurangi/${slug}`
const levelLink = (level) => html`<a href="${levelUrl(level.name)}">${level.label}</a>`

const body = html`
<!doctype html>
<html>
  <head>
    ${head}
    <script>//:3\\\\</script>
  </head>
  <body>
    <h1 class="header">umurangi generation</h1>
    ${nav}
    <section>
      <p>
        This is a set a photographs i took in my time with the game <a href="https://www.umurangigeneration.com/">umurangi generation</a>.
        I did a little photo club with my friends bcj and maggie and we shared our photos and tried our best to
        treat the game as a real photo taking opportunity. I think we made some really cool art!
        <br>
        warning! lots of large images ahead
      </p>
    </section>
    <section>
      ${Object.values(photosData).map(level => levelLink(level))}
    </section>
  </body>
</html>
`

const umurangi = async (ctx, next) => {
  ctx.response.body = body.toString()
}

router.get('/', umurangi)
router.get('/:level', levelGallery)

app.use(router.routes())
app.use(serve('./pics/umurangi'))

export default app