const express = require('express')
const { getAllWorkouts, getWorkout, deleteWorkout, createWorkout, updateWorkout } = require('../controllers/workouts')
const requireAuth = require('../middlewares/requireAuth')

const router = express.Router()

//! authorization middleware
router.use(requireAuth)

//* Routes
router.get('/', getAllWorkouts)
router.get('/:id', getWorkout)
router.post('/', createWorkout)
router.patch('/:id', updateWorkout)
router.delete('/:id', deleteWorkout)

module.exports = router