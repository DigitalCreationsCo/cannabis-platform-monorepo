const child_process = require('child_process');

const commands = [
	// {
	//     name: 'Test',
	//     command: 'echo',
	//     args: ['hello'],
	//     cwd: "../packages/data-access"
	// },
	{
		name: 'dashboard',
		command: 'yarn',
		args: ['test:watch'],
		cwd: '../app/dashboard',
	},
	{
		name: 'shop',
		command: 'yarn',
		args: ['test:watch'],
		cwd: '../app/shop',
	},
	{
		name: 'checkout-widget',
		command: 'yarn',
		args: ['test:watch'],
		cwd: '../app/checkout-widget',
	},
	{
		name: 'server-main',
		command: 'yarn',
		args: ['test:watch'],
		cwd: '../server/main',
	},
	{
		name: 'server-payments',
		command: 'yarn',
		args: ['test:watch'],
		cwd: '../server/payments',
	},
	{
		name: 'server-image',
		command: 'yarn',
		args: ['test:watch'],
		cwd: '../server/image',
	},
	{
		name: 'server-dispatch',
		command: 'yarn',
		args: ['test:watch'],
		cwd: '../server/dispatch',
	},
	{
		name: 'data-access',
		command: 'yarn',
		args: ['test:watch'],
		cwd: '../packages/data-access',
	},
	{
		name: 'core',
		command: 'yarn',
		args: ['test:watch'],
		cwd: '../packages/core',
	},
	{
		name: 'ui',
		command: 'yarn',
		args: ['test:watch'],
		cwd: '../packages/ui',
	},
];

function run(element, func) {
	func(null, `executing ${element.name} command`);

	child_process.spawn(
		element.command,
		element.args,
		{ cwd: element.cwd, stdio: 'inherit', detached: false },
		function (error, stdout, stderr) {
			func(null, `executing ${element.name} command`);
			if (error) {
				console.log(' error');

				console.log('error: ', error);
				func(error, null);
			} else if (stderr) {
				console.log(' test');

				console.log('stderr: ', stderr);
				func(stderr, null);
			} else {
				console.log(' test2');

				console.log('stdout: ', stdout);
				func(null, stdout);
			}
		},
	);
}

function main() {
	commands.forEach((element) => {
		run(element, (err, res) => {
			if (err) {
				console.log('Error: ', err);
			} else {
				console.log(res);
			}
		});
	});
}

main();
