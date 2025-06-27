import React from 'react'

const index = ({children,...props}) => {
    return (
        <th
            {...props}
            className="px-5 py-3 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
        >
            {children}
        </th>
    )
}

export default index