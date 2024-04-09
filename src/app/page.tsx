"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

const MapWithNoSSR = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => null,
});

const CITIES = [
  "Minsk",
  "Grodno",
  "Brest",
  "Vitebsk",
  "Gomel",
  "Mogilev",
  "Country",
];

export default function Home() {
  const [city, setCity] = useState("Minsk");

  return (
    // TODO: Make animated background
    // TODO: Button title "Explore.. Minsk/Brest/Gomel/Vitebsk..~switching cities~"
    <div className="flex h-full">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Vandroyki.by</CardTitle>
          <CardDescription>Find places where to go...</CardDescription>
        </CardHeader>
        <CardContent>
          {CITIES.map((city) => (
            <Button
              key={city}
              onClick={() => setCity(city)}
              className="w-[60px], m-[5px]"
            >
              {city}
            </Button>
          ))}
        </CardContent>
        <CardFooter>
          <Link href="/places">
            <Button className="min-w-full">Places</Button>
          </Link>
        </CardFooter>
      </Card>
      <MapWithNoSSR city={city} />
    </div>
  );
}
