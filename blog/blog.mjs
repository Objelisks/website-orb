import html from 'nanohtml'
import raw from 'nanohtml/raw.js'
import Koa from 'koa'
import serve from 'koa-static'
import Router from '@koa/router'
import snarkdown from 'snarkdown'
import fs from 'fs/promises'

const renderEntry = (entry) => html`
<article>
${raw(snarkdown(entry))}
</article>
`

const body = (entries) => html`
<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="/common/styles.css" type="text/css" rel="stylesheet">
    <script src="./blog.js" type="module"></script>
  </head>
  <body>
    <h1>blog zone</h1>
    ${raw(entries.map(renderEntry).join('\n'))}
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