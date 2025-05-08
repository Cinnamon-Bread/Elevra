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
        case 'UPDATE_HABIT':
            return {
                ...state,
                habits: state.habits.map(habit =>
                    habit._id === action.payload._id ? { ...habit, ...action.payload } : habit
                ),
            };
        case 'DELETE_HABIT':
            return{
                habits: state.habits.filter((w) => w._id !== action.payload._id)
            }
        case 'COMPLETE_HABIT':
            return{
                habits: state.habits.filter((w) => w._id !== action.payload._id)
            }
        case 'UPDATE_USER_XP':  // This will handle updating the user's XP and level
            return { 
                ...state, 
                user: { 
                    ...state.user, 
                    xp: action.payload.xp, 
                    level: action.payload.level 
                }
            };
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