import { cn } from "@/utils/cn";import React from "react";

const ToggleSwitch = React.forwardRef(({
    disabled = false,
    className,
    color = 'success',
    ...props
}, ref) => {
    return (
        <label
            className={cn(
                "relative flex items-center",
                !disabled && "cursor-pointer" // only add cursor-pointer if not disabled
            )}
        >
            <input
                ref={ref}
                type="checkbox"
                className="sr-only peer"
                disabled={disabled}
                {...props}
            />
            <div
                className={cn(
                    "w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-transparent after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all",
                    {
                        'peer-checked:bg-blue-600 hover:peer-checked:bg-blue-700 ': color === 'primary',
                        'peer-checked:bg-gray-600 hover:peer-checked:bg-gray-700 ': color === 'secondary',
                        'peer-checked:bg-red-600 hover:peer-checked:bg-red-700': color === 'danger',
                        'peer-checked:bg-green-600 hover:peer-checked:bg-green-700': color === 'success',
                    },
                    className
                )}
            ></div>
        </label>
    );
});
ToggleSwitch.displayName = "ToggleSwitch";
export default ToggleSwitch;
