import mongoose from "mongoose";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../model/user.model.js";
import { Contact } from "../model/contact.model.js";
import { Booking } from "../model/booking.model.js";
import { json } from "express";

const getAllUsers = AsyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    if (!users) {
      return res.status(404).json({ message: "User Not Found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

const getAllContacts = AsyncHandler(async (req, res) => {
  try {
    const contactData = await Contact.find({});

    if (!contactData) {
      return res.status(400).json({ message: "Contacts Not Found" });
    }

    return res.status(200).json(contactData);
  } catch (error) {
    next(error);
  }
});

const deleteuser = AsyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

const getUserById = AsyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "Something Went Wrong" });
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

const editUserById = AsyncHandler(async (req, res) => {
  try {
    const { userName, phone } = req.body;

    const userId = req.params.userId;

    const editUser = await User.findByIdAndUpdate(
      { _id: userId },
      {
        $set: {
          userName,
          phone,
        },
      },
      { new: true, upsert: false, runValidators: true }
    );

    if (!editUser) {
      return res.status(400).json({ message: "Something went wrong" });
    }

    return res.status(200).json({ message: "User Update Succesfully" });
  } catch (error) {
    next(error);
  }
});

const deleteContact = AsyncHandler(async (req, res) => {
  try {
    const contactId = req.params.id;

    await Contact.findByIdAndDelete(contactId);

    return res.status(200).json({ message: "Contact Deleted" });
  } catch (error) {
    next(error);
  }
});

const getAllBooking = AsyncHandler(async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate(
      "bookedVehicle",
      "vehicleModel"
    );

    if (!bookings) {
      return res.status(400).json({ message: "Bookings Not Found" });
    }

    return res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
});

const bookingStatusUpdate = AsyncHandler(async (req, res) => {
  try {
    const { bookingStatus } = req.body;
    const { bookingId } = req.params;

    const updateStatus = await Booking.findByIdAndUpdate(
      { _id: bookingId },
      {
        $set: {
          status: bookingStatus,
        },
      },
      { new: true, upsert: false, runValidators: true }
    );

    if(!updateStatus){
        return res.status(400).json({message: "Booking not Found"})
    }
  
    return res.status(200).json({message: "Status Updated"});
  } catch (error) {
    console.error(error);
    return res.status(500).json({message:"Error from backend"});
  }
});

export {
  getAllUsers,
  getAllContacts,
  deleteuser,
  getUserById,
  editUserById,
  deleteContact,
  getAllBooking,
  bookingStatusUpdate,
};
