// src/pages/PlayersPage.jsx
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import PlayerList from "../components/PlayerList";
import MapView from "../components/MapView";
import { getAvailablePlayers } from "../utils/mapHelper";

const PlayersPage = () => {
  const [view, setView] = useState("list"); // Default to list view
  const players = useSelector((state) => state.players);
  const cities = useSelector((state) => state.cities);

  const userTeam = useMemo(() => {
    let team = cities.filter((city) => city.userTeam);

    if (team) return team[0];
  });

  const availablePlayers = useMemo(() => {
    if (userTeam && players) {
      return getAvailablePlayers(userTeam, players);
    }
  }, [players]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col justify-between items-center mb-4 gap-2">
        <h2 className="text-2xl font-bold">Players</h2>
        <div className="flex gap-2 space-x-2">
          <button
            onClick={() => setView("list")}
            className={`px-4 py-2 rounded ${
              view === "list"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setView("map")}
            className={`px-4 py-2 rounded ${
              view === "map"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
          >
            Map View
          </button>
        </div>
      </div>
      {view === "list" && (
        <PlayerList players={availablePlayers} showFilter={true} userTeam={userTeam} />
      )}
      {view === "map" && <MapView players={availablePlayers} userTeam={userTeam} />}
    </div>
  );
};

export default PlayersPage;
