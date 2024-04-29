import React, { useState } from "react";

export default function WorkoutCard({ workout }) {
    const [currentWorkout, setCurrentWorkout] = useState(workout);
  
    const handleIncrementWorkoutDone = () => {
      const updatedWorkout = { ...currentWorkout, num_done: currentWorkout.num_done + 1 };
      
      // update in local storage
      let workoutKey = 'workout.' + updatedWorkout.name
      workoutKey = workoutKey.toLowerCase()
      let storedWorkout = JSON.parse(localStorage.getItem(workoutKey));
        
      if (storedWorkout) {
        setCurrentWorkout({ ...updatedWorkout });
        localStorage.setItem(workoutKey, JSON.stringify(updatedWorkout))
      }
      else
        console.warn(workoutKey + ' not found.')
    };

    const borderStyle = currentWorkout.num_done >= currentWorkout.num_done_goal ? '3px solid green' : '2px solid black' 
  
    return (
        <div className="container mx-auto my-4 max-w-md">
            <div className="bg-white rounded-lg shadow-lg p-6" style={{ border: borderStyle }}>
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