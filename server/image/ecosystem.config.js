module.exports = [
  {
    name: "server-image",
    script: "dist",
    wait_ready: true,
    env_production: {
      NODE_ENV: "production",
      PORT: 6031,
    },
  },
];