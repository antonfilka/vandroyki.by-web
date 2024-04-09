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
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useUserStore } from "@/store/zustand";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import API from "@/api";
import { SignInResponse } from "@/api/auth";
import { useStore } from "@/hooks/useStore";
import Link from "next/link";

interface LoginFormProps {
  showSignUp: () => void;
  showSignIn: () => void;
}

interface FormValues {
  email: string;
  password: string;
}

export function LoginForm({ showSignUp, showSignIn }: LoginFormProps) {
  const store = useStore(useUserStore, (state) => state);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSuccess = (data: SignInResponse) => {
    store && store.login(data.user);
    window.localStorage.setItem(
      "refreshToken",
      data.backendTokens.refreshToken
    );
    window.localStorage.setItem("accessToken", data.backendTokens.accessToken);
    toast.success("Welcome!");
    reset();
    showSignIn();
  };
  const onError = () => {
    toast.error("Failed to sign in");
  };

  const signInMutation = useMutation({
    mutationFn: API.AUTH.SIGN_IN,
    onSuccess,
    onError,
  });

  const onSubmit = async (data: FormValues) => {
    signInMutation.mutate(data);
  };

  return (
    <Card className="absolute top-0 left-0 right-0 z-[100000] mx-auto my-auto mt-[10%] max-w-sm bg-background">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email or username</Label>
              <Input
                id="email"
                type="text"
                {...register("email", {
                  required: "Email is required",
                })}
                placeholder="m@example.com or username"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link> */}
              </div>
              <Input
                id="password"
                {...register("password", {
                  required: "Password is required",
                })}
                type="password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Link href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`}>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </Link>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Button onClick={showSignUp} className="underline">
            Sign up
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
