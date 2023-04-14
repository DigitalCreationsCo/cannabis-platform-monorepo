import React from 'react';

type TableProps = {
    head?: any;
    body: any;
};
function Table({ head, body }: TableProps) {
    return (
        <table className="table-auto">
            <thead></thead>
            <tbody></tbody>
        </table>
    );
}

export default Table;
