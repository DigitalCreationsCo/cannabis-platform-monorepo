import { Address } from '@cd/data-access';
import { isArray } from './object';

export const renderAddress = ({
    address,
    showCity = true,
    showState = true,
    showCountry = true,
    showZipcode = true,
    lineBreak = true,
}: {
    address?: Omit<Address, "id" | "userId" | "organizationId" | "createdAt" | "updatedAt">;
    showCity?: boolean;
    showState?: boolean;
    showCountry?: boolean;
    showZipcode?: boolean;
    lineBreak?: boolean;
}) => {
    if (!address) return '';
    return `${address.street1} ${address.street2}${lineBreak ? '\n' : ''}${showCity && address.city + ', ' || ''}${showState && address.state || ''}${showCountry && ',' || ''}${lineBreak ? '\n' : ''}${showCountry && address.country || ''} ${showZipcode && address.zipcode || ''}`
};

const sensitiveFields = [
    'password',
    're_password',
    'stripeAccountId'
]

const redactSensitiveFields = (key: string, value: string | number) => {
    if (sensitiveFields.includes(key)) {

        let
            length = value.toString().length,
            last4characters = value.toString().slice(-4),
            redacted = last4characters.padStart(length, '*')

        return redacted;
    }
    else
        return value;
}

export const renderNestedDataObject = (data: any, Component: any, removeFields: any = []): any => {
    const result = Object.keys({ ...data })
        .filter((field) => {
            return (removeFields && !removeFields.includes(field))
        })
        .map((key, index) => {
            if (typeof data[key] === 'object')
                return renderNestedDataObject(data[key], Component, removeFields);
            else
                if (isArray(data[key]))
                    // can map
                    return renderNestedDataObject(data[key][0], Component, removeFields);

            return Component({ key: key + index.toString(), children: [key] + ': ' + redactSensitiveFields(key, data[key]) });
        })
        .flat();
    return result;
};

export const buildSTFormFields = (data: Record<string, any>): any => {
    const result = Object.keys(data).map((key) => {
        if (typeof data[key] === 'object' && data[key] !== null) {
            return { id: key, value: buildSTFormFields(data[key]) };
        } else return { id: key, value: data[key] };
    });
    return result;
};
