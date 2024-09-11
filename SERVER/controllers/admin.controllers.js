import mongoose from "mongoose";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../model/user.model.js";
import { Contact } from "../model/contact.model.js";

const getAllUsers = AsyncHandler(async(req, res) => {
    try {
        const users = await User.find({}).select("-password");
    
        if(!users){
            return res.status(404).json({message: "User Not Found"})
        }
    
        return res.status(200).json(users)
    } catch (error) {
        next(error)
    }
})

const getAllContacts = AsyncHandler(async(req, res) => {
    try {
        const contactData = await Contact.find({});

        if(!contactData){
            return res.status(400).json({message: "Contacts Not Found"})
        }

        return res.status(200).json(contactData)
    } catch (error) {
        next(error);
    }
})

const deleteuser = AsyncHandler(async(req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findByIdAndDelete(userId);

        if(!user) {
            return res.status(400).json({message: "User Not Found"});
        }

        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
})

export {
    getAllUsers,
    getAllContacts,
    deleteuser
}