import findUp from 'find-up';

function findPath(filename: string) {
	function _filename() {
		return filename;
	}
	const path = findUp.sync(_filename());
	return path;
}


export { findPath }
