const usePagination = <P>(
	currentPage: number,
	data: P[],
	pageSize = 10
): P[] => {
	const indexOfLastTodo = currentPage * pageSize;
	const indexOfFirstTodo = indexOfLastTodo - pageSize;
	const currentData = data.slice(indexOfFirstTodo, indexOfLastTodo);
	return currentData || [];
};

export default usePagination;
