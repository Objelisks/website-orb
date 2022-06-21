import html from 'nanohtml'
import raw from 'nanohtml/raw.js'

const photo = (photoUrl) => html`
<img src="${photoUrl}" alt="${photoUrl}">
`

const photoGallery = (photos) => html`
<section>
  ${photos.map((photoUrl) => raw(photo(photoUrl)))}
</section>
`

export default photoGallery