module.exports = (hee) => { 
  return {
    apps: [
      {
        name: "server-location",
        script: ".dist",
        env_production: {
          NODE_ENV: "production",
          PORT: 6011,
        },
      },
    ],
  }};