module.exports = [
  {
    name: "next-shop",
    // start script for next standalone build, in ci
    script: "server.js",
    wait_ready: true,
    env_production: {
      NODE_ENV: "production",
      PORT: 3000,
    },
  },
]