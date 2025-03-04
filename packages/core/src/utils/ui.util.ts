import { integerToTime } from './time.util';

const renderAddress = ({
	address,
	showCity = true,
	showState = true,
	showZipcode = true,
	showCountry = false,
	lineBreak = true,
}: {
	address: any;
	showCity?: boolean;
	showState?: boolean;
	showZipcode?: boolean;
	showCountry?: boolean;
	lineBreak?: boolean;
}) => {
	if (!address) return '';
	return `${address.street1 + ' '}${address.street2 || ''}${
		(showCity && ' ') || ''
	}${(showCity && showState && lineBreak && '\n') || ''}${
		(showCity && address.city) || ''
	}${(showCity && showState && ', ' + address.state) || ''}${
		(showCity && showState && showZipcode && ' ' + address.zipcode) || ''
	}${(showCountry && ' ' + address.country) || ''}`;
};

const renderSchedule = (schedule: any): [string, string][] => {
	return schedule.reduce((acc: any, day: any) => {
		return [
			...acc,
			[
				day.day,
				`${integerToTime(day.openAt)} to ${integerToTime(day.closeAt)}`,
			],
		];
	}, [] as any);
};

function truncate(text: string) {
	return text.slice(0, 5) + text.slice(-4).padStart(7, '.');
}

function truncateWordsLongerThanNChars(text: string, maxChars: number) {
	const words = text.split(' ');
	let truncatedString = '';
	for (const word of words) {
		if (word.length <= maxChars) {
			truncatedString += word + ' ';
			maxChars -= word.length + 1; // +1 to account for the space
		} else {
			break;
		}
	}
	return truncatedString.trim(); // Remove trailing space
}

function truncateWordsAndLeaveN(text: string, numWordsToKeep: number) {
	const words = text.split(' ');
	if (words.length <= numWordsToKeep) {
		return text;
	}
	const truncatedWords = words.slice(0, numWordsToKeep);
	return truncatedWords.join(' ').concat('...');
}

function redact(text: string) {
	const length = text.toString().length;
	const last4characters = text.slice(-4),
		redacted = last4characters.padStart(length, '*');
	return redacted;
}

const redactSensitiveFields = (key: string, value: string | number) => {
	const sensitiveFields = ['password', 're_password', 'stripeAccountId'];
	if (sensitiveFields.includes(key)) {
		return redact(value.toString());
	} else return value;
};

const renderNestedDataObject = (
	data: any,
	Component: React.FunctionComponent,
	options: { removeFields: string[]; sort?: 'asc' | 'desc' } = {
		removeFields: [],
	}
): any => {
	const removeFields = options?.removeFields;
	return Object.keys({ ...data })
		.filter((field) => !removeFields.includes(field))
		.map((key, index) => {
			if (Array.isArray(data[key]) && data[key].length > 0) {
				return data[key].map((item: Record<string, string>) =>
					renderNestedDataObject(item, Component, { removeFields }).flat()
				);
				// return Component({
				// 	key: data[key],
				// 	children:
				// 		key +
				// 		': ' +
				// 		redactSensitiveFields(key, data[key])
				// 			.toString()
				// 			.split(',')
				// 			.join(', '),
				// });
			} else if (typeof data[key] === 'object') {
				return renderNestedDataObject(data[key], Component, { removeFields });
			} else
				return Component({
					key: key + index.toString(),
					children: [key] + ': ' + redactSensitiveFields(key, data[key]),
				});
		})
		.flat(2);
};

// export const renderNestedDataObjectWithProps = <T = Record<string, any>>(
// 	data: any,
// 	Component: React.FunctionComponent<T>,
// 	options: { removeFields: string[] } = { removeFields: [] },
// 	props: T = null as T,
// ): any => {
// 	const removeFields = options?.removeFields;
// 	return Object.keys({ ...data })
// 		.filter((field) => !removeFields.includes(field))
// 		.map((key, index) => {
// 			if (typeof data[key] === 'object')
// 				return renderNestedDataObject(data[key], Component, { removeFields });
// 			else if (Array.isArray(data[key]) && data[key].length > 0)
// 				// can map
// 				return data[key].map((item: Record<string, string>) =>
// 					renderNestedDataObject(item, Component, { removeFields }).flat(),
// 				);
// 			return Component({
// 				key: key + index.toString(),
// 				children: [key] + ': ' + redactSensitiveFields(key, data[key]),
// 				...props,
// 			});
// 		})
// 		.flat(2);
// };

const buildSTFormFields = (data: Record<string, any>): any => {
	return Object.keys(data).map((key) => {
		if (typeof data[key] === 'object' && data[key] !== null) {
			return { id: key, value: buildSTFormFields(data[key]) };
		} else return { id: key, value: data[key] };
	});
};

const getSelectedOptionValue = (selector: string, i: number) => {
	const value = (document.querySelectorAll(selector)[i] as any)
		?.selectedOptions[0].value;
	// console.info('getSelectedOptionValue: ', value);
	return value || 1;
};

function getDigitToWord(digit: string | number) {
	const digitMap = [
		'zero',
		'one',
		'two',
		'three',
		'four',
		'five',
		'six',
		'seven',
		'eight',
		'nine',
	];
	const digitNumber = Number(digit);
	if (!isNaN(digitNumber) && digitNumber >= 0 && digitNumber <= 9) {
		return digitMap[digitNumber];
	} else {
		// throw new Error('getDigitToWord: Invalid input');
		return '';
	}
}

export { 
	renderAddress,
	renderSchedule,
	truncate,
	truncateWordsAndLeaveN,
	truncateWordsLongerThanNChars,
	getDigitToWord,
	getSelectedOptionValue,
	buildSTFormFields,
	redact,
	redactSensitiveFields,
	renderNestedDataObject
}