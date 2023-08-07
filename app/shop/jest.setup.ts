import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { loadEnv } from './src/config/loadEnv.mjs';
expand(config({ path: loadEnv('development') }));
