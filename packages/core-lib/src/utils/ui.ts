import { Address } from '@cd/data-access';

export const renderAddress = ({
    address,
    showCity = true,
    showState = true,
    showCountry = true,
    showZipcode = true,
    breakLine = true,
} : { 
    address : Omit<Address, "id" | "userId" | "organizationId" | "createdAt" | "updatedAt">;
    showCity?: boolean;
    showState?: boolean;
    showCountry?: boolean;
    showZipcode?: boolean;
    breakLine?: boolean;
}) => (
    `${address.street1} ${address.street2}${breakLine?'\n':''}${showCity && address.city + ', ' || ''}${showState && address.state || ''}${breakLine?'\n':', '}${showCountry && address.country || ''} ${showZipcode && address.zipcode || ''}`
    );

export const renderNestedDataObject = (data: any, Component: any, removeFields: any = []):any => {
    console.log('data', data)
    const result = Object.keys({ ...data })
        .filter((field) => {
            console.log('field', field);
            return (removeFields && !removeFields.includes(field)) || true;
        })
        .map((key, index) => {
            if (typeof data[key] === 'object') {
                return renderNestedDataObject(data[key], Component, removeFields);
            } else return Component({ key: key + index.toString(), children: [key] + ': ' + data[key] });
        })
        .flat();
        console.log('result: ', result)
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
