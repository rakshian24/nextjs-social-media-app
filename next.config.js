module.exports = {
  env: {
    CLOUDINARY_URL: process.env.CLOUDINARY_UPLOAD_API_URL,
    CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET_NAME,
  },
};
