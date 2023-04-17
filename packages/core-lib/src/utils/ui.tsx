import { Address } from '@cd/data-access';

export const renderAddress = (address: Address) => (
    <>
        {`${address.street1} ${address.street2}
        ${address.city}, ${address.state}
        ${address.country} ${address.zipcode}`}
    </>
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
