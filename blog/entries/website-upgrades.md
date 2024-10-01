# Website upgrades!

I added some new features to the server

## RSS Feed

Who knows if anyone will need this, but its neat!!

I was inspired by everest's page here: [https://everest-pipkin.com/teaching/handmadeRSS](https://everest-pipkin.com/teaching/handmadeRSS)
My implementation is a bit more generative but still inspired by the handwritten simplicity.

Entries to this blog are simple markdown files that get converted to html using [snarkdown](https://github.com/developit/snarkdown). Then I manually add entries I want to have posted to a js object:

```javascript
export const blogPosts = [
  {url: 'website-upgrades.md', date: '2024-10-01'},
  {url: 'particles.md', date: '2022-06-01'},
  {url: 'game-engine-input-tracking.md', date: '2022-05-22'}
]
```

The RSS feed is generated from this list of entries on request.
