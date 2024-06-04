"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

export default function Query() {
  const [query, setQuery] = useState('');
  const [comment, setComment] = useState('');
  const [queries, setQueries] = useState([]);
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = JSON.parse(localStorage.getItem('userdata'));
      setUserdata(data);
      if (data) {
        handleGetQuery(data.contactInformation.instituteWebmailAddress);
      }
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://ircpc-backend.onrender.com/api/query/createquery', {
        name: userdata.person.fullName,
        email: userdata.contactInformation.instituteWebmailAddress,
        query,
        comment
      });
      window.location.reload();
      console.log('Query created:', response.data);
    } catch (error) {
      console.error('Error creating query:', error);
    }
  };

  const handleGetQuery = async (email) => {
    try {
      const response = await axios.post('https://ircpc-backend.onrender.com/api/query/getallquery', {
        email
      });
      console.log('Queries retrieved:', response.data);
      setQueries(response.data);
    } catch (error) {
      console.error('Error getting queries:', error);
    }
  };

  const handleUpdateQuery = async (id) => {
    try {
      const response = await axios.put(`https://ircpc-backend.onrender.com/api/query/updatequery/${id}`, {
        comment
      });
      console.log('Query updated:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error updating query:', error);
    }
  };

  if (!userdata) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container p-4 mx-auto">
      <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Submit a Query</h2>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={userdata.person.fullName}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={userdata.contactInformation.instituteWebmailAddress}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Query</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows="3"
          />
        </div>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Create Query
        </button>
      </div>

      <div className="max-w-4xl mx-auto mt-8">
        {queries.map((query) => (
          <div key={query._id} className="p-6 mb-4 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{query.name}</h3>
              <p className="text-sm text-gray-500">
                {new Date(query.date).toLocaleString("en-US", {
                  timeZone: "UTC",
                  hour12: true,
                  hour: "numeric",
                  minute: "numeric",
                })}
              </p>
            </div>
            <p className="text-sm text-gray-600">{query.email}</p>
            <div className="mt-2">
              <b>Query:</b> <em>{query.query}</em>
            </div>
            <div className="mt-2">
              <b>
                {userdata.contactInformation.instituteWebmailAddress === 'admin@ipr.iitr.ac.in'
                  ? 'Comment'
                  : 'Admin Comment'}
                :
              </b>
              <em>{query.comment || 'No comments yet'}</em>
            </div>
            {userdata.contactInformation.instituteWebmailAddress === 'admin@ipr.iitr.ac.in' && (
              <div className="mt-2">
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Add comment"
                  onChange={(e) => setComment(e.target.value)}
                  rows="2"
                />
                <button
                  className="px-4 py-2 mt-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                  onClick={() => handleUpdateQuery(query._id)}
                >
                  Add Comment
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
