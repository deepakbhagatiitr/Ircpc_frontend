import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "./loader";

const AddPatentForm = () => {
  const router = useRouter();
  const [pdfFiles, setPdfFiles] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const maxVisibleResumes = 2;

  const [formData, setFormData] = useState({
    title: "",
    fieldOfInvention: "",
    detailedDescription: "",
    inventor: {
      name: "",
      background: ""
    },
    committeeMembers: [],
    email: "",
    depEmail: "",
    status: "pending approval",
    pdfs: []
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userdata = JSON.parse(localStorage.getItem('userdata'));
      if (userdata) {
        setFormData(prevFormData => ({
          ...prevFormData,
          email: userdata.contactInformation.instituteWebmailAddress
        }));
      }
    }
  }, []);

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

  const handleCheckboxChange = (e, resume) => {
    const { checked } = e.target;
    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        pdfs: [...prevData.pdfs, resume],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        pdfs: prevData.pdfs.filter((pdf) => pdf !== resume),
      }));
    }
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

  const handleDept = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      depEmail: e.target.value,
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

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    console.log("Files uploaded:", files);

    try {
      setResumes((prevResumes) => [...prevResumes, ...files]);
      setFormData((prevData) => ({
        ...prevData,
        pdfs: [...prevData.pdfs, ...files],
      }));
    } catch (error) {
      console.error("Error adding patent:", error);
    }
  };

  const removeCommitteeMember = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      committeeMembers: prevData.committeeMembers.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'pdfs') {
        formData[key].forEach((file) => {
          formDataToSend.append('pdfs', file);
        });
      } else {
        formDataToSend.append(key, key === 'inventor' || key === 'committeeMembers' ? JSON.stringify(formData[key]) : formData[key]);
      }
    });

    try {
      setLoading(true);
      const response = await axios.post("https://iprc-backend-208970416432.us-central1.run.app/api/profiles/addpatents", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);

      console.log("Patent added successfully");
      router.push("/");
      console.log("Server response:", response.data);
    } catch (error) {
      setLoading(false);
      console.error("Error adding patent:", error);
    }
  };

  return (
    <>
      {loading && <Loader />} {/* Display Loader component */}
      {!loading && (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="fieldOfInvention">Field of Invention:</label>
              <input
                type="text"
                id="fieldOfInvention"
                name="fieldOfInvention"
                value={formData.fieldOfInvention}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="detailedDescription">Detailed Description:</label>
              <textarea
                id="detailedDescription"
                name="detailedDescription"
                value={formData.detailedDescription}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="name">Inventor's Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.inventor.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="background">Inventor's Background:</label>
              <textarea
                id="background"
                name="background"
                value={formData.inventor.background}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>Committee Members:</label>
              {formData.committeeMembers.map((member, index) => (
                <div key={index} className="committee-member">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={member.name}
                    onChange={(e) => handleCommitteeMemberChange(e, index)}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={member.email}
                    onChange={(e) => handleCommitteeMemberChange(e, index)}
                    required
                  />
                  <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={member.department}
                    onChange={(e) => handleCommitteeMemberChange(e, index)}
                    required
                  />
                  <button type="button" onClick={() => removeCommitteeMember(index)}>
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={addCommitteeMember}>
                Add Committee Member
              </button>
            </div>

            <div className="form-group">
              <label htmlFor="pdf">Upload PDFs:</label>
              <input type="file" id="pdf" name="pdfs" onChange={handleUpload} multiple />
            </div>

            <div className="form-group">
              <label htmlFor="depEmail">Select Department:</label>
              <select
                id="depEmail"
                value={formData.depEmail}
                onChange={handleDept}
                required
              >
                <option value="">Select a department</option>
                <option value="dep1@example.com">Department 1</option>
                <option value="dep2@example.com">Department 2</option>
                <option value="dep3@example.com">Department 3</option>
              </select>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </>
  );
};

export default AddPatentForm;
