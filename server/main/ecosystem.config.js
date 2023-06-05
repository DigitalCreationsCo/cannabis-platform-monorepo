module.exports = [
  {
    name: "server-main",
    script: "dist",
    env_production: {
      NODE_ENV: "production",
      PORT: 6001,
    },
  },
]