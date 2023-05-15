import { Address } from '@cd/data-access';

export const renderAddress = ({
    address,
    showCity = true,
    showState = true,
    showCountry = true,
    showZipcode = true,
} : { 
    address : Omit<Address, "id" | "userId" | "organizationId" | "createdAt" | "updatedAt">;
    showCity?: boolean;
    showState?: boolean;
    showCountry?: boolean;
    showZipcode?: boolean;
}) => (
    `${address.street1} ${address.street2}
    ${showCity && address.city + ', ' || ''} ${showState && address.state || ''}
    ${showCountry && address.country || ''} ${showZipcode && address.zipcode || ''}`
    );

export const renderNestedDataObject = (data: any, Component: any, removeFields: any):any => {
    const result = Object.keys({ ...data })
        .filter((field) => {
            (removeFields && !removeFields.includes(field)) || true;
        })
        .map((key, index) => {
            if (typeof data[key] === 'object') {
                return renderNestedDataObject(data[key], Component, removeFields);
            } else return Component({ key: key + index.toString(), children: [key] + ': ' + data[key] });
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
