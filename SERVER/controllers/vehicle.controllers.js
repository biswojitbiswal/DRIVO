import { AsyncHandler } from "../utils/AsyncHandler.js";
import {Vehicle} from '../model/vehicle.model.js'
import { uploadFileOnCloudinary } from "../utils/cloudinary.js";
import {Booking} from "../model/booking.model.js"
import mongoose from "mongoose";



const addVehicle = AsyncHandler( async( req, res) => {
    try {
        const {vehicleModel, seats, price, fuel, vehicleType} = req.body;

        const vehicleImageFile = req.files?.image[0]?.path;

        if(!vehicleImageFile){
            return res.status(400).json({message: "Avatar File Is Required"})
        }

        const vehicleImage = await uploadFileOnCloudinary(vehicleImageFile);

        if(!vehicleImage){
            return res.status(400).json({message: "Avatar File Is Required"})
        }

        const vehicle = await Vehicle.create({
            vehicleModel,
            seats,
            price,
            fuel,
            vehicleType,
            image: vehicleImage.url,
        })

        const addedVehicle = await Vehicle.findById(vehicle._id);

        if(!addedVehicle){
            return res.status(400).json({message: "Something Wrong While Adding The Vahicle"})
        }

        return res.status(200).json({
            message: "Vehicle Added Successfully!",
            vehicle: addedVehicle,
            vehicleId: addedVehicle._id.toString()
        })

    } catch (error) {
        next(error);
    }
})

const getAllVehicle = AsyncHandler(async(req, res) => {
    try {
        const vehicles = await Vehicle.find({});

        if(!vehicles){
            return res.status(404).json({message: "Vehicles Not Found"});
        }

        return res.status(200).json(vehicles)
    } catch (error) {
        next(error);
    }
})

const getVehicle = AsyncHandler(async(req, res) => {
    try {
        const {vehicleId} = req.params;
        // console.log(vehicleId)
        const vehicle = await Vehicle.findById(vehicleId);
    
        if(!vehicle){
            return res.status(404).json({message: "Vehicle Not Found"});
        }
    
        return res.status(200).json(vehicle)
    } catch (error) {
        next(error);
    }
})


function checkLicencesNo(dlNo) {
    const dlPattern = /^[A-Z]{2}\d{2}\d{11}$/;
    return dlPattern.test(dlNo);
}
    


const newBooking = AsyncHandler(async (req, res) => {
    try {
        const { bookingName, contact, dob, dlNo, pickUpDT, dropUpDT, pickUpLcation } = req.body;
        const vehicleId = req.params.vehicleId;

        const validDlNo = checkLicencesNo(dlNo);

        if (!validDlNo) {
            return res.status(400).json({ message: "Not a Valid DL No" });
        }

        const vehicle = await Vehicle.findById(vehicleId);

        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        const pickUpDate = new Date(pickUpDT);
        const dropUpDate = new Date(dropUpDT);

        const durationInMs = dropUpDate - pickUpDate;
        const durationInHours = Math.ceil(durationInMs / (1000 * 60 * 60));

        let totalBookPrice = vehicle.price * (durationInHours / 24);

        if (durationInHours % 24 != 0) {
            totalBookPrice = vehicle.price * Math.ceil(durationInHours / 24);
        }

        if (isNaN(totalBookPrice)) {
            return res.status(400).json({ message: "Total booking price calculation failed" });
        }

        
        const booking = await Booking.create({
            bookingName,
            contact,
            dob,
            dlNo,
            totalAmount: totalBookPrice,
            pickUpDT,
            dropUpDT,
            pickUpLcation,
        });

        if (!booking) {
            return res.status(400).json({ message: "Something Went Wrong" });
        }

        let userid = new mongoose.Types.ObjectId(req.userId);

        await Booking.updateOne(
            {
                _id: booking._id
            },
            {
                $set: {
                    bookedBy: userid,
                    bookedVehicle: new mongoose.Types.ObjectId(vehicleId)
                }
            },
            { upsert: false, new: true }
        );

        return res.status(200).json({
            message: "Booked Successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error From Backend" });
    }
});




export {
    addVehicle,
    getAllVehicle,
    getVehicle,
    newBooking,
}
