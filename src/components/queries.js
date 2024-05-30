"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Query() {
  const [userdata, setUserdata] = useState(null);
  const [query, setQuery] = useState('');
  const [comment, setComment] = useState('');
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserdata = localStorage.getItem('userdata');
      if (storedUserdata) {
        setUserdata(JSON.parse(storedUserdata));
      }
    }
  }, []);

  useEffect(() => {
    if (userdata) {
      handleGetQuery();
    }
  }, [userdata]);

  const handleSubmit = async () => {
    if (!userdata) return;

    const { fullName: name } = userdata.person;
    const { instituteWebmailAddress: email } = userdata.contactInformation;

    try {
      const response = await axios.post('http://localhost:5000/api/query/createquery', {
        name,
        email,
        query,
        comment
      });
      window.location.reload();
      console.log('Query created:', response.data);
    } catch (error) {
      console.error('Error creating query:', error);
    }
  };

  const handleGetQuery = async () => {
    if (!userdata) return;

    const { instituteWebmailAddress: email } = userdata.contactInformation;

    try {
      const response = await axios.post('http://localhost:5000/api/query/getallquery', {
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
      const response = await axios.put(`http://localhost:5000/api/query/updatequery/${id}`, {
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

  const { fullName: name, instituteWebmailAddress: email } = userdata.contactInformation;

  return (
    <div className="query-container h-[75%] mx-auto">
      <div>
        {email === 'admin@ipr.iitr.ac.in' && (
          <>
            <input
              type="text"
              className="query-input"
              placeholder="Name"
              value={name}
              readOnly
            />
            <input
              type="email"
              className="query-input"
              placeholder="Email"
              value={email}
              readOnly
            />
            <input
              type="text"
              className="query-input"
              placeholder="Query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="query-button" onClick={handleSubmit}>
              Create Query
            </button>
          </>
        )}
        <div className="query-list">
          {queries.map((query) => (
            <div key={query._id} className="query-item">
              <div className="flebox">
                <h3 className="query-name">{query.name}</h3>
                <p className="query-date">
                  {new Date(query.date).toLocaleString("en-US", {
                    timeZone: "UTC",
                    hour12: true,
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </p>
              </div>
              <p className="query-email">{query.email}</p>
              <br />
              <div>
                <b>Query:</b>
                <em className="query-text">{query.query}</em>
              </div>
              <div>
                <b>{email === 'admin@ipr.iitr.ac.in' ? 'Comment:' : 'Admin Comment:'}</b>
                <em className="comm-text">{query.comment || 'No comments till now'}</em>
              </div>
              {email === 'admin@ipr.iitr.ac.in' && (
                <>
                  <input
                    type="text"
                    placeholder="Add comment"
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    className="query-button"
                    onClick={() => handleUpdateQuery(query._id)}
                  >
                    Add Comment
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
