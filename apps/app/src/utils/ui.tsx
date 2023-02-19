import { Paragraph } from '@cd/shared-ui';
import { Address } from '@prisma/client';

export const renderAddress = (address: Address) => (
    <Paragraph className={'whitespace-pre-line'}>
        {`${address.street1} ${address.street2}
        ${address.city} ${address.state}
        ${address.country} ${address.zipcode}`}
    </Paragraph>
);

export const renderNestedDataObject = (data: any, Component, removeFields) => {
    data = Object.keys({ ...data })
        .filter((d) => !removeFields.includes(d))
        .map((key, index) => {
            if (typeof data[key] === 'object') {
                return renderNestedDataObject(data[key], Component, removeFields);
            } else return Component({ key: key + index.toString(), children: [key] + ': ' + data[key] });
        })
        .flat();
    return data;
};
