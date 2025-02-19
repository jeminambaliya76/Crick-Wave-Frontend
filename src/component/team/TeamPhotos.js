import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './TeamPhotos.css'; // Import the CSS file

function TeamPhotos() {
    const location = useLocation();
    const [photos, setPhotos] = useState([]);
    const apiUrl = location.state?.apiUrl;

    useEffect(() => {
        if (apiUrl) {
            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => setPhotos(data))
                .catch(error => console.error('Error fetching photos:', error));
        }
    }, [apiUrl]);

    if (!apiUrl) {
        return <div className="error-message">Error: No API URL provided.</div>;
    }

    return (
        <div className="photos-container">
            <h1 className="photos-title">Team Photos</h1>
            <div className="photos-grid">
                {photos.map((photo, index) => (
                    <div key={index} className="photo-card">
                        <img src={photo.link} alt={photo.title} className="photo-img" />
                        <div className="photo-info">
                            <h3 className="photo-title">{photo.title}</h3>
                            <p className="photo-date">Date: {photo.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TeamPhotos;