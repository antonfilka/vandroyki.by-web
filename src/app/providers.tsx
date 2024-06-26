"use client";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { YMaps } from "@pbe/react-yandex-maps";
import { Suspense } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <>
      <SpeedInsights />
      <SessionProvider>
        <Suspense fallback={null}>
          <YMaps>
            <QueryClientProvider client={queryClient}>
              <TooltipProvider>{children}</TooltipProvider>
            </QueryClientProvider>
          </YMaps>
        </Suspense>
      </SessionProvider>
    </>
  );
}
