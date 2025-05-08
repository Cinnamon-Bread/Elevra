import { AuthContext } from "../context/authcontext";
import { useContext } from "react";

const useAuthContext = () => {
    const context = useContext(AuthContext)

    if(!context) {
        throw Error('Use Auth context must be used inside an AuthContextProvider')
    }


    return context
}

export default useAuthContext