import {AsyncHandler} from '../utils/AsyncHandler.js'
import {User} from "../model/user.model.js"
import { uploadFileOnCloudinary } from '../utils/cloudinary.js';
import { Booking } from '../model/booking.model.js';
import {Vehicle} from '../model/vehicle.model.js';

const generateAccessToken = async(userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = await user.generateToken();

        return {accessToken};
    } catch (error) {
        res.status(500).json({message: "Something Went Wrong While Generating Access Token"})
    }
}


const registerUser = AsyncHandler( async (req, res) => {
    try {
        const {userName, email, password, phone} = req.body;

        if([userName, email, password, phone].some((field) => field?.trim() === "")){
            return res.status(400).json({message : "All Fields Are Required"});
        }

        const userExist = await User.findOne({
            $or : [{userName}, {email}],
        });

        if(userExist){
            return res.status(409).json({message : "Username or Email Already Exists?"})
        }

        const user = await User.create({
            userName,
            email,
            password,
            phone,
        })

        const createdUser = await User.findById(user._id).select("-password")

        if(!createdUser){
            return res.status(500).json({message: "Something Went Wrong While Registering User"})
        }

        const {accessToken} = await generateAccessToken(createdUser._id);

        return res.status(200).json({
            message: "User Registered Successfully",
            user: createdUser,
            userId: createdUser._id.toString(),
            token: accessToken,
        });

    } catch (error) {
        next(error)
    }
})

const loginUser = AsyncHandler( async(req, res) => {
    try {
        const {email, password} = req.body;
    
        const user = await User.findOne({email});
    
        if(!user){
            return res.status(404).json({message: "User Does Not Exists."});
        }
    
        const isPasswordValid = await user.isPassswordCorrect(password);
    
        if(!isPasswordValid){
            return res.status(401).json({message: "Invalid User Authentication!"});
        }
    
        const {accessToken} = await generateAccessToken(user._id);
    
        const loginUser = await User.findById(user._id).select("-password");
    
        return res.status(200).json({
            message: "User Login Successfully",
            user: loginUser,
            token: accessToken,
            userId: loginUser._id,
        })
    } catch (error) {
        next(error)
    }
})

const getCurrUsers = AsyncHandler(async(req, res) => {
    try {
        const user = req.user

        if(!user) {
            return res.status(404).json({message: "Something Went Wrong"})
        }

        return res.status(200).json({
            message: "User Fetched Successfully", 
            userData : user
        })
    } catch (error) {
        next(error)
    }
})


const editUsernameById = AsyncHandler(async(req, res) => {
    try {
       const {userName}  = req.body;
       
       const updateUser = await User.findByIdAndUpdate(
        {
            _id: req.userId
        },
        {
            $set: {
                userName,
            }
        },
        {new: true}
       ).select("-password");

       if(!updateUser){
        return res.status(400).json({message: "Something Went Wrong"});
       }

       return res.status(200).json({message: "Username Updated", updateUser});
    } catch (error) {
        next(error);
    }
})

const passChange = AsyncHandler(async(req, res) => {
    try {
        const {oPassword, nPassword, cPassword} = req.body;
    
        const user = await User.findById(req.userId);
    
        if(!user){
            return res.status(404).json({message: "User not Found"});
        }
    
        const isOldPasswordValid = await user.isPassswordCorrect(oPassword)
    
        if(!isOldPasswordValid){
            return res.status(400).json({message: "Old Password is not Correct"})
        }
    
        if(nPassword === oPassword){
            return res.status(400).json({message: "New & Old Password Must Not be Same"})
        }
        
        if(!(nPassword === cPassword)){
            return res.status(400).json({message : "New Password and Confirm Passwor Must Be Same"})
        }
    
    
        user.password = nPassword;
        await user.save({validateBeforeSave: false});
    
        return res.status(200).json({message: "Password changed Successfully"})
    } catch (error) {
        next(error)
    }
})

const editUserAvatar = AsyncHandler(async(req, res) => {
    try {
        const avatarImageLocalFilePath = req.files?.avatar[0].path;

        if(!avatarImageLocalFilePath){
            return res.status(400).json({message: "Avatar File is Required"});
        }

        const avatarImage = await uploadFileOnCloudinary(avatarImageLocalFilePath);

        if(!avatarImage){
            return res.status(400).json({message: "Avatar File is Required"});
        }

        const user = await User.findById(req.userId);

        user.avatar =  avatarImage.url;
        await user.save({validateBeforeSave: true});

        return res.status(200).json({
            message: "Avatar File Changed"
        });
    } catch (error) {
        console.log(error)
        next(error);
    }
})

const myBookings = AsyncHandler(async(req, res) => {
    try {
        const bookings = await Booking.find({bookedBy: req.userId}).populate('bookedVehicle').sort({createdAt: -1});;

        if(!bookings || bookings.length === 0){
            return res.status(404).json({message: "Not Found!"});
        }
        
        return res.status(200).json(bookings);
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error!"})
    }
})


export {
    registerUser,
    loginUser,
    getCurrUsers,
    editUsernameById,
    passChange,
    editUserAvatar,
    myBookings
}