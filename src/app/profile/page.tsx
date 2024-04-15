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
import { Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ProfileFormValues {}

const FormSchema = z.object({});

export default function Profile() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  const query = useQuery({
    queryKey: [QUERY_KEYS.PROFILE],
    queryFn: API.PROFILE.GET_PROFILE,
  });

  const user = query.data?.data;

  const onSubmit = async (data: ProfileFormValues) => {};

  return (
    <div className="flex h-full w-full">
      <Card className="w-[550px] mx-auto my-10 items-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <CardHeader>
              <CardTitle>
                {user?.firstName && `${user?.firstName} ${user?.lastName}`}
                {user?.username && <Badge>{user?.username}</Badge>}
              </CardTitle>
              <CardDescription>
                {user?.email && <Badge>{user?.email}</Badge>}
                <Textarea value={user?.bio} />
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter>
              <Button type="submit">Update profile</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
