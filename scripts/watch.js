const child_process = require('child_process');

let spawn = child_process.spawn('yarn', ['watch'], {cwd: '../packages/data-access', stdio: 'inherit' })
    spawn.on('error', err => console.error(err))
    spawn.stdout.on('data', (data) => {
        console.log(`Child process output: ${data}`);
    });
    spawn.stdout.on('resume', (data) => {
        console.log(`Child process output: ${data}`);
    })
    spawn.stdout.on('readable', (data) => {
        console.log(`Child process output: ${data}`);
    })
    spawn.on('message', (data) => {
        console.log(`Child process output: ${data}`);
    })
// commands list
// const commands = [
//     // {
//     //     name: 'pwd',
//     //     command: 'pwd'
//     // },
//     {
//         name: 'data-access',
//         command: 'cd ../packages/data-access && yarn watch'
//     },
//     // {
//     //     name: 'core-lib',
//     //     command: 'cd ../packages/core-lib && yarn watch'
//     // },
//     // {
//     //     name: 'ui-lib',
//     //     command: 'cd ../packages/ui-lib && yarn watch'
//     // },
//     // {
//     //     name: 'server-main',
//     //     command: 'cd ../server/main && yarn watch'
//     // },
//     // {
//     //     name: 'server-location',
//     //     command: 'cd ../server/location && yarn watch'
//     // },
//     // {
//     //     name: 'server-payments',
//     //     command: 'cd ../server/payments && yarn watch'
//     // },
//     // {
//     //     name: 'server-image',
//     //     command: 'cd ../server/image && yarn watch'
//     // }
// ];

// // run command
// function runCommand(command, name, callback) {
//     // child_process.exec(command, function (error, stdout, stderr) {
//     //     if (stderr) {
//     //         callback(stderr, null);
//     //     } else {
//     //         console.log('stdout: ' + stdout)
//     //         callback(null, ` ** Executed ${name} watch command`);
//     //     }
//     // });
//     // let spawn = child_process.spawn('cd', { detached: false, stdio: 'inherit' })
//     let spawn = child_process.spawn('cd', ['../packages/data-access', '&&', 'yarn', 'watch'])
//     spawn.on('error', err => console.error(err))
//     spawn.stdout.on('data', (data) => {
//         console.log(`Child process output: ${data}`);
//     });
//     spawn.stdout.on('resume', (data) => {
//         console.log(`Child process output: ${data}`);
//     })
      
// }

// // main calling function
// function main() {
//     commands.forEach(element => {
//         runCommand(element.command, element.name, (err, res) => {
//             if (err) {
//                 console.error(err);
//             } else {
//                 console.log(res);
//             }
//         });
//     });
// }

// // call main
// main();