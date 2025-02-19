import React, { useState, useEffect } from 'react';
import styles from './TeamCategory.css';
import { useNavigate } from 'react-router-dom';

const TeamCategory = () => {
  const [activeTab, setActiveTab] = useState('International');
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();  // To handle navigation
  
  // Define the available tabs
  const tabs = [
    { id: 'International', title: 'International' },
    { id: 'Domestic', title: 'Domestic' },
    { id: 'League', title: 'League' },
    { id: 'Women', title: 'Women' },
  ];

  useEffect(() => {
    let url = 'http://localhost:8080/teams';

    if (activeTab) {
      url = `http://localhost:8080/teams/${activeTab.toLowerCase()}`;
    }

    // Fetch the team data whenever the activeTab changes
    fetch(url)
      .then(response => response.json())
      .then(data => setTeams(data))
      .catch(error => console.error('Error fetching teams:', error));
  }, [activeTab]);

  const handleCardClick = (url, type) => {
    console.log("URL:", url);  // Debugging: Check if URL is correct
    console.log("Type:", type); // Debugging: Check if type is correct

    if (!url) {
      console.error("URL is undefined for", type);
      return;
    }

    switch (type) {
      case 'results':
        navigate('/teams/result', { state: { apiUrl: url } });
        break;
      case 'news':
        navigate('/teams/news', { state: { apiUrl: url } });
        break;
      case 'player':
        navigate('/teams/player', { state: { apiUrl: url } });
        break;
      case 'photos':
        navigate('/teams/photos', { state: { apiUrl: url } });
        break;
      case 'schedule':
        navigate('/teams/schedule', { state: { apiUrl: url } });
        break;
      default:
        console.error("Invalid navigation type:", type);
        break;
    }
  };

  return (
    <div className="cricket-teams-container">
      {/* Tab navigation */}
      <nav className="nav-pills-container">
        <ul className="nav-pills-list">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                className={`nav-pill ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                aria-label={`Switch to ${tab.title}`}
              >
                {tab.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Show teams data related to the selected category */}
      <div className="team-container">
        <h2 className="teamtype-heading">{activeTab} Teams</h2>

        <div className="team-list">
          {teams.length > 0 ? (
            teams.map((team) => (
              <div key={team.id} className="team-card">
                <div className="image-container">
                  <img src={team.image_url} alt={team.title} />
                </div>

                <h3>{team.title}</h3>

                <div className="card-buttons">
                  {["Results", "News", "Player", "Photos", "Schedule"].map(
                    (btn, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          handleCardClick(team[`${btn.toLowerCase()}_link`], btn.toLowerCase())
                        }
                      >
                        {btn}
                      </button>
                    )
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="no-teams">No teams available for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamCategory;
