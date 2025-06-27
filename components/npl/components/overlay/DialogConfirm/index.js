import React from 'react';
import { CiCircleCheck } from 'react-icons/ci';
import { IoInformationCircleOutline } from 'react-icons/io5';

const DialogConfirm = ({ isOpen, onClose, title, children, status = 'alert' }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed top-0 right-0 left-0 z-[100] flex justify-center items-center w-full h-full bg-black bg-opacity-50 ">
            <div className="relative p-4  px-10 py-5">
                <div className="relative w-[540px] bg-white rounded-lg shadow px-7">
                    <div className="flex justify-between items-center py-5 pb-4 border-b border-gray-200">
                        <h4 className="text-xl text-gray-900 font-medium">Message</h4>
                    </div>
                    {/* <button
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                        onClick={onClose}
                    >
                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7L1 13M7 7l6-6" />
                        </svg>
                    </button> */}

                    <div className="p-4 text-center space-y-2">
                        {
                            status === 'alert' &&
                            <IoInformationCircleOutline className='mx-auto h-24 w-24 text-blue-500' />
                        }
                        {status === 'check' && (
                            <CiCircleCheck className='mx-auto h-20 w-20 text-green-500' />
                        )}
                        <p className="self-center text-xl font-semibold uppercase">Information</p>
                        {title && <h3 className="text-lg font-normal text-gray-700">{title}</h3>}

                    </div>
                    <div className='pb-4'>
                        {children}
                    </div>

                </div>

            </div>
        </div>
    );
};

export default DialogConfirm;
