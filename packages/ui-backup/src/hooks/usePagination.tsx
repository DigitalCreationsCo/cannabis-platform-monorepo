"use client"
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const usePagination = <T,>(
	data: T[],
	pageSize = 10
): { current: T[]; PaginationButtons: () => JSX.Element } => {
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(data.length / pageSize);
	const PaginationButtons = () =>
		totalPages > 1 ? (
			<div className="py-2 join rounded mx-auto">
				{Array.from(Array(totalPages).keys()).map((pageNum, index) => (
					<button
						key={`pagination-button-${index}`}
						className={twMerge([
							'join-item border p-4 !w-[20px] !h-[20px] hover:bg-primary-light',
							currentPage === pageNum + 1 && 'bg-primary',
						])}
						onClick={() => setCurrentPage(pageNum + 1)}
					>
						{pageNum}
					</button>
				))}
			</div>
		) : (
			<></>
		);

	const indexOfLastTodo = currentPage * pageSize;
	const indexOfFirstTodo = indexOfLastTodo - pageSize;
	const current = data.slice(indexOfFirstTodo, indexOfLastTodo) || [];
	return { current, PaginationButtons };
};

export default usePagination;
