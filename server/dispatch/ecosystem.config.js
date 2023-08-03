module.exports = [
	{
		name: 'server-dispatch',
		script: 'dist',
		wait_ready: true,
		env_production: {
			NODE_ENV: 'production',
			PORT: 6041,
		},
	},
];
