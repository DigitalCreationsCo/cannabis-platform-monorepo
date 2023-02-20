module.exports = {
  apps: [
    {
      name: "app",
      script: "apps/app/.next/standalone/server.js",
      env_production: {
       NODE_ENV: "production"
      },
      env_development: {
        NODE_ENV: "development"
      }
    },
    {
    name   : "main",
    script: "server/main/dist/index.js",
    env_production: {
       NODE_ENV: "production"
    },
    env_development: {
       NODE_ENV: "development"
    }
  }]
}
