import TextContent from '../../src/constants/text.constant';

describe('Text Content tests', () => {
	it('TextContent is read only', async () => {
		// try to add property to TextContent

		// this should throw an error
		expect(() => {
			Object.defineProperty(TextContent, 'test', { value: 'test' });
		}).toThrow();
	});
});
