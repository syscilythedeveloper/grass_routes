import { v2 as cloudinary, UploadApiOptions } from "cloudinary";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function getCloudinaryURL(
  base64: string,
  opts?: Partial<UploadApiOptions>
) {
  // Remove the data URL prefix if present
  const base64Data = base64.replace(/^data:image\/[a-zA-Z]+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  return new Promise<string>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "checkins",
        eager: [
          {
            width: 300,
            height: 300,
            crop: "pad",
            format: "jpg",
          },
        ],
        eager_async: true,
        ...opts,
      },
      (err, result) => {
        if (err) return reject(err);
        if (!result || !result.secure_url)
          return reject(new Error("No result from Cloudinary"));
        resolve(result.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
}
