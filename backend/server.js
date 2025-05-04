require('dotenv').config()
const express = require('express')
const HabitRoutes = require('./routes/habitsRoutes')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const genRoutes = require('./routes/genroutes')
// express app
const app = express()

// middleware
app.use(express.json())



app.use((req , res, next) =>{
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/habits',HabitRoutes)
app.use('/api/user', userRoutes)
app.use('/api/', genRoutes )
app.use('/api/', genRoutes)  
app.use('/uploads', express.static('uploads'));


//connet ot db
mongoose.connect(process.env.MONG_URI)
    .then(() =>{
    //listen for requests
    app.listen(process.env.PORT, () =>{
        console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

