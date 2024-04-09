"use client";
import { MapContainer, useMap, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import BelarusGeoJSON from "./BelarusBorder.json";
import MinskRegion from "./Regions/MinskRegion.json";
import BrestRegion from "./Regions/BrestRegion.json";
import MogilevRegion from "./Regions/MogilevRegion.json";
import VitebskRegion from "./Regions/VitebskRegion.json";
import GomelRegion from "./Regions/GomelRegion.json";
import GrodnoRegion from "./Regions/GrodnoRegion.json";
import L from "leaflet";
import { FeatureCollection } from "geojson";
import { gsap } from "gsap";
import { renderToString } from "react-dom/server";

// const CustomMarkerComponent = ({ text }: { text: string }) => {
//   return <section></section>;
// };

function SetViewToGeoJSON({
  data,
  city,
}: {
  data: FeatureCollection;
  city: string;
}) {
  const map = useMap();

  useEffect(() => {
    const geoJSONLayer = L.geoJSON(data);
    map.fitBounds(geoJSONLayer.getBounds(), { padding: [400, 400] });
    map.setMaxBounds(geoJSONLayer.getBounds().pad(1));
    map.setMinZoom(7);
    map.setMaxZoom(8);

    // const customMarkerHtml = renderToString(
    //   <CustomMarkerComponent text="Hello, World!" />
    // );

    // const customIcon = L.divIcon({
    //   className: "my-custom-icon", // Custom class for styling
    //   html: customMarkerHtml,
    // });

    // L.marker([52.0976214, 23.7340503], { icon: customIcon }).addTo(map);
    // L.marker([55.1848061, 30.201622], { icon: customIcon }).addTo(map);
    // L.marker([54.2825201, 30.990449], { icon: customIcon }).addTo(map);
  }, [data, map]);

  useEffect(() => {
    let focusData;

    if (city === "Minsk") {
      focusData = L.geoJSON(MinskRegion as FeatureCollection);
    } else if (city === "Brest") {
      focusData = L.geoJSON(BrestRegion as FeatureCollection);
    } else if (city === "Vitebsk") {
      focusData = L.geoJSON(VitebskRegion as FeatureCollection);
    } else if (city === "Mogilev") {
      focusData = L.geoJSON(MogilevRegion as FeatureCollection);
    } else if (city === "Grodno") {
      focusData = L.geoJSON(GrodnoRegion as FeatureCollection);
    } else if (city === "Gomel") {
      focusData = L.geoJSON(GomelRegion as FeatureCollection);
    } else if (city === "Country") {
      focusData = L.geoJSON(data as FeatureCollection);
      map.flyToBounds(focusData.getBounds().pad(0.6), { duration: 1 });
    }
    if (focusData && city !== "Country") {
      map.flyToBounds(focusData.getBounds().pad(0.35), { duration: 1 });
    }
  }, [city, map, data]);

  return null;
}

function AnimatedGeoJSON({ data }: { data: FeatureCollection }) {
  const map = useMap();

  useEffect(() => {
    const onEachFeature = (
      feature: any,
      layer: {
        on: (arg0: {
          mouseover: (e: any) => void;
          mouseout: (e: any) => void;
        }) => void;
      }
    ) => {
      layer.on({
        mouseover: (e) => {
          const layer = e.target;
          layer.setStyle({
            width: 2,
            fillOpacity: 0.6, // You can change the opacity on hover if desired
            opacity: 0.8, // You can change the opacity on hover if desired
          });
        },
        mouseout: (e) => {
          geoJsonLayer.resetStyle(e.target); // Reset to initial style on mouse out
        },
      });
    };

    // Assuming `data` is your GeoJSON object
    const geoJsonLayer = L.geoJSON(data, {
      style: () => ({
        fillColor: "#ee964b",
        fillOpacity: 0.7,
        color: "#0d3b66", // Initial color
        weight: 2, // Initial weight of the line
        opacity: 1, // Initial opacity
      }),
      onEachFeature: onEachFeature,
    }).addTo(map);

    // Function to animate the GeoJSON layer
    function animateGeoJSONLayer(layer: any) {
      let tl = gsap.timeline({
        repeat: 3,
        defaults: { ease: "power2", duration: 3 },
      });

      tl.to(layer, {
        weight: 2,
        opacity: "0.6",
        onUpdate: () => updateLayerStyle(layer),
      }).to(layer, {
        weight: 2,
        opacity: "0.7",
        onUpdate: () => updateLayerStyle(layer),
      });

      return tl;
    }

    // Function to apply updated styles to the GeoJSON layer
    function updateLayerStyle(layer: any) {
      layer.setStyle({
        weight: gsap.getProperty(layer, "weight"),
        opacity: gsap.getProperty(layer, "opacity"),
      });
    }

    // Start the animation
    const tl = gsap.timeline();
    tl.add(animateGeoJSONLayer(geoJsonLayer));
    tl.play();

    // Cleanup on component unmount
    return () => {
      map.removeLayer(geoJsonLayer);
    };
  }, [data, map]); // Dependency array

  return null;
}

const Map = ({ city }: { city: string }) => {
  useEffect(() => {
    const elements = document.querySelectorAll(".leaflet-bottom.leaflet-right");
    elements.forEach(
      (element) => element.parentNode && element.parentNode.removeChild(element)
    );
  }, []);

  return (
    <div className="fade-content-ver w-[100%] h-[100%] mx-auto overflow-hidden my-auto">
      <div className="relative fade-content-hor w-[100%] h-[100%] overflow-hidden ">
        <MapContainer
          className="absolute top-[50%] left-[50%] translate-x-[-52%] translate-y-[-50%]"
          style={{
            backgroundColor: "#ffffff",
            width: "2400px",
            height: "2010px",
            margin: "0px",
          }}
          scrollWheelZoom={true}
          zoomControl={false}
          zoomSnap={0.1}
          wheelDebounceTime={60}
        >
          {/* <GeoJSON
            data={BelarusGeoJSON as FeatureCollection}
            style={{
              fillColor: "transparent",
              color: "#42000c5e",
              weight: 2,
              opacity: 1,
            }}
          /> */}
          <AnimatedGeoJSON data={MinskRegion as FeatureCollection} />
          <AnimatedGeoJSON data={BrestRegion as FeatureCollection} />
          <AnimatedGeoJSON data={GrodnoRegion as FeatureCollection} />
          <AnimatedGeoJSON data={VitebskRegion as FeatureCollection} />
          <AnimatedGeoJSON data={MogilevRegion as FeatureCollection} />
          <AnimatedGeoJSON data={GomelRegion as FeatureCollection} />
          <SetViewToGeoJSON
            city={city}
            data={BelarusGeoJSON as FeatureCollection}
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
