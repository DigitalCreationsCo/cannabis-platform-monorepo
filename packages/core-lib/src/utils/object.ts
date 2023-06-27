export const pruneData = (data: Record<string, any>, fields: string[]) => {
  let pruned = Object.keys(data)
    .filter((field) => !fields.includes(field))
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: data[key],
      };
    }, {});
  return pruned;
};

export const isArray = (val: any) => {
  return Object.prototype.toString.apply(val) === '[object Array]';
};

export const shuffle = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export function dateToString(doc: any) {
  if (doc != null || doc != undefined) {
    Object.keys(doc).forEach((key) => {
      // console.log("key pair: ", doc[key]);
      if (typeof doc[key] === 'object' && doc[key] !== null) {
        // console.log("object found");
        dateToString(doc[key]);
      }
      // if type is date
      if (
        typeof doc[key] === 'object' &&
        doc[key] !== null &&
        Object.prototype.toString.call(doc[key]) === '[object Date]'
      ) {
        doc[key] = JSON.parse(JSON.stringify(doc[key]));
      }
    });
  }
  return doc;
}
