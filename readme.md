====documentation for future me

server uses pm2 to keep alive and restart on updates
https://pm2.keymetrics.io/docs/usage/quick-start/

```
npm install pm2 -g
pm2 start ecosystem.config.js
pm2 list
```


modules running hosted on the server need these scripts (or similar, but using these names):
- setup: `npm install`
- start: `node --env-file=.env server.mjs`