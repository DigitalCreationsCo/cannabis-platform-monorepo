import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
expand(config({ path: '../../.env.development' }));
