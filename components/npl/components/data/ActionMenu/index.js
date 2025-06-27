import React, { useEffect, forwardRef } from "react";

const ActionMenu = forwardRef(({ children, position, onClose },ref) => {
    const { top, left } = position;

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            onClose(); 
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside); 
        };
    }, []);

    return (
        <div
            ref={ref}
            style={{
                position: "absolute",
                top: top,
                left: left,
                zIndex: 10,
            }}
            className="w-40 bg-white rounded-lg shadow divide-y-2 divide-gray-100"
        >
            {children}
        </div>
    );
});

export default ActionMenu;
