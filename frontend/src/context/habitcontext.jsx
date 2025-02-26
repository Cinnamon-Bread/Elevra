import { createContext, useReducer } from "react";

export const HabitContext = createContext()

import React from 'react'

export const habitsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_HABITS':
            return{
                habits : action.payload
            }
        case 'CREATE_HABIT':
            return {
                habits: [action.payload, ...state.habits]
            }
        case 'DELETE_HABIT':
            return{
                habits: state.habits.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}


export const HabitContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(habitsReducer,
         {habits: null}
    )

    
    return(
        <HabitContext.Provider value={{...state, dispatch}}>
            { children }
        </HabitContext.Provider>
    )
}