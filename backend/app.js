require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 4000
const workoutsRouter = require('./routes/workouts')
const userRoutes = require('./routes/user')

const { default: mongoose } = require('mongoose')



app.use('/api/user', userRoutes)
app.use('/api/workouts', workoutsRouter)
const start = async () => {
    try {
        // connection to DB
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(port, () => console.log(`Server is listening on port ${port}`))

    } catch (err) {
        console.log(err)
    }
}

start()