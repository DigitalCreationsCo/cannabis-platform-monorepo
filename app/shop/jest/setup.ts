/* eslint-disable @typescript-eslint/no-empty-function */
import util from 'util';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { configure } from 'enzyme';
import { loadEnv } from '../src/config/loadEnv.mjs';

Object.defineProperty(global, 'TextEncoder', {
	value: util.TextEncoder,
});

configure({ adapter: new Adapter() });

expand(config({ path: loadEnv('development') }));

window.matchMedia =
	window.matchMedia ||
	function () {
		return {
			matches: false,
			addListener: function () {},
			removeListener: function () {},
		};
	};
