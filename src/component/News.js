import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function News() {
    const { newsId, newsTopic } = useParams(); // Get URL parameters
    const [news, setNews] = useState([]);
    // const apiUrl = ""; // Retrieve the dynamic URL passed from Team
    const fallbackImage = 'https://via.placeholder.com/150?text=No+Image+Available'; // Fallback image
    const navigate = useNavigate();  // To handle navigation
    useEffect(() => {
        let apiUrl = "http://localhost:8080/cricket-news"; // Change `const` to `let`

        // Append newsId if it exists
        if (newsId) {
            apiUrl += `?newsId=${newsId}`;
        }
        
        // Append newsTopic if it exists
        if (newsTopic) {
            // If newsId is already appended, use '&' instead of '?'
            apiUrl += newsId ? `&newsTopic=${newsTopic}` : `?newsTopic=${newsTopic}`;
        }
    
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setNews(data))
            .catch(error => console.error("Error fetching news:", error));
    }, [newsId, newsTopic]); 
    // Dependency array to refetch data when params change
    
    // if (!apiUrl) {
    //     return <div>Error: No API URL provided.</div>;
    // }

    const handleOnclick = (url) => {
        navigate('/teams/newsdetails', { state: { apiUrl: url } });
    };
    // href={item.link}
    return (
        <div style={{
             padding: '20px', 
             fontFamily: 'Arial, sans-serif',
             cursor: 'pointer', // Ensures the pointer appears

              backgroundColor: '#f9f9f9' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Latest News</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                {news.map((item, index) => (
                    <div onClick={() => handleOnclick(item.link)} 
                        key={index}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '15px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            backgroundColor: '#fff',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        }}
                        
                    >
                        <img
                            src={item.imageUrl || fallbackImage} // Use fallback image if imageUrl is missing
                            alt={item.title || 'No Image'}
                            style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                        <div style={{ marginLeft: '15px', flex: 1 }}>
                            <h2 style={{ fontSize: '18px', margin: '0 0 8px', color: '#007BFF' }}>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    {item.title}
                                </a>
                            </h2>
                            <p style={{ margin: '0 0 5px', color: '#666', fontSize: '14px' }}>{item.description}</p>
                            <small style={{ color: '#aaa' }}>{item.date}</small>

                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default News;
