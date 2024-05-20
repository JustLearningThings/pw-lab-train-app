export default class Exercise {
    constructor(name, img_url, muscle_group, sets, reps) {
        this.name = name || ""
        this.img_url = img_url || ""
        this.muscle_group = muscle_group || "full body"
        this.sets = sets || 0
        this.reps = reps || 0
    }    
}

export class ExerciseCreate {
    constructor(name, img_url, muscle_group, sets, reps, workout_id) {
        this.name = name || ""
        this.img_url = img_url || ""
        this.muscle_group = muscle_group || "full body"
        this.sets = sets || 0
        this.reps = reps || 0
        this.workout_id = workout_id || -1
    }    
}

export const SeedWithDefaultExercises = () => {
    const exercises = [
        new Exercise("Deadlift",
                    "https://weighttraining.guide/wp-content/uploads/2016/05/Barbell-Deadlift-1.png"),
        new Exercise("Pull ups",
                    "https://weighttraining.guide/wp-content/uploads/2016/10/pull-up-2-resized.png",
                    "Back"),
        new Exercise("Romanian deadlifts",
                    "https://www.hertssportsvillage.co.uk/news-images/2022-Nov/rdl--4995.jpg",
                    "legs")
    ]

    exercises.forEach(x => {
        localStorage.setItem(("exercise." + x.name).toLowerCase(), JSON.stringify(x))
    });
}

export const fetchExercises = () => {
    let exercises = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key.startsWith("exercise.")) {
            exercises.push(JSON.parse(localStorage.getItem(key)));
        }
    }

    return exercises;
};