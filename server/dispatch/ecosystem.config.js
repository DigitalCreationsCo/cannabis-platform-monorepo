module.exports = (hee) => { 
  return {
    apps: [
      {
        name: "server-dispatch",
        script: ".dist",
        env_production: {
          NODE_ENV: "production",
          PORT: 6041,
        },
      },
    ],
  }};