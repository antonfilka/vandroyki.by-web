"use client";

import { Button } from "@nextui-org/react";
import { LoginButton } from "@telegram-auth/react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton({ botUsername }: { botUsername: string }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Reloading</p>;
  }

  if (status === "authenticated") {
    return <Button>Sign out</Button>;
  }

  return (
    <LoginButton
      botUsername={botUsername}
      onAuthCallback={(data) => {
        signIn("telegram-login", { callbackUrl: "/" }, data as any);
      }}
    />
  );
}
