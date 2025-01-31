import findUp from 'find-up';

function findPath(filename) {
	function _filename() {
		return filename;
	}
	const path = findUp.sync(_filename());
	return path;
}


export { findPath }
