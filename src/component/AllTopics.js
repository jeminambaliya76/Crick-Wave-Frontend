import React, { useEffect, useState } from 'react';
import './AllTopics.css'; // You can style your cards in this CSS file
import { useLocation, useNavigate } from 'react-router-dom';

const AllTopics = () => {
  const [topics, setTopics] = useState([]);
  const location = useLocation();
  const apiUrl = location.state?.apiUrl; // Retrieve the dynamic URL passed from Team
  const navigate = useNavigate();  // To handle navigation

  useEffect(() => {
    fetch('http://localhost:8080/all-topics')  // Replace with the actual API URL if needed
      .then((response) => response.json())
      .then((data) => setTopics(data))
      .catch((error) => console.error('Error fetching topics:', error));
  }, []);

  const handleOnclick = (url) => {
    
    navigate( '/teams/news', { state: { apiUrl: url } }); 
};
  return (
    <div className="topics-container">
      <h2>All Topics</h2>
      <div className="cards-container">
        {topics.map((topic, index) => (
          <div className="card" key={index}>
           
            <div className="card-content">
              <h3 className="card-title">{topic.title}</h3>
              <p className="card-description">{topic.description}</p>
              <a onClick={() => handleOnclick(topic.link)}  className="card-link" target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTopics;
