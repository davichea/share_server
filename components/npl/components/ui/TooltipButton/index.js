import React from 'react';
import Tooltip from '@mui/material/Tooltip';

const TooltipButton = ({ title, onClick, disabled, children }) => {
    return (
        <Tooltip title={title} placement="bottom">
            <div>
                <button
                    disabled={disabled}
                    onClick={onClick}
                    type="button"
                    className="w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-500 hover:bg-gray-200"
                >
                    {children}
                </button>
            </div>
        </Tooltip>
    );
};

export default TooltipButton;
