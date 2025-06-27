import React from 'react';
import { Controller } from 'react-hook-form';
import Datepicker from 'react-tailwindcss-datepicker';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Define styles using cva
const inputStyles = cva(
  'w-full h-[42px] text-sm p-2 pt-2.5 rounded-lg',
  {
    variants: {
      disabled: {
        true: 'bg-gray-100 text-gray-400 cursor-not-allowed',
        false: 'text-gray-900',
      },
      size: {
        sm: 'h-10 p-2 text-sm',
        md: 'h-[42px] p-2 text-base',
        lg: 'h-[50px] p-3 text-lg',
      },
      width: {
        sm: 'w-[150px]',
        md: 'w-[205px]',
        lg: 'w-[300px]',
        full: 'w-full',
      },
      border: {
        true: 'border border-gray-200',
        false: 'bg-transparent focus:outline-none',
      },
      focused: {
        true: 'focus:ring-2 focus:ring-blue-500 focus:outline-none',
        false: '',
      },
    },
    defaultVariants: {
      disabled: false,
      size: 'medium',
      focused: true,
      border: true,
      width: 'full',
    },
  }
);
const toggleButtonStyles = cva(
  'absolute right-0 h-full px-3 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed',
  {
    variants: {
      icon: {
        light: 'text-gray-400',
        dark: 'text-gray-900',
      },
      focused: {
        true: 'ring-2 ring-blue-500',
        false: '',
      },
    },
    defaultVariants: {
      icon: 'light',
      focused: false,
    },
  }
);

const DatepickerTailwind = ({
  fetchData,
  control,
  name,
  defaultValue = { startDate: null, endDate: null },
  displayFormat = 'YYYY-MM-DD',
  placeholder = 'Select date',
  disabled,
  size,
  focused,
  border,
  width,
  icon,
  useRange = false,
  className
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) =>
        !disabled ? (
          <Datepicker
            useRange={useRange}
            readOnly={true}
            value={value}
            onChange={(newValue) => {
              onChange(newValue);
              if(fetchData) fetchData();
            }}
            displayFormat={displayFormat}
            placeholder={placeholder}
            toggleClassName={toggleButtonStyles({ icon, focused })}
            inputClassName={cn(
              inputStyles({
                disabled,
                size,
                focused,
                border,
                width,
              }),
              className
            )}
          />
        ) : (
          <div
            className={cn(
              inputStyles({
                disabled,
                size,
                focused,
                border,
                width,
              }),
              className,
            )}>
            {value?.startDate || value?.endDate
              ? `${value.startDate || ''} - ${value.endDate || ''}`
              : placeholder}
          </div>
        )
      }
    />
  );
};

export default DatepickerTailwind;
