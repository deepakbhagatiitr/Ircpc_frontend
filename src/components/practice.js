import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Query() {
  const [query, setQuery] = useState('');
  const [comment, setComment] = useState('');
  const [queries, setQueries] = useState([]);
  const [userdata, setUserData] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserData = localStorage.getItem('userdata');
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    }
  }, []);

  useEffect(() => {
    if (userdata) {
      handleGetQuery();
    }
  }, [userdata]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/query/createquery', {
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

  const handleGetQuery = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/query/getallquery', {
        email: userdata.contactInformation.instituteWebmailAddress
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
      window.location.reload();
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
          {queries.map((queryData) => (
            <div key={queryData._id} className="query-item">
              <div className="flexbox">
                <h3 className="query-name">{queryData.name}</h3>
                <p className="query-date">{new Date(queryData.date).toLocaleString()}</p>
              </div>
              <p className="query-email">{queryData.email}</p>
              <div>
                <b>Query:</b>
                <em className="query-text">{queryData.query}</em>
              </div>
              {userdata && userdata.contactInformation.instituteWebmailAddress === 'admin@ipr.iitr.ac.in' && (
                <div>
                  <input
                    type="text"
                    placeholder="Add comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    className="query-button"
                    onClick={() => handleUpdateQuery(queryData._id)}
                  >
                    Add Comment
                  </button>
                </div>
              )}
              <div>
                <b>Admin Comment: </b>
                {queryData.comment ? (
                  <em className="comm-text">{queryData.comment}</em>
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
