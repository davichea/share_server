import React, { useState, useRef, useEffect, forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/utils/cn";import { HiChevronDown } from "react-icons/hi";

const InputCurrency = forwardRef((
    {
        name,
        readOnly,
        disabled,
        className,
        currencyOptions = [],
        onCurrencyChange,
        valueKey = "id",
        labelKey = "name",
        currencyControl = `${name}Currency`,
        ...props
    },
    ref
) => {


    const containerRef = useRef(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { register, setValue, watch } = useFormContext();
    const selectedCurrency = watch(currencyControl);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (currencyOptions.length > 0 && !selectedCurrency) {
            setValue(currencyControl, currencyOptions[0]);
        }
    }, [currencyOptions]);


    const handleSelectCurrency = (item) => {
        setValue(currencyControl, item);
        setDropdownOpen(false);
        if (onCurrencyChange)
            onCurrencyChange(item[valueKey]);

    };

    return (
        <div className={cn("relative w-full", className)} ref={containerRef}>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <input
                    {...register(name)}
                    {...props}
                    ref={ref}
                    type='number'
                    readOnly={readOnly}
                    disabled={disabled}
                    className={cn(
                        "flex-grow p-2.5 text-sm text-gray-900 outline-none",
                        {
                            "bg-gray-100 text-gray-400 cursor-not-allowed": disabled,
                            "bg-white": !disabled,
                        }
                    )}
                />

                {currencyOptions.length > 0 && (
                    <button
                        type="button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        disabled={disabled}
                        className={cn(
                            "px-2 flex justify-between items-center bg-gray-100 border-l border-gray-300 select-none text-sm font-medium text-gray-700 w-20",
                            {
                                "cursor-not-allowed": disabled,
                                "hover:bg-gray-200 cursor-pointer": !disabled,
                            }
                        )}

                        aria-haspopup="listbox"
                        aria-expanded={dropdownOpen}
                    >
                        <p className="flex-1">
                            {selectedCurrency ? selectedCurrency[labelKey] : ''}
                        </p>
                        <HiChevronDown className="h-4 w-4 text-gray-600" />
                    </button>

                )}
            </div>

            {/* 👇 This hidden input stores the currency ID separately */}
            <input type="hidden" {...register(currencyControl)} />

            {dropdownOpen && (
                <ul
                    role="listbox"
                    tabIndex={-1}
                    className="absolute right-0 mt-1 w-20 bg-white border border-gray-300 rounded shadow-lg z-10 max-h-40 overflow-y-auto"
                >
                    {currencyOptions.map((item) => (
                        <li
                            key={item[valueKey]}
                            role="option"
                            tabIndex={0}
                            onClick={() => handleSelectCurrency(item)}
                            className={cn(
                                "cursor-pointer px-3 py-1 hover:bg-blue-500 hover:text-white",
                                item[valueKey] === selectedCurrency[valueKey] &&
                                "bg-blue-600 text-white"
                            )}
                        >
                            {item[labelKey]}
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
});


export default InputCurrency;
