import React, { useState, useEffect } from "react";
import styles from "./NewsCategory.css";
import { useNavigate } from "react-router-dom";

const NewsCategory = () => {
  const [activeTab, setActiveTab] = useState("All Stories");
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  // Define the available tabs
  const tabs = [
    { id: "1", newsId: "all", topics: "", title: "All Stories" },
    { id: "2", newsId: "editorial", topics: "cb-plus", title: "Premium Editorials" },
    { id: "3", newsId: "latest-news", topics: "", title: "News" },
    { id: "5", newsId: "editorial", topics: "spotlight", title: "Spotlight" },
    { id: "6", newsId: "editorial", topics: "editorial-list", title: "Opinions" },
    { id: "7", newsId: "editorial", topics: "specials", title: "Special" },
    { id: "8", newsId: "editorial", topics: "stats-analysis", title: "Stats" },
    { id: "9", newsId: "editorial", topics: "interviews", title: "Interviews" },
    { id: "10", newsId: "editorial", topics: "live-blogs", title: "Live Blogs" },
  ];

  useEffect(() => {
    fetchNews(activeTab);
  }, [activeTab]);

  const fetchNews = (category) => {
    const selectedTab = tabs.find((tab) => tab.title === category); // Find the tab with the active category
    let apiUrl = "http://localhost:8080/cricket-news";

    // Append newsId if it exists
    if (selectedTab.newsId) {
      apiUrl += `?newsId=${selectedTab.newsId}`;
    }

    // Append newsTopic if it exists
    if (selectedTab.topics) {
      apiUrl += selectedTab.newsId ? `&newsTopic=${selectedTab.topics}` : `?newsTopic=${selectedTab.topics}`;
    }

    console.log(apiUrl);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setNews(data))
      .catch((error) => console.error("Error fetching news:", error));
  };

  return (
    <div className="news-container">

      {/* Tab navigation */}
      <nav className="nav-pills-container">
        <ul className="nav-pills-list">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                className={`nav-pill ${activeTab === tab.title ? "active" : ""}`}
                onClick={() => setActiveTab(tab.title)}
                aria-label={`Switch to ${tab.title}`}
              >
                {tab.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* News Display */}
      <div className="news-content">
      {news.length > 0 ? (
        news.map((item, index) => (
          <div
            key={index}
            className="news-item"
            onClick={() =>
              navigate("/teams/newsDetails", {
                state: { apiUrl: item.link }, // Pass the dynamic URL here
              })
            }
          >
            <img
              src={item.imageUrl || "https://via.placeholder.com/150?text=No+Image+Available"}
              alt={item.title || "No Image"}
              className="news-image"
            />
            <div className="news-details">
              <h2 className="news-title">{item.title}</h2>
              <p className="news-description">{item.description}</p>
              <small className="news-date">{item.date}</small>
            </div>
          </div>
        ))
      ) : (
        <p className="no-news">No news available for this category.</p>
      )}
    </div>
    </div>
  );
};

export default NewsCategory;
