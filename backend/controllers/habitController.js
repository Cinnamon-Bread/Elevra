const express = require('express')
const Habit = require('../models/habitsModel')
const mongoose = require('mongoose')
const User = require('../models/userModel')

//get all workouts
const getHabits = async(req, res) => {
    const user_id = req.user._id
    const habits = await Habit.find({ user_id }).sort({createdAt: -1})


    res.status(200).json(habits)
}

//get a single workout
const getHabit = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No Such Habit"})
    }

    const habit = await Habit.findById(id)

    if(!habit){
        return res.status(404).json({error : 'no such workout'})
    }

    res.status(200).json(habit)
}


//create a workout
const createHabit = async(req, res) =>{
    const {title, quantity, xp} = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!quantity) {
        emptyFields.push('quantity')
    }
    if(!xp){
        emptyFields.push('xp')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all fields', emptyFields})
    }


    try{
        const user_id = req.user._id
        const habit =  await Habit.create({title, quantity, xp, user_id})
        res.status(200).json(habit)
    }catch(error){
        res.status(400).json({error: error.message})
    }
    
}

//delete a habit
const deleteHabit = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No Such Habit"})
    }

    const habit = await Habit.findOneAndDelete({_id: id})

    if(!habit) {
        return res.status(404).json({error : 'no such habit'})
    }

    res.status(200).json(habit)
}

//update a habit
const updateHabit = async(req, res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No Such Habit"})
    }

    const habit = await Habit.findOneAndUpdate({_id : id}, {
        ...req.body
    })

    if(!habit) {
        return res.status(404).json({error : 'no such habit'})
    }

    res.status(200).json(habit)

}

const xpForNextLevel = (level) => 100 * level

const completeHabit = async (req, res) => {
    try {
        const { habitId } = req.params
        const userId = req.user._id

        const habit = await Habit.findById(habitId)
        if (!habit || habit.user_id !== userId.toString()) {
            return res.status(404).json({ error: 'Habit not found or not authorized' })
        }

        const user = await User.findById(userId)
        if (!user) return res.status(404).json({ error: 'User not found' })

        // Add XP from the habit
        user.xp += habit.xp

        // Level up logic
        while (user.xp >= xpForNextLevel(user.level)) {
            user.xp -= xpForNextLevel(user.level)
            user.level += 1
            // 🎉 TODO: trigger reward system here
        }

        await user.save()
        res.status(200).json({ message: 'Habit completed', level: user.level, xp: user.xp })

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = {
    completeHabit,
    createHabit,
    getHabits,
    getHabit,
    deleteHabit,
    updateHabit
}