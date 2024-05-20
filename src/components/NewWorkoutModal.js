import React, { useEffect, useState } from "react";
import Workout, { WorkoutCreate } from "../models/Workout";
import Exercise, { ExerciseCreate } from "../models/Exercise";
import { fetchExercises } from "../models/Exercise";

export default function NewWorkoutModal({ isOpen, onClose, onAddWorkout }) {
    const [name, setName] = useState("");
    const [numDoneGoal, setNumDoneGoal] = useState(0);
    const [exercises, setExercises] = useState([]);
    const [availableExercises, setAvailableExercises] = useState([]);
    const accessToken = localStorage.getItem("access_token")

    useEffect(() => {
        const fetchedExercises = fetchExercises();
        setAvailableExercises(fetchedExercises);
    }, []);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newWorkout = new WorkoutCreate(name, [], 0, numDoneGoal);
        console.log(newWorkout)

        try {
            let response = await fetch('http://localhost:8000/workouts/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(newWorkout)
            });
  
            if (!response.ok) {
                throw new Error('Failed to create workout');
            }
  
            let data = await response.json();
            const workoutId = data["id"]
            let exercisesToCreate = []

            if (workoutId) {
                exercises.forEach(exercise => {
                    let x = new ExerciseCreate(
                        exercise.name,
                        exercise.image_url,
                        exercise.muscle_group,
                        exercise.sets,
                        exercise.reps,
                        workoutId)
                    exercisesToCreate.push(x)
                });
                data["exercises"] = exercisesToCreate
                exercisesToCreate = { exercises: exercisesToCreate }

                await fetch(`http://localhost:8000/workouts/${workoutId}/exercises/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(exercisesToCreate)
            })
            }

            onAddWorkout(data);
            setName("");
            setNumDoneGoal(0);
            setExercises([]);
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddExercise = (exercise) => {
        setExercises([...exercises, exercise]);
    };
  
    return (
        isOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Create New Workout</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block mb-1">Name:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-4 py-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Number Done Goal:</label>
                            <input
                                type="number"
                                value={numDoneGoal}
                                onChange={(e) => setNumDoneGoal(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-4 py-2"
                            />
                        </div>
                        {/* Display available exercises as options */}
                        <select
                            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
                            onChange={(e) => handleAddExercise(JSON.parse(e.target.value))}
                        >
                            <option value="">Select an exercise</option>
                            {availableExercises.map((exercise, index) => (
                                <option key={index} value={JSON.stringify(exercise)}>{exercise.name}</option>
                            ))}
                        </select>
                        {/* Display selected exercises */}
                        <ul className="mb-4">
                            {exercises.map((exercise, index) => (
                                <li key={index}>{exercise.name}</li>
                            ))}
                        </ul>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Create
                        </button>
                    </form>
                    <button
                        onClick={onClose}
                        className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700"
                    >
                        X
                    </button>
                </div>
            </div>
        )
    );
  }