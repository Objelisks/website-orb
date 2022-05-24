import html from 'nanohtml'
import raw from 'nanohtml/raw.js'
import Koa from 'koa'
import serve from 'koa-static'
import Router from '@koa/router'
import {head, nav} from '../common.mjs'

const columbos = [
  {ep:'S1E08', title: 'A Blueprint for Murder',
  notes: `first horse sighting
  multiple execellent lines:
  you're very much like an arachnid
  we could've used you at the alamo you've got guts
  the omnipresent constable`},
  {ep:'S1E07', title: 'Short Fuse',
  notes: `the lil carts, i like the villain a lot`},
  {ep:'S1E06', title: 'Lady in Waiting',
  notes: `got steve martin in it`},
  {ep:'S2E02', title: 'The Greenhouse Jungle',
  notes: `ok i do like the new detective a lil bit, it fully emphasizes how columbo is his own thing and that the cops are just as useless in this universe`},
  {ep:'S2E01', title: 'Etude in Black',
  notes: `don't like the thing they do in s2 where they preview stuff that happens later`},
  {ep:'S1E01', title: 'Ransom for a Dead Man',
  notes: ``},
  {ep:'S1E00', title: 'Prescription Murder',
  notes: ``},
  {ep:'S1E02', title: 'Murder by the Book',
  notes: `the villain isn't charismatic enough, he's just an asshole`},
  {ep:'S1E03', title: 'Death Lends a Hand',
  notes: ``},
  {ep:'S1E04', title: 'Dead Weight',
  notes: `too much military deference`},
]

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

const body = html`
<!doctype html>
<html>
  <head>
    ${head}
    <script>//:3</script>
  </head>
  <body>
    <h1 class="header">everything else</h1>
    ${nav}
    <section>
      <a href="#columbo">columbo</a>
    </section>
    <section>
      ${raw(columbo)}
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