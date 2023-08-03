module.exports = [
	{
		name: 'server-payments',
		script: 'dist',
		wait_ready: true,
		env_production: {
			NODE_ENV: 'production',
			PORT: 6021,
		},
	},
];
