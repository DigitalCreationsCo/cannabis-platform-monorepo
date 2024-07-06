/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

// eslint-disable-next-line @typescript-eslint/ban-types
// Debounce function
function debounce(func, timeout = 300) {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func(...args);
		}, timeout);
	};
}

function saveInput() {
	console.info('Saving data');
}
const processChange = debounce(() => saveInput());

export { debounce, processChange };
