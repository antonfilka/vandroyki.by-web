"use client";
import L, { LatLngExpression } from "leaflet";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";
import BelarusGeoJSON from "./BelarusBorder.json";
import { FeatureCollection } from "geojson";
import "leaflet/dist/leaflet.css";
import { INIT_MAP_POSITION } from "@/app/places/suggest/page";
import Image from "next/image";

interface ChooseLocationMapProps {
  position: LatLngExpression | string;
  setPosition: (position: LatLngExpression | string) => void;
}

function FitBounds() {
  const map = useMap();

  const geoJSONLayer = L.geoJSON(BelarusGeoJSON as FeatureCollection);
  map.fitBounds(geoJSONLayer.getBounds());
  map.setMaxBounds(geoJSONLayer.getBounds().pad(1));
  //   map.setMinZoom(7);
  //   map.setMaxZoom(8);

  return null;
}

const customIcon = L.icon({
  iconUrl: "/mapMarker.png",
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});

function SetViewOnClick() {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    });
  });

  return null;
}

function DraggableMarker() {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(INIT_MAP_POSITION);
  const markerRef = useRef<L.Marker>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={customIcon}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </span>
      </Popup>
    </Marker>
  );
}

const ChooseLocationMap = ({
  position,
  setPosition,
}: ChooseLocationMapProps) => {
  useEffect(() => {
    const elements = document.querySelectorAll(".leaflet-bottom.leaflet-right");
    elements.forEach(
      (element) => element.parentNode && element.parentNode.removeChild(element)
    );

    if (map && typeof position !== "string") map.setView(position, 34);
  }, []);

  const [map, setMap] = useState<L.Map | null>(null);

  const onMove = useCallback(() => {
    map && setPosition(map.getCenter());
  }, [map, setPosition]);

  useEffect(() => {
    if (!map) return;

    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);

  const displayMap = useMemo(
    () => (
      <MapContainer
        className="absolute top-0 left-0 right-0 bottom-0"
        style={{ width: "100%", height: "100%" }}
        center={INIT_MAP_POSITION}
        zoom={13}
        ref={setMap}
        scrollWheelZoom
      >
        {/* <Marker icon={customIcon} position={position} /> */}
        <DraggableMarker />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <SetViewOnClick />
        <FitBounds />
      </MapContainer>
    ),
    []
  );

  return (
    <div className="relative w-full h-[450px] mx-auto overflow-hidden my-auto">
      {/* <Image
        className="absolute z-[100000] top-[225px] left-[50%] right-[50]"
        src={"/mapMarker.png"}
        alt="Marker"
        width={50}
        height={50}
      /> */}
      {displayMap}
    </div>
  );
};

export default ChooseLocationMap;
