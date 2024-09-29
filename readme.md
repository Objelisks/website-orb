====documentation for future me

server runs using nodemon to restart on deployments
https://github.com/remy/nodemon

```bash
cd website
nohup nodemon > out.log &
```

server is automatically restarted on js changes


modules running hosted on the server need these scripts (or similar, but using these names):
- setup: `npm install`
- start: `node --env-file=.env server.mjs`