
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

export const shuffle = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}