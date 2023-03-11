import { Paragraph } from '@cd/shared-ui';
import { Address } from '@prisma/client';

export const renderAddress = (address: Address) => (
    <Paragraph className={'whitespace-pre-line'}>
        {`${address.street1} ${address.street2}
        ${address.city} ${address.state}
        ${address.country} ${address.zipcode}`}
    </Paragraph>
);

export const renderNestedDataObject = (data, Component, removeFields) => {
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

export const buildSTFormFields = (data) => {
    const result = Object.keys(data).map((key) => {
        if (typeof data[key] === 'object' && data[key] !== null) {
            return { id: key, value: buildSTFormFields(data[key]) };
        } else return { id: key, value: data[key] };
    });
    return result;
};
