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

export const InterestsManagement = () => {
  const [value, setValue] = useState("");
  const query = useQueryClient();

  const interests = useQuery({
    queryKey: [QUERY_KEYS.CITIES],
    queryFn: API.PLACES.GET_INTERESTS,
  });

  const onAddSuccess = () => {
    toast.success(`Interest ${value} added`);
    setValue("");
    query.invalidateQueries({ queryKey: [QUERY_KEYS.INTERESTS] });
  };

  const onAddError = () => {
    toast.error(`Failed to add interest`);
  };

  const onDeleteSuccess = () => {
    toast.success(`Interest ${value} deleted`);
    query.invalidateQueries({ queryKey: [QUERY_KEYS.INTERESTS] });
  };

  const onDeleteError = () => {
    toast.error(`Failed to delete interest`);
  };

  const addMutation = useMutation({
    mutationKey: [QUERY_KEYS.INTERESTS],
    mutationFn: API.PLACES.ADD_INTERESTS,
    onSuccess: onAddSuccess,
    onError: onAddError,
  });

  const deleteMutation = useMutation({
    mutationKey: [QUERY_KEYS.INTERESTS],
    mutationFn: API.PLACES.DELETE_INTERESTS,
    onSuccess: onDeleteSuccess,
    onError: onDeleteError,
  });

  const addButton = () => {
    if (
      value &&
      !interests.data?.data.map((interest) => interest.name).includes(value)
    ) {
      addMutation.mutate({ names: [value] });
    }
  };

  const handleBadgeClick = (id: string) => {
    deleteMutation.mutate({ ids: [id] });
  };

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Interests</CardTitle>
        <CardDescription>Manage Interests here.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Kino"
          />
          <Button onClick={addButton} type="submit">
            Add Interest
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2 flex-wrap">
          {interests.data?.data.map((interest) => (
            <Badge variant="outline" key={interest.id}>
              {interest.name}
              <button onClick={() => handleBadgeClick(interest.id)}>
                <CircleX className="w-4 h-4 ml-2" />
              </button>
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};
