const nodeEnv = process.env.NODE_ENV;
console.info(' ♞ Server Main running in ' + nodeEnv + ' mode.');

import prisma from '@cd/data-access';
import { loadEnv } from '@cd/shared-config/config/loadEnv';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { connectDb, server } from './src';
expand(config({ path: loadEnv(nodeEnv) }));

const port = process.env.SERVER_MAIN_PORT || 'xxxx';

connectDb(prisma)
    .then(() => {
        server.listen(port, () => {
            console.log(` 🚀 Server Main listening on port ${port}.`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to database: ', err.stack);
        process.exit(1);
    });
