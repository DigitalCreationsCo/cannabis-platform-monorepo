import TextContent from '../../constants/textContent';

describe('Text Content tests', () => {
    test('TextContent is read only', async () => {
        // try to add property to TextContent

        // this should throw an error
        expect(() => {
            Object.defineProperty(TextContent, 'test', { value: 'test' });
        }).toThrow();
    });
});
