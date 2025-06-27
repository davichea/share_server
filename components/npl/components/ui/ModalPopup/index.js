import { BiX, BiErrorCircle, BiInfoCircle } from "react-icons/bi";

export default function ModalPopup(props) {
    return(
        <>
            {
                props.showPopup ? (
                    <div className="flex justify-center items-center overflow-y-auto overflow-x-hidden fixed z-[10000] w-full bg-black bg-opacity-40 inset-0 h-modal md:w-full sm:h-full">
                        <div className="relative p-9 h-auto max-w-screen-sm w-full -mt-[140px] max-md:p-11">
                    
                            <div className="relative rounded-lg shadow bg-white">
                        
                                <div className="flex justify-between p-2">
                                    <button
                                        onClick={ () => props.onClose(false) } 
                                        type="button" 
                                        className="text-slate-400 bg-transparent hover:bg-slate-100 hover:duration-300 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                                        <BiX className="w-6 h-6 "/>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                    
                                <div className="flex flex-col justify-start items-center pb-10">
                                    <BiInfoCircle className="w-32 h-28 text-sky-800"/>
                                    <span className="font-semibold text-2xl tracking-wide text-slate-700 max-md:text-xl">Switch Application</span>
                                    <p className="text-center px-10 py-7 text-slate-500">Do you want to switch application ?</p>
                                    <div className="flex">
                                        <button 
                                            onClick={ () => props.onClose(false) } 
                                            className="mx-2 px-7 py-2 rounded-md font-semibold text-white bg-sky-700 hover:bg-sky-800">No, Thank
                                        </button>
                                        <button 
                                            onClick={ () => props.onCallBack() }
                                            className="mx-2 px-7 py-2 rounded-md font-semibold text-white bg-sky-700 hover:bg-sky-800">Yes, Swtich it
                                        </button>
                                    </div>
                                </div>
                
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </>
    )
}