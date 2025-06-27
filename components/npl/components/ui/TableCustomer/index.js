import React from 'react'
import TableContainer from '../../data/Table/TableContainer';
import TableHeader from '../../data/Table/TableHeader';
import TableBody from '../../data/Table/TableBody';
import TableLoading from '../../data/Table/TableLoading';
import TableEmpty from '../../data/Table/TableEmpty';
import TableDataCell from '../../data/Table/TableDataCell';
import TablePagination from '../../data/Table/TablePagination';
import { cn } from '@/utils/cn';
import { isEmptyRow } from '@/lib/patterns/validationPatterns';
import { BsThreeDots } from 'react-icons/bs';

const TableCustomer = ({
    columns,
    loading,
    totalRows,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    fetchData,
    data,
    onRowClick,
    isMultiSelect,
    selectedMultiIds,
    setSelectedMultiIds,
    setUncheckCustomer,
    selectedId
}) => {
    console.log('table', data)
    console.log('selectedMultiIds', selectedMultiIds)
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
    const handleCheckboxChange = (e, value) => {
        const isChecked = e.target.checked;

        let updatedList = [...selectedMultiIds];
        console.log('updatedList',updatedList)
        console.log('value',value)

        if (isChecked) {
            updatedList.push({
                customerID: value.customerID,
                customerName: value.customerName,
            });
            if (setUncheckCustomer) setUncheckCustomer(false)

        } else {
            updatedList = updatedList.filter(
                (item) => item.customerID !== value.customerID
            );
            if (setUncheckCustomer) setUncheckCustomer(true)

        }
        setSelectedMultiIds(updatedList);
    };

    return (
        <div className="flex flex-col mt-4">
            <div className='overflow-x-auto w-full border rounded-lg border-gray-300'>
                <TableContainer>
                    <div className={cn('overflow-y-auto h-[420px]')}
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
                                                        onClick={!isMultiSelect ? () => onRowClick(row) : undefined}
                                                        key={row.customerID}
                                                        className={`cursor-pointer transition-all duration-500 ${selectedId === row.customerID
                                                            ? 'bg-slate-100'
                                                            : 'hover:bg-gray-100'
                                                            }`}    >
                                                        <TableDataCell className='py-2 text-xs flex items-center'>
                                                            {isMultiSelect && (
                                                                <input
                                                                    id={`checkbox-${row.customerID}`}
                                                                    onChange={(e) => handleCheckboxChange(e, row)}
                                                                    onClick={(e) => e.stopPropagation()}
                                                                    type="checkbox"
                                                                    className="w-5 h-5 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                                                    checked={selectedMultiIds?.some(item => item.customerID === row.customerID)}
                                                                />
                                                            )}

                                                            {row.customerID}
                                                        </TableDataCell>

                                                        <TableDataCell className='py-2 text-xs'>
                                                            {row.customerName}
                                                        </TableDataCell>

                                                        <TableDataCell className='py-2 text-xs'>
                                                            {row.branchName}
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

export default TableCustomer
