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
        `http://localhost:5000/api/profiles/patent/${patentId}`
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
        `http://localhost:5000/api/profiles/patents/${patentId}/approve`
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
        `http://localhost:5000/api/profiles/patents/${id}/reject`
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
        <div className="w-[100vw] min-h-screen mx-auto p-6 bg-white shadow-md rounded-lg flex items-center justify-center">
          <div className="p-3 border-t border-b border-l border-r border-gray-600">
            <div className="mb-4 text-3xl font-bold">Patent Details</div>
            <div className="mb-2 text-2xl font-semibold">
              Applicant Name :
              <span className="text-xl font-normal text-">
                {" "}
                {patent.inventor?.name}
              </span>
            </div>
            <div className="mb-2 text-2xl font-semibold">
              Applicant background :
              <span className="text-xl font-normal text-">
                {patent.inventor?.background}
              </span>
            </div>
            <div className="mb-2 text-2xl font-semibold">
              Title of the Patent:
              <span className="text-xl font-normal text-"> {patent.title}</span>
            </div>
            <div className="mb-2 text-2xl font-semibold">
              Field of Innovation :
              <span className="text-xl font-normal text-">
                {" "}
                {patent.fieldOfInvention}
              </span>
            </div>
            <div className="flex space-x-4">
              {approved ? (
                <button
                  className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                  disabled
                >
                  Approved
                </button>
              ) : (
                <button
                  className="px-4 py-2 mr-2 text-white bg-green-500 rounded hover:bg-green-600"
                  onClick={() => approvePatent(id)}
                >
                  Approve
                </button>
              )}
              {!approved && (
                <button
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                  onClick={() => rejectPatent(id)}
                >
                  Reject
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading......</p>
      )}
    </>
  );
}
