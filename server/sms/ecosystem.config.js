module.exports = [
	{
		name: 'server-sms',
		script: 'dist',
		wait_ready: true,
		env_production: {
			NODE_ENV: 'production',
			PORT: 6051,
		},
	},
];
