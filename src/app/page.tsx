"use client";
import dynamic from "next/dynamic";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import TelegramAuth from "@/components/TelegramLogin/TelegramLogin";

const MapWithNoSSR = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const [city, setCity] = useState("Minsk");

  return (
    // TODO: Make animated background
    // TODO: Button title "Explore.. Minsk/Brest/Gomel/Vitebsk..~switching cities~"
    <>
      <MapWithNoSSR city={city} />
      <div className="border-none bg-foreground/10  max-w-[610px] absolute right-10 top-0 bottom-0 p-14">
        <h1 className="text-5xl text-black font-extrabold leading-tight select-none">
          Vandroyki.by
        </h1>
        <p className="select-none align-middle mt-6">
          Find places where to go...
        </p>
        <section className="flex flex-col">
          <Button
            color="primary"
            size="lg"
            onClick={() => setCity("Minsk")}
            className="w-auto mt-6 text-xl font-semibold"
          >
            Explore.. Minsk
          </Button>
          <Button
            color="primary"
            size="lg"
            onClick={() => setCity("Brest")}
            className="w-auto mt-6 text-xl font-semibold"
          >
            Explore.. Brest
          </Button>
          <Button
            color="primary"
            size="lg"
            onClick={() => setCity("Vitebsk")}
            className="w-auto mt-6 text-xl font-semibold"
          >
            Explore.. Vitebsk
          </Button>
          <Button
            color="primary"
            size="lg"
            onClick={() => setCity("Mogilev")}
            className="w-auto mt-6 text-xl font-semibold"
          >
            Explore.. Mogilev
          </Button>
          <Button
            color="primary"
            size="lg"
            onClick={() => setCity("Gomel")}
            className="w-auto mt-6 text-xl font-semibold"
          >
            Explore.. Gomel
          </Button>
          <Button
            color="primary"
            size="lg"
            onClick={() => setCity("Grodno")}
            className="w-auto mt-6 text-xl font-semibold"
          >
            Explore.. Grodno
          </Button>
          <Button
            color="primary"
            size="lg"
            onClick={() => setCity("Country")}
            className="w-auto mt-6 text-xl font-semibold"
          >
            Zoom out
          </Button>
          {/* <TelegramAuth /> */}
        </section>
      </div>
    </>
  );
}
