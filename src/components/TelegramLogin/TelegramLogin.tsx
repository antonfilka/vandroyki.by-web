import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AuthButton from "../AuthButton/AuthButton";

export default async function TelegramAuth() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col items-center mt-10">
      {!session && <div className="flex justify-center mt-10">Not logged </div>}
      <AuthButton botUsername={process.env.BOT_USERNAME} />
    </div>
  );
}
