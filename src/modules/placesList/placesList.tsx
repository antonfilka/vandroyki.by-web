"use client";
import API from "@/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const PlacesList = () => {
  const query = useQuery({ queryKey: ["places"], queryFn: API.PLACES.GET_ALL });
  console.log(query.data);
  return (
    <div className="w-full h-screen mt-[220px]">
      {query.data?.data?.map((i) => (
        <div key={i.id}>{i.title}</div>
      ))}
    </div>
  );
};
