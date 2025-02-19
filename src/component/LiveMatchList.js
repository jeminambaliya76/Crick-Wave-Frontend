import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './LiveMatchList.css';

const LiveMatchList = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/cricketmatch/livematches')
      .then(response => response.json())
      .then(data => setMatches(data))
      .catch(error => console.error('Error fetching live matches:', error));
  }, []);

  return (
    <div className="match-card-container">
      {matches.map((match, index) => {
        const matchId = match.matchUrl.split('/')[4];  // Extract matchId
        const matchName = match.matchUrl.split('/')[5]; // Extract matchName
        return (
          <div key={index} className="match-card glow">
            <div className="card-header">
              <h3 className="teams-title">{match.teams || 'Match Title Unavailable'}</h3>
            </div>

            <div className="teams-container">
              <div className="team team1">
                <span className="team-name">{match.team1 || 'Team 1'}</span>
              </div>
              
              <div className="vs-badge-container">
                <div className="vs-badge">VS</div>
              </div>

              <div className="team team2">
                <span className="team-name">{match.team2 || 'Team 2'}</span>
              </div>
            </div>

            <div className="status-pill">
              {match.status || 'Match details unavailable'}
            </div>

            <Link 
              to={`/live-cricket-scores/${matchId}/${matchName}?teams=${match.teams}`} 
              className="view-details-btn"
            >
              View Full Details
              <span className="arrow-icon">→</span>
            </Link>
            
            <div className="match-venue">
              <span>{match.venue || 'Venue details unavailable'}</span>
            </div>
          </div>
        );  
      })}
    </div>
  );
};

export default LiveMatchList;