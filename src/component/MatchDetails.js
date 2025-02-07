import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './MatchDetails.css';

const MatchDetails = () => {
    const { matchId, matchName } = useParams();
    const [matchDetails, setMatchDetails] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const apiUrl = location.state?.apiUrl; // Retrieve the dynamic URL passed from Team
    const navigate = useNavigate();  // To handle navigation

    const teams = queryParams.get('teams');
    const handleProfileClick = (url) => {
      navigate('/teams/player/profile', { state: { apiUrl: url } });
  };
  useEffect(() => {
    fetch(`http://localhost:8080/live-cricket-scores/${matchId}/${matchName}`)
      .then(response => response.json())
      .then(data => setMatchDetails(data[0]))
      .catch(error => console.error('Error fetching match details:', error));
  }, [matchId, matchName]);

  if (!matchDetails) {
    return <div>Loading match details...</div>;
  }

  return (
    <div className="match-details-container">
      <h2>Match Details</h2>
      <p><strong>{teams}</strong> </p> {/* Use passed teams */}
      <p><strong>Score:</strong> {matchDetails.team2Score}</p>
      <p><strong>Live Update:</strong> {matchDetails.liveUpdate}</p>
      <h3>Batter Details</h3>
<table style={{ width: '100%', borderCollapse: 'collapse', margin: '0 auto' }}>
  <thead>
    <tr>
      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Player</th>
      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Runs</th>
      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Balls</th>
      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Fours</th>
      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Sixes</th>
      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>SR</th>
    </tr>
  </thead>
  <tbody>
    {matchDetails.batterDetails.map((batter, index) => (
      <tr key={index}>
        <td onClick={() =>handleProfileClick(batter.playerUrl)} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
          <a  target="_blank" rel="noopener noreferrer">{batter.playerName}</a>
        </td>
        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{batter.R}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{batter.B}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{batter.fours}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{batter.sixs}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{batter.SR}</td>
      </tr>
    ))}
  </tbody>
</table>

<h3>Bowler Details</h3>
<table style={{ width: '100%', borderCollapse: 'collapse', margin: '0 auto' }}>
  <thead>
    <tr>
      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Player</th>
      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Wickets</th>
      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Runs</th>
      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>ECO</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td onClick={() =>handleProfileClick(matchDetails.bowlerDetails.playerUrl)} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
        <a target="_blank" rel="noopener noreferrer">
          {matchDetails.bowlerDetails.playerName}
        </a>
      </td>
      <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{matchDetails.bowlerDetails.W}</td>
      <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{matchDetails.bowlerDetails.R}</td>
      <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{matchDetails.bowlerDetails.ECO}</td>
    </tr>
  </tbody>
</table>

      <h3>Commentary</h3>
      <ul>
        {matchDetails.commentary.map((comment, index) => (
          <li key={index}>{comment.over} - {comment.commentary}</li>
        ))}
      </ul>
    </div>
  );
};

export default MatchDetails;
