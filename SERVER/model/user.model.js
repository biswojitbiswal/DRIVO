import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

}, {timestamps: true})


userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPassswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            isAdmin: this.isAdmin
        },
        process.env.ACCESSTOKEN_SECRET_KEY,
        {
            expiresIn: process.env.ACCESSTOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);