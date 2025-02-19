import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function TeamNews() {
    const location = useLocation();
    const [news, setNews] = useState([]);
    const apiUrl = location.state?.apiUrl; // Retrieve the dynamic URL passed from Team
    const fallbackImage = 'https://via.placeholder.com/150?text=No+Image+Available'; // Fallback image
    const navigate = useNavigate();  // To handle navigation

    useEffect(() => {
        if (apiUrl) {
            console.log(apiUrl);
            fetch(apiUrl) // Use the dynamic URL to fetch data
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => setNews(data)) // Set the data into the state
                .catch(error => console.error('Error fetching photos:', error));
        }
    }, [apiUrl]); // Dependency array includes apiUrl to handle changes

    if (!apiUrl) {
        return <div style={{ textAlign: 'center', color: '#ff4444', fontSize: '1.5rem', marginTop: '50px' }}>Error: No API URL provided.</div>;
    }

    const handleOnclick = (url) => {
        navigate('/teams/newsdetails', { state: { apiUrl: url } });
    };

    return (
        <div style={{
            padding: '40px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f4f4f9',
            minHeight: '100vh',
        }}>
            <h1 style={{
                textAlign: 'center',
                fontSize: '2.5rem',
                color: '#333',
                marginBottom: '40px',
                background: 'linear-gradient(90deg, #6a11cb, #2575fc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
            }}>
                Latest News
            </h1>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Responsive grid
                gap: '20px',
                padding: '20px',
            }}>
                {news.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleOnclick(item.link)}
                        style={{
                            padding: '20px',
                            border: '1px solid #ddd',
                            borderRadius: '12px',
                            backgroundColor: '#fff',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                        }}
                    >
                        <img
                            src={item.imageUrl || fallbackImage}
                            alt={item.headline || 'No Image'}
                            style={{
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                marginBottom: '15px',
                            }}
                        />
                        <h2 style={{
                            fontSize: '1.25rem',
                            margin: '0 0 10px',
                            color: '#333',
                        }}>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                {item.headline}
                            </a>
                        </h2>
                        <p style={{
                            margin: '0 0 10px',
                            color: '#666',
                            fontSize: '0.9rem',
                        }}>
                            {item.description}
                        </p>
                        <small style={{
                            color: '#aaa',
                            fontSize: '0.8rem',
                        }}>
                            {item.date}
                        </small>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TeamNews;
