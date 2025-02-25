import { habitContext } from "../context/habitcontext";
import { useContext } from "react";

export const useHabitContext = () => {
    const context = useContext(HabitContext)

    if(!context) {
        throw Error('Use Habit context must be used inside an HabitContextProvider')
    }


    return context
}