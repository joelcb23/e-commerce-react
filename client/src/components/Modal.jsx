const Modal = ({ open, children }) => {
  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center transition-colors
          ${open ? "visible" : "invisible"}`}
    >
      <div className="relative w-1/3  bg-white dark:bg-gray-800  text-center flex flex-col justify-between items-center gap-10 rounded-xl shadow p-10 transition-all">
        {children}
      </div>
    </div>
  );
};

export default Modal;
