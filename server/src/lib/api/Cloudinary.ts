import cloudinary from "cloudinary";
import {config} from "../../config";

export const Cloudinary = {
    upload: async (image: string) => {
        const res = await cloudinary.v2.uploader.upload(image, {
            ...config.cloudinaryOptions,
            width: 720, height: 720,
        });

        return { imageUrl: res.secure_url, publicId: res.public_id };
    },

    update: async (oldImagePublicId: string, newImage: string) => {
        const deletionResponse = await cloudinary.v2.uploader.destroy(oldImagePublicId);
        if(deletionResponse.result !== "ok"){
            throw new Error("Failed to update image on cloudinary!")
        }

        const uploadedResponse = await cloudinary.v2.uploader.upload(newImage, {
            ...config.cloudinaryOptions,
            width: 720, height: 720,
        });

        return { imageUrl: uploadedResponse.secure_url, publicId: uploadedResponse.public_id };
    }
}
