import API from "@/api";
import { UploadImageResponse } from "@/api/s3";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";
import { ImageCardUploader } from "./imageCardUploader";
import { UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form";
import { SuggestPlaceFormValues } from "@/app/places/suggest/page";

interface ImageUploaderProps {
  append: UseFieldArrayAppend<SuggestPlaceFormValues, "images">;
  remove: UseFieldArrayRemove;
  fields: { link: string }[];
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  fields,
  append,
  remove,
}) => {
  const NUMBER_OF_IMAGES = 3;
  const onImageLoadSuccess = (data: UploadImageResponse) => {
    toast.success("Image loaded!");
    append({ link: data.data.url });
  };
  const onImageLoadError = () => {
    toast.error("Failed to load image");
  };

  const uploadImageMutation = useMutation({
    mutationFn: API.S3.UPLOAD_IMAGE,
    onSuccess: onImageLoadSuccess,
    onError: onImageLoadError,
  });

  const onImageDeleteSuccess = (data: UploadImageResponse) => {
    toast.success("Image deleted");
    remove();
  };
  const onImageDeleteError = () => {
    toast.error("Failed to delete image");
  };

  const deleteImageMutation = useMutation({
    mutationFn: API.S3.DELETE_IMAGE,
    onSuccess: onImageDeleteSuccess,
    onError: onImageDeleteError,
  });

  const onCardChange = async (files: FileList | null) => {
    if (files) {
      const file = files[0];
      const formData = new FormData();
      formData.set("file", file);
      uploadImageMutation.mutate(formData);
    }
  };

  const onDelete = (link: string, index: number) => {
    deleteImageMutation.mutate(link);
  };

  return (
    <div className="flex justify-start gap-3">
      {Array.from({ length: NUMBER_OF_IMAGES }).map((_, index) => (
        <ImageCardUploader
          key={index}
          onChange={onCardChange}
          link={fields[index] && fields[index].link}
          onDelete={() => onDelete(fields[index].link, index)}
        />
      ))}
    </div>
  );
};
