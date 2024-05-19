import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for the theme
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // Effect to save theme preference in local storage
  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Styles for light and dark themes
  const theme = {
    background: darkMode ? '#1f2937' : '#ffffff',
    color: darkMode ? '#ffffff' : '#000000',
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <div style={{ background: theme.background }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
