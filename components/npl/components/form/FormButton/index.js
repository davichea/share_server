import { cn } from "@/utils/cn";

const FormButton = ({
    type = 'button',
    onClick,
    disabled = false,
    children,
    className,
    color = 'primary'  // New prop to handle color variations
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "h-[40px] gap-2 py-2.5 px-5 text-sm text-white rounded-lg cursor-pointer font-normal text-center shadow-xs transition-all duration-500 flex items-center",
                {
                    // 'bg-gray-300 cursor-not-allowed opacity-50': disabled,
                    'bg-blue-500 hover:bg-[#2570eb] disabled:bg-blue-300 disabled:cursor-default': color === 'primary',
                    'bg-gray-500 hover:bg-gray-600': color === 'secondary',
                    'bg-red-500 hover:bg-red-600 disabled:bg-red-300 disabled:cursor-default': color === 'danger',
                    'bg-green-500 hover:bg-[#28a745]': color === 'success',
                    'bg-white border border-gray-200 text-black hover:bg-gray-50': color === 'white',
                },
                className
            )}
        >
            {children}
        </button>
    );
};

export default FormButton;
