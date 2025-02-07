import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function TeamPhotos() {
    const location = useLocation();
    const [photos, setPhotos] = useState([]);
    const apiUrl = location.state?.apiUrl; // Retrieve the dynamic URL passed from Team

    useEffect(() => {
        if (apiUrl) {
            fetch(apiUrl) // Use the dynamic URL to fetch data
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => setPhotos(data)) // Set the data into the state
                .catch(error => console.error('Error fetching photos:', error));
        }
    }, [apiUrl]); // Dependency array includes apiUrl to handle changes

    if (!apiUrl) {
        return <div>Error: No API URL provided.</div>;
    }

    return (
        <div className="photos-container">
            <h1>Photos</h1>
            <div className="photos-grid">
                {photos.map((photo, index) => (
                    <div key={index} className="photo-card">
                        <img src={photo.link} alt={photo.title} className="photo-img" />
                        <div className="photo-info">
                            <h3>{photo.title}</h3>
                            <p>Date: {photo.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TeamPhotos;
