import mongoose, { Schema } from 'mongoose'

const bookingSchema = new mongoose.Schema({
    bookedBy: {
        type: Schema.Types.ObjectId,
        ref : "User"
    },
    bookingName: {
        type: String,
        required: true,
        min: 5,
        max: 26,
    },
    bookedVehicle: {
        type: Schema.Types.ObjectId,
        ref: "Vehicle",
    },
    contact: {
        type: Number,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    dlNo: {
        type: String,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    pickUpDT: {
        type: String,
        required: true,
    },
    pickUpDT: {
        type: String,
        required: true,
    },
    booked: {
        type: Boolean,
        default: false
    },
    pickUpLcation: {
        type: String,
        required: true,
    },
    bookingId: {  //razorpay order id
        type: String,
        required: true,
    },
    paymentSignature: {
        type: String,
        // required: true,
    },
    paymentId: {   //razorpay payment id
        type: String, 
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending",
    },
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Completed", "Canceled"],
        default: "Pending",
    }
},{timestamps: true})

export const Booking = mongoose.model("Booking", bookingSchema);