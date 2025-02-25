const mongoose = require('mongoose')

const Schema = mongoose.Schema

const habitSchema = new Schema({
    title: {
        type : String,
        required : true
    },
    quantity: {
        type:Number,
        required : true
    },
    xp: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('habit', habitSchema)

