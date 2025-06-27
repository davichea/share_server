import React from 'react'

export default function Label({ name, ...props }) {
    return (
        <label
            htmlFor={name}
            className='text-gray-500'
            {...props}
        >

        </label>
    )
}
