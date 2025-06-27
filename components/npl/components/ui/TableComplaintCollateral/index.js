import React from 'react'
import TableContainer from '../../data/Table/TableContainer';
import TableHeader from '../../data/Table/TableHeader';
import TableBody from '../../data/Table/TableBody';
import TableLoading from '../../data/Table/TableLoading';
import TableEmpty from '../../data/Table/TableEmpty';
import TableDataCell from '../../data/Table/TableDataCell';
import TablePagination from '../../data/Table/TablePagination';
import { cn } from '@/utils/cn';
import { formatNumber } from '@/lib/utils/formatNumber';
import { isEmptyRow } from '@/lib/patterns/validationPatterns';
import StatusBadge from '../StatusBadge';

const columns = [
    {
        id: "CollateralID",
        name: "Collateral ID",
    },
    {
        id: "CollateralENG",
        name: "Collateral ENG",
    },
    {
        id: "Collateral KHM",
        name: "CollateralKHM",
    },
    {
        id: "Description",
        name: "Description",
    },
    {
        id: "Status",
        name: "Status",
    },
]
const TableComplaintCollateral = ({
    loading,
    totalRows,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    fetchData,
    data ,
    onRowClick,
    selectedId
}) => {
    const totalPages = Math.ceil(totalRows / itemsPerPage);
    const itemRange = `${(currentPage - 1) * itemsPerPage + 1} – ${Math.min(currentPage * itemsPerPage, totalRows)} of ${totalRows}`;
    const goToPreviousPage = () => {
        setCurrentPage((prev) => {
            const newPage = Math.max(prev - 1, 1);
            fetchData({ page: newPage });
            return newPage;
        });
    };

    const goToNextPage = () => {
        setCurrentPage((prev) => {
            const newPage = Math.min(prev + 1, totalPages);
            fetchData({ page: newPage });
            return newPage;
        });
    };
    const goToNumberPage = (page) => {
        setCurrentPage(page);
        fetchData({ page });
    };


    return (
        <div className="flex flex-col my-4">
            <div className='overflow-x-auto w-full border rounded-lg border-gray-300'>
                <TableContainer>
                    <div className={cn('overflow-y-auto h-[495px]')}
                    >
                        <table className="w-full rounded-xl">
                            <TableHeader>
                                <tr className="bg-gray-100">
                                    {columns
                                        .map((column) => (
                                            <th
                                                key={column.id}
                                                className="px-5 py-2.5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                                            >
                                                {column.name}
                                            </th>
                                        ))}
                                </tr>
                            </TableHeader>
                            <TableBody>
                                {loading ?
                                    (
                                        <TableLoading
                                            rowCount={10}
                                            cellCount={columns?.length}
                                        />
                                    ) :
                                    totalRows === 0 ?
                                        (
                                            <TableEmpty colSpan={columns.length} message="No record found" className={'h-[35vh]'} />
                                        ) :
                                        (
                                            data?.map((row, index) => {

                                                return (
                                                    <tr
                                                        key={row.CollateralID}
                                                        onClick={() => onRowClick(row)}

                                                        className={`cursor-pointer transition-all duration-500 ${selectedId === row.CollateralID
                                                            ? 'bg-slate-100'
                                                            : 'hover:bg-gray-100'
                                                            }`}
                                                    >
                                                        <TableDataCell className='py-2 text-xs'>
                                                            {row.CollateralID}
                                                        </TableDataCell>

                                                        <TableDataCell className='py-2 text-xs'>
                                                            {row["Collateral ENG"]}
                                                        </TableDataCell>

                                                        <TableDataCell className='py-2 text-xs'>
                                                            {isEmptyRow(row["Collateral KHM"])}
                                                        </TableDataCell>

                                                        <TableDataCell className='py-2 text-xs'>
                                                            {isEmptyRow(row.Description)}
                                                        </TableDataCell>

                                                        <TableDataCell className='py-2'>
                                                            <StatusBadge status={row.Status ? "Yes" : "No"} />
                                                        </TableDataCell>
                                                    </tr>
                                                );
                                            })
                                        )
                                }
                            </TableBody>
                        </table>

                    </div>

                </TableContainer>
            </div>

            {
                totalRows > 0 &&
                <TablePagination
                    loading={loading}
                    className="px-0"
                    itemRange={itemRange}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPreviousPage={goToPreviousPage}
                    onNextPage={goToNextPage}
                    onNumberPage={goToNumberPage}
                    totalItems={totalRows}
                    itemsPerPage={itemsPerPage}
                />
            }
        </div>
    )
}

export default TableComplaintCollateral
