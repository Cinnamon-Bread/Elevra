const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (user) => {
    return jwt.sign({
        _id: user._id,
        username: user.username,
        email: user.email,
        level: user.level,
        xp: user.xp,}, 
        process.env.SECRET,{expiresIn: '3d'} )
}


//login user
const loginUser = async (req, res) => {
    const{email, password} = req.body

    try{
        const user = await User.login(email, password)

        const token = createToken(user)
        res.status(200).json({
            email: user.email,
            username: user.username,
            token,
            _id: user._id,
            level: user.level,
            xp: user.xp
        });
    } catch (error){
        res.status(400).json({error: error.message})
    }

}

//signup user

const signupUser = async (req, res) => {
    const {username, email, password} = req.body

    try{
        const user = await User.signup(username, email, password)

        const token = createToken(user)

        res.status(200).json({
            username: user.username,
            email: user.email,
            token,
            _id: user._id,
            level: user.level,
            xp: user.xp
        });
    } catch (error){
        res.status(400).json({error: error.message})
    }

}

module.exports = {signupUser, loginUser}