import React from "react";

const Modal = ({
  serialNumber,
  name,
  title,
  background,
  status,
  submittedon,
  pdfUrl,
  onClose,
  patent,
  comments
}) => {

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const statusClasses = status === "HOD Approved" || status === "ADI Approved" || status === "DSRIC Approved" ? "text-green-500" : "text-red-500";

  return (
    <div onClick={handleOverlayClick} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between pb-4 border-b">
          <h2 className="text-xl font-semibold">Patent Details</h2>
          <button className="text-gray-600 hover:text-gray-900 focus:outline-none" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="py-4">
          <p className="mb-2"><strong>Serial Number:</strong> {serialNumber}</p>
          <p className="mb-2"><strong>Patent Type:</strong> {patent.patentType}</p>
          <p className="mb-2"><strong>Name:</strong> {name}</p>
          <p className="mb-2"><strong>Email:</strong> {patent.email}</p>
          <p className="mb-2"><strong>Title:</strong> {title}</p>
          <p className="mb-2"><strong>Inventor Department:</strong> {background}</p>
          <p className="mb-2"><strong>Field of Invention:</strong> {patent.fieldofInvention}</p>
          <p className="mb-2"><strong>Detailed Description:</strong> {patent.detailedDescription}</p>
          <p className="mb-2"><strong>Status:</strong> <span className={statusClasses}>{status}</span></p>
          <p className="mb-2"><strong>Submitted on:</strong> {submittedon}</p>
          <p className="mb-2"><strong>Comment:</strong> {comments}</p>
          <div className="mb-2">
            <strong>Committee Members:</strong>
            {patent.committeeMembers && (patent.committeeMembers).length > 0 ? (
              <ul className="list-disc list-inside">
                {patent.committeeMembers.map((member, index) => (
                  <li key={index}>
                    {member.name} ({member.email})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No committee members assigned.</p>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <button className="px-5 py-2 mr-2 text-blue-500 transition duration-300 border border-blue-500 rounded hover:bg-blue-700 hover:text-white focus:outline-none">
            {pdfUrl ? (
              // <a href={`https://iprc-backend-208970416432.us-central1.run.app/${pdfUrl}`} target="_blank" rel="noopener noreferrer">
              //   View Pdf
              // </a>
              <div>
                hello
              </div>
            ) : (
              'No PDF available'
            )}
          </button>
          <button
            className="px-4 py-2 font-semibold text-white bg-red-500 rounded 0 hover:bg-red-600 focus:outline-none"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
