import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div>
        <img className="headerimg" src="/images/headerbg.png" alt="Cricket Header" />
        <div className="overlay"></div>
        <div className="header-content">
          <h1 className="logo">CricWave</h1>
          <nav className="nav-links">


            <Link to="/live-cricket-scores">Home</Link>
            <Link to="/teamcategory">Teams</Link>
            <Link  to="/cricket-news/newstype">News</Link>
            <Link to="/all-topics">Trending Topics</Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;