"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DestinationPreview } from "@/modules/inedex";
import { useSession } from "next-auth/react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation, useQuery } from "@tanstack/react-query";
import API, { QUERY_KEYS } from "@/api";
import { ImageUploader } from "@/modules/imageUploader/imageUploader";
import { toast } from "sonner";
import { SelectGroup } from "@radix-ui/react-select";
import dynamic from "next/dynamic";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { LocateFixed } from "lucide-react";
import { useState } from "react";
import { LatLngExpression } from "leaflet";

const MapWithNoSSR = dynamic(
  () => import("../../../modules/chooseLocationMap/chooseLocationMap"),
  {
    ssr: false,
    loading: () => null,
  }
);

export interface SuggestPlaceFormValues {
  title: string;
  description: string;
  images: {
    link: string;
  }[];
  // location: string;
  cityId?: string;
}

const FormSchema = z.object({
  title: z
    .string({
      required_error: "Please set a title.",
    })
    .min(5, "Title must be at least 5 characters."),
  description: z
    .string({
      required_error: "Please set a description.",
    })
    .min(30, "Description must be at least 30 characters."),
  images: z.object({ link: z.string() }).array(),
  // location: z.string({ required_error: "Choose a location." }),
  cityId: z.string({ required_error: "Set a city." }).uuid("Set a city."),
});

export const INIT_MAP_POSITION: LatLngExpression = [51.505, -0.09];

export default function Suggest() {
  const session = useSession();
  const [position, setPosition] = useState<LatLngExpression | string>("");

  const user = session.data?.user;

  const cities = useQuery({
    queryKey: [QUERY_KEYS.CITIES],
    queryFn: API.PLACES.GET_CITIES,
  });

  const form = useForm<SuggestPlaceFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      images: [],
      // location: "",
      cityId: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const onSubmitSuccess = () => {
    toast.success("Suggestion created");
    form.reset();
  };

  const onSubmitError = () => {
    toast.error("Failed to create suggestion");
  };

  const submitMutation = useMutation({
    mutationFn: API.PLACES.CREATE,
    onSuccess: onSubmitSuccess,
    onError: onSubmitError,
  });

  const onSubmit = async (data: SuggestPlaceFormValues) => {
    submitMutation.mutate({
      ...data,
      images: data.images.map((i) => i.link),
      location: JSON.stringify(position),
    });
  };

  return (
    <div className="w-full h-full flex justify-between gap-5 p-8 pb-2">
      <Card className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <CardHeader>
              <div className="w-full grid grid-cols-2 gap-4">
                <div>
                  <CardTitle className="text-2xl">Suggest new place</CardTitle>
                  {user ? (
                    <CardDescription>Please, enter all details</CardDescription>
                  ) : (
                    <CardDescription>
                      Authorize to continue please
                    </CardDescription>
                  )}
                </div>
                <Button type="submit" className="w-full h-full">
                  Submit suggestion!
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Title" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cityId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue="">
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select city" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              {cities.data?.data.map((city) => (
                                <SelectItem key={city.id} value={city.id}>
                                  {city.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us a little bit about this place"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormLabel>Images</FormLabel>
                  <ImageUploader
                    append={append}
                    remove={remove}
                    fields={fields}
                  />
                </div>
                <Credenza>
                  <CredenzaTrigger asChild>
                    <Button>
                      Choose location <LocateFixed className="ml-2" />
                    </Button>
                  </CredenzaTrigger>
                  <CredenzaContent>
                    <CredenzaHeader>
                      <CredenzaTitle>Choose location</CredenzaTitle>
                      <CredenzaDescription>
                        {position && JSON.stringify(position)}
                      </CredenzaDescription>
                    </CredenzaHeader>
                    <CredenzaBody>
                      <MapWithNoSSR
                        position={position}
                        setPosition={setPosition}
                      />
                    </CredenzaBody>
                    <CredenzaFooter>
                      <CredenzaClose asChild>
                        <Button>Set</Button>
                      </CredenzaClose>
                    </CredenzaFooter>
                  </CredenzaContent>
                </Credenza>
              </div>
            </CardContent>
          </form>
        </Form>
      </Card>
      <DestinationPreview control={form.control} cities={cities.data} />
    </div>
  );
}
