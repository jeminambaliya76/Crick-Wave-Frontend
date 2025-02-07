import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CardView from '../../UI/CardView';
import styles from './team.css';    
// import { useParams } from "react-router-dom";

function Team() {
    const [teams, setTeams] = useState([]);
    const navigate = useNavigate();  // To handle navigation
    const { teamType } = useParams();

    useEffect(() => {
        let url = 'http://localhost:8080/teams'; // Default URL without teamType

        // If teamType is provided, append it to the URL
        if (teamType && teamType !== '') {
            url = 'http://localhost:8080/teams/' + teamType;
        }
        fetch(url)  // Your backend API URL
            .then(response => response.json())
            .then(data => setTeams(data))
            .catch(error => console.error('Error fetching teams:', error));
    }, []);

    const handleCardClick = (url, type) => {
        // Based on the type, navigate to the appropriate route
        switch (type) {
            case 'result':
                navigate( '/teams/result', { state: { apiUrl: url } }); 
                break;
            case 'news':
                navigate( '/teams/news', { state: { apiUrl: url } }); 
                break;
            case 'player':
                navigate('/teams/player', { state: { apiUrl: url } }); 
                break;
            case 'photos':
                navigate('/teams/photos', { state: { apiUrl: url } }); 
                break;
            case 'schedule':
                navigate( '/teams/scedule', { state: { apiUrl: url } }); 
                break;
            default:
                break;
        }
    };

    return (
        <div className="team-container">
            <div className="team-list">
                {teams.map((team) => (
                    <div key={team.id}>
                        <CardView
                            title={team.title}
                            imageUrl={team.image_url}
                            handleClick={handleCardClick} 
                            result_url={team.results_link} 
                            news_url={team.news_link} 
                            player_url={team.player_link} 
                            scedule_url={team.schedule_link} 
                            photos_url={team.photos_link}  // Passing the URL to CardView
 // Passing the function to CardView
                        />
                        <br />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Team;
