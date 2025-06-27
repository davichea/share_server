import { cn } from "@/utils/cn";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi"; // using react-icons

const InputField = ({ name, label, type = "text", placeholder, rules }) => {
    const { register, formState: { errors } } = useFormContext();
    const [showPassword, setShowPassword] = useState(false);

    // Determine input type: showPassword only affects password inputs
    let inputType = type;
    if (type === "password" && showPassword) {
        inputType = "text";
    }


    return (
        <div className="relative">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                id={name}
                type={inputType}
                {...register(name, rules)}
                placeholder={placeholder}
                className={cn(
                    "w-full text-black px-4 py-2 border rounded-xl focus:outline-none focus:ring-1",
                    errors[name]
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                )}
            />
            {/* Show eye icon only if type is password */}
            {type === "password" && (
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700 focus:outline-none"
                // tabIndex={-1} // prevents tab focus on the button
                // aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </button>
            )}
            {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
            )}
        </div>
    );
};

export default InputField;
