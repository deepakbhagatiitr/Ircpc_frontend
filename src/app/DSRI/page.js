"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./loader";
export default function ViewPatent() {
    const [id, setId] = useState(null);
    const [patent, setPatent] = useState({});
    const [approved, setApproved] = useState(false);
    const [rejected, setRejected] = useState(false);
    const [message, setMessage] = useState("");
    const [comment, setComment] = useState(""); // Add state for comment
    const [loading, setLoading] = useState(false); // State for loader


    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        setId(id);
        if (id) {
            fetchPatentDetails(id); // Fetch patent details if id is available
        }
    }, []);


    const postComment = async (patentId) => {
        try {
            await axios.post(
                `http://localhost:5000/api/profiles/patents/${patentId}/comment`,
                { comment } // Send the comment in the request body
            );
            setMessage("Comment has been posted.");
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };
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
            setLoading(true)
            await axios.put(
                `http://localhost:5000/api/profiles/DSRI/patents/${patentId}/approve`
            );
            setLoading(false)
            setApproved(true);
            setRejected(false);
            setMessage("Patent has been approved.");
            postComment(id)
        } catch (error) {
            console.error("Error approving patent:", error);
        }
    };

    const rejectPatent = async (patentId) => {
        try {
            setLoading(true)

            await axios.put(
                `http://localhost:5000/api/profiles/patents/${patentId}/reject`
            );
            setLoading(false)
            setApproved(false);
            setRejected(true);
            setMessage("Patent has been rejected.");
        } catch (error) {
            console.error("Error rejecting patent:", error);
        }
    };

    if (loading) {
        return <Loader />;
    }
    return (
        <>
            {patent ? (
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
                        <div className="mb-6 text-3xl font-bold text-center text-gray-800">Patent Details</div>
                        <div className="mb-4">
                            <span className="mr-3 text-lg font-semibold text-gray-600">Applicant Name:</span>
                            <span className="text-xl text-gray-800">{patent.inventor?.name}</span>
                        </div>
                        <div className="mb-4">
                            <span className="mr-3 text-lg font-semibold text-gray-600">Applicant Background:</span>
                            <span className="text-xl text-gray-800">{patent.inventor?.background}</span>
                        </div>
                        <div className="mb-4">
                            <span className="mr-3 text-lg font-semibold text-gray-600">Title of the Patent:</span>
                            <span className="text-xl text-gray-800">{patent.title}</span>
                        </div>
                        <div className="mb-4">
                            <span className="mr-3 text-lg font-semibold text-gray-600">Field of Innovation:</span>
                            <span className="text-xl text-gray-800">{patent.fieldOfInvention}</span>
                        </div>
                        <div className="mb-4">
                            <textarea
                                name="comment"
                                id="comment"
                                className="w-full p-3 text-sm text-gray-800 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                rows="3"
                                placeholder="Add your comment here..."
                                value={comment} // Bind comment state to textarea value
                                onChange={(e) => setComment(e.target.value)} // Update state on change
                            />
                        </div>
                        <div className="mb-4 text-xl font-semibold text-center text-green-600">
                            {message}
                        </div>
                        <div className="flex justify-center space-x-4">
                            {!approved && !rejected && (
                                <>
                                    <button
                                        className="px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:ring-green-300"
                                        onClick={() => approvePatent(id)}>
                                        Approve
                                    </button>
                                    <button
                                        className="px-6 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:ring-red-300"
                                        onClick={() => rejectPatent(id)}>
                                        Reject
                                    </button>
                                    {/* <button 
                    className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300" 
                    onClick={() => postComment(id)}>
                    Post Comment
                  </button> */}
                                </>
                            )}
                            {approved && (
                                <button
                                    className="px-6 py-2 text-white bg-green-500 rounded-lg"
                                    disabled>
                                    Approved
                                </button>
                            )}
                            {rejected && (
                                <button
                                    className="px-6 py-2 text-white bg-red-500 rounded-lg"
                                    disabled>
                                    Rejected
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center min-h-screen">
                    <p className="text-xl text-gray-800">Loading...</p>
                </div>
            )}
        </>
    );
}
