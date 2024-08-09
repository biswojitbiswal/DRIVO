import mongoose, { Schema } from 'mongoose'

export const contactSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
    },
    message : {
        type: String,
        required: true,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, {timestamps: true})

export const Contact = mongoose.model("Contact", contactSchema)