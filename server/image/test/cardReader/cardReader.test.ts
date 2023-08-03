import CardReader from '../../src/api/scan/cardReader';

describe('Id Card Reader Test', () => {
	let cardReader: CardReader;

	test('check isLegalAge from underage Maryland id should return false', async () => {
		beforeEach(() => {
			let text = 'id card text here';
			const cardReader = new CardReader(text);
		});
		cardReader.isLegalAge();
	});

	test('check isLegalAge from 21 Maryland id should return true', async () => {
		cardReader.isLegalAge();
	});

	test('cardreader scans a uri that is not an image file');
	test('cardreader scans a uri that is not an image of an id');
});
