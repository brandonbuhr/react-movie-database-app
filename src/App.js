import Nav from "./components/Nav";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieInfo from "./pages/MovieInfo";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
