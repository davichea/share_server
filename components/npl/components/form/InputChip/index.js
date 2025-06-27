import React, { forwardRef, memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils'; // Update this path based on your project

const InputChip = forwardRef(({
    options = [],
    disabled = false,
    className = '',
    placeholder = '',
    setIsOpen = () => { },
    isOpen = false,
    labelKey = 'id',
    valueKey = 'name',
    showValueKey = false
}, ref) => {
    const { register, setValue, watch } = useFormContext();
    return (
        <div
            ref={ref}
            className={cn(
                'w-full py-1 h-[42px] flex flex-wrap gap-1 items-center border rounded-lg px-3 overflow-x-auto overflow-y-hidden',
                {
                    'bg-gray-100 text-gray-400 border-gray-200': disabled,
                    'bg-white text-gray-900  cursor-pointer': !disabled,
                },
                className
            )}
        >
            <div className='flex flex-nowrap gap-2'>
                {options.length > 0 ? (
                    options.map((item, index) => (
                        <span
                            key={index}
                            className="flex items-center bg-gray-100 text-sm px-2 rounded-md whitespace-nowrap"
                        >
                            {showValueKey && `${item[labelKey]} - `} {item[valueKey]}
                        </span>
                    ))
                ) : (
                    <span className="text-gray-400 text-[14px] ml-[-3px]">
                        {placeholder}
                    </span>
                )}
            </div>

        </div>
    );
});

InputChip.displayName = 'InputChip';

export default memo(InputChip);
