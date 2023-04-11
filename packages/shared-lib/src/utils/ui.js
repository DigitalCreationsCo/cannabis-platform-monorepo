import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
export const renderAddress = (address) => (_jsx(_Fragment, { children: `${address.street1} ${address.street2}
        ${address.city}, ${address.state}
        ${address.country} ${address.zipcode}` }));
export const renderNestedDataObject = (data, Component, removeFields) => {
    const result = Object.keys({ ...data })
        .filter((field) => {
        (removeFields && !removeFields.includes(field)) || true;
    })
        .map((key, index) => {
        if (typeof data[key] === 'object') {
            return renderNestedDataObject(data[key], Component, removeFields);
        }
        else
            return Component({ key: key + index.toString(), children: [key] + ': ' + data[key] });
    })
        .flat();
    return result;
};
export const buildSTFormFields = (data) => {
    const result = Object.keys(data).map((key) => {
        if (typeof data[key] === 'object' && data[key] !== null) {
            return { id: key, value: buildSTFormFields(data[key]) };
        }
        else
            return { id: key, value: data[key] };
    });
    return result;
};
//# sourceMappingURL=ui.js.map