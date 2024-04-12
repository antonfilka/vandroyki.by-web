"use client";
import API, { QUERY_KEYS } from "@/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleX } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const CITIES = [];

export const CitiesManagement = () => {
  const [value, setValue] = useState("");
  const query = useQueryClient();

  const cities = useQuery({
    queryKey: [QUERY_KEYS.CITIES],
    queryFn: API.PLACES.GET_CITIES,
  });

  const onAddSuccess = () => {
    toast.success(`City ${value} added`);
    setValue("");
    query.invalidateQueries({ queryKey: [QUERY_KEYS.CITIES] });
  };

  const onAddError = () => {
    toast.error(`Failed to add city`);
  };

  const onDeleteSuccess = () => {
    toast.success(`City ${value} deleted`);
    query.invalidateQueries({ queryKey: [QUERY_KEYS.CITIES] });
  };

  const onDeleteError = () => {
    toast.error(`Failed to delete city`);
  };

  const addMutation = useMutation({
    mutationKey: [QUERY_KEYS.CITIES],
    mutationFn: API.PLACES.ADD_CITIES,
    onSuccess: onAddSuccess,
    onError: onAddError,
  });

  const deleteMutation = useMutation({
    mutationKey: [QUERY_KEYS.CITIES],
    mutationFn: API.PLACES.DELETE_CITIES,
    onSuccess: onDeleteSuccess,
    onError: onDeleteError,
  });

  const addButton = () => {
    if (value && !cities.data?.data.map((city) => city.name).includes(value)) {
      addMutation.mutate({ names: [value] });
    }
  };

  const handleBadgeClick = (id: string) => {
    deleteMutation.mutate({ ids: [id] });
  };

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Cities</CardTitle>
        <CardDescription>Manage Cities here.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Minsk"
          />
          <Button onClick={addButton} type="submit">
            Add City
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2 flex-wrap">
          {cities.data?.data.map((city) => (
            <Badge variant="outline" key={city.id}>
              {city.name}
              <button onClick={() => handleBadgeClick(city.id)}>
                <CircleX className="w-4 h-4 ml-2" />
              </button>
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};
