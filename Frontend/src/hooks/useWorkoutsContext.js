import { workoutContext } from "../context/WorkoutContext";
import { useContext } from "react";


export const useWorkoutsContext = () => {
    const context = useContext(workoutContext)

    if (!context) {
        throw new Error("useWorkoutsContext must be used inside of the WorkoutsContextProvider")
    }

    return context
}

