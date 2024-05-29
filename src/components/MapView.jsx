// src/components/MapView.jsx
import React, { useMemo, useRef } from "react";
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";
import { setZoom } from "../slices/mapSlice";
import { setCluster } from "../slices/activeClusterSlice";
import {
  getClusterSpread,
  createClusters,
  calculateClusterIcon,
} from "../utils/mapHelper";
import PlayerList from "./PlayerList";

const MapView = ({players, userTeam}) => {
  const dispatch = useDispatch();
  const map = useSelector((state) => state.map);
  const league = useSelector((state) => state.league);
  const activeCluster = useSelector((state) => state.activeCluster);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
  });

  const mapRef = useRef();

  const options = useMemo(
    () => ({
      maxZoom: 8,
      minZoom: 4,
      streetViewControl: false,
      mapTypeControl: false,
      zoomControl: true,
      fullscreenControl: false,
      clickableIcons: false,
    }),
    []
  );

  const mapMarkers = useMemo(() => {
    const items = [];
    players.forEach((player) => {
      items.push({
        type: "player",
        location: player.birthplace.location,
        data: player,
      });
    });
    // league.forEach((team) => {
    //   items.push({
    //     type: 'team',
    //     location: team.location,
    //     data: team,
    //   });
    // });
    return items;
  }, [players, league]);

  const clusters = useMemo(() => {
    if (mapMarkers) {
      return createClusters(mapMarkers, getClusterSpread(map.zoom));
    }
  }, [mapMarkers, map.zoom]);

  const handleMarkerClick = (cluster) => {
    dispatch(setCluster(cluster));
    if (mapRef.current) {
      mapRef.current.panTo(cluster.location);
    }
  };

  const handleZoomChange = () => {
    if (mapRef.current) {
      dispatch(setZoom(mapRef.current.getZoom()));
    }
  };

  const clusterPlayers = activeCluster
    ? activeCluster.data
        .filter(({ type }) => type === "player")
        .map(({ item }) => item)
    : [];

  return (
    <div>
      <div className="h-[50vh] mb-4">
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            mapContainerClassName="h-full w-full"
            center={map.center.location}
            options={options}
            zoom={map.zoom}
            onIdle={handleZoomChange}
            onLoad={(map) => (mapRef.current = map)}
          >
            {clusters &&
              clusters.map((cluster) => (
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
      {activeCluster && clusterPlayers.length > 0 && (
        <div className="bg-neutral-800 p-4 rounded">
          <PlayerList players={clusterPlayers} showFilter={false} userTeam={userTeam}/>
        </div>
      )}
    </div>
  );
};

export default MapView;
