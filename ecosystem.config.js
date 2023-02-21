module.exports = {
  apps: [
    {
      name: "app",
      cwd: 'apps/app',
      script: "yarn start",
      env_production: {
       NODE_ENV: "production"
      },
      env_development: {
        NODE_ENV: "development"
      }
    },
    {
    name   : "main",
    script: "server/main/dist",
    env_production: {
      NODE_ENV: "production",
    },
    env_development: {
       NODE_ENV: "development"
    }
  }]
}
