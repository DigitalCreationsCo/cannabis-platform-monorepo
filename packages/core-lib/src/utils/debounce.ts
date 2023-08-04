/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

// eslint-disable-next-line @typescript-eslint/ban-types
function debounce(func: Function, timeout = 300) {
	let timer: NodeJS.Timeout;
	return (...args: any) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
}
function saveInput() {
	console.info('Saving data');
}
const processChange = debounce(() => saveInput());

export { debounce, processChange };
