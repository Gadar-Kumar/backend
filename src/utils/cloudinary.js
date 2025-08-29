import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'



    // Configuration
    cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_SECRET // Click 'View API Keys' above to copy your API secret
    });

    const uploadOnCloudinary=async (localFilePath)=>{
        try{
            if(!localFilePath)return null;
            // upload the file
          const response=await  cloudinary.uploader.upload(localFilePath,{
                 resource_type:"auto"
            })
            // file has been uploaded successfully
            console.log("File is uploaded successfully",response.url);
            fs.unlinkSync(localFilePath)
            return response
        }catch(err){
            fs.unlinkSync(localFilePath) //removed the locally saved temp file
            return null
        }
    }

    export {uploadOnCloudinary}

    //  const uploadResult = await cloudinary.uploader
    //    .upload(
    //        'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
    //            public_id: 'shoes',
    //        }
    //    )
    //    .catch((error) => {
    //        console.log(error);
    //    });
    
    // console.log(uploadResult);