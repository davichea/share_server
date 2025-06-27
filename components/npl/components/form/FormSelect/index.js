import React from "react";

const FormSelect = React.forwardRef(
  (
    { data, onChange, valueProp, labelProp, defaultValue = "", placeholder, ...rest },
    ref
  ) => {
    return (
      <div>
        <select
          ref={ref} 
          className="block h-[44px] w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          defaultValue={defaultValue}
          {...rest}
          onChange={(e) => {
            onChange?.(e); 
          }}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {data.map((item) => (
            <option key={item[valueProp]} value={item[valueProp]}>
              {item[labelProp]}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default FormSelect;
