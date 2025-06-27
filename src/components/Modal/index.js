import React, { Children } from 'react'

export default function Modal({ children }) {
    return (
        <div className="fixed inset-0 bg-black/20  flex justify-center items-center">
            <div className="bg-white p-4 rounded-xl w-full max-w-md">
                <button className="float-right font-bold">×</button>
                <div className="mt-[30px]">{children}</div>
            </div>
        </div>
    )
}
