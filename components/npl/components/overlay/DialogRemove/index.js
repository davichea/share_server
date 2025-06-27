import DialogConfirm from '@/components/npl/components/overlay/DialogConfirm';
import FooterButtonConfirm from '@/components/npl/components/ui/FooterButtonConfirm';
import React from 'react'

const DialogRemoveItem = ({
    isOpen,
    onCloseDialog,
    title,
    onConfirmBtn,
}) => {
    return (
        <DialogConfirm
            isOpen={isOpen}
            onClose={onCloseDialog}
            title={`Are you sure you want to delete this ${title}?`}
        >
            <FooterButtonConfirm>
                <button
                    onClick={onConfirmBtn}
                    className="min-w-[100px] bg-red-600 text-white hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Yes
                </button>
                <button
                    onClick={onCloseDialog}
                    className="min-w-[100px] ml-3 bg-white text-gray-900 border border-gray-200 hover:bg-gray-100 hover:text-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    No
                </button>
            </FooterButtonConfirm>
        </DialogConfirm>
    )
}

export default DialogRemoveItem