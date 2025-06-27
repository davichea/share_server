import React from 'react';

import { cn } from '@/utils/cn';
import ArrowIcon from '../../icon';
const TablePagination = React.memo(({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
  onNumberPage,
  itemRange,
  loading,
  className
}) => {
  const pageNumbers = [];
  if (totalPages < 6) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  }
  else {
    pageNumbers.push(1, 2, 3);

    if (currentPage > 3) {
      pageNumbers.push('...');
    }
    if (currentPage > 3 && currentPage < totalPages - 2) {
      pageNumbers.push(currentPage);
    }
    if (currentPage < totalPages - 2) {
      pageNumbers.push('...');
    }
    pageNumbers.push(totalPages - 2, totalPages - 1, totalPages);
  }
  return (
    <nav className={cn('p-6 bg-white flex items-center justify-between py-4', className)}>

      <ul className="flex items-center text-sm h-auto gap-4">
        <li className="font-medium text-gray-800 text-sm">Showing record: {itemRange} results</li>
      </ul>
      <ul className="flex items-end text-sm h-auto gap-4">

        {/* Previous page button */}
        <li>
          <button
            type="button"
            onClick={onPreviousPage}
            disabled={currentPage === 1 || loading}
            className="cursor-pointer"
            aria-label="Previous page"
          >
            <ArrowIcon type="arrow" direction="left" strokeColor="black" disabled={currentPage === 1} />
          </button>
        </li>

        {/* Page numbers */}
        {pageNumbers.map((page, index) => {
          // console.log('page', page);
          // console.log('currentPage', currentPage);

          return (
            <li key={index}>
              {page === '...' ? (
                <span className="text-gray-500">...</span>
              ) : (
                <button
                  disabled={loading}
                  type="button"
                  onClick={() => page !== currentPage && onNumberPage(page)}
                  className={`${page === currentPage ? 'bg-blue-500 text-white' : 'text-blue-600'
                    } rounded-full w-8 h-8 flex items-center justify-center cursor-pointer`}
                >
                  {page}
                </button>
              )}
            </li>
          );
        })}

        {/* Next page button */}
        <li>
          <button
            type="button"
            onClick={onNextPage}
            disabled={currentPage === totalPages || loading}
            className="cursor-pointer"
            aria-label="Next page"
          >
            <ArrowIcon type="arrow" direction="right" strokeColor="black" disabled={currentPage === totalPages} />
          </button>
        </li>

      </ul>
    </nav>
  );
});

export default TablePagination;
