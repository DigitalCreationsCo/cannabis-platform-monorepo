const child_process = require('child_process');

const commands = [
	// {
	//     name: 'Test',
	//     command: 'echo',
	//     args: ['hello'],
	//     cwd: "../packages/data-access"
	// },
	{
		name: 'server-main',
		command: 'yarn',
		args: ['watch'],
		cwd: '../server/main',
	},
	{
		name: 'server-location',
		command: 'yarn',
		args: ['watch'],
		cwd: '../server/location',
	},
	{
		name: 'stripe-webhook',
		command: 'yarn',
		args: ['stripe:webhook'],
		cwd: '../server/payments',
	},
	{
		name: 'server-payments',
		command: 'yarn',
		args: ['watch'],
		cwd: '../server/payments',
	},
	{
		name: 'server-image',
		command: 'yarn',
		args: ['watch'],
		cwd: '../server/image',
	},
	{
		name: 'server-dispatch',
		command: 'yarn',
		args: ['watch'],
		cwd: '../server/dispatch',
	},
	{
		name: 'data-access',
		command: 'yarn',
		args: ['watch'],
		cwd: '../packages/data-access',
	},
	{
		name: 'core-lib',
		command: 'yarn',
		args: ['watch'],
		cwd: '../packages/core-lib',
	},
	{
		name: 'ui-lib',
		command: 'yarn',
		args: ['watch'],
		cwd: '../packages/ui-lib',
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
