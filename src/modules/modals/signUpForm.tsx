"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import API from "@/api";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export function SignUpForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSuccess = () => {
    toast.success("Sign up successful!");
    reset();
    router.push("/?signIn=true");
  };
  const onError = () => {
    toast.error("Failed to sign up");
  };

  const signUpMutation = useMutation({
    mutationFn: API.AUTH.SIGN_UP,
    onSuccess,
    onError,
  });

  const onSubmit = async (data: FormValues) => {
    signUpMutation.mutate(data);
  };

  return (
    <Card className="absolute top-0 left-0 right-0 z-[100000] mx-auto my-auto mt-[10%] max-w-sm bg-background">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  placeholder="Max"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  placeholder="Robinson"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Username</Label>
              <Input
                id="username"
                type="text"
                {...register("username", {
                  required: "Username is required",
                })}
                placeholder="Username"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                {...register("password", {
                  required: "Password is required",
                })}
                type="password"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={signUpMutation.isPending}
            >
              Create an account
            </Button>

            <Button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              variant="outline"
              className="w-full"
            >
              Sign up with Google
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?
          <Link href="/?signIn=true" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
