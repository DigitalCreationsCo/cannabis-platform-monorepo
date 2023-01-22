import prisma from '@cd/data-access';

import { connectDb, server } from './src';
const nodeEnv = process.env.NODE_ENV;

import dotenv from 'dotenv';
import dotEnvExpand from 'dotenv-expand';

import findUp from 'find-up';
const findEnv = (env) => findUp.findUpSync('.env.' + env);
dotEnvExpand.expand(dotenv.config({ path: findEnv(nodeEnv) }));

// async function loadEnv() {
//     const dotenv = await import('dotenv');
//     const dotEnvExpand = await import('dotenv-expand');

//     const { findUpSync } = await import('find-up');
//     const findEnv = (env) => findUpSync('.env.' + env);
//     dotEnvExpand.expand(dotenv.config({ path: findEnv(nodeEnv) }));
// }
// loadEnv();

console.log('server node env: ', process.env.NODE_ENV);
const port = process.env.SERVER_MAIN_PORT || 8001;
console.log('port: ', port);

connectDb(prisma)
    .then(() => {
        server.listen(port, () => {
            console.log(` 🚀 main server listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to database: ', err.stack);
        process.exit(1);
    });
