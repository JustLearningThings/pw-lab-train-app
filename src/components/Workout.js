import React, { useState } from "react";
import { useTheme } from "./ThemeContext";

export default function WorkoutCard({ workout }) {
    const [currentWorkout, setCurrentWorkout] = useState(workout);
    const { darkMode } = useTheme();
    const accessToken = localStorage.getItem("access_token")

    const handleIncrementWorkoutDone = async () => {
      const response = await fetch(`http://localhost:8000/workouts/${currentWorkout.id}/increment/`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
          },
      });

      if (response.ok) {
          const updatedWorkout = { ...currentWorkout,
              num_done: currentWorkout.num_done + 1,
              completed: currentWorkout.num_done + 1 === currentWorkout.num_done_goal ? true : false };
          setCurrentWorkout(updatedWorkout);
      } else {
          console.error('Failed to submit workout done');
      }
  };

    const borderStyle = currentWorkout.num_done >= currentWorkout.num_done_goal ? '3px solid green' : '2px solid black'
    const cardStyle = {
        backgroundColor: darkMode ? '#1f2937' : '#ffffff',
        color: darkMode ? '#ffffff' : '#000000',
        border: borderStyle
      };
  
    return (
        <div className="container mx-auto my-4 max-w-md">
            <div className={`rounded-lg shadow-lg p-6 ${darkMode ? 'text-white' : 'text-black'}`} style={{ cardStyle, border: borderStyle }}>
                <h2 className="text-xl font-bold">{currentWorkout.name}</h2>            
                <p>Created at: {new Date(currentWorkout.created_at).toLocaleDateString()}</p>
                <p>Number done: {currentWorkout.num_done}</p>
                <p>Number done goal: {currentWorkout.num_done_goal}</p>
                <h3 className="text-lg font-semibold mt-4 mb-2">Exercises:</h3>                
                <div className="mb-4">
                {currentWorkout.exercises.map((exercise, index) => (
                    <div key={index} className="mb-2">
                    <span className="font-semibold">{exercise.name}</span> -{" "}
                    <span className="text-gray-600">{exercise.muscle_group}</span>
                    </div>
                ))}
                </div>
                <button onClick={handleIncrementWorkoutDone} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md">
                    Submit a completed workout
                </button>
            </div>
        </div>
      );
  }