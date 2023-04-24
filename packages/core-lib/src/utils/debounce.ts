// @ts-nocheck

function debounce(func: Function, timeout: number = 300) {
    let timer: NodeJS.Timeout ;
    return (...args: any) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}
function saveInput() {
    console.log('Saving data');
}
const processChange = debounce(() => saveInput());

export { debounce as default };

