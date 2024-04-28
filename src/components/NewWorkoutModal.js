import React, { useEffect, useState } from "react";
import Workout from "../models/Workout";

export default function NewWorkoutModal({ isOpen, onClose, onAddWorkout }) {
    const [name, setName] = useState("");
    const [numDoneGoal, setNumDoneGoal] = useState(0);
  
    const handleSubmit = (e) => {
      e.preventDefault();

      const newWorkout = new Workout(name, [], Date.now(), 0, numDoneGoal);
      const serializedWorkout = JSON.stringify(newWorkout)
      let localStoragePath = "workout." + name
      localStoragePath = localStoragePath.toLowerCase()

      localStorage.setItem(localStoragePath, serializedWorkout)
      
      setName("");
      setNumDoneGoal(0);
      onAddWorkout(newWorkout);
    //   onClose();
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