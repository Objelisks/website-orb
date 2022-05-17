import html from 'nanohtml'

const body = html`
<!doctype html>
<html>
  <head>
    <link href="./common/styles.css" type="text/css" rel="stylesheet">
    <script src="./index/index.js" type="module"></script>
  </head>
  <body>
    <h1>welcome to objelisks space</h1>
    <section>
      <button id="theme-switcher">switch theme</button>
    </section>
  </body>
</html>
`

const index = (ctx, next) => {
  ctx.response.body = body.toString()
}

export default index