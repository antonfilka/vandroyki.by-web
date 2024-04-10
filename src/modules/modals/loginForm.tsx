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
import { toast } from "sonner";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface FormValues {
  email: string;
  password: string;
}

export function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/",
    });

    if (!res?.error) {
      toast.success("Welcome!");
      reset();
      router.push("/");
    } else {
      toast.error("Failed to sign in");
    }
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

            <Button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              variant="outline"
              className="w-full"
            >
              Login with Google
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/?signUp=true" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
