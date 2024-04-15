import React from "react";
import Image from "next/image";

export const ImageCard = ({ link }: { link: string }) => {
  return (
    <div className="relative w-[150px] h-[200px] rounded-md">
      <Image
        src={link}
        alt={link}
        layout="fill"
        objectFit="cover"
        className="absolute top-0 left-0 right-0 bottom-0 rounded-md border-[3px]"
      />
    </div>
  );
};
