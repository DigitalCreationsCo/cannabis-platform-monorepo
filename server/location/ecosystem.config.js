module.exports = [
  {
    name: "server-location",
    script: "dist",
    wait_ready: true,
    env_production: {
      NODE_ENV: "production",
      PORT: 6011,
    },
  },
]