import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { worlds } from "../data/data";
import { useAncientStore } from "../store/useStore";

import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

export const Map = () => {
  const { index, setProperties } = useAncientStore((state) => state);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const currentEmpireId = useRef<string | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mariavargasg/cm6o8abr700q701s910ixejq9",
      center: [70.0, 40.0],
      zoom: 3,
    });

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !worlds[index]) return;

    const empire = worlds[index];

    const loadEmpireLayer = async () => {
      try {
        const response = await fetch(empire.url);
        const data = await response.json();
        setProperties({ name: data.name, features: data.features });

        if (!mapRef.current) return;

        // Eliminar la capa anterior si existe
        if (currentEmpireId.current) {
          removeEmpireLayer(currentEmpireId.current);
        }

        // Añadir la nueva capa
        addEmpireLayer(empire.id, data);
        currentEmpireId.current = empire.id;
      } catch (error) {
        console.error("Error loading GeoJSON:", error);
      }
    };

    if (mapRef.current.isStyleLoaded()) {
      loadEmpireLayer();
    } else {
      mapRef.current.on("load", loadEmpireLayer);
    }

    return () => {
      if (currentEmpireId.current) {
        removeEmpireLayer(currentEmpireId.current);
      }
    };
  }, [index, setProperties]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addEmpireLayer = (id: string, data: any) => {
    if (!mapRef.current) return;

    mapRef.current.addSource(id, {
      type: "geojson",
      data: data,
    });

    mapRef.current.addLayer({
      id: id,
      type: "fill",
      source: id,
      paint: {
        "fill-color": "#3388ff",
        "fill-opacity": 0.5,
      },
      filter: ["!=", ["get", "NAME"], null],
    });

    mapRef.current.addLayer({
      id: `${id}-label`,
      type: "symbol",
      source: id,
      layout: {
        "text-font": ["Alegreya Regular"],
        "text-field": ["get", "NAME"],
        "text-justify": "auto",
        "text-variable-anchor": ["top", "bottom", "left", "right"],
        "text-radial-offset": 0.5,
      },
      paint: {
        "text-color": "#000",
        "text-halo-color": "#FFF",
        "text-halo-width": 1,
      },
      filter: ["!=", ["get", "NAME"], null], // Ignorar features con NAME null
    });

    // Añadir la capa de líneas (line)
    mapRef.current.addLayer({
      id: `${id}-line`,
      type: "line",
      source: id,
      paint: {
        "line-color": "#338fff",
        "line-width": 1,
      },
      filter: ["!=", ["get", "NAME"], null], // Ignorar features con NAME null
    });
  };

  const removeEmpireLayer = (id: string) => {
    if (!mapRef.current) return;

    if (mapRef.current.getLayer(id)) {
      mapRef.current.removeLayer(id);
    }
    if (mapRef.current.getLayer(`${id}-label`)) {
      mapRef.current.removeLayer(`${id}-label`);
    }
    if (mapRef.current.getLayer(`${id}-line`)) {
      mapRef.current.removeLayer(`${id}-line`);
    }

    if (mapRef.current.getSource(id)) {
      mapRef.current.removeSource(id);
    }
  };

  return <div ref={mapContainerRef} className="h-full w-full" />;
};
