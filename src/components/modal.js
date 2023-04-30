import React from 'react';

function Modal({ isOpen, onClose, children }) {
  const modalStyle = isOpen ? "block" : "hidden";

  return (
    <div className={modalStyle + " fixed inset-0 bg-gray-500 bg-opacity-75 z-50"}>
      <div className="fixed inset-0">
        <div className="flex items-center justify-center h-screen">
          <div className="bg-colegio-green rounded-lg shadow-lg p-6 w-1/3 h-3/8 relative">
            <button onClick={onClose} className="text-xl text-colegio-dark-green font-sans font-bold absolute top-0 right-0 rounded-tr-lg rounded-bl-lg bg-colegio-green-2 p-2">
              X
            </button>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

