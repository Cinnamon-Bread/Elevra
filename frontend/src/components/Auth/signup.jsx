import { useState } from "react";
import { useSignup } from "../../Hooks/useSignup";

const Signup = () => {
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()


    const handleSubmit = async (e) =>{
        e.preventDefault()

        await signup(username, email, password)

    }


    return (
       <form className="" onSubmit={handleSubmit}>
            <h3>Sign up</h3>


            <label>Username</label>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <label>Email:</label>
            <input
                type = "email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value = {email}
            />

            <label>Password:</label>
            <input
                type = "password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value = {password}
            />
            

            <button disabled = {isLoading}>Sign up</button>
            {error && <div>{error}</div>}
       </form> 
    )

}

export default Signup