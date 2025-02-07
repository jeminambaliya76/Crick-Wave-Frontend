import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TeamPlayer.css'; // Import CSS file for styling

function TeamPlayer() {
    const location = useLocation();
    const [player, setPlayer] = useState([]);
    const apiUrl = location.state?.apiUrl; // Retrieve the dynamic URL passed from Team
    const navigate = useNavigate();  // To handle navigation

    useEffect(() => {
        if (apiUrl) {
            fetch(apiUrl) // Use the dynamic URL to fetch data
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => setPlayer(data)) // Set the data into the state
                .catch(error => console.error('Error fetching photos:', error));
        }
    }, [apiUrl]); // Dependency array includes apiUrl to handle changes

    if (!apiUrl) {
        return <div>Error: No API URL provided.</div>;
    }

    const handleProfileClick = (url) => {
        navigate('/teams/player/profile', { state: { apiUrl: url } });
    };

    return (
        <div className="player-container">
            <h2 className="player-header">Players</h2>
            <div className="player-card-grid">
                {player.map((item, index) => (
                    <div key={index} className="player-card">
                        <div className="player-image">
                            <img src={item.imageUrl} alt={item.name} />
                        </div>
                        <h3>{item.name}</h3>
                        <p><strong>Role:</strong> {item.role}</p>
                        <a onClick={() => handleProfileClick(item.profileUrl)} target="_blank" rel="noopener noreferrer">View Profile</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TeamPlayer;
