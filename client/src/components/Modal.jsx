import { useEffect, useRef } from "react";

const Modal = ({ open, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose(); // cierra el modal si el click fue fuera
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center transition-all transition-colors
          ${open ? "visible" : "invisible"}`}
    >
      <div
        ref={modalRef}
        className="relative w-4/5 md:w-1/3  bg-white  text-center flex flex-col justify-between items-center gap-10 rounded-xl shadow p-10 transition-all"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
