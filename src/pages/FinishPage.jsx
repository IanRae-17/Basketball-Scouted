import React from "react";
import { useSelector } from "react-redux";
import PlayerImage from "../components/PlayerImage";
import PlayerCard from "../components/PlayerCard";

const FinishPage = () => {
  const cities = useSelector((state) => state.cities);

  const calculateAverageRating = (roster) => {
    const players = Object.values(roster).filter((player) => player !== null);
    const totalRating = players.reduce((sum, player) => sum + player.rating, 0);
    return (totalRating / players.length).toFixed(1);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Final Teams</h2>
      {cities
        .filter((city) => city.hasTeam)
        .map((team) => (
          <div key={team.cityID} className="mb-8">
            <h3 className="text-xl font-bold mb-4">
              {team.name}, {team.defaultTeamName} -{" "}
              {calculateAverageRating(team.roster)}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {["PG", "SG", "SF", "PF", "C"].map((position) => {
                const player = team.roster[position];
                return (
                  <div
                    key={position}
                    className="p-4 rounded bg-neutral-700 relative"
                  >
                    {player ? (
                      <PlayerCard player={player} />
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
        ))}
    </div>
  );
};

export default FinishPage;
