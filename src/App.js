import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TeamPhotos from './component/team/TeamPhotos';
import TeamNews from './component/team/TeamNews';
import TeamResult from './component/team/TeamResult';
import TeamScedule from './component/team/TeamScedule';
import TeamPlayer from './component/team/TeamPlayer';
import TeamPlayerDetails from './component/team/TeamPlayerDetails';
import TeamNewsDetails from './component/team/TeamNewsDetails';
import LiveMatchList from './component/LiveMatchList';
import HomePage from './component/HomePage';
import TeamCategory from './component/team/TeamCategory';
import NewsCategory from './component/NewsCategory';
import MatchDetails from './component/MatchDetails';
import AllTopics from './component/AllTopics';
import Header from './UI/Header';

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Add Header here */}
        <Routes>
          <Route path="/teamcategory" element={<TeamCategory />} />
          <Route path="/" element={<HomePage />} />

          {/* <Route path="/teams/:teamType" element={<Team />} />
          <Route path="/teams" element={<Team />} /> */}
          <Route path="/teams/news" element={<TeamNews />} />
          <Route path="/teams/newsDetails" element={<TeamNewsDetails />} />
          <Route path="/teams/player" element={<TeamPlayer />} />
          <Route path="/teams/photos" element={<TeamPhotos />} />
          <Route path="/teams/schedule" element={<TeamScedule />} />
          <Route path="/teams/result" element={<TeamResult />} />
          <Route path="/teams/player/profile" element={<TeamPlayerDetails />} />
          <Route path="/cricket-news/newstype" element={<NewsCategory />} />
          <Route path="/live-cricket-scores" element={<LiveMatchList />} />
          <Route path="/live-cricket-scores/:matchId/:matchName" element={<MatchDetails />} />
          <Route path="/cricket-scores/:matchId/:matchName" element={<MatchDetails />} />

          <Route path="/all-topics" element={<AllTopics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
