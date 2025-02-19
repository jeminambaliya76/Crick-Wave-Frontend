import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './MatchDetails.css';

const MatchDetails = () => {
  const { matchId, matchName } = useParams();
  const [matchDetails, setMatchDetails] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const apiUrl = location.state?.apiUrl;
  const navigate = useNavigate();

  const teams = queryParams.get('teams');

  const handleProfileClick = (url) => {
    navigate('/teams/player/profile', { state: { apiUrl: url } });
  };

  useEffect(() => {
    fetch(`http://localhost:8080/live-cricket-scores/${matchId}/${matchName}`)
      .then((response) => response.json())
      .then((data) => setMatchDetails(data[0]))
      .catch((error) => console.error('Error fetching match details:', error));
  }, [matchId, matchName]);

  if (!matchDetails) {
    return <div className="loading">Loading match details...</div>;
  }

  return (
    <div className="match-details-container">
      {/* Match Header */}
      <div className="match-header">
        <h1 className="teams">{teams}</h1>
        <p className="series">{matchDetails.series}</p>
        <div className="match-meta">
          <span className="venue">{matchDetails.venue}</span>
          <span className="date">{matchDetails.dateTime}</span>
        </div>
      </div>

      {/* Live Status Bar */}
      <div className="live-status-bar">
        <div className="status-content">
          <span className="live-indicator">● LIVE</span>
          <span className="score">{matchDetails.team2Score}</span>
          <span className="current-status">{matchDetails.liveUpdate}</span>
        </div>
      </div>

      {/* Key Match Stats */}
      <div className="stats-container">
        <div className="key-stats">
          <div className="stat-card">
            <h4>Team 1 Score</h4>
            <div className="stat-value">{matchDetails.team1Score}</div>
          </div>
          <div className="stat-card">
            <h4>Current Run Rate</h4>
            <div className="stat-value accent">{matchDetails.crr}</div>
          </div>
          <div className="stat-card">
            <h4>Partnership</h4>
            <div className="stat-value">{matchDetails.pship}</div>
          </div>
          <div className="stat-card">
            <h4>Last 10 Overs</h4>
            <div className="stat-value">{matchDetails.last10}</div>
          </div>
          <div className="stat-card">
            <h4>Toss</h4>
            <div className="stat-value">{matchDetails.toss}</div>
          </div>
          <div className="stat-card">
            <h4>Player of the Match</h4>
            <div className="stat-value">{matchDetails.playerOfTheMatch || 'N/A'}</div>
          </div>
          <div className="stat-card">
            <h4>Player of the Series</h4>
            <div className="stat-value">{matchDetails.playerOfTheSeries || 'N/A'}</div>
          </div>
        </div>
      </div>

      {/* Batter Details */}
      {matchDetails.batterDetails && matchDetails.batterDetails.length > 0 && (
        <div className="players-container">
          <h3 className="section-title">Batting</h3>
          <div className="players-table">
            <div className="table-header">
              <div>Batter</div>
              <div>Runs</div>
              <div>Balls</div>
              <div>4s</div>
              <div>6s</div>
              <div>SR</div>
            </div>
            {matchDetails.batterDetails.map((batter, index) => (
              <div className="table-row" key={index}>
                <div
                  className="player-name"
                  onClick={() => batter.playerUrl && handleProfileClick(batter.playerUrl)}
                >
                  {batter.playerName || 'No Name'}
                  {batter.playerName?.includes('*') && <span className="not-out">*</span>}
                </div>
                <div>{batter.R}</div>
                <div>{batter.B}</div>
                <div>{batter.fours}</div>
                <div>{batter.sixs}</div>
                <div>{batter.SR}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bowler Details */}
      {matchDetails.bowlerDetails && Object.keys(matchDetails.bowlerDetails).length > 0 && (
        <div className="players-container">
          <h3 className="section-title">Bowling</h3>
          <div className="players-table">
            <div className="table-header">
              <div>Bowler</div>
              <div>Overs</div>
              <div>Maidens</div>
              <div>Runs</div>
              <div>Wickets</div>
              <div>Economy</div>
            </div>
            <div className="table-row">
              <div className="player-name">
                {matchDetails.bowlerDetails.playerName || 'No Name'}
              </div>
              <div>{matchDetails.bowlerDetails.O}</div>
              <div>{matchDetails.bowlerDetails.M}</div>
              <div>{matchDetails.bowlerDetails.R}</div>
              <div>{matchDetails.bowlerDetails.W}</div>
              <div>{matchDetails.bowlerDetails.ECO}</div>
            </div>
          </div>
        </div>
      )}

      {/* Commentary Section */}
      <div className="commentary-container">
        <h3 className="section-title">Ball-by-Ball Commentary</h3>
        <div className="commentary-list">
          {matchDetails.commentary && matchDetails.commentary.length > 0 ? (
            matchDetails.commentary.map((comment, index) => (
              <div className="commentary-item" key={index}>
                <span className="over-number">{comment.over}</span>
                <p className="comment-text">{comment.commentary}</p>
              </div>
            ))
          ) : (
            <div className="no-commentary">No commentary available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;