import React, { useEffect, useState } from "react";
import Workout from "../models/Workout";
import WorkoutCard from "../components/Workout"; 
import NewWorkoutModal from "../components/NewWorkoutModal";
import '../assets/css/home.css' 

export default function Home() {
  const [workouts, setWorkouts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);

  function fetchWorkouts() {
    let workouts = []

    for(let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)

      if (key.startsWith("workout.")) {
        workouts.push(JSON.parse(localStorage.getItem(key)))
      }
    }

    return workouts
  }

  useEffect(() => {
    const fetchedWorkouts = fetchWorkouts()
    setWorkouts(fetchedWorkouts)
  }, [])

  const handleCreateWorkout = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddWorkout = newWorkout => {
    const updatedWorkouts = [...workouts, newWorkout]
    setWorkouts(updatedWorkouts)
    setIsModalOpen(false)
  }

  return (
    <div id="home" className="text-center">
            <div className="workout-card-container">
                {workouts.map(w => (
                    <WorkoutCard workout={w} key={w.name} />
                ))}
            </div>
            <button
                onClick={handleCreateWorkout}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 mx-auto block"
            >
                Create New Workout
            </button>
            <NewWorkoutModal isOpen={isModalOpen} onClose={handleCloseModal} onAddWorkout={handleAddWorkout} />
        </div>
  );
}
