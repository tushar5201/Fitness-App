import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        category: {
            type: String,
        },
        workoutName: {
            type: String,
        },
        sets: {
            type: String,
        },
        reps: {
            type: String,
        },
        weight: {
            type: String,
        },
        duration: {
            type: String,
        },
        date: {
            type: String,
        },
    },
    { timestamps: true }
);
const Workout = mongoose.model('Workout', WorkoutSchema);

export default Workout;
