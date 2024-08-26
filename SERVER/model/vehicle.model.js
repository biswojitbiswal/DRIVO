import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    vehicleModel: {
        type: String,
        required: true,
    },
    seats: {
        type: Number,
        required: true,
        min: 4,
        max: 10
    },
    price : {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    fuel: {
        type: String,
        enum: ["Petrol", "Diesel", "CNG"],
        required: true,
    },
    vehicleType: {
        type: String,
        enum: ["Manual", "Automatic"],
        required: true,
    }
}, {timestamps: true})

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);