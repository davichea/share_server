import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";
const selectStyles = cva(
    'block min-w-[140px] max-h-[42px] w-full cursor-pointer p-2 text-sm rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500',
    {
        variants: {
            color: {
                primary: 'text-gray-900 border-gray-200',
                secondary: 'text-gray-700 border-gray-400',
                danger: 'text-white border-red-500',
            },
            size: {
                sm: 'h-8',
                md: 'h-11',
                lg: 'h-12',
            },
            border: {
                true: 'border focus:outline-none',
                false: 'bg-transparent focus:outline-none',
            },
            disabled: {
                true: 'bg-gray-100 cursor-not-allowed',
                false: '',
            },
        },
        defaultVariants: {
            color: 'primary',
            size: 'md',
            border: 'true',
            disabled: 'false',
        },
    }
);

const FormSelectController = ({
    name,
    data,
    valueProp,
    labelProp,
    placeholder,
    defaultValue = "",
    color,
    size,
    border,
    disabled = false,
    showValueAndLabel = false,
    onSelect,
    fetchData,
    className,
    ...rest
}) => {
    const { control, setValue } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div>
                    <select
                        ref={field.ref}
                        className={cn(
                            selectStyles({ color, size, border, disabled }),
                            className
                        )}
                        value={field.value?.value || ""}
                        onChange={(e) => {
                            const selectedValue = e.target.value;
                            const selectedLabel = data.find(
                                (item) => item[valueProp] == selectedValue
                            )?.[labelProp];
                            field.onChange({ value: selectedValue, label: selectedLabel });
                            if (onSelect) {
                                onSelect({ value: selectedValue, label: selectedLabel });
                            } 
                            if (fetchData) {
                                fetchData();
                            }
                        }}
                        disabled={disabled}
                        {...rest}
                    >
                        {/* <option value="">
                            {placeholder}
                        </option> */}
                        {data?.map((item, index) => (
                            <option key={item[valueProp]} value={item[valueProp]}>
                                {showValueAndLabel ? `${item[valueProp]} - ${item[labelProp]}` : item[labelProp]}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        />
    );
};

export default FormSelectController;
