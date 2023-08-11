import { type Address } from '@cd/data-access';

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

const sensitiveFields = ['password', 're_password', 'stripeAccountId'];

const redactSensitiveFields = (key: string, value: string | number) => {
	if (sensitiveFields.includes(key)) {
		const length = value.toString().length,
			last4characters = value.toString().slice(-4),
			redacted = last4characters.padStart(length, '*');

		return redacted;
	} else return value;
};

export const renderNestedDataObject = (
	data: any,
	Component: any,
	options: { removeFields?: string[] } = {},
): any => {
	const removeFields = options?.removeFields;
	return Object.keys({ ...data })
		.filter((field) => {
			return removeFields && !removeFields.includes(field);
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
