import { Input } from "@/components/ui/input";
import React from "react";
import Image from "next/image";
import { CircleX } from "lucide-react";

interface ImageCardUploaderProps {
  link?: string;
  onDelete: (link: string) => void;
  onChange: (file: FileList) => void;
}

export const ImageCardUploader = (props: ImageCardUploaderProps) => {
  const { link, onDelete, onChange } = props;

  return (
    <div className="relative w-[150px] h-[200px] rounded-md">
      {link && (
        <button
          className="absolute z-10 top-[4px] right-[4px]"
          onClick={() => onDelete(link || "")}
          aria-label="Delete"
        >
          <CircleX className="bg-background rounded-[50%]" />
        </button>
      )}
      {link ? (
        <Image
          src={link}
          alt={link}
          layout="fill"
          objectFit="cover"
          className="absolute top-0 left-0 right-0 bottom-0 rounded-md border-[3px] border-primary"
        />
      ) : (
        <Input
          className="absolute top-0 left-0 right-0 bottom-0 !h-full p-4 cursor-pointer"
          onChange={(e) => e.target.files && onChange(e.target.files)}
          placeholder="Add image"
          accept="image/*"
          id="picture"
          type="file"
        />
      )}
    </div>
  );
};
