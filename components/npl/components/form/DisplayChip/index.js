// components/DisplayChip.tsx or .jsx
import React, { forwardRef, memo } from 'react';
import { cn } from '@/lib/utils'; // Adjust path based on your project

const DisplayChip = forwardRef(({
  options = [],
  className = '',
  placeholder = '',
  labelKey = 'id',
  valueKey = 'name',
  showValueKey = false,
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'w-full py-1 h-auto flex flex-wrap gap-2 items-center border rounded-lg px-3',
        className
      )}
    >
      {options.length > 0 ? (
        options.map((item, index) => (
          <span
            key={index}
            className={cn(
              'flex items-center text-sm px-2 py-1 rounded-md whitespace-nowrap',
              item.isTrue ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            )}
          >
            {showValueKey && `${item[labelKey]} - `} {item[valueKey]}
          </span>
        ))
      ) : (
        <span className="text-gray-400 text-sm">{placeholder}</span>
      )}
    </div>
  );
});

DisplayChip.displayName = 'DisplayChip';

export default memo(DisplayChip);
