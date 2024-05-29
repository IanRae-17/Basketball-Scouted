// src/pages/TeamPage.jsx
import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { swapPlayers } from "../slices/citiesSlice"; // Importing from citiesSlice
import PlayerCard from "../components/PlayerCard";

const TeamPage = () => {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities);

  // Memoize the user team to avoid unnecessary re-renders
  const userTeam = useMemo(() => {
    return cities.find((city) => city.userTeam);
  }, [cities]);

  const [selectedPos, setSelectedPos] = useState(null);

  const handlePositionClick = (position) => {
    if (selectedPos === null) {
      setSelectedPos(position);
    } else {
      dispatch(
        swapPlayers({
          teamID: userTeam.cityID,
          pos1: selectedPos,
          pos2: position,
        })
      );
      setSelectedPos(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {userTeam.name + ", " + userTeam.defaultTeamName}
      </h2>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
          {["PG", "SG", "SF", "PF", "C"].map((position) => {
            const player = userTeam.roster[position];
            return (
              <div
                key={position}
                className={`p-4 rounded cursor-pointer flex items-center justify-center relative ${
                  selectedPos === position ? "bg-blue-700" : "bg-neutral-700 hover:bg-blue-700"
                }`}
                onClick={() => handlePositionClick(position)}
              >
                {player ? (
                  <PlayerCard player={player}/>
                ) : (
                  <div className="flex items-center justify-center h-full text-xl font-bold">
                    {position}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
