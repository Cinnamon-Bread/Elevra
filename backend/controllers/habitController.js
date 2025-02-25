const express = require('express')
const Habit = require('../models/habitsModel')
const mongoose = require('mongoose')

//get all workouts
const getHabits = async(req, res) => {
    const habits = await Habit.find({}).sort({createdAt: -1})

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

    try{
        const habit =  await Habit.create({title, quantity, xp})
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

module.exports = {
    createHabit,
    getHabits,
    getHabit,
    deleteHabit,
    updateHabit
}