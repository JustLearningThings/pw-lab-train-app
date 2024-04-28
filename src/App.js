import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './App.css';

import Home from './pages/Home'
import Analytics from './pages/Analytics'
import About from './pages/About'
import Header from "./components/Header";
import { SeedWithDefaultExercises } from "./models/Exercise";

function App() {
  SeedWithDefaultExercises()

  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
