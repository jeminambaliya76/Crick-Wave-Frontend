import React, { useEffect, useState } from 'react';
import './NewsCategory.css';

function NewsCategory() {
    


    return (
        <div className="home-container">
          <h1 className="text-3xl font-bold mb-6 text-center">Cric Wave</h1>
    
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
            <a href="all/" className="button">All Stories</a>
            <a href="editorial/cb-plus" className="button">Premium Editorials</a>
            <a href="latest-news" className="button">News</a>
            <a href="info/" className="button">Topics</a>
            <a href="editorial/spotlight" className="button">Spotlight</a>
            <a href="editorial/editorial-list" className="button">Opinions</a>
            <a href="editorial/specials" className="button">Special</a>
            <a href="editorial/stats-analysis" className="button">Stats</a>
            <a href="editorial/interviews" className="button">Interviews</a>
            <a href="editorial/live-blogs" className="button">Live Blogs</a>
          </div>
        </div>
      );
}

export default NewsCategory;
