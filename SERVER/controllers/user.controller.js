import {AsyncHandler} from '../utils/AsyncHandler.js'
import {User} from "../model/user.model.js"
import { uploadFileOnCloudinary } from '../utils/cloudinary.js';

const generateAccessToken = async(userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = await user.generateToken();

        return {accessToken};
    } catch (error) {
        res.status(500).json({message: "Something Went Wrong While Generating Access Token"})
    }
}

// const checkLicencesNo = (license_Number) => {
//     // Regex to check valid
//     // license_Number  
//     let regex = new RegExp(/^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/);
//       // Return false if the licenseNumber is empty or does not match the regex
//     return regex.test(license_Number);
// }

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

        const avatarImageFile = req.files?.avatar[0]?.path;

        if(!avatarImageFile){
            return res.status(400).json({message: "Avatar File Required"});
        }

        const avatarImage = await uploadFileOnCloudinary(avatarImageFile);

        if(!avatarImage){
            return res.status(400).json({message: "Avatar File Required"});
        }

        const user = await User.create({
            userName,
            email,
            password,
            phone,
            avatar: avatarImage.url,
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
        console.log(error);
        return res.status(500).json({message: "Internal Backend Error", error});
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
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
})


export {
    registerUser,
    loginUser,
}