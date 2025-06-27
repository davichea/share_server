import { cn } from "@/utils/cn";

const TableLoading = ({ className,rowCount, columns = [], checkedRow = {}, cellCount }) => {

    // Determine visible columns if columns are provided
    const visibleColumns = columns.length > 0 
        ? columns.filter(column => column.isVisible && checkedRow[column.id] !== false)
        : Array.from({ length: cellCount }); // Fallback to default cell count if no columns
    // console.log('loading')
    return (
        <>
            {Array.from({ length: rowCount }).map((_, rowIndex) => (
                <tr key={rowIndex} className="animate-pulse">
                    {visibleColumns.map((_, cellIndex) => (
                        <td key={cellIndex} className={cn('px-5 py-3 whitespace-nowrap text-sm leading-6 font-medium text-gray-900',className)}>
                            <div className="h-4 bg-gray-200 rounded-full"></div>
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
};

export default TableLoading;
