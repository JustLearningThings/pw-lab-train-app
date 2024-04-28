import React, { useState } from "react";

export default function WorkoutCard({ workout }) {
    const [currentWorkout, setCurrentWorkout] = useState(workout);
  
    const handleIncrementWorkoutDone = () => {
      const updatedWorkout = { ...currentWorkout, num_done: currentWorkout.num_done + 1 };
      
      // update in local storage
      let workoutKey = 'workout.' + updatedWorkout.name
      workoutKey = workoutKey.toLowerCase()
      console.log(workoutKey)
      console.log(updatedWorkout.name)
      let storedWorkout = JSON.parse(localStorage.getItem(workoutKey));

      if (storedWorkout) {
        storedWorkout.num_done++
        setCurrentWorkout(updatedWorkout);
        localStorage.setItem(workoutKey, JSON.stringify(storedWorkout))
      }
      else
        console.warn(workoutKey + ' not found.')
    };
  
    return (
      <div className="container mx-auto my-4 max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold">{currentWorkout.name}</h2>
          <p>Exercises: {currentWorkout.exercises.length}</p>
          <p>Created at: {new Date(currentWorkout.created_at).toLocaleDateString()}</p>
          <p>Number done: {currentWorkout.num_done}</p>
          <p>Number done goal: {currentWorkout.num_done_goal}</p>
          {/* <p>Completed: {currentWorkout.isCompleted() ? 'Yes' : 'No'}</p> */}
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
            onClick={handleIncrementWorkoutDone}
          >
            Submit a completed workout
          </button>
        </div>
      </div>
    );
  }