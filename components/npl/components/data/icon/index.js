import React from 'react';
import { BiFirstPage, BiLastPage } from 'react-icons/bi';

const ArrowIcon = ({ type = 'arrow', direction = 'left', strokeColor = 'black', disabled = false }) => {
    // Path for normal left/right arrows
    const arrowPath =
        direction === 'left'
            ? 'M13.0002 14.9999L8 9.99967L13.0032 4.99652' // Left arrow
            : 'M8.00295 4.99646L13.0032 9.99666L8 14.9998'; // Right arrow

    // Conditional stroke color based on disabled state
    const actualStrokeColor = disabled ? '#a1a5b3' : strokeColor;

    // Conditional render based on the type (first, last, or regular arrow)
    if (type === 'first') {
        return <BiFirstPage className={`w-6 h-6 ${disabled ? 'text-[#a1a5b3]' : 'text-black'} ${disabled ? 'opacity-50' : ''}`} />;
    } else if (type === 'last') {
        return <BiLastPage className={`w-6 h-6 ${disabled ? 'text-[#a1a5b3]' : 'text-black'} ${disabled ? 'opacity-50' : ''}`} />;
    }

    // Regular left/right arrow SVG
    return (
        <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`cursor-pointer ${disabled ? 'opacity-50' : ''}`}
        >
            <path
                d={arrowPath}
                stroke={actualStrokeColor}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default ArrowIcon;
