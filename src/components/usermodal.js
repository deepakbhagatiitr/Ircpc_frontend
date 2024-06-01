import React from "react";
import "./usermodal.css";

const Modal = ({
  serialNumber,
  name,
  title,
  background,
  status,
  submittedon,
  pdfUrl,
  onClose,
}) => {
  // const handleViewPdf = () => {

  //     window.open(`http://localhost:5000/${pdfUrl}`, "_blank");

  // };

  return (
    <div className="modal-overlay w-[20%]">
      <div className="modal">
        <div className="modal-header">
          <h2>Patent Details</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p><strong>Serial Number:</strong> {serialNumber}</p>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Title:</strong> {title}</p>
          <p><strong>Background:</strong> {background}</p>
          <p><strong>Status:</strong> {status}</p>
          <p><strong>Submitted on:</strong> {submittedon}</p>
        </div>
        <div className="modal-footer">
          <button

            className="px-5 py-2 mr-2 text-blue-500 transition duration-300 border border-blue-500 rounded hover:bg-blue-700 hover:text-white focus:outline-none"
          >
            {pdfUrl && (
              <div>
                <a href={`http://localhost:5000/${pdfUrl}`} target="_blank" rel="noopener noreferrer">
                  <p>View Pdf</p>
                </a>
              </div>
            )}
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 text-red-500 transition duration-300 border border-red-500 rounded hover:bg-red-700 hover:text-white focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
