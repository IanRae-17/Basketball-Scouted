// React
import { useMemo, useRef } from "react";

// Google Map
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";

// Redux
import { connect } from "react-redux";
import { setZoom } from "../slices/mapSlice";
import { setCluster } from "../slices/activeClusterSlice";

// Map Helper
import {
  getClusterSpread,
  createClusters,
  calculateClusterIcon,
} from "../utils/mapHelper";

// Components
import MapHeader from "./MapHeader";

function Map({ map, league, setZoom, players, setCluster, cities }) {
  console.log("Map Render");
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
  });

  const mapRef = useRef();

  const options = useMemo(() => {
    return {
      maxZoom: 8,
      minZoom: 4,
      streetViewControl: false,
      mapTypeControl: false,
      zoomControl: true,
      fullscreenControl: false,
      clickableIcons: false,
      // gestureHandling: "none",
    };
  }, []);

  const mapMarkers = useMemo(() => {
    const items = [];

    players.forEach((player) => {
      const markerItem = {
        type: "player",
        location: player.birthplace.location,
        data: player,
      };
      items.push(markerItem);
    });

    league.forEach((team) => {
      const markerItem = {
        type: "team",
        location: team.location,
        data: team,
      };
      items.push(markerItem);
    });

    return items;
  }, [players, league]);

  const clusters = useMemo(() => {
    if (mapMarkers) {
      return createClusters(mapMarkers, getClusterSpread(map.zoom));
    }
  }, [mapMarkers, map.zoom]);

  const handleMarkerClick = (cluster) => {
    const typesArray = [...cluster.types];

    const updateCluster = {
      ...cluster,
      types: typesArray,
    };

    setCluster(updateCluster);

    if (mapRef.current) {
      const map = mapRef.current;
      map.panTo(cluster.location);
    }
  };

  function handleZoomChange() {
    setZoom(this.getZoom());
  }

  return (
    <>
      {cities && <MapHeader mapRef={mapRef} />}
      <div className="grid-map-container map-container">
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            mapContainerClassName="map"
            center={map.center.location}
            options={options}
            zoom={map.zoom}
            onZoomChanged={handleZoomChange}
            onLoad={(map) => (mapRef.current = map)}
          >
            {clusters &&
              clusters.map((cluster, index) => (
                <MarkerF
                  key={cluster.id}
                  position={cluster.location}
                  icon={calculateClusterIcon(cluster, map.zoom)}
                  onClick={() => handleMarkerClick(cluster)}
                />
              ))}
          </GoogleMap>
        )}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    map: state.map,
    cities: state.cities,
  };
};

const mapDispatchToProps = {
  setZoom,
  setCluster,
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
