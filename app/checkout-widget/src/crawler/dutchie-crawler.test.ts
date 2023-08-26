import { regexFieldDict } from './dutchie-crawler';
// 		// returns null, need to mock the dom, in a checkout component test
describe('Crawler : Dutchie Cart', () => {
	it('regex returns the correct data from an item string', async () => {
		const string = 'Guava Fig - 3.5g | 1/8oz';

		const name = string.match(regexFieldDict.name)?.[1];
		expect(name).toBe('Guava Fig');
		const size = string.match(regexFieldDict.size)?.[1];
		expect(size).toBe('3.5');
		const unit = string.match(regexFieldDict.unit)?.[1];
		expect(unit).toBe('g');

		const string2 = 'Deep Line Alchemy Pre-rolls - 1g';
		expect(string2.match(regexFieldDict.name)?.[1]).toBe(
			'Deep Line Alchemy Pre-rolls',
		);
		expect(string2.match(regexFieldDict.size)?.[1]).toBe('1');
		expect(string2.match(regexFieldDict.unit)?.[1]).toBe('g');

		const string3 = 'Berry Bliss Airo Pod - 1g';
		expect(string3.match(regexFieldDict.name)?.[1]).toBe(
			'Berry Bliss Airo Pod',
		);
		expect(string3.match(regexFieldDict.size)?.[1]).toBe('1');
		expect(string3.match(regexFieldDict.unit)?.[1]).toBe('g');

		const string4 = 'ElderYum Elderberry Hemp CBD Chews - 500mg';
		expect(string4.match(regexFieldDict.name)?.[1]).toBe(
			'ElderYum Elderberry Hemp CBD Chews',
		);
		expect(string4.match(regexFieldDict.size)?.[1]).toBe('500');
		expect(string4.match(regexFieldDict.unit)?.[1]).toBe('mg');

		const string5 = 'HappyDawg Hemp Pet Tincture';
		expect(string5.match(regexFieldDict.name)?.[1]).toBe(
			'HappyDawg Hemp Pet Tincture',
		);
		expect(string5.match(regexFieldDict.size)?.[1]).toBe(undefined);
		expect(string5.match(regexFieldDict.unit)?.[1]).toBe(undefined);

		const string6 = 'FelineK9 Serenity Hemp Pet Tincture - 840mg';
		expect(string6.match(regexFieldDict.name)?.[1]).toBe(
			'FelineK9 Serenity Hemp Pet Tincture',
		);
		expect(string6.match(regexFieldDict.size)?.[1]).toBe('840');
		expect(string6.match(regexFieldDict.unit)?.[1]).toBe('mg');
	});
});
