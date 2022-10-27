const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
})


userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw new Error('All Fiels Must Be Filled')
    }
    const user = await this.findOne({ email })

    if (!user) {
        throw new Error('User Does Not Exist')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw new Error('Wrong Password')
    }

    return user
}

userSchema.statics.signup = async function (name, email, password) {

    //! Validation of the email and password
    if (!name || !email || !password) {
        throw new Error('All Fiels Must Be Filled')
    }
    if (!validator.isEmail(email)) {
        throw new Error('Email Is Not Valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error('Password Is Not Strong Enough')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw new Error("Email Already exists")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)

    const user = await this.create({ name, email, password: hashedPass })

    return user
}


module.exports = mongoose.model('user', userSchema)