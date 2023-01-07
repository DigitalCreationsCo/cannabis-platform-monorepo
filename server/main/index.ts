import { config } from 'dotenv';
config();

import prisma from '@cd/data-access';
import { connectDb, server } from './src';
const port = process.env.PORT || 8001;

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
