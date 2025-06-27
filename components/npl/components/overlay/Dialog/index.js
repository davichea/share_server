import { cn } from '@/utils/cn';
import React, { useEffect, useRef } from 'react';

const Dialog = React.memo(({
  isCloseIcon = true,
  isOutSideClick = true,
  isOpen,
  toggleModal,
  title,
  children,
  size = 'large',
  bgColor = 'bg-white',
  className
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isCloseIcon) {
      const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          toggleModal();
        }
      };

      if (isOpen && isOutSideClick) {
        document.addEventListener('mousedown', handleOutsideClick);
      }
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }
  }, [isOpen, toggleModal, isCloseIcon]);

  // Map size to specific widths
  const sizeMap = {
    small: 'w-[400px]',
    medium: 'w-[600px]',
    large: 'w-[900px]',
    xl: 'w-[90%] xl:w-[1250px]',
  };

  // Get the width from the sizeMap (default to 'medium')
  const widthDialog = sizeMap[size];
  
  
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
          <div
            ref={modalRef}
            className={cn(
              `transform opacity-100 ease-out transition-all duration-500 ${widthDialog}`
            )}
          >
            <div className={cn('flex flex-col  rounded-2xl py-5 px-10 shadow-lg overflow-hidden border-transparent',bgColor)}>
              <div
                className={cn(
                  `flex justify-between items-center pb-4 border-b border-gray-200`,
                  className // Add additional class names from props
                )}
              >
                <h4 className="text-xl text-gray-900 font-medium uppercase">{title}</h4>
                {
                  isCloseIcon &&
                  <button type='button' className="block cursor-pointer" onClick={toggleModal}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.75732 7.75739L16.2426 16.2427M16.2426 7.75739L7.75732 16.2427"
                        stroke="black"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                }
              </div>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default Dialog;
