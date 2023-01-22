import prisma from '@cd/data-access';
import { loadEnv } from '@cd/shared-config/config/loadEnv.js';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';

const nodeEnv = process.env.NODE_ENV;
expand(config({ path: loadEnv(nodeEnv) }));
const port = process.env.SERVER_MAIN_PORT || 'xxxx';

import { connectDb, server } from './src';

connectDb(prisma)
    .then(() => {
        server.listen(port, () => {
            console.log(` 🚀 Server Main listening on port ${port}.`);
            console.info(' ♞ Server Main running in ' + nodeEnv + ' mode.');
        });
    })
    .catch((err) => {
        console.error('Error connecting to database: ', err.stack);
        process.exit(1);
    });
