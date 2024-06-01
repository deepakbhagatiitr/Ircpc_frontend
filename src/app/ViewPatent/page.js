"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
export default function ViewPatent() {
  const [id, setId] = useState(null);
  const [patent, setPatent] = useState({});
  const [approved, setApproved] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    setId(id);
    console.log(id);
    if (id) {
      fetchPatentDetails(id); // Fetch patent details if id is available
    }
  }, []);
  const fetchPatentDetails = async (patentId) => {
    try {
      const response = await axios.get(
        `https://ircpc-backend.onrender.com/api/profiles/patent/${patentId}`
      );
      console.log(response.data);
      setPatent(response.data);
    } catch (error) {
      console.error("Error fetching patent details:", error);
    }
  };


  const approvePatent = async (patentId) => {
    try {
      await axios.put(
        `https://ircpc-backend.onrender.com/api/profiles/patents/${patentId}/approve`
      );
      setApproved(true);
      // Optionally, update UI or navigate to another page after approval
    } catch (error) {
      console.error("Error approving patent:", error);
    }
  };

  const rejectPatent = async (id) => {
    try {
      await axios.put(
        `https://ircpc-backend.onrender.com/api/profiles/patents/${id}/reject`
      );
      setApproved(false);
      // Optionally, update UI or navigate to another page after rejection
    } catch (error) {
      console.error("Error rejecting patent:", error);
    }
  };
  return (
    <>
      {patent ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <div className="mb-6 text-3xl font-bold text-center">Patent Details</div>
            <div className="mb-4">
              <span className="mr-3 text-lg font-semibold">Applicant Name:</span>
              <span className="text-xl">{patent.inventor?.name}</span>
            </div>
            <div className="mb-4">
              <span className="mr-3 text-lg font-semibold">Applicant Background:</span>
              <span className="text-xl">{patent.inventor?.background}</span>
            </div>
            <div className="mb-4">
              <span className="mr-3 text-lg font-semibold">Title of the Patent:</span>
              <span className="text-xl">{patent.title}</span>
            </div>
            <div className="mb-4">
              <span className="mr-3 text-lg font-semibold">Field of Innovation:</span>
              <span className="text-xl">{patent.fieldOfInvention}</span>
            </div>
            <div className="flex justify-center space-x-4">
              {approved ? (
                <button onClick={() => approvePatent(id)} className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600" disabled>
                  Approved
                </button>
              ) : (
                <button className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600" onClick={() => approvePatent(id)}>
                  Approve
                </button>
              )}
              {!approved && (
                <button  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600" onClick={() => rejectPatent(id)}>
                  Reject
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-xl">Loading...</p>
        </div>
      )}

    </>
  );
}
