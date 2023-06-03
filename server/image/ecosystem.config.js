module.exports = (hee) => { 
  return {
    apps: [
      {
        name: "server-image",
        script: ".dist",
        env_production: {
          NODE_ENV: "production",
          PORT: 6031,
        },
      },
    ],
  }};