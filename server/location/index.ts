import { loadEnv } from '@cd/shared-config/config/loadEnv.mjs';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';

const nodeEnv = process.env.NODE_ENV;
expand(config({ path: loadEnv(nodeEnv) }));
const port = process.env.SERVER_LOCATION_PORT || 'xxxx';

import { connectDb, server } from './src';

connectDb()
    .then(() => {
        server.listen(port, () => {
            console.log(` 🚀 Server: LOCATION listening on port ${port}.`);
            console.info(' ♞ Server: LOCATION running in ' + nodeEnv + ' mode.');
        });
    })
    .catch((err) => {
        console.error('Error connecting to database: ', err.stack);
        process.exit(1);
    });
