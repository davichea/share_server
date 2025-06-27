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

const columns = [
    // { id: 'customerID', name: 'Customer ID' },
    { id: 'loanAccountNumber', name: 'Account Number' },
    // { id: 'loanOfficerID', name: 'Officer ID' },
    { id: 'loanDisburseAmount', name: 'Disburse Amount' },
    { id: 'loanDisburseCurrency', name: 'Disburse Currency' },
    { id: 'loanDisburseAmountInUsd', name: 'Disburse Amount In USD' },
    { id: 'loanInterestRate', name: 'Interest Rate' },
    { id: 'principalAmount', name: 'OS Amount' },
    { id: 'principalCurrency', name: 'OS Currency' },
    // { id: 'branchID', name: 'Branch ID' },
    // { id: 'branchName', name: 'Branch Name' },

]

const TableLoanInformation = ({
    // columns,
    loading,
    totalRows,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    fetchData,
    data,
}) => {
    // console.log('table infor', data)
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
        <div className="flex flex-col">
            <div className='overflow-x-auto w-full rounded-lg'>
                <TableContainer>
                    <div className={cn('overflow-y-auto')}
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
                                    data?.length === 0 ?
                                        (
                                            <TableEmpty colSpan={columns.length} message="No record found" className={'h-[35vh]'} />
                                        ) :
                                        (
                                            data?.map((row, index) => {

                                                return (
                                                    <tr
                                                        key={row.accountNumber}
                                                        className={`cursor-pointer transition-all duration-500 hover:bg-gray-100}`}    >

                                                        <TableDataCell className='py-2'>
                                                            {row.accountNumber}
                                                        </TableDataCell>

                                                        {/* <TableDataCell className='py-2'>
                                                            {row.officerID}
                                                        </TableDataCell> */}

                                                        <TableDataCell className='py-2'>
                                                            {formatNumber(row.disburseAmount)}
                                                        </TableDataCell>

                                                        <TableDataCell className='py-2'>
                                                            {row.disburseCurrency}
                                                        </TableDataCell>

                                                        <TableDataCell className='py-2'>
                                                            {formatNumber(row.disburseAmountInUSD)}
                                                        </TableDataCell>

                                                        <TableDataCell className='py-2'>
                                                            {isEmptyRow(row.interestRate)}
                                                        </TableDataCell>

                                                        <TableDataCell className='py-2'>
                                                            {formatNumber(row.principalAmount)}
                                                        </TableDataCell>

                                                        <TableDataCell className='py-2'>
                                                            {row.principalCurrency}
                                                        </TableDataCell>

                                                        {/* <TableDataCell className='py-2'>
                                                            {row?.branchID}
                                                        </TableDataCell>

                                                        <TableDataCell className='py-2'>
                                                            {row?.branchName}
                                                        </TableDataCell> */}



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

export default TableLoanInformation
