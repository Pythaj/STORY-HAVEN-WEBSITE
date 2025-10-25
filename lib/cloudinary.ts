import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary

// Helper function to get optimized image URL
export const getOptimizedImageUrl = (publicId: string, options?: {
  width?: number
  height?: number
  quality?: number
  format?: string
}) => {
  const { width, height, quality = 'auto', format = 'auto' } = options || {}
  
  return cloudinary.url(publicId, {
    transformation: [
      { width, height, crop: 'fill' },
      { quality, fetch_format: format },
    ],
  })
}

// Helper function to upload file
export const uploadToCloudinary = async (
  file: File | Buffer,
  folder: string,
  resourceType: 'image' | 'video' | 'raw' = 'image'
): Promise<{ url: string; publicId: string }> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `story-haven/${folder}`,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) reject(error)
        else if (result) {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          })
        }
      }
    )

    if (Buffer.isBuffer(file)) {
      uploadStream.end(file)
    } else if (file instanceof File) {
      // For File objects, convert to buffer first
      file.arrayBuffer().then(buffer => {
        uploadStream.end(Buffer.from(buffer))
      })
    } else {
      // Handle other types
      uploadStream.end(Buffer.from(file))
    }
  })
}

// Helper to delete file from Cloudinary
export const deleteFromCloudinary = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId)
    return { success: true }
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error)
    return { success: false, error }
  }
}
