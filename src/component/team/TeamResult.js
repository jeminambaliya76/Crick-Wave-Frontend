import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function TeamResult() {
    const location = useLocation();
    const [results, setResults] = useState([]);
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
                .then(data => setResults(data)) // Set the data into the state
                .catch(error => console.error('Error fetching results:', error));
        }
    }, [apiUrl]); // Dependency array includes apiUrl to handle changes

    if (!apiUrl) {
        return <div>Error: No API URL provided.</div>;
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Match Results</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                {results.map((match, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '15px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            backgroundColor: '#fff',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <h2 style={{ fontSize: '18px', margin: '0 0 8px', color: '#007BFF' }}>{match.title}</h2>
                        <p style={{ margin: '0 0 5px', color: '#666', fontSize: '14px' }}>
                            <strong>Result:</strong> {match.result}
                        </p>
                        <p style={{ margin: '0 0 5px', color: '#666', fontSize: '14px' }}>
                            <strong>Venue:</strong> {match.venue}
                        </p>
                        <p style={{ margin: '0 0 5px', color: '#666', fontSize: '14px' }}>
                            <strong>Series:</strong> {match.series}
                        </p>
                        <p style={{ margin: '0 0 5px', color: '#666', fontSize: '14px' }}>
                            <strong>Date:</strong> {match["Date "]}
                        </p>
                        <div style={{ marginTop: '10px' }}>
                            <button
                                style={{
                                    padding: '8px 15px',
                                    backgroundColor: '#007BFF',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                }}
                                onClick={() => console.log(`Match link: ${match.matchLink}`)} // Placeholder for your logic
                            >
                                View Match Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TeamResult;
