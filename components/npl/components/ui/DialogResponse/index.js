import React, { useEffect, useRef } from 'react';

const DialogResponse = React.memo(({
  isCloseIcon = true,
  isOpen,
  toggleModal,
  title,
  children,
  size = 'l'
}) => {
  const modalRef = useRef(null);


  const sizeMap = {
    sm: '450px',
    md: '540px',
    l: '900px',
    xl: '1200px',
  };

  const widthDialog = sizeMap[size] || sizeMap.medium;

  return (
    <>
      {isOpen && (
        <div className="fixed w-full h-full top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div
            ref={modalRef}
            className={`transform opacity-100 ease-out transition-all duration-500`}
            style={{ width: widthDialog }}
          >
            <div className="flex flex-col bg-white rounded-2xl py-5 px-8">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <h4 className="text-xl text-gray-900 font-medium">Message</h4>
              </div>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default DialogResponse;
