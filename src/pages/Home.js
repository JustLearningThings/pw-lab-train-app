import React, { useEffect, useState } from "react";
import Workout from "../models/Workout";
import WorkoutCard from "../components/Workout"; 
import NewWorkoutModal from "../components/NewWorkoutModal"; 

export default function Home() {
  const [workouts, setWorkouts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);  

  async function fetchWorkouts() {
    try {
      const response = await fetch('http://localhost:8000/workouts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${accessToken}`
        }
      })
  
      if (!response.ok)
        throw new Error('Failed to fetch workouts')
  
      console.log(response)
      const data = await response.json()
      setWorkouts(data)
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchWorkouts()
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
    <div id="home" className="flex flex-col items-center">
      <button
        onClick={handleCreateWorkout}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Create New Workout
      </button>
      {workouts.map(w => (
        <WorkoutCard workout={w} key={w.id} />
      ))}
      <NewWorkoutModal isOpen={isModalOpen} onClose={handleCloseModal} onAddWorkout={handleAddWorkout} />
    </div>
  );
}
