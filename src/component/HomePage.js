import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const HomePage = () => {

  const navigate = useNavigate();  // To handle navigation

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Cric Wave</h1>
          <br/>

          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
            <a href="/cricket-news/newstype" className="button">News</a>
            <a href="/all-topics/" className="button">Latest Topics</a>
            <a href="/live-cricket-scores/" className="button">Live Score</a>
            <a href="/teams" className="button">Teams</a>
            </div>
        
        </div>
      </header>

      
    </div>
  );
};

export default HomePage;