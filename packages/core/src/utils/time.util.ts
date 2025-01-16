/* eslint-disable @typescript-eslint/naming-convention */
import { formatInTimeZone, type FormatOptionsWithTZ } from 'date-fns-tz';
import { type ValueOf } from './index';

export const showDate = (dateString: string) => {
	const date = new Date(dateString);

	const options = {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	} as Intl.DateTimeFormatOptions;
	const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

	return formattedDate.replace(',', '');
};

export const showTime = (
	time: string,
	timeZone: string,
	formatOptions: Intl.DateTimeFormatOptions = {
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
		timeZone,
	}
) => {
	const [hour, minutes] = time.split(':').map(Number) as [number, number];
	const date = new Date();
	date.setHours(hour);
	date.setMinutes(minutes);
	return new Intl.DateTimeFormat('en-US', formatOptions).format(date);
};

export const showDay = (date: Date | string) => {
	// if the day is today, return 'today'
	const today = new Date();
	if (new Date(date).getDate() === today.getDate()) return 'Today';
	// if the day is tomorrow, return 'tomorrow'
	const tomorrow = new Date(today);
	tomorrow.setDate(today.getDate() + 1);
	if (new Date(date).getDate() === tomorrow.getDate()) return 'Tomorrow';
	return new Date(date).toLocaleDateString('en-us', {
		weekday: 'short',
		day: 'numeric',
		month: 'short',
	});
};
export function calculateDeliveryDeadline(): Date {
	const hourSeconds = 60 * 60 * 1000;
	const deliveryGuaranteeHours = Number(process.env.NEXT_PUBLIC_DELIVERY_TIME);
	return new Date(Date.now() + deliveryGuaranteeHours * hourSeconds);
}

export function integerToTime(number: number): string {
	if (number < 0 || number > 2359) throw new Error('Invalid time');
	const hours = Math.floor(number / 100);
	const minutes = number % 100;
	const period = hours < 12 ? 'am' : 'pm';
	const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
	let formattedMinutes;
	switch (true) {
		case minutes == 0:
			formattedMinutes = '';
			break;
		case minutes < 10:
			formattedMinutes = `:0${minutes}`;
			break;
		default:
			formattedMinutes = `:${minutes}`;
			break;
	}
	return `${formattedHours}${formattedMinutes}${period}`;
}

export const TimeZoneMap = {
	AL: 'CST',
	AK: 'AKST',
	AZ: 'MST',
	AS: 'SST',
	AR: 'CST',
	CA: 'PST',
	CO: 'MST',
	CT: 'EST',
	DE: 'EST',
	DC: 'EST',
	FL: 'EST',
	GA: 'EST',
	GU: 'ChST',
	HI: 'HST',
	ID: 'MST',
	IL: 'CST',
	IN: 'EST',
	IA: 'CST',
	KS: 'CST',
	KY: 'CST',
	LA: 'CST',
	ME: 'EST',
	MD: 'EST',
	MA: 'EST',
	MI: 'EST',
	MN: 'CST',
	MS: 'CST',
	MO: 'CST',
	MT: 'MST',
	NE: 'CST',
	NV: 'PST',
	NH: 'EST',
	NJ: 'EST',
	NM: 'MST',
	NY: 'EST',
	NC: 'EST',
	ND: 'CST',
	MP: 'ChST',
	OH: 'EST',
	OK: 'CST',
	OR: 'PST',
	PA: 'EST',
	PR: 'AST',
	RI: 'EST',
	SC: 'EST',
	SD: 'CST',
	TN: 'CST',
	TX: 'CST',
	VI: 'AST',
	UT: 'MST',
	VT: 'EST',
	VA: 'EST',
	WA: 'PST',
	WV: 'EST',
	WI: 'CST',
	WY: 'MST',
	null: 'UTC',
	undefined: 'UTC',
	'': 'UTC',
} as const;

/**
 * Format a date string to a specific time zone with a given format
 * @param dateString
 * @param timeZone
 * @param formatStr
 * @param locale
 * @returns
 */
export function formatToTimeZone(
	dateString: Date | string,
	timeZone: ValueOf<typeof TimeZoneMap> = 'UTC',
	formatStr = 'yyyy-MM-dd HH:mm:ss',
	options: FormatOptionsWithTZ = {}
	// locale = 'en-US',
) {
	try {
		return formatInTimeZone(new Date(dateString), timeZone, formatStr, options);
	} catch (error: any) {
		console.error('formatToTimeZone: ', error.message, dateString, timeZone);
		throw new Error(error.message);
	}
}
