"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';

const AddPatentForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    fieldOfInvention: "",
    detailedDescription: "",
    inventor: {
      name: "",
      background: ""
    },
    committeeMembers: [],
    pdf: null,
    status: "pending approval"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      if (name in prevData.inventor) {
        return {
          ...prevData,
          inventor: {
            ...prevData.inventor,
            [name]: value,
          },
        };
      }
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleCommitteeMemberChange = (e, index) => {
    const { name, value } = e.target;
    const updatedMembers = [...formData.committeeMembers];
    updatedMembers[index] = { ...updatedMembers[index], [name]: value };
    setFormData((prevData) => ({
      ...prevData,
      committeeMembers: updatedMembers,
    }));
  };

  const addCommitteeMember = () => {
    setFormData((prevData) => ({
      ...prevData,
      committeeMembers: [
        ...prevData.committeeMembers,
        { name: "", email: "", department: "" },
      ],
    }));
  };

  const removeCommitteeMember = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      committeeMembers: prevData.committeeMembers.filter((_, i) => i !== index),
    }));
  };
  const handleCheckboxChange = (e, url) => {
    const { checked } = e.target;
    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        pdf: url,
      }));

    } else {
      setFormData((prevData) => ({
        ...prevData,
        pdf: null,
      }));
    }
  };
  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/profiles/addpatents", formData);
      alert('Patent added successfully'); // Move inside the try block
      router.push('/');
      console.log("Patent added successfully:", response.data);
    } catch (error) {
      console.error("Error adding patent:", error);
    }
  };


  const [resumes, setResumes] = useState([
  ]);

  const [showMore, setShowMore] = useState(false);
  const maxVisibleResumes = 2;

  const handleShowMore = () => {
    setShowMore(!showMore);
  };
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    console.log("File uploaded:", file);



    try {
      // Update resumes state to include the uploaded patent
      setResumes((prevResumes) => [
        ...prevResumes,
        { name: file.name, lastUsed: new Date().toISOString().slice(0, 19).replace('T', ' '), url: URL.createObjectURL(file) },
      ]);
    } catch (error) {
      console.error("Error adding patent:", error);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex items-start w-full gap-6 px-8 py-7 item md:flex-row">
        <div className="flex flex-col w-7/12 p-6 bg-white rounded-lg shadow-lg md:w-1/2">
          <h2 className="mb-4 text-2xl font-semibold text-center">Add Patent</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-lg">Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="w-full px-2 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-lg">Field of Invention:</label>
              <input
                type="text"
                name="fieldOfInvention"
                value={formData.fieldOfInvention}
                onChange={handleInputChange}
                placeholder="Field of Invention"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-lg">Detailed Description:</label>
              <textarea
                name="detailedDescription"
                value={formData.detailedDescription}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                rows="4"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-lg">Inventor Name:</label>
              <input
                type="text"
                name="name"
                value={formData.inventor.name}
                onChange={handleInputChange}
                placeholder="Name of inventor"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-lg">Inventor Background:</label>
              <textarea
                name="background"
                value={formData.inventor.background}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                rows="4"
              ></textarea>
            </div>
            {formData.committeeMembers.map((member, index) => (
              <div key={index} className="mb-4">
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
                <input
                  type="text"
                  name="department"
                  value={member.department}
                  onChange={(e) => handleCommitteeMemberChange(e, index)}
                  placeholder="Department"
                  className="w-full p-2 border rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeCommitteeMember(index)}
                  className="px-3 py-2 mt-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addCommitteeMember}
              className="px-3 py-2 mb-4 text-white bg-green-500 rounded-md hover:bg-green-600"
            >
              Add Committee Member
            </button>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="flex flex-col w-5/12 p-6 bg-white rounded-lg shadow-lg md:w-1/2">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">Patent Upload</h2>
          <p className="mb-4 text-base text-gray-600">
            Be sure to include an updated patent <span className="text-red-500">*</span>
          </p>


          <div className="w-full space-y-4 overflow-hidden">
            {resumes.slice(0, showMore ? resumes.length : maxVisibleResumes).map((resume, index) => (
              <div key={index} className="flex items-center p-3 mb-2 border rounded-lg bg-gray-50">
                <div className="flex-shrink-0">
                  <button
                    className="p-2 text-gray-600 transition duration-150 bg-gray-200 rounded-full view-button hover:bg-gray-300"
                    onClick={() => window.open(resume.url, "_blank")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12l-4 4m0-4l4-4m-4 4h8m-8 0H7"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 ml-6">
                  <p className="text-lg font-medium text-gray-700">{resume.name}</p>
                  <p className="text-sm text-gray-500">Last used on {resume.lastUsed}</p>
                </div>
                <div className="ml-6">
                  <input
                    type="checkbox"
                    className="w-6 h-6 text-blue-600 rounded focus:ring-blue-500"
                    onChange={(e) => handleCheckboxChange(e, resume.url)} // Pass resume URL to handleCheckboxChange
                  />

                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 space-x-4">
            <button
              id="upload-button"
              className="px-3 py-3 text-base text-white bg-blue-500 rounded hover:bg-blue-600"
              onClick={() => document.getElementById("file-input").click()}
            >
              Upload Patent
            </button>
            {resumes.length > maxVisibleResumes && (
              <button
                id="show-more-button"
                className="text-lg text-blue-500 hover:underline"
                onClick={handleShowMore}
              >
                {showMore
                  ? "Show less"
                  : `Show ${resumes.length - maxVisibleResumes} more resume${resumes.length - maxVisibleResumes > 1 ? "s" : ""}`}
              </button>
            )}
            <input
              type="file"
              id="file-input"
              className="hidden"
              accept=".pdf, .doc, .docx"
              onChange={handleUpload}
            />
          </div>
          <p className="mt-4 text-base text-gray-500">
            Submitting this application will not update your profile.
          </p>
          <p className="mt-4 text-base text-gray-400">
            Application powered by unknown |{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Help Center
            </a>
          </p>

        </div>
      </div>
    </div>
  );
};

export default AddPatentForm;
