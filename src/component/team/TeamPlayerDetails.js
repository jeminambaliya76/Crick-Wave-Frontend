import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './TeamPlayerDetails.css'; // Import custom CSS for styling

function TeamPlayerDetails() {
    const location = useLocation();
    const [playerdetails, setPlayerDetails] = useState(null);
    const apiUrl = location.state?.apiUrl; // Retrieve the dynamic URL passed from Team

    useEffect(() => {
        if (apiUrl) {
            fetch("http://localhost:8080" + apiUrl) // Use the dynamic URL to fetch data
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => setPlayerDetails(data)) // Set the data into the state
                .catch(error => console.error('Error fetching photos:', error));
        }
    }, [apiUrl]);

    if (!apiUrl) {
        return <div className="error-message">Error: No API URL provided.</div>;
    }

    if (!playerdetails) {
        return <div className="loading-message">Loading player details...</div>;
    }

    const {
        Name,
        profileImage,
        profileDescription,
        PersonalInfo,
        CareerInfo,
        Batting,
        Bowling,
        BatCareerSummary,
        BowlCareerSummary
    } = playerdetails;

    return (
        <div className="player-details-container">
          <div className="player-profile">
            <img src={profileImage} alt={Name} className="profile-image" />
            <h1 className="player-name">{Name}</h1>
          </div>
    
          <div className="player-info">
            <h2>Personal Information</h2>
            <ul>
              <li><strong>Role:</strong> {PersonalInfo.Role}</li>
              <li><strong>Bowling Style:</strong> {PersonalInfo.BowlingStyle}</li>
              <li><strong>Batting Style:</strong> {PersonalInfo.BattingStyle}</li>
              <li><strong>Born:</strong> {PersonalInfo.Born}</li>
              <li><strong>Height:</strong> {PersonalInfo.Height}</li>
              <li><strong>Birth Place:</strong> {PersonalInfo.BirthPlace}</li>
            </ul>
          </div>
    
          <div className="player-career">
            <h2>Career Information</h2>
            <ul>
              <li><strong>Last Test:</strong> {CareerInfo.LastTest}</li>
              <li><strong>Last ODI:</strong> {CareerInfo.LastODI}</li>
              <li><strong>Last T20:</strong> {CareerInfo.LastT20}</li>
              <li><strong>IPL Debut:</strong> {CareerInfo.IPLdebut}</li>
              <li><strong>Test Debut:</strong> {CareerInfo.Testdebut}</li>
              <li><strong>T20 Debut:</strong> {CareerInfo.T20debut}</li>
            </ul>
          </div>
    
          <div className="player-stats">
            <h2>Batting Stats</h2>
            <table className="stats-table">
              <thead>
                <tr>
                <th>TYPE</th>
                  <th>M</th>
                  <th>INN</th>
                  <th>NO</th>
                  <th>RUNS</th>
                  <th>HS</th>
                  <th>AVG</th>
                  <th>BF</th>
                  <th>SR</th>
                  <th>100</th>
                  <th>200</th>
                  <th>50</th>
                  <th>4S</th>
                  <th>6S</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(BatCareerSummary).map(([format, stats]) => (
                  <tr key={format}>
                    <td>{format}</td>
                    <td>{stats.MatchesPlayed}</td>
                    <td>{stats.NoofInningsBatted}</td>
                    <td>{stats.NoofNotOuts}</td>
                    <td>{stats.NoofRunsScored}</td>
                    <td>{stats.HighestScore}</td>
                    <td>{stats.BattingAverage}</td>
                    <td>{stats.NoofBallsFaced}</td>
                    <td>{stats.BattingStrikeRate}</td>
                    <td>{stats.Noof100sScored}</td>
                    <td>{stats.Noof200sScored}</td>
                    <td>{stats.Noof50sScored}</td>
                    <td>{stats.Nooffourshit}</td>
                    <td>{stats.Noofsixeshit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    
          <div className="player-stats">
            <h2>Bowling Stats</h2>
            <table className="stats-table">
              <thead>
                <tr>
                <th>TYPE</th>
                  <th>M</th>
                  <th>INN</th>
                  <th>B</th>
                  <th>RUNS</th>
                  <th>WKTS</th>
                  <th>BBI</th>
                  <th>BBM</th>
                  <th>EcoN</th>
                  <th>Avg</th>
                  <th>SR</th>
                  <th>5W</th>
                  <th>10W</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(BowlCareerSummary).map(([format, stats]) => (
                  <tr key={format}>
                    <td>{format}</td>
                    <td>{stats.MatchesPlayed}</td>
                    <td>{stats.NoofInningsBatted}</td>
                    <td>{stats.NoofBallsBowled}</td>
                    <td>{stats.NoofRunsScored}</td>
                    <td>{stats.Wickets}</td>
                    <td>{stats.BestBowlinginInnings}</td>
                    <td>{stats.BestBowlinginMatch}</td> 
                    <td>{stats.Economy}</td>
                    <td>{stats.BowlingAverage}</td>
                    <td>{stats.BowlingStrikeRate}</td>
                    <td>{stats.FiveWicketsinanInnings}</td>
                    <td>{stats.TenWicketsinanMatch}</td>
                  </tr>
                ))}
                
              </tbody>
            </table>
<br/>
<br/>
<br/>

      <div className="content-container">
        <p  className="paragraph">{profileDescription}</p>
    </div>

          </div>
        </div>
      );
}

export default TeamPlayerDetails;
