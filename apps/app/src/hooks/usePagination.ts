const usePagination = (currentPage: number, data: Parameters<typeof usePagination>[1][], pageSize = 10) => {
    const indexOfLastTodo = currentPage * pageSize;
    const indexOfFirstTodo = indexOfLastTodo - pageSize;
    const currentData = data.slice(indexOfFirstTodo, indexOfLastTodo);
    return currentData;
};

export default usePagination;
