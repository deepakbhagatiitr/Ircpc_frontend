import React, { useState, useEffect } from "react";
import axios from "axios";
import "./usermodal.css";

const Action = ({ status, serialNumber, onClose }) => {
  const [id, setId] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [comment, setComment] = useState("");
  const [user, setUser] = useState({});
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get("https://iprc-backend-208970416432.us-central1.run.app/api/profiles/getpatents").then((res) => {
      const patent = res.data[serialNumber - 1];
      setId(patent._id);
      setUser(patent);
      setCommitteeMembers(patent.committeeMembers || []);
    });
  }, [serialNumber]);

  useEffect(() => {
    const statusOrder = ["HOD Approved", "ADI Approved", "DSRIC Approved"];
    const currentCount = statusOrder.indexOf(status) + 1;
    setCount(currentCount);
  }, [status]);

  const handleDateTimeChange = (e) => {
    setSelectedDateTime(e.target.value);
  };

  const handleDateFinalize = () => {
    if (id && selectedDateTime) {
      axios
        .post(`https://iprc-backend-208970416432.us-central1.run.app/api/profiles/dateofmeeting/${id}`, {
          dateOfMeeting: selectedDateTime,
        })
        .then((response) => {
          alert("Meeting date finalized");
        })
        .catch((error) => {
          console.error("Error finalizing meeting date:", error);
        });
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentPost = () => {
    if (id && comment) {
      axios
        .post(`https://iprc-backend-208970416432.us-central1.run.app/api/profiles/updatecomment/${id}`, {
          comment: comment,
        })
        .then((response) => {
          alert("Comment posted and message sent");
          axios
            .post(`https://iprc-backend-208970416432.us-central1.run.app/api/profiles/DSRI/recommendation/${id}`);
        })
        .catch((error) => {
          console.error("Error updating comment:", error);
        });
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 modal-overlay"
      onClick={handleOverlayClick}
    >
      <div className="relative w-4/12  p-6 bg-white rounded-lg shadow-lg h-auto max-h-[80vh] overflow-y-auto mx-4">
        <div className="flex items-center justify-between pb-4 border-b modal-header">
          <h2 className="text-2xl font-semibold text-gray-800">Status</h2>
          <button
            className="p-1 text-gray-600 close-btn hover:text-gray-900 focus:outline-none"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className="mt-6 mb-6">
          {/* Stepper */}
          <ul className="relative flex flex-col gap-2 md:flex-row">
            {[
              { step: "HOD APPROVAL", status: "HOD Approved" },
              { step: "ADI FORM THE COMMITTEE", status: "ADI Approved" },
              { step: "RECOMMENDATION SENT TO DEAN SRIC", status: "DSRIC Approved" }
            ].map((item, index) => (
              <li
                key={index}
                className="flex flex-1 md:shrink md:basis-0 group gap-x-2 md:block"
              >
                <div className="flex flex-col items-center text-xs align-middle min-w-7 min-h-7 md:w-full md:inline-flex md:flex-wrap md:flex-row">
                  <span
                    className={`flex items-center justify-center flex-shrink-0 font-medium text-gray-800 rounded-full size-7 ${index < count ? "bg-green-500" : "bg-red-500"}`}
                  >
                    {index + 1}
                  </span>
                  <div className="w-px h-full mt-2 bg-gray-200 md:mt-0 md:ms-2 md:w-full md:h-px md:flex-1 group-last:hidden dark:bg-gray-700"></div>
                </div>
                <div className="pb-5 grow md:grow-0 md:mt-3">
                  <span className="block text-sm font-medium text-gray-800 dark:text-black">
                    Step
                  </span>
                  <p className="text-sm text-gray-500">{item.step}</p>
                </div>
              </li>
            ))}
          </ul>
          {/* End Stepper */}
        </div>

        <div className="pt-4 border-t">
          <h3 className="text-lg font-medium text-gray-800">Committee Members</h3>
          <ul className="flex flex-col max-w-xs mt-2 mb-4">
            {committeeMembers.map((person, index) => (
              <li
                key={index}
                className="inline-flex items-center px-4 py-3 mt-2 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg gap-x-2 dark:bg-slate-900 dark:border-gray-700 dark:text-white"
              >
                {person.name}
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className="px-5 py-2 mb-2 mr-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          <a href={`https://ircpc-frontend.vercel.app//ViewPatentDetail?id=${id}`} target="_blank">Edit Members</a>
        </button>

        <div className="pt-4 border-t">
          <h3 className="text-lg font-medium text-gray-800">
            Date and Time for IPAC Meeting
          </h3>
          <div className="mt-2">
            <input
              type="datetime-local"
              id="meetingdatetime"
              name="meetingdatetime"
              value={selectedDateTime}
              onChange={handleDateTimeChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg sm:text-sm"
            />
            <button
              type="button"
              className="px-5 py-2 mt-3 mb-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleDateFinalize}
            >
              Finalize Date
            </button>
          </div>
        </div>

        <div className="pt-4 border-t">
          <h3 className="text-lg font-medium text-gray-800">Final Comment</h3>
          <div className="mt-2">
            <input
              type="text"
              id="comment"
              className="block w-full p-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Final Comment"
              value={comment}
              onChange={handleCommentChange}
              required
            />
            <button
              type="button"
              className="px-5 py-2 mt-3 mb-2 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300 me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={handleCommentPost}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Action;
