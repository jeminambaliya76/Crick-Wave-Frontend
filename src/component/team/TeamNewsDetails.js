import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function TeamNewsDetails() {
    const location = useLocation();
    const apiUrl = location.state?.apiUrl; // Retrieve the dynamic URL passed from Team

    const [photos, setPhotos] = useState([]); // State to hold fetched data

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
        return <div className="text-red-500 text-center mt-10">Error: No API URL provided.</div>;
    }

    return (
        <div className="min-h-screen bg-white flex justify-center items-center">
            <div className="max-w-4xl w-full shadow-lg rounded-lg p-6 bg-white">
                {photos.length > 0 ? (
                    photos.map((photo, index) => (
                        <div key={index} className="mb-8">
                            <img
                                src={photo.imageUrl}
                                alt={photo.title}
                                className="w-full h-auto rounded-lg mb-4 object-cover shadow-md"
                            />
                            <h1 className="text-2xl font-semibold text-gray-800 mb-2">{photo.title}</h1>
                            <p className="text-gray-600 leading-6">{photo.description}</p>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500 text-center">Loading news details...</div>
                )}
            </div>
        </div>
    );
}

export default TeamNewsDetails;
