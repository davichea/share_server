import { cn } from "@/utils/cn";import React from "react";

const FormTextarea = React.forwardRef(({ error, customError, readOnly, disabled, className, ...props }, ref) => {
  return (
    <div>
      <textarea
        ref={ref}
        readOnly={readOnly}
        disabled={disabled}
        {...props}
        className={cn(
          "p-2.5 pr-12 h-[80px] truncate-input border border-gray-300 text-sm rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full ",
          {
            'bg-gray-100 text-gray-400 border-gray-200': disabled,
            'bg-white text-gray-900': !disabled,
          },
          className
        )}
      />

      {error || customError ? (
        <p className="text-red-500 mt-1 text-sm">
          {customError ? customError : error?.message}
        </p>
      ) : null}
    </div>
  );
});

FormTextarea.displayName = 'FormTextarea';

export default FormTextarea;
