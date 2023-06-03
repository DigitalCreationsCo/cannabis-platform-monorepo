module.exports = (hee) => { 
  return {
    apps: [
      {
        name: "server-payments",
        script: ".dist",
        env_production: {
          NODE_ENV: "production",
          PORT: 6021,
        },
      },
    ],
  }};