import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET,
});

const uploadFileOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) {
            return null;
        }
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })

        // file has been uploaded succesfully
        console.log("file is uploaded successfully", response);
        // after upload unlink the file from server
        fs.unlinkSync(localFilePath) 
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
}

export {uploadFileOnCloudinary}