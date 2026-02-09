import axiosInstance from './axios'

export interface UploadDirectoryParams {
  folderPath?: string
  cloudFolder?: string
}

export interface UploadResult {
  file: string
  url: string
  public_id: string
  original_url?: string
  error?: string
  errorCode?: string
}

export interface UploadResponse {
  success: boolean
  message: string
  total: number
  successful: number
  failed: number
  results: UploadResult[]
}

export const uploadDirectoryToCloudinary = async (
  params: UploadDirectoryParams = {}
): Promise<UploadResponse> => {
  try {
    const response = await axiosInstance.post<UploadResponse>(
      '/v1/upload-directory',
      params
    )
    return response.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Failed to upload directory to Cloudinary'
    )
  }
}

export const testCloudinaryConnection = async () => {
  try {
    const response = await axiosInstance.get('/v1/test-cloudinary')
    return response.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Failed to connect to Cloudinary'
    )
  }
}
