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
          <div className="border-l border-b border-r border-t border-gray-600 p-3">
            <div className="text-3xl font-bold mb-4">Patent Details</div>
            <div className="text-2xl font-semibold mb-2">
              Applicant Name :
              <span className="text-xl font-normal text-">
                {" "}
                {patent.inventor?.name}
              </span>
            </div>
            <div className="text-2xl font-semibold mb-2">
              Applicant background :
              <span className="text-xl font-normal text-">
                {patent.inventor?.background}
              </span>
            </div>
            <div className="text-2xl font-semibold mb-2">
              Title of the Patent:
              <span className="text-xl font-normal text-"> {patent.title}</span>
            </div>
            <div className="text-2xl font-semibold mb-2">
              Field of Innovation :
              <span className="text-xl font-normal text-">
                {" "}
                {patent.fieldOfInvention}
              </span>
            </div>
            <div className="flex space-x-4">
              {approved ? (
                <button
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                  disabled
                >
                  Approved
                </button>
              ) : (
                <button
                  className="mr-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                  onClick={() => approvePatent(id)}
                >
                  Approve
                </button>
              )}
              {!approved && (
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
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
