import './App.css';
import Header from "./components/Header";
import SimpleBottomNavigation from "./components/BottomNav";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Container from '@mui/material/Container';
import Trending from './components/pages/Trending';
import Movies from './components/pages/Movies';
import Series from './components/pages/Series';
import Search from './components/pages/Search';

function App() {
  return (

    <Router>
      <Header />
      <div className="App">
        <Container>
          <Routes>
            <Route path="/" element={<Trending />} exact/>
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </Router>
    
  );
}

export default App;
