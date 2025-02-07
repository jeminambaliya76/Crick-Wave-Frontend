import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './TeamScedule.css'; // Add custom styles if needed

function TeamScedule() {
    const location = useLocation();
    const [scedule, setScedule] = useState([]);
    const apiUrl = location.state?.apiUrl; // Retrieve the dynamic URL passed from Team

    useEffect(() => {
        if (apiUrl) {
            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => setScedule(data))
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [apiUrl]);

    if (!apiUrl) {
        return <div>Error: No API URL provided.</div>;
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#444' }}>Match Schedule</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {scedule.map((match, index) => (
                    <div
                        key={index}
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            padding: '15px',
                            background: '#fff'
                        }}
                    >
                        <h3 style={{ color: '#007bff', fontSize: '18px', marginBottom: '10px' }}>{match.title}</h3>
                        <p style={{ margin: '5px 0', color: '#555' }}>
                            <strong>Venue:</strong> {match.venue}
                        </p>
                        <p style={{ margin: '5px 0', color: '#555' }}>
                            <strong>Series:</strong> {match.series}
                        </p>
                        <p style={{ margin: '5px 0', color: '#555' }}>
                            <strong>Date:</strong> {match['Date ']}
                        </p>
                        <p style={{ margin: '5px 0', color: '#555' }}>
                            <strong>Start Time:</strong> {match.startTime}
                        </p>
                        <button
                            style={{
                                marginTop: '10px',
                                padding: '8px 15px',
                                backgroundColor: '#007bff',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}
                            onClick={() => window.open(match.match_link, '_blank')}
                        >
                            View Match Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TeamScedule;
