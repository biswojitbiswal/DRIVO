import { AsyncHandler } from "../utils/AsyncHandler.js";
import {Contact} from "../model/contact.model.js"
import mongoose from "mongoose";

const contactData = AsyncHandler( async(req, res) => {
    try {
        const {email, message} = req.body;

        if(!email || !message){
            return res.status(400).json({message: "All fields required"})
        }

        const data = await Contact.create({email, message});

        if(!data){
            return res.status(500).json({message: "Something went wrong"})
        }

        const senderId = new mongoose.Types.ObjectId(req.userId)

        await Contact.updateOne(
            {
                _id : data._id
            },
            {
                $set: {
                    sender : senderId
                }
            },
            {upsert: false, new : true}
        )

        return res.status(200).json({message: "Message Delivered", data});
    } catch (error) {
        return res.status(500).json({message: "Message not Delivered", error});
    }
})

export {
    contactData
}