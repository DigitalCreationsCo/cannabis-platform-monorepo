import { Address } from '@cd/data-access';

export const renderAddress = (address: Address, TextComponent) => (
    <TextComponent className={'whitespace-pre-line'}>
        {`${address.street1} ${address.street2}
        ${address.city} ${address.state}
        ${address.country} ${address.zipcode}`}
    </TextComponent>
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
