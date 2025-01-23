interface TableProps {
	head?: string[];
	body: string[];
}
function Table({ head, body }: TableProps) {
	return (
		<table className="table-auto">
			{head?.map((data, index) => (
				<thead key={`table-head-${index}`}>{data}</thead>
			))}
			{body.map((input, index) => (
				<tbody key={`table-body-${index}`}>{input}</tbody>
			))}
		</table>
	);
}

export default Table;
