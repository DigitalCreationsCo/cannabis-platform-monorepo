module.exports = (hee) => { 

  console.log('pm2 options ', hee)
  return {
    apps: [
      {
        name: "server-main",
        script: ".dist",
        env_production: {
          NODE_ENV: "production",
          PORT: 6001,
        },
      },
    ],
  }};