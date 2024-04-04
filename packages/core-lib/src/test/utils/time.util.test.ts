import { formatToTimeZone, integerToTime, showTime } from '../..';

describe('showTime', () => {
	const time = new Date('2020-01-01T12:00:00');
	test(' displays a correct time', () => {
		expect(showTime(time)).toStrictEqual('12:00 PM');
	});
});

// describe('calculateDeliveryDeadline', () => {
// 	test(' returns a two time hours from now', () => {
// 		const now = new Date();
// 		expect(calculateDeliveryDeadline()).toStrictEqual(new Date(now.getTime() + 2 * 60 * 60 * 1000));
// 	});
// });

describe('integerToTime ', () => {
	test(' displays a correct time from a number', () => {
		expect(integerToTime(500)).toStrictEqual('5am');
		expect(integerToTime(2200)).toStrictEqual('10pm');
		expect(integerToTime(2235)).toStrictEqual('10:35pm');
		expect(integerToTime(1600)).toStrictEqual('4pm');
		expect(integerToTime(1200)).toStrictEqual('12pm');
		expect(integerToTime(1224)).toStrictEqual('12:24pm');
		expect(integerToTime(955)).toStrictEqual('9:55am');
		expect(integerToTime(900)).toStrictEqual('9am');
		expect(integerToTime(0)).toStrictEqual('12am');
	});
});

describe('formatToTimeZone ', () => {
	test('displays a correct time from input', () => {
		expect(
			formatToTimeZone('2020-01-01T12:00:00', 'UTC', 'yyyy-MM-dd HH:mm:ss', {
				timeZone: 'UTC',
			}),
		).toStrictEqual('2020-01-01 17:00:00');
		expect(
			formatToTimeZone('2020-01-01T12:00:00', 'UTC', 'yyyy-MM-dd HH:mm:ss'),
		).toStrictEqual('2020-01-01 17:00:00');
		expect(
			formatToTimeZone('2020-01-01T12:00:00', 'EST', 'yyyy-MM-dd HH:mm:ss', {
				timeZone: 'UTC',
			}),
		).toStrictEqual('2020-01-01 12:00:00');
		expect(
			formatToTimeZone('2020-01-01T12:00:00', 'PST', 'yyyy-MM-dd HH:mm:ss'),
		).toStrictEqual('2020-01-01 09:00:00');
		expect(
			formatToTimeZone('2020-01-01T12:00:00', 'PST', 'yyyy-MM-dd'),
		).toStrictEqual('2020-01-01');
	});
});
