"use client";
import React from "react";
import { LoginForm } from "./loginForm";
import { useSearchParams } from "next/navigation";
import { SignUpForm } from "./signUpForm";

const MODALS: Record<string, JSX.Element> = {
  signIn: <LoginForm />,
  signUp: <SignUpForm />,
};

export const Modals = () => {
  const params = useSearchParams();

  const modals = Object.keys(MODALS).map((key) => {
    if (isActive(params.get(key))) {
      return MODALS[key];
    }
  });
  return <>{modals.map((i) => i)}</>;
};

const isActive = (value: string | null) => {
  return value === "true";
};
