module.exports = [
	{
		name: 'server-main',
		script: 'dist',
		wait_ready: true,
		env_production: {
			NODE_ENV: 'production',
			PORT: 6001,
		},
	},
];
