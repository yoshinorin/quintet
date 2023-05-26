module.exports = {
  apps: [
    {
      name: 'quintet',
      // cwd: '.next/',
      script: 'npm',
      // script: './node_modules/next/dist/bin/next',
      args: 'start',
      exec_mode: 'cluster',
      // exec_mode: 'fork',

      // NOTE: When trying to launch two instances, one of them allways restarting.
      // instances: 2,
      instances: 1,
      // exp_backoff_restart_delay: 10
    }
],};
