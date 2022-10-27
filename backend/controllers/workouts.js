const mongoose = require('mongoose')
const Workout = require('../models/workouts.model')


const getAllWorkouts = async (req, res) => {

    const { _id: userId } = req.user
    const workouts = await Workout.find({ createdBy: userId }).sort({ createdAt: -1 })

    res.status(200).json(workouts)
}

const getWorkout = async (req, res) => {

    const { id: workoutId } = req.params
    const userId = req.userId

    if (!mongoose.Types.ObjectId.isValid(workoutId)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findOne({ _id: workoutId, createdBy: userId })

    if (!workout) {
        return res.status(404).json({ error: 'No such workout' })
    }

    res.status(200).json(workout)
}

const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body
    const { _id: userId } = req.user

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    // add doc to db
    try {
        const workout = await Workout.create({ title, load, reps, createdBy: userId })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteWorkout = async (req, res) => {
    const { id: workoutId } = req.params
    const { _id: userId } = req.user


    if (!mongoose.Types.ObjectId.isValid(workoutId)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findOneAndDelete({ _id: workoutId, createdBy: userId })

    if (!workout) {
        return res.status(400).json({ error: 'No such workout' })
    }

    res.status(200).json(workout)
}

const updateWorkout = async (req, res) => {
    const { id: workoutId } = req.params
    const { _id: userId } = req.user

    if (!mongoose.Types.ObjectId.isValid(workoutId)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findOneAndUpdate({ _id: workoutId, createdBy: userId }, {
        ...req.body
    })

    if (!workout) {
        return res.status(400).json({ error: 'No such workout' })
    }

    res.status(200).json(workout)
}


module.exports = {
    createWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout,
    getAllWorkouts,
    getWorkout
}