import { cn } from '@/utils/cn'
import React from 'react'

const TableDataCell = ({ children , className}) => {
    return (
        <td className={cn('px-5 whitespace-nowrap text-sm leading-6  text-gray-900',className)}>
            {children}
        </td>
    )
}

export default TableDataCell