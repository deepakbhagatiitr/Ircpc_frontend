"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./loader";
export default function ViewPatentDetail() {
    const [id, setId] = useState(null);
    const [mail, setMail] = useState(false);
    const [patent, setPatent] = useState(null);
    const [loading, setLoading] = useState(false); // State for loader

    const [formData, setFormData] = useState({
        committeeMembers: []
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        setId(id);
        if (id) {
            fetchPatentDetails(id);
        }
    }, [formData]);

    const fetchPatentDetails = async (patentId) => {
        try {
            const response = await axios.get(`https://iprc-backend-208970416432.us-central1.run.app/api/profiles/patent/${patentId}`);
            setPatent(response.data);
        } catch (error) {
            console.error("Error fetching patent details:", error);
        }
    };

    const deleteCommitteeMember = async (patentId, committeeMemberId) => {
        try {
            await axios.delete(`https://iprc-backend-208970416432.us-central1.run.app/api/profiles/delete-committee/${patentId}/${committeeMemberId}`);
            // Update state to reflect the deleted committee member
            setPatent((prevPatent) => ({
                ...prevPatent,
                committeeMembers: prevPatent.committeeMembers.filter(member => member._id !== committeeMemberId)
            }));
        } catch (error) {
            console.error("Error deleting committee member:", error);
        }
    };

    const addCommitteeMember = async (patentId, newMember) => {
        try {
            setLoading(true)

            const response = await axios.post(`https://iprc-backend-208970416432.us-central1.run.app/api/profiles/add-committee/${patentId}`, newMember);
            // Update state to reflect the added committee member
            if (response) {
                setLoading(false)

                // alert("members added successfully")
                axios.post(`https://iprc-backend-208970416432.us-central1.run.app/api/profiles/ADI/approve/comemb/${patentId}`).then((res) => {
                    console.log(res);
                })
            }
            setPatent((prevPatent) => ({
                ...prevPatent,
                committeeMembers: [...prevPatent.committeeMembers, response.data]
            }));
            // Clear form data
            setFormData({ committeeMembers: [] });
        } catch (error) {
            console.error("Error adding committee member:", error);
        }
    };

    const formCommittee = async (patentId) => {
        try {
            await axios.put(`https://iprc-backend-208970416432.us-central1.run.app/api/profiles/send-emailto-committee/${patentId}`);
            setMail(true);
        } catch (error) {
            console.error("Error forming committee:", error);
        }
    };

    const handleCommitteeMemberChange = (e, index) => {
        const { name, value } = e.target;
        const committeeMembers = [...formData.committeeMembers];
        committeeMembers[index][name] = value;
        setFormData({ ...formData, committeeMembers });
    };

    const handleAddCommitteeMember = () => {
        const newMember = formData.committeeMembers; // Assuming we are adding one member at a time
        addCommitteeMember(id, newMember);
    };

    const handleFormAddCommitteeMember = () => {
        setFormData({
            ...formData,
            committeeMembers: [...formData.committeeMembers, { name: '', email: '', department: '' }]
        });
    };

    const handleRemoveCommitteeMember = (index) => {
        const committeeMembers = formData.committeeMembers.filter((_, i) => i !== index);
        setFormData({ ...formData, committeeMembers });
    };

    if (!patent) {
        return <p className="text-xl text-center">Loading...</p>;
    }

    if (loading) {
        return <Loader />;
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
                <div className="mb-8 text-4xl font-bold text-center">Patent Details</div>
                <div className="mb-6">
                    <div className="mb-4 text-2xl font-semibold">
                        Applicant Name:
                        <span className="ml-2 text-xl font-normal">{patent.inventor?.name}</span>
                    </div>
                    <div className="mb-4 text-2xl font-semibold">
                        Applicant Background:
                        <span className="ml-2 text-xl font-normal">{patent.inventor?.background}</span>
                    </div>
                    <div className="mb-4 text-2xl font-semibold">
                        Title of the Patent:
                        <span className="ml-2 text-xl font-normal">{patent.title}</span>
                    </div>
                    <div className="mb-4 text-2xl font-semibold">
                        Field of Innovation:
                        <span className="ml-2 text-xl font-normal">{patent.fieldOfInvention}</span>
                    </div>
                </div>
                <div className="mb-8">
                    <div className="mb-4 text-3xl font-bold">Committee Member Details</div>
                    {patent.committeeMembers && (
                        <ul>
                            {patent.committeeMembers.map((member) => (
                                <li key={member._id} className="p-4 mb-4 border rounded-lg">
                                    <div className="mb-2 text-2xl font-semibold">
                                        Name:
                                        <span className="ml-2 text-xl font-normal">{member.name}</span>
                                    </div>
                                    <div className="mb-2 text-2xl font-semibold">
                                        Email ID:
                                        <span className="ml-2 text-xl font-normal">{member.email}</span>
                                    </div>
                                    <div className="mb-2 text-2xl font-semibold">
                                        Department:
                                        <span className="ml-2 text-xl font-normal">{member.department}</span>
                                    </div>
                                    <div className="flex mt-4 space-x-4">
                                        <button
                                            className="px-3 py-2 text-lg text-white bg-red-500 rounded-md hover:bg-red-600"
                                            onClick={() => deleteCommitteeMember(patent._id, member._id)}
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
                    <button className="w-full py-4 mt-4 text-2xl font-bold text-white bg-green-600 rounded-lg">
                        Committee Formed
                    </button>
                ) : (
                    <>
                        {formData.committeeMembers.map((member, index) => (
                            <div key={index} className="p-4 mb-4 border rounded-lg">
                                <label className="block mb-2 text-lg">Committee Member Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={member.name}
                                    onChange={(e) => handleCommitteeMemberChange(e, index)}
                                    placeholder="Name"
                                    className="w-full p-2 border rounded-md"
                                />
                                <label className="block mt-2 mb-2 text-lg">Committee Member Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={member.email}
                                    onChange={(e) => handleCommitteeMemberChange(e, index)}
                                    placeholder="Email"
                                    className="w-full p-2 border rounded-md"
                                />
                                <label className="block mt-2 mb-2 text-lg">Committee Member Department:</label>
                                <select
                                    name="department"
                                    value={member.department}
                                    onChange={(e) => handleCommitteeMemberChange(e, index)}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="">Select Department</option>
                                    <option value="Mechanical Department">Mechanical Department</option>
                                    <option value="Chemical Department">Chemical Department</option>
                                    <option value="Civil Department">Civil Department</option>
                                    <option value="Electrical Department">Electrical Department</option>
                                    <option value="Computer Science Department">Computer Science Department</option>
                                </select>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveCommitteeMember(index)}
                                    className="px-3 py-2 mt-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleFormAddCommitteeMember}
                            className="px-3 py-2 mb-4 text-white bg-green-500 rounded-md hover:bg-green-600"
                        >
                            Add Committee Member
                        </button>

                        <div className="flex justify-center">
                            <button
                                // type="submit"
                                onClick={handleAddCommitteeMember}
                                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                            >
                                Submit
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
