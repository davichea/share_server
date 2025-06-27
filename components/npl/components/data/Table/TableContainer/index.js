import React from 'react'

const TableContainer = ({ children }) => {
    return (

        <div className="overflow-x-auto ">
            <div className="block bg-white">
                <div className="overflow-x-auto w-full shadow">
                    {children}
                </div>
            </div>
        </div>

    )
}

export default TableContainer