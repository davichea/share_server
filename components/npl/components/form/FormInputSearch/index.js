import { cn } from "@/utils/cn";
import React from "react";
import { CiSearch } from "react-icons/ci";

const FormInputSearch = React.forwardRef(
    ({ placeholder = "Choose here", onSearch, disabled, className, ...props }, ref) => {
        return (
            <div className="relative">
                <input
                    ref={ref}
                    {...props} 
                    className={cn(
                        "h-[44px] rounded-lg !pr-10 truncate-input border-gray-200 block pb-[12px] p-2.5 focus:outline-none w-full text-sm border",
                        className
                    )}
                    placeholder={placeholder || "Search..."}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            if (!disabled) onSearch()
                        }
                    }}
                    disabled={disabled}
                />
                <button
                    type="button"
                    disabled={disabled}
                    onClick={onSearch}
                    className="absolute top-[6px] right-2 h-[32px] w-[40px] text-blue-700 font-medium rounded-lg text-sm p-2.5 flex items-center justify-center"
                >
                    <CiSearch className="w-5 h-5" />
                </button>
            </div>
        );
    }
);

export default FormInputSearch;
