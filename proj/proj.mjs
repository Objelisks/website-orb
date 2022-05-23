import html from 'nanohtml'
import raw from 'nanohtml/raw.js'
import Koa from 'koa'
import sendfile from 'koa-sendfile'
import serve from 'koa-static'
import Router from '@koa/router'
import {head, nav} from '../common.mjs'

const projects = [
  {
    images: [],
    description: 'this website you are currently on',
    title: 'objelisks.space',
    year: '2022',
    links: [{href: '/', text: 'here'}]
  },
  {
    images: [],
    description: 'a toy train simulator',
    title: 'trains game',
    year: '2021',
    links: [{href: '/trains.game', text: 'trains game'}]
  },
  {
    images: [{
      url: '/proj/wildflower/current_image.png',
      alt: 'you come across some rolling hills with many flowers and it is peaceful'}],
    description: 'makes a pretty field of flowers',
    title: 'wildflower bot',
    year: '2016'
  }
]

const body = html`
<!doctype html>
<html>
  <head>
    ${head}
    <link href="proj/styles.css" type="text/css" rel="stylesheet">
    <script>//:3</script>
  </head>
  <body>
    <h1 class="header">projects!</h1>
    ${nav}
    <section class="projects">
    ${projects.map(project => raw(html`
      <article class="project">
        <h2 class="title">${project.title}</h2>
        <aside class="year">${project.year}</aside>
        <aside class="images">
          ${project.images.map(image => raw(html`<img src=${image.url} alt=${image.alt}>`))}
        </aside>
        <p class="description">${project.description}</p>
        <ul class="links">${project.links && project.links.map(link => raw(html`<a href=${link.href}>${link.text}</a>`))}</ul>
        <ul class="buttons">${project.buttons && project.buttons.map(button => raw(html`<button name="${button.name}">${button.text}</a>`))}</ul>
      </article>
    `))}
    </section>
  </body>
</html>
`

const proj = async (ctx, next) => {
  ctx.response.body = body.toString()
}

const app = new Koa()
const router = new Router()

router.get('/', proj)
router.get('/wildflower/current_image.png', (ctx) => sendfile(ctx, './hosted/wildflowerbot/out/1.png'))
app.use(router.routes())
app.use(serve('./proj'))

export default app