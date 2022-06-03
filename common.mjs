import html from 'nanohtml'

export const head = html`
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="common/styles.css" type="text/css" rel="stylesheet">
  <script src="common/common.js" type="module"></script>
`

export const nav = html`
<section class="nav">
  <a href="/">home</a>
  <a href="/blog">blog</a>
  <a href="/proj">projects</a>
  <a href="/link">links</a>
  <a href="/misc">miscellany</a>
  <a href="/chat">chat</a>
</section>
`