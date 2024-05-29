// src/components/PlayerList.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shortListPlayer, userOfferedContract } from "../slices/playersSlice";
import { addContract } from "../slices/contractsSlice";
import { Star, FileText } from "phosphor-react";
import PlayerImage from "./PlayerImage";
import StarIcon from "./StarIcon";



const PlayerList = ({ players, showFilter = true, userTeam }) => {
  const dispatch = useDispatch();
  const contracts = useSelector((state) => state.contracts);
  const day = useSelector(state => state.simulation.day)
  const [positionFilters, setPositionFilters] = useState({
    PG: true,
    SG: true,
    SF: true,
    PF: true,
    C: true,
  });

  const handlePositionChange = (position) => {
    setPositionFilters({
      ...positionFilters,
      [position]: !positionFilters[position],
    });
  };

  const filteredPlayers = players.filter(
    (player) => positionFilters[player.position]
  ).sort((a, b) => b.isShortListed - a.isShortListed);

  const handleOfferContract = (player) => {
    const team = userTeam;
    dispatch(addContract({ team, player, day }));
    dispatch(userOfferedContract(player.playerID));
  };

  const isContractOffered = (playerID) => {
    return contracts.some((contract) => contract.player.playerID === playerID && contract.team.userTeam);
  };

  return (
    <div>
      {showFilter && (
        <div className="mb-4">
          <h3 className="text-lg font-bold">Filter by Position:</h3>
          <div className="flex space-x-4">
            {Object.keys(positionFilters).map((position) => (
              <label key={position} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={positionFilters[position]}
                  onChange={() => handlePositionChange(position)}
                />
                <span>{position}</span>
              </label>
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-5 md:col-span-4 px-4 py-2 text-left">Name</div>
        <div className="hidden md:block md:col-span-2 px-4 py-2 text-left">
          Pos
        </div>
        <div className="hidden md:block md:col-span-2 px-4 py-2 text-left">
          Rating
        </div>
        <div className="block md:hidden col-span-4 px-4 py-2 text-left">
          Info
        </div>
        <div className="col-span-3 px-2 py-2 text-left">Actions</div>
      </div>
      {filteredPlayers.map((player) => (
        <div
          key={player.playerID}
          className={`grid grid-cols-12 gap-4 items-center mb-4 p-4 rounded ${
            isContractOffered(player.playerID)
              ? "bg-green-700"
              : "bg-neutral-700"
          }`}
        >
          <div className="col-span-5 md:col-span-4 flex items-center">
            <div className="hidden md:block w-16 h-16 rounded-full overflow-hidden mr-4">
              <PlayerImage className="w-full h-full object-cover" imgLink={player.img_link} name={player.name} />
            </div>
            <div className="truncate">
              <h3 className="text-lg md:text-xl font-bold whitespace-normal break-words">
                {player.name}
              </h3>
              <p className="text-gray-400 hidden md:block">{player.birthplace.name}</p>
            </div>
          </div>
          <div className="col-span-4 md:hidden px-4 text-left">
            <p>{player.position}</p>
            <p>{player.rating}</p>
          </div>
          <div className="hidden md:col-span-2 md:block px-4 text-left">
            <p>{player.position}</p>
          </div>
          <div className="hidden md:col-span-2 md:block px-4 text-left">
            <p>{player.rating}</p>
          </div>
          <div className="col-span-3 px-4 flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
            <button
              onClick={() => dispatch(shortListPlayer(player.playerID))}
              className="text-yellow-500"
            >
               <StarIcon isShortListed={player.isShortListed} />
            </button>
            <button
              onClick={() => handleOfferContract(player)}
              className="text-blue-500 hover:text-blue-600"
              disabled={isContractOffered(player.playerID)}
            >
              <FileText size={24} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerList;
