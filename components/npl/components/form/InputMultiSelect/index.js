import { cn } from "@/utils/cn";import React, { useRef, useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

// Use forwardRef to allow ref forwarding and memo for optimization
const InputMultiSelect = React.memo(
  React.forwardRef((
    {
      name,
      options = [],
      placeholder,
      labelKey,
      valueKey,
      disabled,
      showValueKey = false,
      className,
      onSelect,
      hideRemoveIcon,
      onClearInput,
      error }, ref
  ) => {
    // console.log(name, options)
    const { register, setValue, watch, trigger } = useFormContext();
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const selectedValues = watch(name) || [];

    const [availableOptions, setAvailableOptions] = useState([]);

    // Handle select
    const handleSelect = (item) => {
      const newSelected = [
        ...selectedValues,
        {
          [labelKey]: item[labelKey],
          [valueKey]: item[valueKey],
        },
      ];
      setValue(name, newSelected);
      if (onSelect) {
        onSelect(item)
      }
      trigger(name)
      setAvailableOptions((prev) => prev.filter((option) => option[labelKey] !== item[labelKey]));
    };

    // Remove chip
    const removeChip = (value) => {
      const updated = selectedValues.filter((selected) => selected[labelKey] !== value);
      setValue(name, updated);
      const removed = options.find((option) => option[labelKey] === value);
      if (removed) {
        setAvailableOptions((prev) => [...prev, removed]);
        if (onClearInput) onClearInput(value)
      }
      trigger(name)
    };

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
      const selected = watch(name) || [];
      const filtered = options.filter(
        (opt) => !selected.some((sel) => sel[labelKey] === opt[labelKey])
      );
      setAvailableOptions(filtered);
    }, [options, watch(name)]);

    return (
      <div className="relative w-full" ref={dropdownRef}>
        <input
          type="hidden"
          {...register(name)}
          ref={ref}
        />
        {/* Chips & Input box */}
        <div
          className={cn(
            "w-full py-1 min-h-[42px] flex flex-wrap gap-1 items-center border rounded-lg px-3  cursor-pointer",
            {
              "ring-red-300 ring-1": error,
              "border-gray-300 focus:ring-blue-300": !error,
              'bg-gray-100 text-gray-400 border-gray-200': disabled,
              'bg-white text-gray-900': !disabled,
            },
            className
          )}

          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedValues.length > 0 ? (
            selectedValues.map((item, index) => (
              <span
                key={`${item[labelKey]}-${index}`}
                className="flex items-center bg-gray-100 text-sm px-2 rounded-md"
              >
                {item[valueKey]}
                
                {
                  !hideRemoveIcon?.includes(item[labelKey]) && (
                    <button
                      type="button"
                      className="ml-2 text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeChip(item[labelKey]);
                      }}
                    >
                      ✕
                    </button>
                  )
                }


              </span>
            ))
          ) : (
            <span className="text-gray-400 text-[14px] ml-[-3px]">{placeholder}</span>
          )}
        </div>

        {/* Dropdown list */}
        {isOpen && (
          <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            <ul className="max-h-44 overflow-y-auto">
              {availableOptions.length > 0 ? (
                availableOptions.map((item, index) => (
                  <li
                    key={`${item[labelKey]}-${index}`}
                    className="p-2 cursor-pointer hover:bg-blue-500 text-sm hover:text-white"
                    onClick={() => handleSelect(item)}
                  >
                    {showValueKey && `${item[labelKey]} - `} {item[valueKey]}
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-400 text-sm text-center">
                  No options available
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    );
  })
);

export default InputMultiSelect;
