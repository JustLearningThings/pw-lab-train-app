import React, { useEffect, useState } from "react";
import Workout from "../models/Workout";
import WorkoutCard from "../components/Workout"; 
import NewWorkoutModal from "../components/NewWorkoutModal"; 

export default function Home() {
  const [workouts, setWorkouts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);  

  async function fetchWorkouts() {
    try {
      const token = localStorage.getItem('access_token')
      const response = await fetch('http://localhost:8000/workouts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
  
      if (!response.ok)
        throw new Error('Failed to fetch workouts')
  
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

  const loggedIn = !localStorage.getItem('access_token') && !workouts

  return (
    <div id="home" className="flex flex-col items-center">
      {loggedIn ? '' : 'You should log in first...'}
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
