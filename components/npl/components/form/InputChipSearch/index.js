import React, { forwardRef, memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { CiSearch } from 'react-icons/ci';

const InputChipSearch = forwardRef(({
    options = [],
    disabled = false,
    className = '',
    placeholder = 'Choose here',
    labelKey = 'id',
    valueKey = 'name',
    showValueKey = false,
    onSearch,
    name, // required for register
    ...rest
}, ref) => {
    const { register } = useFormContext();

    const safeOptions = Array.isArray(options) ? options : [];
    const joinedValue = safeOptions.map(item => item[valueKey]).join(', ');

    return (
        <div className="relative w-full">
            <div
                className={cn(
                    'flex items-center border rounded-lg h-[42px] px-3 pr-12',
                    {
                        'bg-gray-100 text-gray-400 border-gray-200': disabled,
                        'bg-white text-gray-900': !disabled,
                    },
                    className
                )}
            >
                <div className="flex gap-2 overflow-x-auto w-full whitespace-nowrap">
                    {safeOptions.length > 0 ? (
                        safeOptions.map((item, index) => (
                            <span
                                key={index}
                                className="flex items-center bg-gray-100 text-sm px-2 rounded-md shrink-0"
                            >
                                {showValueKey && `${item[labelKey]} - `} {item[valueKey]}
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-400 text-sm">
                            {placeholder}
                        </span>
                    )}
                </div>

                {/* Hidden input to register value */}
                <input
                    type="hidden"
                    value={joinedValue}
                    disabled={disabled}
                    {...register(name)}
                    {...rest}
                />
            </div>

            <button
                type="button"
                disabled={disabled}
                onClick={onSearch}
                className="absolute top-1/2 -translate-y-1/2 right-2 h-[32px] w-[40px] text-blue-700 font-medium rounded-lg text-sm p-2.5 flex items-center justify-center"
            >
                <CiSearch className="w-5 h-5" />
            </button>
        </div>
    );
});

InputChipSearch.displayName = 'InputChipSearch';

export default memo(InputChipSearch);
