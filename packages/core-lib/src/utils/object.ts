
export const pruneData = (data: Record<string, any>, fields: string[]) => {
    let pruned = Object.keys(data)
        .filter((field) => !fields.includes(field))
        .reduce((obj, key) => {
            return {
                ...obj,
                [key]: data[key]
            }
        }, {});
    return pruned;
}

export const isArray = (val: any) => {
    return Object.prototype.toString.apply(val) === '[object Array]';
}