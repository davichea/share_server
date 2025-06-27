import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from "antd";
import dayjs from "dayjs"; // Import dayjs for date manipulation
import { cn } from "@/utils/cn";export const getValueQuarterDates = (date) => {
    const month = dayjs(date).month(); // Get selected month (0-based index)
    const year = dayjs(date).year();

    const quarterConfig = [
        { start: 0, end: 2 },  // Q1: Jan - Mar
        { start: 3, end: 5 },  // Q2: Apr - Jun
        { start: 6, end: 8 },  // Q3: Jul - Sep
        { start: 9, end: 11 }  // Q4: Oct - Dec
    ];

    // Determine the quarter range
    const { start: quarterStartMonth, end: quarterEndMonth } = quarterConfig[Math.floor(month / 3)];

    // Get the first and last date of the quarter
    const quarterStartDate = dayjs(new Date(year, quarterStartMonth, 1)).format("YYYY-MM-DD");
    const quarterEndDate = dayjs(new Date(year, quarterEndMonth + 1, 0)).format("YYYY-MM-DD");

    return { quarterStartDate, quarterEndDate };
};
const DatePickerAnt = ({ name, picker = "month", placeholder, disable, disableDate, defaultValue }) => {
    const { control, setValue } = useFormContext();

    return (
        <>
            <style>
                {`
          .custom-datepicker .ant-picker-input > input {
            outline: none !important;
            box-shadow: none !important;
          }
           .custom-datepicker:focus-within {
            border-color: rgb(59 130 246 / var(--tw-text-opacity, 1)) !important;
            }
        `}
            </style>
            <Controller
                name={name}
                control={control}

                render={({ field }) => (
                    <DatePicker
                        {...field}
                        picker={picker}
                        disabledDate={disableDate}
                        disabled={disable}
                        value={field.value ? dayjs(field.value) : defaultValue} // Use passed defaultValue
                        onChange={(date) => {
                            if (date && picker != 'quarter')
                                field.onChange(dayjs(date).endOf("month"));
                            else if (date && picker == 'quarter') {
                                const { quarterStartDate, quarterEndDate } = getValueQuarterDates(date);
                                field.onChange(quarterEndDate);
                                setValue(`${name}Range`, { start: quarterStartDate, end: quarterEndDate }, { shouldValidate: true });
                            }
                        }}
                        placeholder={placeholder}
                        className={cn(
                            'custom-datepicker focus-within:ring-2 focus-within:outline-none min-w-[210px] h-[42px] rounded-lg border border-gray-200 text-sm p-2'
                        )}
                    />
                )}
            />
        </>
    );
};

export default DatePickerAnt;
