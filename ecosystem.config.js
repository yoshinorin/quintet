module.exports = {
  apps: [
    {
      name: 'quintet',
      cwd: '.next/',
      script: 'npm',
      args: 'start',
      exec_mode: 'cluster',
      instances: 2
    }
],};
