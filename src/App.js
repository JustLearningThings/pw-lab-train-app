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
import ExercisePage from "./pages/Exercises";
import { ThemeProvider } from "./components/ThemeContext";

function App() {
  SeedWithDefaultExercises()

  return (
    <ThemeProvider>
      <Router>
        <Header />

        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/exercises" element={<ExercisePage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
