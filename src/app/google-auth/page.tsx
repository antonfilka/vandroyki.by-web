"use client";
import API from "@/api";
import { useStore } from "@/hooks/useStore";
import { useUserStore } from "@/store/zustand";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GoogleAuth() {
  const store = useStore(useUserStore, (state) => state);
  const router = useRouter();

  useEffect(() => {
    const googleAuth = async () => {
      if (typeof window !== "undefined") {
        const urlData = new URLSearchParams(window.location.search);
        const accessToken = urlData.get("accessToken");
        const refreshToken = urlData.get("refreshToken");

        if (accessToken && refreshToken) {
          window.localStorage.setItem("refreshToken", refreshToken);

          window.localStorage.setItem("accessToken", accessToken);

          const userData = await API.AUTH.GET_MY_PROFILE(accessToken);
          if (userData) {
            store && store.login(userData);
            router.push("/");
          }
        }
      }
    };

    googleAuth();
  }, [router, store]);

  return (
    <div className="mt-[100px]">Wait a bit you will be authorized soon </div>
  );
}
