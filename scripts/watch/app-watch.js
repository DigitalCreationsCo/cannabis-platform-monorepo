const child_process = require('child_process');

const commands = [
	{
		name: 'checkout-widget',
		command: 'yarn',
		args: ['dev'],
		cwd: '../app/checkout-widget',
	},
	{
		name: 'dashboard',
		command: 'yarn',
		args: ['dev'],
		cwd: '../app/dashboard',
	},
	{
		name: 'shop',
		command: 'yarn',
		args: ['dev'],
		cwd: '../app/shop',
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
