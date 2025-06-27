
export const DialogDynamic = ({
    isOpen,
    icon,
    title,
    question,
    buttonCancelText,
    buttonOkText,
    onClose,
    onButtonCancelClick,
    onButtonOkClick,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-[999]">
            <div className="bg-white rounded-lg shadow-lg w-[560px]">
                {/* Header */}
                <div className="flex justify-end items-center p-4">
                    <button
                        type="button"
                        className=" text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                        onClick={onClose}
                    >
                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7L1 13M7 7l6-6" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-8 text-center space-y-4 -mt-[45px]">
                    <div className="flex items-center justify-center">
                        {icon}

                    </div>
                    <h2 className="text-2xl font-semibold text-gray-700 !mt-1">{title}</h2>
                    <p className="text-gray-500">{question}</p>

                    {/* Buttons */}
                    <div className="flex justify-center space-x-4">
                        {
                            buttonCancelText &&
                            <button
                                className="bg-red-500 min-w-[125px] text-white px-4 py-2 rounded-md hover:bg-red-600"
                                onClick={onButtonCancelClick}
                            >
                                {buttonCancelText}
                            </button>
                        }

                        <button
                            className="bg-blue-500 min-w-[125px] text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            onClick={onButtonOkClick}
                        >
                            {buttonOkText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

