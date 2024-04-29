import React, { useState, useEffect } from 'react';
import Exercise from '../models/Exercise';
import "../assets/css/exercises.css";

export default function ExercisePage() {
    const [exercises, setExercises] = useState([]);
    const [newExerciseName, setNewExerciseName] = useState('');
    const [newExerciseMuscleGroup, setNewExerciseMuscleGroup] = useState('');
    const [newExerciseImageUrl, setNewExerciseImageUrl] = useState('');
    const [newExerciseImage, setNewExerciseImage] = useState(null);

    useEffect(() => {
        fetchExercises();
    }, []);

    const fetchExercises = () => {
        let storedExercises = []

        for(let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)

            if (key.startsWith("exercise.")) {
                storedExercises.push(JSON.parse(localStorage.getItem(key)))
            }
        }

        setExercises(storedExercises)
    };

    const handleAddExercise = () => {
        const newExercise = new Exercise(newExerciseName, newExerciseImageUrl, newExerciseMuscleGroup, 0, 0);
        const updatedExercises = [...exercises, newExercise];
        setExercises(updatedExercises);

        localStorage.setItem(('exercise.' + newExercise.name).toLowerCase(), JSON.stringify(newExercise));

        setNewExerciseName('');
        setNewExerciseMuscleGroup('');
        setNewExerciseImageUrl('');
    };

    const handleImageUrlChange = (e) => {
        setNewExerciseImageUrl(e.target.value);
    };

    return (
         <div className="exercise-page">
            <h1>Exercise Page</h1>

            <h2>List of Exercises</h2>
            <div className="exercise-list">
                {exercises.map((exercise, index) => (
                    <div className="exercise-item" key={index}>
                        <img className="exercise-image" src={exercise.img_url} alt={exercise.name} />
                        <div className="exercise-details">
                            <h3>{exercise.name}</h3>
                            <p>Muscle Group: {exercise.muscle_group}</p>
                        </div>
                    </div>
                ))}
            </div>

            <h2>Add New Exercise</h2>
            <div className="add-exercise-form">
                <label>
                    Exercise Name:
                    <input type="text" value={newExerciseName} onChange={(e) => setNewExerciseName(e.target.value)} />
                </label>
                <label>
                    Muscle Group:
                    <input type="text" value={newExerciseMuscleGroup} onChange={(e) => setNewExerciseMuscleGroup(e.target.value)} />
                </label>
                <label>
                    Exercise Image URL:
                    <input type="text" value={newExerciseImageUrl} onChange={handleImageUrlChange} />
                </label>
                <button onClick={handleAddExercise}>Add Exercise</button>
            </div>
        </div>
    );
}
