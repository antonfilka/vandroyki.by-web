"use client";
import { Role } from "@/lib/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  role: Role[];
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  const hasRequiredRole =
    session?.user?.role && role.includes(session?.user?.role);

  if (session && hasRequiredRole) {
    return <>{children}</>;
  } else {
    router.push("/");
  }
};

export default ProtectedRoute;
