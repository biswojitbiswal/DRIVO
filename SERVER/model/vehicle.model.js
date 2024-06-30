import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    vehicleModel: {
        type: String,
        required: true,
    },
    seats: {
        type: Number,
        required: true,
    },
    price : {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    oil: {
        type: String,
        enum: ["Petrol", "Diesel", "CNG", "EV"],
        required: true
    },
    vehicleType: {
        type: String,
        enum: ["Manual", "Automatic"],
        required: true,
    }
}, {timestamps: true})

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);