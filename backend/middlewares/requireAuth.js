const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ error: 'You Are Not Authenticated' })
    }
    const token = authorization.split(' ')[1]
    try {
        const decode = jwt.verify(token, process.env.TOKEN_KEY)
        if (!decode) throw new Error('You Are Not Authenticated')
        const { _id } = decode
        const user = await User.findById(_id).select('_id')
        if (!user) {
            throw new Error('User Does Not Exist')
        }
        req.user = user
        next()
    } catch (err) {
        res.status(401).json({ error: err.message })
    }
}

module.exports = requireAuth