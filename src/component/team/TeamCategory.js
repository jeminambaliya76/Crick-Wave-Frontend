import React, { useEffect, useState } from 'react';
import './TeamCategory.css';

function TeamCategory() {
    const [teams, setTeams] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:8080/teams')  // Replace with your backend URL
            .then(response => response.json())
            .then(data => setTeams(data))
            .catch(error => console.error('Error fetching teams:', error));
    }, []);

    return (
        <div className="home-container">
            <h1>Cric Wave</h1>  
            <p>Your source for the latest cricket data and live scores</p>
            <a href="teams" className="button">International</a>
            <a href="teams/domestic" className="button">Domestic</a>
            <a href="teams/league" className="button">League</a>
            <a href="teams/women" className="button">Women</a>

         
        </div>
    );
}

export default TeamCategory;
