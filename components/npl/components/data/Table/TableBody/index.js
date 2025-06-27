import React from 'react'

const TableBody = ({children}) => {
    return (
        <tbody className="divide-y divide-gray-300">
            {children}
        </tbody>
    )
}

export default TableBody