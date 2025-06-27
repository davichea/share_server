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
        id: "ID",
        name: "ID",
    },
    {
        id: "sumpremeCourtENG",
        name: "Supreme Court ENG",
    },
    {
        id: "sumpremeCourtKHM",
        name: "Supreme Court KHM",
    },

]
const TableComplaintSupremeCourt = ({
    loading,
    totalRows = 0,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    fetchData,
    data = [],
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
                    <div className={cn('overflow-y-auto h-[455px]')}
                    >
                        <table className="w-full rounded-xl">
                            <TableHeader>
                                <tr className="bg-gray-100">
                                    {columns
                                        .map((column) => (
                                            <th
                                                key={column.id}
                                                className={cn('px-5 py-2.5  whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize', {
                                                    'text-left': column.id != 'status',
                                                    'text-center': column.id == 'status'
                                                })}
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
                                    data?.length === 0 ?
                                        (
                                            <TableEmpty colSpan={columns.length} message="No record found" className={'h-[35vh]'} />
                                        ) :
                                        (
                                            data?.map((row, index) => {
                                                // const rowNumber = (currentPage - 1) * itemsPerPage + (index + 1);

                                                return (
                                                    <tr
                                                        key={row.supremCourtID}
                                                        onClick={() => onRowClick(row)}

                                                        className={`cursor-pointer transition-all duration-500 ${selectedId === row.supremCourtID
                                                            ? 'bg-slate-100'
                                                            : 'hover:bg-gray-100'
                                                            }`}
                                                    >
                                                        <TableDataCell className='py-2 text-xs'>
                                                            {index + 1}
                                                        </TableDataCell>

                                                        <TableDataCell className='py-2 text-xs'>
                                                            {row.supremeCourtENG}
                                                        </TableDataCell>

                                                        <TableDataCell className='py-2 text-xs'>
                                                            {row.supremeCourtKHM}
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

export default TableComplaintSupremeCourt
