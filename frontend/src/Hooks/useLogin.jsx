import {useState} from 'react'
import  useAuthContext  from "../Hooks/useAuthContext";
import  {jwtDecode} from "jwt-decode";


export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch ('/api/user/login', {
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            const decoded = jwtDecode(json.token);

                const user = {
                ...decoded,        // includes _id, email, level, xp, etc.
                token: json.token,
            };
            localStorage.setItem('user', JSON.stringify(user))

            dispatch({type: 'LOGIN', payload: user})

            setIsLoading(false)
        }

    }

    return {login, isLoading, error}
}