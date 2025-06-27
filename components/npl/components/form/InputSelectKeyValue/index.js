import { cn } from '@/lib/utils';
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

const InputSelectKeyValue = React.memo(
    React.forwardRef(({
        fetchData,
        readOnly = false,
        heightDropDown = 300,
        placeholder,
        name,
        options = [],
        label,
        valueKey,
        labelKey,
        disabled,
        onClearInput,
        className,
        error,
        dropdownPosition = 'bottom',
        onSelect,
        ...rest
    }, ref) => {
        // console.log('options',options)
        const { register, setValue, watch } = useFormContext();
        const inputValue = watch(name);
        const [dropdownOpen, setDropdownOpen] = useState(false);
        const dropdownRef = useRef(null);


        const filteredOptions = useMemo(() => {
            if (inputValue) {
                return options?.filter(option =>
                    `${option[valueKey]} - ${option[labelKey]}`
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                );
            }
            return options;
        }, [inputValue, options, valueKey, labelKey]);

        const handleInputChange = useCallback(
            (e) => {
                const value = e.target.value;
                setValue(name, value);
            },
            [name, setValue]
        );

        const handleOptionSelect = useCallback(
            (option) => {
                setValue(name, `${option[valueKey]} - ${option[labelKey]}`, { shouldValidate: true, shouldDirty: true });
                setValue(`${name}Id`, option[valueKey], { shouldValidate: true, shouldDirty: true });
                setValue(`${name}Item`, option)
                setDropdownOpen(false);
                if (onSelect){
                    onSelect(option)
                }
            },
            [name, valueKey, labelKey, setValue]
        );

        const handleClearInput = useCallback(() => {
            setValue(name, '');
            setValue(`${name}Id`, null);
            if (fetchData) fetchData()
            if (onClearInput) onClearInput()

        }, [name, setValue, onClearInput]);

        useEffect(() => {
            const handleClickOutside = (event) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setDropdownOpen(false);
                }
            };
            document.addEventListener('click', handleClickOutside);
            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }, []);

        const dropdownPositionStyle =
            dropdownPosition === 'top'
                ? { bottom: '100%', marginBottom: '4px' }
                : { top: '100%', marginTop: '4px' };

        return (
            <div className="relative" ref={dropdownRef}>
                {label && <label className="block mb-2 text-sm font-medium text-gray-500">{label}</label>}
                <div className="relative">
                    <input
                        ref={ref}
                        name={name}
                        type="text"
                        onChange={handleInputChange}
                        onFocus={() => !disabled && setDropdownOpen(true)}
                        className={cn(
                            `block w-full h-[42px] p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10`,
                            disabled && 'bg-gray-100 text-gray-400',
                            error && 'border-red-500',
                            className
                        )}
                        placeholder={placeholder || "Type to search"}
                        {...register(name)}
                        {...rest}
                        disabled={disabled}
                        autoComplete="off"
                        readOnly={readOnly}
                    />
                    {inputValue && !disabled && (
                        <button
                            type="button"
                            onClick={handleClearInput}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
                {dropdownOpen && !disabled && (
                    <ul
                        className={cn(
                            'overflow-auto absolute bg-white border rounded shadow w-full z-[999]',
                            { 'hidden': !filteredOptions.length }
                        )}
                        style={{ maxHeight: `${heightDropDown}px`, ...dropdownPositionStyle }}
                    >
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <li key={option[valueKey]}>
                                    <button
                                        type="button"
                                        onClick={() => handleOptionSelect(option)}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        {option[valueKey]} - {option[labelKey]}
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li>
                                <div className="block w-full text-left px-4 py-2 text-gray-500">No value found</div>
                            </li>
                        )}
                    </ul>
                )}
            </div>
        );
    })
);

export default InputSelectKeyValue;
