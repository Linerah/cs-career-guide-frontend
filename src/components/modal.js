import React from 'react';

function Modal({ isOpen, onClose, children }) {
  const modalStyle = isOpen ? "block" : "hidden";

  return (
    <div className={modalStyle + " fixed inset-0 bg-gray-500 bg-opacity-75"}>
      <div className="fixed inset-0">
        <div className="flex items-center justify-center h-screen">
          <div className="bg-colegio-green rounded-lg shadow-lg p-6">
            <button onClick={onClose} className="m-2">
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