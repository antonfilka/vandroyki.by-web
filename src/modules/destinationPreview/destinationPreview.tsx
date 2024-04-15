"use client";
import { GetCitiesResponse } from "@/api/places";
import { SuggestPlaceFormValues } from "@/app/places/suggest/page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Control, useWatch } from "react-hook-form";
import { ImageCard } from "../imageCard/imageCard";

export const DestinationPreview = ({
  control,
  cities,
}: {
  control: Control<SuggestPlaceFormValues>;
  cities?: GetCitiesResponse;
}) => {
  const title = useWatch({
    control,
    name: "title",
    defaultValue: "...",
  });
  const description = useWatch({
    control,
    name: "description",
    defaultValue: "...",
  });
  const cityId = useWatch({
    control,
    name: "cityId",
    defaultValue: "...",
  });

  const images = useWatch({
    control,
    name: "images",
    defaultValue: [],
  });

  const cityName =
    cities?.data?.find((city) => cityId === city.id)?.name || "...";

  // const location = useWatch({
  //   control,
  //   name: "location",
  //   defaultValue: "",
  // });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {title}
          <span>, {cityName}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          {images.map((image) => (
            <ImageCard key={image.link} link={image.link} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
