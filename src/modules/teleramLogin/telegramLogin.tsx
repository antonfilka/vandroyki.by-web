"use clieent";
import { TelegramAuthPayload } from "@/lib/types";
import { SignInOptions, signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { TLoginButton, TLoginButtonSize } from "react-telegram-auth";
import { toast } from "sonner";

export const TelegramLogin = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const [telegramData, setTelegramData] = useState<TelegramAuthPayload | null>(
    null
  );

  useEffect(() => {
    async function auth(telegramData: SignInOptions | undefined) {
      const res = await signIn("credentials", telegramData);
      if (!res?.error) {
        toast.success("Welcome!");
      } else {
        toast.error("Failed to sign in");
      }
    }
    if (telegramData && !user) {
      auth(telegramData);
    }
  }, [telegramData, user]);

  return (
    <TLoginButton
      botName={process.env.NEXT_PUBLIC_BOT_NAME}
      buttonSize={TLoginButtonSize.Large}
      lang="en"
      usePic={true}
      cornerRadius={20}
      onAuthCallback={(user) =>
        setTelegramData({
          id: user.id,
          username: user.username,
          firstName: user.first_name,
          lastName: user.last_name,
          picture: user.photo_url,
          authDate: user.auth_date,
          hash: user.hash,
        })
      }
      requestAccess={"write"}
    />
  );
};
