const express = require('express')
const router = express.Router()
const Habit = require('../models/habitsModel')
const {
    createHabit,
    getHabits,
    getHabit,
    deleteHabit,
    updateHabit} = require('../controllers/habitController')
const requireAuth = require('../middleware/requireAuth')
//require auth
router.use(requireAuth)

router.get('/', getHabits)

router.get('/:id', getHabit)

router.post('/', createHabit)

router.delete('/:id', deleteHabit)

router.patch('/:id', updateHabit)



module.exports = router