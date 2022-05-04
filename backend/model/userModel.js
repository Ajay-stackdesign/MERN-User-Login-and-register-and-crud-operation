const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter the name"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please enter the Valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please enter the Password"],
        maxlength: [8, "password should be more than 8 character"],
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}


module.exports = new mongoose.model("User", userSchema)