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
    <div className="match-container" style={{ color: 'black' }}>
      <h2>Live Cricket Matches</h2>
      <div className="match-list">
        {matches.map((match, index) => {
          const matchParts = match.matchUrl.split('/');
          const matchId = matchParts[matchParts.length - 2];
          const matchName = matchParts[matchParts.length - 1];

          return (
            <div key={index} className="match-card">
              <h3>{match.teams}</h3>
              <p><strong>{match.team1}</strong> vs <strong>{match.team2}</strong></p>
              <p><strong>Status:</strong> {match.status || 'Match details unavailable'}</p>
              <Link to={`/live-cricket-scores/${matchId}/${matchName}?teams=${match.teams}`} className="match-link">View Details</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LiveMatchList;
