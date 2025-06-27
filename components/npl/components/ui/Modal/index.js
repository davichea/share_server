import Icon from "@/global/Icon";
import React, { useEffect, useRef } from "react";

const Modal = ({ show, close, children, heading, className = "", fast_anim = false, no_click_outside = false, no_icon = false, ...props }) => {
  const backdrop_ref = useRef(null);
  const modal_ref = useRef(null);

  useEffect(() => {
    if (show) document.body.style.overflowY = "hidden";
    else document.body.style.overflowY = "auto";

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [show]);

  const handle_click_outside = (e) => {
    if (!no_click_outside && !modal_ref.current.contains(e.target)) close();
  };

  return (
    <div
      onClick={handle_click_outside}
      ref={backdrop_ref}
      className={`fixed top-0 left-0 min-h-screen bg-black/20 w-screen z-50 grid place-items-center ${fast_anim ? "" : "duration-100"} ${show ? "opacity-1 pointer-events-auto" : "opacity-0 pointer-events-none"
        } `}
      {...props}
    >
      <div ref={modal_ref} className={`bg-white p-6 rounded-lg relative ${className}`}>
        <div className="flex justify-between items-center gap-12">
          <h3 className="font-semibold text-xl">{heading}</h3>
          {!no_icon ? (
            <Icon.Cross
              className="w-5 h-5 cursor-pointer duration-200 hover:scale-125 hover:bg-gray-400/80 hover:text-white rounded-md p-0.5 box-content absolute top-4 right-4"
              onClick={close}
            />
          ) : null}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
