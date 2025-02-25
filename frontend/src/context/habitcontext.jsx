import { createContext, useReducer } from "react";

export const habitContext = createContext()

import React from 'react'

export const habitcontext = (state, action) => {
    switch(action.type) {
        case ' SET_HABITS':
            return{
                habits : action.payload
            }
        case 'CREATE_HABITS':
            return {
                habits: [action.payload, ...state.habits]
            }
        default:
            return state
    }
}


export const HabitContextProvider = ({children}) => {
    const [ state, dispatch] = useReducer(habitsReducer,
         {habits: null}
    )

    
    return(
        <HabitContextProvider value={{state, dispatch}}>
            { children }
        </HabitContextProvider>
    )
}