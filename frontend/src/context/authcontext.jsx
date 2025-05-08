import { createContext, useReducer, useEffect, useState } from "react";

const AuthContext = createContext()

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
            case 'UPDATE_USER':
            return {
                ...state,
                user: action.payload
            }
        case 'UPDATE_USER_XP':
            if (!action.payload || !action.payload.xp || !action.payload.level) {
                console.error("Invalid payload for UPDATE_USER_XP", action.payload);
                return state;
            }
            return {
                user: {
                    ...state.user,
                    xp: action.payload.xp,
                    level: action.payload.level,
                    token: action.payload.token || state.user.token
                }
            }
    }
}


const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })
    
    const [authIsReady, setAuthIsReady] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            dispatch ({type: 'LOGIN', payload: user})
        }
        setAuthIsReady(true);

    }, [])

    console.log('Authcontext State : ', state)

    return(
        <AuthContext.Provider value = {{...state, dispatch, authIsReady}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContextProvider, AuthContext, authReducer }