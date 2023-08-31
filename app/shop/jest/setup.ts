import Adapter from '@cfaester/enzyme-adapter-react-18';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { configure } from 'enzyme';
import { loadEnv } from '../src/config/loadEnv.mjs';
configure({ adapter: new Adapter() });

expand(config({ path: loadEnv('development') }));
