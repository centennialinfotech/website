import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_FOLDER } from '../config/env'


export const getCloudinaryUrl = (imagePath: string): string => {
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
  
  const filename = cleanPath.startsWith('img/') ? cleanPath.slice(4) : cleanPath
  
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${CLOUDINARY_FOLDER}/${filename}`
}

export const getCloudinaryUrlWithTransform = (
  imagePath: string,
  transformations?: string
): string => {
  const baseUrl = getCloudinaryUrl(imagePath)
  if (transformations) {
    const urlParts = baseUrl.split('/upload/')
    return `${urlParts[0]}/upload/${transformations}/${urlParts[1]}`
  }
  return baseUrl
}
