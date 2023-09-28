import Enzyme from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import Adapter from '@cfaester/enzyme-adapter-react-18';

// import { TextDecoder, TextEncoder } from 'util';
// Object.assign(global, { TextDecoder, TextEncoder });
// eslint-disable-next-line import/no-named-as-default-member
Enzyme.configure({ adapter: new Adapter() });

Object.defineProperty(document, 'readyState', {
	value: 'complete',
	writable: true,
	enumerable: true,
	configurable: true,
});
