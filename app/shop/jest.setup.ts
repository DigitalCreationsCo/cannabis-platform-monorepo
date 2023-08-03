import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { loadEnv } from './src/config/loadEnv.mjs';

// hard coded for development vars
expand(config({ path: loadEnv('development') }));
