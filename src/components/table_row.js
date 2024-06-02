"use client"
import React, { useEffect, useState } from "react";
import Modal from './usermodal';
import Action from './action';
import axios from "axios";

export default function Row({ serialNumber, name, title, background, status, submittedon, view_details }) {
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [userdata, setUserdata] = useState(null);
  const [patent, setPatent] = useState({})
  useEffect(() => {
    // Check if running in the browser environment before accessing localStorage
    if (typeof window !== 'undefined') {
      const storedUserdata = localStorage.getItem('userdata');
      if (storedUserdata) {
        setUserdata(JSON.parse(storedUserdata));
      }
    }
  }, []);

  const handleViewDetails = async () => {
    setIsModalOpen(true);
    try {
      const response = await axios.get(`https://ircpc-backend.onrender.com/api/profiles/patents/${userdata.contactInformation.instituteWebmailAddress}`);
      const patent = response.data[serialNumber - 1];
      setPatent(patent)
      // console.log(patent)
      setPdfUrl(patent.pdf.path);
    } catch (error) {
      console.error("Error fetching patent details:", error);
    }
  };

  const handleAction = () => {
    setIsActionOpen(true);
  };

  const truncateTitle = (title) => {
    const words = title.split(" ");
    return words.length > 1 ? words[0] + "..." : title;
  };

  const isAdmin = userdata?.contactInformation?.instituteWebmailAddress === 'admin@ipr.iitr.ac.in';

  return (
    <>
      <tr>
        <td className="px-6 py-4 text-center whitespace-no-wrap border-b border-gray-500">
          <div className="flex items-center">
            <div>
              <div className="text-sm leading-5 text-center text-gray-800">
                {serialNumber}
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 text-center whitespace-no-wrap border-b border-gray-500">
          <div className="text-sm leading-5 text-blue-900">{name}</div>
        </td>
        <td className="px-6 py-4 text-sm leading-5 text-center text-blue-900 whitespace-no-wrap border-b border-gray-500">
          {truncateTitle(title)}
        </td>
        <td className="px-6 py-4 text-sm leading-5 text-center text-blue-900 whitespace-no-wrap border-b border-gray-500">
          {background}
        </td>
        <td className="px-6 py-4 text-sm leading-5 text-center text-blue-900 whitespace-no-wrap border-b border-gray-500">
          <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
            <span
              aria-hidden
              className="absolute inset-0 text-center bg-green-200 rounded-full opacity-50"
            ></span>
            <span className="relative text-xs text-center">{status}</span>
          </span>
        </td>
        <td className="px-6 py-4 text-sm leading-5 text-center text-blue-900 whitespace-no-wrap border-b border-gray-500">
          {submittedon}
        </td>
        {isAdmin && (
          <td className="px-6 py-4 text-sm leading-5 text-center text-blue-900 whitespace-no-wrap border-b border-gray-500">
            <button
              onClick={handleAction}
              className="px-5 py-2 text-center text-blue-500 transition duration-300 border border-blue-500 rounded hover:bg-blue-700 hover:text-white focus:outline-none"
            >
              Action
            </button>
          </td>
        )}
        <td className="px-6 py-4 text-sm leading-5 text-center text-right whitespace-no-wrap border-b border-gray-500">
          <button
            onClick={handleViewDetails}
            className="px-5 py-2 text-center text-blue-500 transition duration-300 border border-blue-500 rounded hover:bg-blue-700 hover:text-white focus:outline-none"
          >
            {view_details}
          </button>
        </td>
      </tr>
      {isModalOpen && (
        <Modal
          serialNumber={serialNumber}
          name={name}
          title={title}
          background={background}
          status={status}
          comments={patent.comments}
          submittedon={submittedon}
          pdfUrl={pdfUrl}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isActionOpen && isAdmin && (
        <Action status={status} serialNumber={serialNumber} onClose={() => setIsActionOpen(false)} />
      )}
    </>
  );
}
