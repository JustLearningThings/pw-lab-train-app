export default class Exercise {
    constructor(name, img_url, muscle_group, sets, reps) {
        this.name = name || ""
        this.img_url = img_url || ""
        this.muscle_group = muscle_group || "full body"
        this.sets = sets || 0
        this.reps = reps || 0
    }    
}