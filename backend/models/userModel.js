const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 15
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: "",
    },
    elo: {
        type: Number,
        default : 0
    },
    level: {
        type: Number,
        default: 1
    },
    xp: {
        type: Number,
        default: 0
    }

},
{ timestamps: true }

)

// static signup method
userSchema.statics.signup = async function(username, email, password) {
    //validation
    if(!email || !password || !username) {
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)) {
        throw Error('Email is not vaild')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('password not strong enough')
    }


    const exists = await this.findOne({ email })
    const usernameTaken = await this.findOne({ username })

    if (exists) {
        throw Error('Email already in use')
    }
    if (usernameTaken) {
        throw Error("Username already taken");
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({username, email, password: hash})

    return user

}

//static login method
userSchema.statics.login = async function(email, password ){

    if(!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({email})

    if (!user){
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match){
        throw Error('Incorrect Password')
    }

    return user

}

module.exports = mongoose.model('User', userSchema)