"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Row from "./table_row";
import Loader from "./loader";

const Addrow = (index, name, title, background, status, submittedon, view_details) => {
  const tbody = document.getElementById('patentTableBody');

  const newRow = document.createElement('tr');
  newRow.innerHTML = `
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              <div className="flex items-center">
                  <div>
                      <div className="text-sm leading-5 text-gray-800">${index}</div>
                  </div>
              </div>
          </td>
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              <div className="text-sm leading-5 text-blue-900">${name}</div>
          </td>
          <td className="px-6 py-4 text-sm leading-5 text-blue-900 whitespace-no-wrap border-b border-gray-500">${title}</td>
          <td className="px-6 py-4 text-sm leading-5 text-blue-900 whitespace-no-wrap border-b border-gray-500">${background}</td>
          <td className="px-6 py-4 text-sm leading-5 text-blue-900 whitespace-no-wrap border-b border-gray-500">
              <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
              <span aria-hidden className="absolute inset-0 bg-green-200 rounded-full opacity-50"></span>
              <span className="relative text-xs">${status}</span>
          </span>
          </td>
          <td className="px-6 py-4 text-sm leading-5 text-blue-900 whitespace-no-wrap border-b border-gray-500">${submittedon}</td>
          <td className="px-6 py-4 text-sm leading-5 text-right whitespace-no-wrap border-b border-gray-500">
              <button className="px-5 py-2 text-blue-500 transition duration-300 border border-blue-500 rounded hover:bg-blue-700 hover:text-white focus:outline-none">${view_details}</button>
          </td>
        `;
  tbody.appendChild(newRow);
}

export default function Table() {
  const [userdata, setUserdata] = useState(null);
  const [patents, setPatents] = useState([]);
  const [loading, setLoading] = useState(true); // State for loader

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUserdata = localStorage.getItem('userdata');
      if (storedUserdata) {
        setUserdata(JSON.parse(storedUserdata));
      }
    }
  }, []);

  useEffect(() => {
    const fetchPatents = async () => {
      if (userdata && userdata.contactInformation && userdata.contactInformation.instituteWebmailAddress) {
        try {
          const response = await axios.get(
            `https://ircpc-backend.onrender.com/api/profiles/patents/${userdata.contactInformation.instituteWebmailAddress}`
          );
          setPatents(response.data);
        } catch (error) {
          console.error("Error fetching patents:", error);
        }
      }
    };
    fetchPatents();
  }, [userdata]);


  useEffect(() => {
    const showLoaderAndReload = async () => {
      const loaderShown = localStorage.getItem('loaderShown');

      if (!loaderShown) {
        localStorage.setItem('loaderShown', 'true');
        setTimeout(() => {
          setLoading(false);
          const isAdmin = userdata?.contactInformation?.instituteWebmailAddress === 'admin@ipr.iitr.ac.in';
          if (!isAdmin) {
            window.location.reload(); // Reload the page after 5 seconds
          }
        }, 5000); // 5000 milliseconds = 5 seconds
      } else {
        setLoading(false);
      }
    };

    showLoaderAndReload();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (userdata?.contactInformation?.instituteWebmailAddress === 'admin@ipr.iitr.ac.in') {
    return (
      <div className="min-h-screen overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="inline-block w-full px-8 pt-3 overflow-hidden align-middle bg-white rounded-bl-lg rounded-br-lg shadow shadow-dashboard">
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-3 leading-4 tracking-wider text-center text-blue-500 border-b-2 border-gray-300 tpx-6 ">
                  Serial No
                </th>
                <th className="py-3 text-sm leading-4 tracking-wider text-center text-blue-500 border-b-2 border-gray-300 tpx-6 ">
                  Applicant Name
                </th>
                <th className="py-3 text-sm leading-4 tracking-wider text-center text-blue-500 border-b-2 border-gray-300 tpx-6 ">
                  Title
                </th>
                <th className="py-3 text-sm leading-4 tracking-wider text-center text-blue-500 border-b-2 border-gray-300 tpx-6 ">
                  Background
                </th>
                <th className="py-3 text-sm leading-4 tracking-wider text-center text-blue-500 border-b-2 border-gray-300 tpx-6 ">
                  Status
                </th>
                <th className="py-3 text-sm leading-4 tracking-wider text-center text-blue-500 border-b-2 border-gray-300 tpx-6 ">
                  Submitted on
                </th>
                <th className="py-3 text-sm leading-4 tracking-wider text-center text-blue-500 border-b-2 border-gray-300 tpx-6 ">
                  Action
                </th>
                <th className="py-3 text-sm leading-4 tracking-wider text-center text-blue-500 border-b-2 border-gray-300 tpx-6 ">
                  Details
                </th>
                <th className="py-3 text-center border-b-2 border-gray-300 tpx-6 "></th>
              </tr>
            </thead>
            <tbody className="bg-white" id="patentTableBody">
              {patents.map((patent, index) => (
                <Row
                  key={patent._id}
                  serialNumber={index + 1}
                  name={patent.inventor.name}
                  title={patent.title}
                  background={patent.inventor.background}
                  status={
                    patent.status
                      ? (
                        patent.status.DSRIC
                          ? "DSRIC Approved"
                          : patent.status.ADI
                            ? "ADI Approved"
                            : patent.status.HOD
                              ? "HOD Approved"
                              : "Pending Approval"
                      )
                      : "Status Undefined"
                  }
                  submittedon={new Date(patent.dateOfApplication).toLocaleDateString()}
                  view_details="View details"
                />
              ))}
            </tbody>
          </table>
          <div className="mt-4 sm:flex-1 sm:flex sm:items-center sm:justify-between work-sans"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-2 pr-10 my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="inline-block min-w-full px-8 overflow-hidden align-middle bg-white rounded-bl-lg rounded-br-lg shadow shadow-dashboard">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 leading-4 tracking-wider text-center text-blue-500 border-b-2 border-gray-300">
                Serial No
              </th>
              <th className="px-6 py-3 text-sm leading-4 tracking-wider text-center text-blue-500 border-b-2 border-gray-300">
                Applicant Name
              </th>
              <th className="px-6 py-3 text-sm leading-4 tracking-wider text-center text-blue-500 border-b-2 border-gray-300">
                Title
              </th>
              <th className="px-6 py-3 text-sm leading-4 tracking-wider text-center text-blue-500 border-b-2 border-gray-300">
                Background
              </th>
              <th className="px-6 py-3 text-sm leading-4 tracking-wider text-center text-blue-500 border-b-2 border-gray-300">
                Status
              </th>
              <th className="px-6 py-3 text-sm leading-4 tracking-wider text-center text-blue-500 border-b-2 border-gray-300">
                Submitted on
              </th>
              <th className="px-6 py-3 text-sm leading-4 tracking-wider text-center text-blue-500 border-b-2 border-gray-300">
                Details
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody className="bg-white" id="patentTableBody">
            {patents.map((patent, index) => (
              <Row
                key={patent._id}
                serialNumber={index + 1}
                name={patent.inventor.name}
                title={patent.title}
                background={patent.inventor.background}
                status={
                  (patent.status.DSRIC || patent.status.COMMEM || patent.status.ADI || patent.status.HOD)
                    ? (patent.status.DSRIC
                      ? "DSRIC Approved"
                      : patent.status.COMMEM
                        ? "COMMEM Approved"
                        : patent.status.ADI
                          ? "ADI Approved"
                          : patent.status.HOD
                            ? "HOD Approved"
                            : "HOD Rejected")
                    : "Pending Approval"

                }
                submittedon={new Date(patent.dateOfApplication).toLocaleDateString()}
                view_details="View details"
              />
            ))}
          </tbody>
        </table>
        <div className="mt-4 sm:flex-1 sm:flex sm:items-center sm:justify-between work-sans"></div>
      </div>
    </div>
  );
}