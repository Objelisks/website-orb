module.exports = {
  apps : [{
    name: 'objelisks.space',
    node_args: "--env-file=.env",
    script: 'server.mjs',
    watch: '.'
  }],
};
