const express = require('express')
const router = express.Router()
const Habit = require('../models/habitsModel')
const {
    completeHabit,
    createHabit,
    getHabits,
    getHabit,
    deleteHabit,
    updateHabit,
    getCompletedHabits
    } = require('../controllers/habitController')
const requireAuth = require('../middleware/requireAuth')
//require auth
router.use(requireAuth)

router.get('/', getHabits)

router.get('/completed/:userId', getCompletedHabits)

router.get('/:id', getHabit)

router.post('/', createHabit)

router.delete('/:id', deleteHabit)

router.patch('/:id', updateHabit)

router.post('/complete/:id', completeHabit)




module.exports = router