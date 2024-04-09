"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps, useState } from "react";
import { LoginForm } from "../loginForm";
import { SignUpForm } from "../signUpForm";
import { useUserStore } from "@/store/zustand";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/hooks/useStore";

export const Header = () => {
  const store = useStore(useUserStore, (state) => state);
  const user = store?.user;
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  const showSignUp = () => {
    if (showSignUpForm) {
      setShowSignUpForm(false);
    } else {
      setShowSignInForm(false);
      setShowSignUpForm(true);
    }
  };

  const showSignIn = () => {
    if (showSignInForm) {
      setShowSignInForm(false);
    } else {
      setShowSignUpForm(false);
      setShowSignInForm(true);
    }
  };

  const signOut = () => {
    window.localStorage.removeItem("refreshToken");
    window.localStorage.removeItem("accessToken");
    store && store.logOut();
  };

  return (
    <>
      {showSignInForm && (
        <LoginForm showSignUp={showSignUp} showSignIn={showSignIn} />
      )}
      {showSignUpForm && (
        <SignUpForm showSignUp={showSignUp} showSignIn={showSignIn} />
      )}
      <header className="absolute left-0 right-0 top-0 z-50 bg-background flex h-[80px] w-full shrink-0 items-center px-4 md:px-6 shadow-[#b5b5b55b] shadow-md">
        <Link className="mr-6 hidden lg:flex" href="#">
          <CarIcon className="h-6 w-6" />
          <span className="sr-only">Car E-commerce</span>
        </Link>
        <div className="ml-auto flex gap-2">
          <Link
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            href="/"
          >
            Home
          </Link>
          <Link
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            href="/places"
          >
            Places
          </Link>
          {/* <Link
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            href="#"
          >
            Cars
          </Link>
          <Link
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            href="#"
          >
            Portfolio
          </Link>
          <Link
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            href="#"
          >
            Contact
          </Link> */}
          {!store?.user && (
            <>
              <Button
                onClick={showSignIn}
                className="justify-self-end px-2 py-1 text-xs"
                variant="outline"
              >
                Sign in
              </Button>
              <Button
                onClick={showSignUp}
                className="justify-self-end px-2 py-1 text-xs"
              >
                Sign Up
              </Button>
            </>
          )}
          {!!user && (
            <>
              <Badge variant="outline">
                {user.username
                  ? user.username
                  : `${user.firstName} ${user.lastName}`}
              </Badge>
              <Button
                onClick={signOut}
                className="justify-self-end px-2 py-1 text-xs"
              >
                Sign out
              </Button>
            </>
          )}
        </div>
      </header>
    </>
  );
};

function CarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}
