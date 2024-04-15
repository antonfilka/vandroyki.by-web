import { axiosInstance } from "./axiosConfig";

const S3_URLS = {
  UPLOAD_IMAGE: "/s3/upload",
  DELETE_IMAGE: "/s3/delete",
};

export interface UploadImageResponse {
  data: { url: string };
}
export interface DeleteImageResponse {
  data: { url: string };
}

async function uploadImage(formData: FormData): Promise<UploadImageResponse> {
  const response = await axiosInstance.post(S3_URLS.UPLOAD_IMAGE, formData);
  return response.data;
}

async function deleteImage(link: string): Promise<DeleteImageResponse> {
  const response = await axiosInstance.post(S3_URLS.DELETE_IMAGE, { link });
  return response.data;
}

export const S3 = {
  UPLOAD_IMAGE: uploadImage,
  DELETE_IMAGE: deleteImage,
};
