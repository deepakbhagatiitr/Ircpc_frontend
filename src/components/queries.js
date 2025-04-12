"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Query() {
  const [query, setQuery] = useState('');
  const [comment, setComment] = useState('');
  const [queries, setQueries] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userdata = JSON.parse(localStorage.getItem('userdata'));
      if (userdata) {
        setName(userdata.person.fullName);
        setEmail(userdata.contactInformation.instituteWebmailAddress);
      }
      handleGetQuery();
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://iprc-backend-208970416432.us-central1.run.app/api/query/createquery', {
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
    try {
      const response = await axios.post('https://iprc-backend-208970416432.us-central1.run.app/api/query/getallquery', {
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
      const response = await axios.put(`https://iprc-backend-208970416432.us-central1.run.app/api/query/updatequery/${id}`, {
        comment
      });
      console.log('Query updated:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error updating query:', error);
    }
  };

  if (typeof window !== 'undefined') {
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    if (userdata?.contactInformation.instituteWebmailAddress === 'admin@ipr.iitr.ac.in') {
      return (
        <>
          <div className="query-container h-[75%] mx-auto">
            <div>
              <input
                type="text"
                className="query-input"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                className="query-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              {/* ...existing code... */}
              <div className="query-list ">
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
                      <b>Comment:</b>
                      <em className="comm-text">{query.comment}</em>
                    </div>
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      );
    }
  }

  return (
    <>
      <div className="query-container h-[75%] mx-auto">
        <div>
          <input
            type="text"
            className="query-input"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="query-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          {/* ...existing code... */}
          <div className="query-list ">
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
                  <b>Admin Comment: </b>
                  {query.comment ? (
                    <em className="comm-text">{query.comment}</em>
                  ) : (
                    <span>No comments till now</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
