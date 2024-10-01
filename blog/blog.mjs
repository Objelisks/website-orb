import html from 'nanohtml'
import raw from 'nanohtml/raw.js'
import Koa from 'koa'
import serve from 'koa-static'
import Router from '@koa/router'
import snarkdown from 'snarkdown'
import {readFileSync} from 'node:fs'
import fs from 'node:fs/promises'
import {head, nav} from '../common.mjs'
import { blogPosts } from './entries.mjs'


const linkTo = (url) => `https://objelisks.space/blog/${url.slice(0, url.lastIndexOf('.'))}`

const renderEntry = (entry) => html`<article>
  <aside>${entry.date}</aside>
  ${raw(snarkdown(entry.content))}
</article>
`

const renderEntryLink = (entry) => {
  const title = entry.content.split('\n').filter(line => line.startsWith('#'))[0].slice(2)
  return html`<a href="/blog/${entry.url}">${title}</a>`
}

const bodyTemplate = (content, entryLinks) => html`<!doctype html>
<html>
  <head>
    ${head}
    <link href="/blog/styles.css" type="text/css" rel="stylesheet">
    <script>//:3</script>
  </head>
  <body>
    <h1 class="header">blog zone</h1>
    ${nav}
    <nav class="entry-links">${raw(entryLinks)}</nav>
    <section>
    ${raw(content)}
    </section>
  </body>
</html>
`

const renderRssEntry = (entry) => {
  const title = entry.content.split('\n').filter(line => line.startsWith('#'))[0].slice(2)
  return `<item>
  <title>${title}</title>
  <link>${linkTo(entry.url)}</link>
  <pubDate>${new Date(entry.date).toUTCString()}</pubDate>
</item>
`
}

const rssTemplate = (entries) => `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">

<channel>
  <title>objelisks dot space</title>
  <link>https://objelisks.space</link>
  <description>articles abt stuff i'm working on and website feature updates</description>

  ${entries.map(entry => renderRssEntry(entry)).join('\n')}
</channel>
</rss>
`

const buildEntryList = () => {
  return blogPosts.map((entry) => {
    return {
      ...entry,
      content: readFileSync('./blog/entries/' + entry.url, {encoding: 'utf8'}).replaceAll('\r', '')
    }
  })
}

const entry = async (ctx) => {
  const entries = buildEntryList()
  const nameOpts = [ctx.params.entry, ctx.params.entry + '.md']
  const entry = entries.find(entry => nameOpts.includes(entry.url))
  if(entry && !entry.private) {
    ctx.response.body = bodyTemplate(
      renderEntry(entry),
      entries.map(entry => renderEntryLink(entry)).join('\n')
    ).toString()
  } else {
    ctx.redirect('/blog')
  }
}

const blog = async (ctx) => {
  const entries = buildEntryList()
  ctx.response.body = bodyTemplate(
    entries.map(entry => renderEntry(entry)).join('\n'),
    entries.map(entry => renderEntryLink(entry)).join('\n')
  ).toString()
}

const rss = async (ctx) => {
  const entries = buildEntryList()
  ctx.response.body = rssTemplate(entries).toString()
  ctx.response.type = 'application/xml'
}

const app = new Koa()
const router = new Router()

router.get('/', blog)
router.get('/rss.xml', rss)
router.get('/styles.css', (ctx) => {
  ctx.response.body = readFileSync('./blog/styles.css', {encoding: 'utf8'})
  ctx.response.type = 'text/css'
})
router.get('/:entry', entry)
app.use(router.routes())
app.use(serve('./blog'))

export default app