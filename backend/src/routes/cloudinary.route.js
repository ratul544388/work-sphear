import express from "express";
import cloudinary from "../lib/cloudinary.js";

const router = express.Router();

export const getCloudinarySignature = async (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const FOLDER_NAME = "ph-a-12";
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: FOLDER_NAME },
    process.env.CLOUDINARY_API_SECRET
  );

  return res.status(200).json({
    timestamp,
    signature,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    folder: FOLDER_NAME
  });
};

router.get("/signature", getCloudinarySignature);

export default router;
