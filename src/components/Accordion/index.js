import React, { useRef, useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

export default function Accordion({ children, title, isOpen, toggle }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState('0px');
 
  
  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen, children]);

  return (
    <div className="bg-white shadow rounded-md p-4 ">
      <button
        type="button"
        onClick={toggle}
        className="flex justify-between items-center w-full"
      >
        <h1 className="font-bold text-[#455560] text-lg cursor-pointer">{title}</h1>
        <FiChevronDown
          className={`text-gray-500 transition-transform duration-300 cursor-pointer${isOpen ? 'rotate-180' : ''}`}
          size={22}
        />
      </button>

      <div
        ref={contentRef}
        style={{ maxHeight: height,  overflow: 'hidden', transition: 'max-height 0.4s ease'}}
        className="mt-4"
      >
        <div>{children}</div>
      </div>
    </div>
  );
}
