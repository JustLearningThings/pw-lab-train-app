export default class Workout {
    constructor(name, exercises, created_at, num_done, num_done_goal)
    {
        this.name = name || ""
        this.exercises = exercises || []
        this.created_at = created_at || new Date().toISOString()
        this.num_done = num_done || 0
        this.num_done_goal = num_done_goal || 0

        this.completed = false // goal reached or not
    }

    isCompleted = () => this.num_done >= this.num_done_goal
    submitWorkout = () => this.num_done++
    addExercise = exercise => this.exercises.push(exercise)
    removeExercise = exercise => this.exercises = this.exercises.filter(x => x != exercise)
}

export class WorkoutCreate {
    constructor(name, exercises, num_done, num_done_goal)
    {
        this.name = name || ""
        this.exercises = exercises || []
        this.num_done = num_done || 0
        this.num_done_goal = num_done_goal || 0
        this.user_id = -1
        this.completed = false 
    }
}