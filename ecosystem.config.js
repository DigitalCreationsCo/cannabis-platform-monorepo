module.exports = {
  apps: [
    {
      name: "app",
      cwd: 'apps/app',
      script: "yarn start",
      env_production: {
       NODE_ENV: "production",
       BABEL_ENV: "production"
      },
    },
    {
    name   : "main",
    script: "node server/main/dist",
    env_production: {
      NODE_ENV: "production",
      BABEL_ENV: "production"
    },
  }]
}
