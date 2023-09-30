import { type Address, type Schedule } from '@cd/data-access';
import { integerToTime } from './time.util';

export const renderAddress = ({
	address,
	showCity = true,
	showState = true,
	showZipcode = true,
	showCountry = false,
	lineBreak = true,
}: {
	address?: Omit<
		Address,
		'id' | 'userId' | 'organizationId' | 'createdAt' | 'updatedAt'
	>;
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

export const renderSchedule = (schedule: Schedule[]) => {
	return schedule.reduce((render, day) => {
		return render.concat(
			`${day.day} ${integerToTime(day.openAt)} to ${integerToTime(
				day.closeAt,
			)}\n`,
		);
	}, '' as string);
};

export function truncate(text: string) {
	return text.slice(0, 5) + text.slice(-4).padStart(7, '.');
}

export function redact(text: string) {
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

export const renderNestedDataObject = (
	data: any,
	Component: any,
	options: { removeFields: string[] } = { removeFields: [] },
): any => {
	const removeFields = options?.removeFields;
	return Object.keys({ ...data })
		.filter((field) => {
			return !removeFields.includes(field);
		})
		.map((key, index) => {
			if (typeof data[key] === 'object')
				return renderNestedDataObject(data[key], Component, { removeFields });
			else if (Array.isArray(data[key]) && data[key].length > 0)
				// can map
				return data[key].map((item: Record<string, string>) =>
					renderNestedDataObject(item, Component, { removeFields }).flat(),
				);

			return Component({
				key: key + index.toString(),
				children: [key] + ': ' + redactSensitiveFields(key, data[key]),
			});
		})
		.flat(2);
};

export const buildSTFormFields = (data: Record<string, any>): any => {
	return Object.keys(data).map((key) => {
		if (typeof data[key] === 'object' && data[key] !== null) {
			return { id: key, value: buildSTFormFields(data[key]) };
		} else return { id: key, value: data[key] };
	});
};

export const getSelectedOptionValue = (selector: string, i: number) => {
	const value = (document.querySelectorAll(selector)[i] as any)
		?.selectedOptions[0].value;
	console.info('getSelectedOptionValue: ', value);
	return value || 1;
};

export function getDigitToWord(digit: string | number) {
	console.info('getDigitToWord: ', digit);

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
