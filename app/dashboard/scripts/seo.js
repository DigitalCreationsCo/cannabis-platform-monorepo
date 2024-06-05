const indexPages = [
	{ path: '/', freq: 'weekly', priority: 1.0 },
	{ path: '/404', freq: 'monthly', priority: 0.1 },
	{ path: '/500', freq: 'monthly', priority: 0.1 },
];

const noIndexPages = [
	{ path: '/api' },
	{ path: '/auth' },
	{ path: '/invitations' },
	{ path: '/settings' },
	{ path: '/teams' },
	{ path: '/well-known' },
];

module.exports = {
	indexPages,
	noIndexPages,
};
