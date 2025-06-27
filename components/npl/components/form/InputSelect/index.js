import { cn } from '@/utils/cn';
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

const InputSelect = React.memo(
    React.forwardRef(({ fetchData, readOnly = false, heightDropDown = 300, placeholder, name, options, label, valueKey, labelKey, disabled, onClearInput, className, error, dropdownPosition = 'bottom', showInputDropDown = false, showValueKey = false, displayId = false,onSelect , ...rest }, ref) => {
        // console.log('opt',options)
        const { register, setValue, watch } = useFormContext();
        const inputValue = watch(name);
        const [dropdownOpen, setDropdownOpen] = useState(false);
        const dropdownRef = useRef(null);
        // Memoized filtered options
        const filteredOptions = useMemo(() => {
            if (inputValue) {
                return options?.filter(option =>
                // Search both labelKey and valueKey if showValueKey is true
                (option[labelKey]?.toLowerCase().includes(inputValue.toLowerCase()) ||
                    (showValueKey && option[valueKey]?.toString().toLowerCase().includes(inputValue.toLowerCase())))
                );
            }
            return options;
        }, [inputValue, options, labelKey, valueKey, showValueKey]);


        const handleInputChange = useCallback((e) => {
            const value = e.target.value;
            setValue(name, value);
        }, [name, setValue]);

        const handleInputFocus = useCallback(() => {
            if (!disabled) {
                setDropdownOpen(true);
            }
        }, [disabled]);

        const handleOptionSelect = useCallback((option) => {
            setValue(name, displayId ? option[valueKey] : option[labelKey], { shouldValidate: true, shouldDirty: true });
            setValue(`${name}Id`, option[valueKey], { shouldValidate: true, shouldDirty: true });
            setValue(`${name}Item`, option)
            setDropdownOpen(false);
            if(onSelect){
                onSelect(option,watch())
            }
        }, [name, labelKey, valueKey, setValue]);

        const handleClearInput = useCallback(() => {
            const clearInput = async () => {
                setValue(name, '');
                setValue(`${name}Id`, null);

                if (onClearInput) {
                    onClearInput();
                }

                if (fetchData) {
                    await fetchData();
                }
            };

            clearInput();
        }, [name, setValue, onClearInput]);


        useEffect(() => {
            const handleClickOutside = (event) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setDropdownOpen(false);
                }
            };
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, []);

        const dropdownPositionStyle = dropdownPosition === 'top' ? { bottom: '100%', marginBottom: '4px' } : { top: '100%', marginTop: '4px' };
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
            }
        };
        return (
            <div className="relative" ref={dropdownRef}>
                {label && (
                    <label className="block mb-2 text-sm font-medium text-gray-500">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        name={name}
                        type="text"
                        onKeyDown={handleKeyDown}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        className={cn(
                            `block w-full h-[42px] p-2 text-sm  border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10 ${disabled ? 'bg-gray-100 text-gray-400' : ''}`,
                            {
                                'border-red-500': error, // Optional: Show red border if there's an error
                            },
                            className // Add additional class names from props
                        )}
                        placeholder={placeholder || "Type to search"}
                        ref={ref}
                        {...register(name)}
                        {...rest}
                        disabled={disabled}
                        autoComplete='off'
                        readOnly={readOnly}
                    />
                    {inputValue && (
                        <button
                            disabled={disabled}
                            type="button"
                            onClick={handleClearInput}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {
                                !disabled &&
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            }

                        </button>
                    )}
                </div>

                {dropdownOpen && !disabled && (
                    <ul
                        className={
                            cn('overflow-auto absolute bg-white border rounded shadow w-full z-[999]', {
                                'hidden': filteredOptions?.length === 0,
                                // 'block' :  !inputValue && showValueKey && showInputDropDown,
                                // 'block' : inputValue  && showValueKey,
                            })
                        }
                        style={{ maxHeight: `${heightDropDown}px`, ...dropdownPositionStyle }} // Apply dynamic positioning
                    >
                        {filteredOptions?.length > 0 ? (
                            filteredOptions.map((option,index) => (
                                <li key={index}>
                                    <button
                                        type="button"
                                        onClick={() => handleOptionSelect(option)}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        {showValueKey && `${option[valueKey]} - `} {option[labelKey]}

                                    </button>
                                </li>
                            ))
                        ) : (
                            inputValue &&
                            <li>
                                <div className="block w-full text-left px-4 py-2 text-gray-500">
                                    No value found
                                </div>
                            </li>
                        )}
                    </ul>
                )}
            </div>
        );
    })
);

export default InputSelect;
