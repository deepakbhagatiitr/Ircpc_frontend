"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Query() {
  const [query, setQuery] = useState('');
  const [comment, setComment] = useState('');
  const [queries, setQueries] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userdata');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    if (userData) {
      handleGetQuery();
    }
  }, [userData]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/query/createquery', {
        name: userData.person.fullName,
        email: userData.contactInformation.instituteWebmailAddress,
        query,
        comment
      });
      setQuery('');
      setComment('');
      handleGetQuery();
      console.log('Query created:', response.data);
    } catch (error) {
      console.error('Error creating query:', error);
    }
  };

  const handleGetQuery = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/query/getallquery', {
        email: userData.contactInformation.instituteWebmailAddress
      });
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
      setComment('');
      handleGetQuery();
      console.log('Query updated:', response.data);
    } catch (error) {
      console.error('Error updating query:', error);
    }
  };

  return (
    <div className="query-container h-[75%] mx-auto">
      <div>
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
        <div className="query-list">
          {queries.map((query) => (
            <div key={query._id} className="query-item">
              <div className="flexbox">
                <h3 className="query-name">{query.name}</h3>
                <p className="query-date">{new Date(query.date).toLocaleString()}</p>
              </div>
              <p className="query-email">{query.email}</p>
              <div>
                <b>Query:</b>
                <em className="query-text">{query.query}</em>
              </div>
              {userData && userData.contactInformation.instituteWebmailAddress === 'admin@ipr.iitr.ac.in' && (
                <div>
                  <input
                    type="text"
                    placeholder="Add comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    className="query-button"
                    onClick={() => handleUpdateQuery(query._id)}
                  >
                    Add Comment
                  </button>
                </div>
              )}
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
  );
}
