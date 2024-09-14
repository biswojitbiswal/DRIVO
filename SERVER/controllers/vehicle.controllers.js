import { AsyncHandler } from "../utils/AsyncHandler.js";
import { Vehicle } from "../model/vehicle.model.js";
import { uploadFileOnCloudinary } from "../utils/cloudinary.js";
import { Booking } from "../model/booking.model.js";
import mongoose from "mongoose";
import Razorpay from "razorpay";
import crypto from "crypto";

const addVehicle = AsyncHandler(async (req, res) => {
  try {
    const { vehicleModel, seats, price, fuel, vehicleType } = req.body;

    const vehicleImageFile = req.files?.image[0]?.path;

    if (!vehicleImageFile) {
      return res.status(400).json({ message: "Image File Is Required" });
    }

    const vehicleImage = await uploadFileOnCloudinary(vehicleImageFile);

    if (!vehicleImage) {
      return res.status(400).json({ message: "Image File Is Required" });
    }

    const vehicle = await Vehicle.create({
      vehicleModel,
      seats,
      price,
      fuel,
      vehicleType,
      image: vehicleImage.url,
    });

    const addedVehicle = await Vehicle.findById(vehicle._id);

    if (!addedVehicle) {
      return res
        .status(400)
        .json({ message: "Something Wrong While Adding The Vahicle" });
    }

    return res.status(200).json({
      message: "Vehicle Added Successfully!",
      vehicle: addedVehicle,
      vehicleId: addedVehicle._id.toString(),
    });
  } catch (error) {
    next(error);
  }
});

const getAllVehicle = AsyncHandler(async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});

    if (!vehicles) {
      return res.status(404).json({ message: "Vehicles Not Found" });
    }

    return res.status(200).json(vehicles);
  } catch (error) {
    next(error);
  }
});

const getVehicle = AsyncHandler(async (req, res) => {
  try {
    const { vehicleId } = req.params;
    // console.log(vehicleId)
    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle Not Found" });
    }

    return res.status(200).json(vehicle);
  } catch (error) {
    next(error);
  }
});

function isValid_License_Number(license_Number) {
  let regex = /^[A-Z]{2}[0-9]{2}[- ]?(19|20)\d{2}[0-9]{7}$/;
  
  return regex.test(license_Number); //DL12-20201234567, MH02 19991234567, KA05 20211234567
}

const razorpayPaymentInstances = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const newBooking = AsyncHandler(async (req, res) => {
  try {
    const {
      bookingName, dob, contact, dlNo, totalAmount, pickUpDT, dropUpDT, pickUpLcation} = req.body;

    const vehicleId = req.params.vehicleId;

    const validDlNo = isValid_License_Number(dlNo);

    if (!validDlNo) {
      return res.status(400).json({ message: "Not a Valid DL No" });
    }

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `receipt_${new Date().getTime()}`,
      payment_capture: 1
    };

    const order = await razorpayPaymentInstances.orders.create(options);

    if (!order) {
      return res.status(500).json({ message: "Could Not Create Order" });
    }

    const booking = await Booking.create({
      bookingName,
      contact,
      dob,
      dlNo,
      totalAmount,
      pickUpDT,
      dropUpDT,
      pickUpLcation,
      bookingId: order.id,
    });

    if (!booking) {
      return res.status(400).json({ message: "Something Went Wrong" });
    }

    let userid = new mongoose.Types.ObjectId(req.userId);

    await Booking.updateOne(
      {
        _id: booking._id,
      },
      {
        $set: {
          bookedBy: userid,
          bookedVehicle: new mongoose.Types.ObjectId(vehicleId),
        },
      },
      { upsert: false, new: true }
    );

    return res.status(200).json({
      message: "Booked Successfully",
      id: order.id,
    });
  } catch (error) {
    next(error)
  }
});

const razorpayVerify = AsyncHandler(async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

   
    console.log(req.body);

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    const isAuthentic = expectedSign === razorpay_signature;

    if (isAuthentic) {
   
        const updatedBooking = await Booking.updateOne(
          { bookingId: razorpay_order_id }, 
          {
            $set: {
              paymentId: razorpay_payment_id,
              paymentSignature: razorpay_signature,
              paymentStatus: "Paid",
              booked: true,
            }
          }
        );
  
        if (updatedBooking.nModified === 0) {
          return res.status(400).json({
            success: false,
            message: "Booking not found or already updated",
          });
        }
  
        return res.status(200).json({
          success: true,
          message: "Booking Confirmed",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid payment signature",
        });
      }
  } catch (error) {
    next(error)
  }
});

const editVehicleInfo = AsyncHandler(async(req, res) => {
  try {
    const {price} = req.body;
    const vehicleId = req.params.vehicleId;

    let newImageUrl;
    if (req.files && req.files.image && req.files.image.length > 0) {
      const newImageFile = req.files.image[0].path;
      const newImage = await uploadFileOnCloudinary(newImageFile);
      newImageUrl = newImage.url;
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      {_id: vehicleId},
      {
        $set: {
          price,
          ...(newImageUrl && { image: newImageUrl })
        }
      },
      {new: true}

    )

    if(!updatedVehicle){
      return res.status(400).json({message: "Vehicle Not Found"});
    }

    return res.status(200).json({message: "Vehicle Information Updated"});
  } catch (error) {
    console.log(error);
    next(error)
  }
})


const deleteVehicle = AsyncHandler(async(req, res) => {
  try {
    const vehicleId = req.params.vehicleId;

    const deletedVehicle = await Vehicle.findByIdAndDelete(vehicleId);

    if(!deletedVehicle){
      return res.status(500).json({message: "Something Went Wrong"});
    }

    return res.status(200).json({message: "Vehicle Deleted Succesfully"})
  } catch (error) {
    next(error);
  }
})

export { 
    addVehicle,
    getAllVehicle,
    getVehicle, 
    newBooking, 
    razorpayVerify ,
    deleteVehicle,
    editVehicleInfo,
};
