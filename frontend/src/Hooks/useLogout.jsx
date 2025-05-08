import  useAuthContext  from "./useAuthContext"
import { useHabitContext } from "./useHabitsContext"

const useLogout = () => {
    const {dispatch} = useAuthContext()
    const {dispatch : habitDispatch} = useHabitContext()


    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')

        dispatch({type: 'LOGOUT'})
        habitDispatch({type : 'SET_HABITS', payload: null})
    }

    return {logout}


}

export default useLogout