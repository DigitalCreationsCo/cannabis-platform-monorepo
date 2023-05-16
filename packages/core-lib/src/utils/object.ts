
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