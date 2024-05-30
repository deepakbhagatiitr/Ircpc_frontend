"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Row from "./table_row";

const Addrow = (index, name, title, background, status, submittedon, view_details) => {
  const tbody = document.getElementById('patentTableBody');

  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
        <div className="flex items-center">
            <div>
                <div className="text-sm leading-5 text-gray-800">${id}</div>
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
  const [patents, setPatents] = useState([]);
  
  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    if (userdata?.contactInformation?.instituteWebmailAddress) {
      const fetchPatents = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/profiles/patents/${userdata.contactInformation.instituteWebmailAddress}`
          );
          setPatents(response.data);
        } catch (error) {
          console.error("Error fetching patents:", error);
        }
      };
      fetchPatents();
    }
  }, []);

  return (
    <>
      <div className="min-h-screen py-2 pr-10 my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="inline-block min-w-full px-8 pt-3 overflow-hidden align-middle bg-white rounded-bl-lg rounded-br-lg shadow shadow-dashboard">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 leading-4 tracking-wider text-left text-blue-500 border-b-2 border-gray-300">
                  Serial No
                </th>
                <th className="px-6 py-3 text-sm leading-4 tracking-wider text-left text-blue-500 border-b-2 border-gray-300">
                  Applicant Name
                </th>
                <th className="px-6 py-3 text-sm leading-4 tracking-wider text-left text-blue-500 border-b-2 border-gray-300">
                  Title
                </th>
                <th className="px-6 py-3 text-sm leading-4 tracking-wider text-left text-blue-500 border-b-2 border-gray-300">
                  Background
                </th>
                <th className="px-6 py-3 text-sm leading-4 tracking-wider text-left text-blue-500 border-b-2 border-gray-300">
                  Status
                </th>
                <th className="px-6 py-3 text-sm leading-4 tracking-wider text-left text-blue-500 border-b-2 border-gray-300">
                  Submitted on
                </th>
                <th className="px-6 py-3 text-sm leading-4 tracking-wider text-left text-blue-500 border-b-2 border-gray-300">
                  Details
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {patents.map((patent, index) => (
                <Row
                  key={patent._id}
                  serialNumber={index + 1}
                  name={patent.inventor.name}
                  title={patent.title}
                  background={patent.inventor.background}
                  status={
                    patent.status.DSRIC
                      ? "DSRIC Approved"
                      : patent.status.ADI
                        ? "ADI Approved"
                        : patent.status.HOD
                          ? "HOD Approved"
                          : "Pending Approval"
                  }
                  submittedon={new Date(
                    patent.dateOfApplication
                  ).toLocaleDateString()}
                  view_details="View details"
                />
              ))}
            </tbody>
          </table>
          <div className="mt-4 sm:flex-1 sm:flex sm:items-center sm:justify-between work-sans"></div>
        </div>
      </div>
    </>
  );
}
