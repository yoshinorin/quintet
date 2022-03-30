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
      instances: 2,
      // exp_backoff_restart_delay: 10
    }
],};
