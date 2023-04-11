const usePagination = (currentPage, data, pageSize = 10) => {
    const indexOfLastTodo = currentPage * pageSize;
    const indexOfFirstTodo = indexOfLastTodo - pageSize;
    const currentData = data.slice(indexOfFirstTodo, indexOfLastTodo);
    return currentData;
};
export default usePagination;
//# sourceMappingURL=usePagination.js.map