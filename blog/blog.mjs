import html from 'nanohtml'
import raw from 'nanohtml/raw.js'
import Koa from 'koa'
import serve from 'koa-static'
import Router from '@koa/router'
import snarkdown from 'snarkdown'
import fs from 'node:fs/promises'
import {head, nav} from '../common.mjs'

const renderEntry = (entry) => html`
<article>
${raw(snarkdown(entry))}
</article>
`

const body = (entries) => html`
<!doctype html>
<html>
  <head>
    ${head}
    <link href="blog/styles.css" type="text/css" rel="stylesheet">
    <script>//:3</script>
  </head>
  <body>
    <h1 class="header">blog zone</h1>
    ${nav}
    <section>
    ${raw(entries.map(renderEntry).join('\n'))}
    </section>
  </body>
</html>
`

const blog = async (ctx, next) => {
  const files = await fs.readdir('./blog/entries')
  const entries = []
  for(const file of files) {
    const markdown = await fs.readFile('./blog/entries/' + file, {encoding: 'utf8'})
    entries.push(markdown)
  }
  ctx.response.body = body(entries).toString()
}

const app = new Koa()
const router = new Router()

router.get('/', blog)
app.use(router.routes())
app.use(serve('./blog'))

export default app