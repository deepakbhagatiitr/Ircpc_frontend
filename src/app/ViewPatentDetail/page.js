"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
export default function ViewPatentDetail() {
  const [id, setId] = useState(null);
  const [mail, setMail] = useState(false);
  const [patent, setPatent] = useState({});
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    setId(id);
    console.log(id);
    if (id) {
      fetchPatentDetails(id); // Fetch patent details if id is available
    }
  }, [id]);
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
  const approvePatent = async (patentId, committeeMemberId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/profiles/accept-committee/${patentId}/${committeeMemberId}`
      );

      // Optionally, update UI or navigate to another page after approval
    } catch (error) {
      console.error("Error approving patent:", error);
    }
  };

  const rejectPatent = async (patentId, committeeMemberId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/profiles/reject-committee/${patentId}/${committeeMemberId}`
      );

      // Optionally, update UI or navigate to another page after rejection
    } catch (error) {
      console.error("Error rejecting patent:", error);
    }
  };
  const FormCommittee = async (patentId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/profiles/send-emailto-committee/${patentId}`
      );
      setMail(true);

    } catch (error) {
      console.error("Error rejecting patent:", error);
    }
  };

  return (
    <>
      {patent ? (
        <div className="w-[100vw] min-h-screen mx-auto p-6 bg-white shadow-md rounded-lg flex items-center justify-center">
          <div className="p-10 border-t border-b border-l border-r border-gray-600">
            <div className="mb-4 text-3xl font-bold">Patent Details</div>
            <div className="mb-2 text-2xl font-semibold">
              Applicant Name :
              <span className="text-xl font-normal text-">
                &apos;
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
              <span className="text-xl font-normal text-">
                {" "}
                {patent.title}
              </span>
            </div>
            <div className="mb-2 text-2xl font-semibold">
              Field of Innovation :
              <span className="text-xl font-normal text-">
                {patent.fieldOfInvention}
              </span>
            </div>
            <div className="mb-2 text-3xl font-bold">
              Committee Member Details
              {patent && patent.committeeMembers && (
                <ul>
                  {patent.committeeMembers.map((member) => (
                    <li key={member._id}>
                      <div className="mb-2 text-2xl font-semibold">
                        Name:
                        <span className="text-xl font-normal text-">
                          {" "}
                          {member.name}
                        </span>
                      </div>
                      <div className="mb-2 text-2xl font-semibold">
                        Email ID:
                        <span className="text-xl font-normal text-">
                          {" "}
                          {member.email}
                        </span>
                      </div>
                      <div className="mb-2 text-2xl font-semibold">
                        department:
                        <span className="text-xl font-normal text-">
                          {" "}
                          {member.department}
                        </span>
                      </div>
                      <div className="flex space-x-4">
                        <button
                          className="px-4 py-2 text-2xl text-white bg-green-500 rounded hover:bg-green-600"
                          onClick={() =>
                            approvePatent(patent._id, member._id)
                          }
                        >
                          Confirm
                        </button>
                        <button
                          className="px-4 py-2 text-2xl text-white bg-red-500 rounded hover:bg-red-300"
                          onClick={() =>
                            rejectPatent(patent._id, member._id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {mail ? (
              <button
                className="px-4 py-2 mt-5 text-2xl font-bold text-white bg-black rounded hover:bg-green-600 "
              >
                Committee's Formed
              </button>
            ) : (
              <button
                onClick={() => FormCommittee(patent._id)}
                className="px-4 py-2 mt-5 text-2xl font-bold text-white bg-black rounded hover:bg-green-600 "
              >
                Form Committee
              </button>
            )}
          </div>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
}