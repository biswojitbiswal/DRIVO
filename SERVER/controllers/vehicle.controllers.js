import { AsyncHandler } from "../utils/AsyncHandler.js";
import {Vehicle} from '../model/vehicle.model.js'
import { uploadFileOnCloudinary } from "../utils/cloudinary.js";



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
        console.log(error);
        return res.status(500).json({message: "Internal Backend Error"})
    }
})



export {
    addVehicle,
}