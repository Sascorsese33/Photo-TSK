export function getStorageProvider() {
  if (process.env.CLOUDINARY_URL) {
    return "cloudinary";
  }

  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    return "s3";
  }

  return "none";
}
