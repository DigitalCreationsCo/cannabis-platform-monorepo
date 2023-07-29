import { loadEnv as getEnv } from '@cd/core-lib';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';

export function loadEnv() {
    console.info('node env: ', process.env.NODE_ENV);
    expand(config({ path: getEnv(process.env.NODE_ENV) }));
    console.info('env loaded');
    console.info('crypto key', process.env.NEXT_PUBLIC_CRYPTO_SK);
}

