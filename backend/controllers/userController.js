const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.TOKEN_KEY, { expiresIn: '3d' })
}

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({ name: user.name, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const signup = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const user = await User.signup(name, email, password)
        const token = createToken(user._id)
        return res.status(200).json({ name: user.name, token: token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = {
    login, signup
}