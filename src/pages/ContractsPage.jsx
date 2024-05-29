// src/pages/ContractsPage.jsx
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { acceptUserContract, declineUserContract } from '../slices/contractsSlice';
import { Check, X } from 'phosphor-react';
import { addUserPlayer } from '../slices/citiesSlice';
import PlayerImage from '../components/PlayerImage';

const fallbackImageUrl = 'https://cdn.nba.com/headshots/nba/latest/260x190/fallback.png';

const ContractsPage = () => {
  const dispatch = useDispatch();
  const contracts = useSelector((state) => state.contracts);
  const players = useSelector((state) => state.players);
  const day = useSelector(state => state.simulation.day)

  const userContracts = useMemo(() => {
    return contracts.filter(contract => contract.team.userTeam).reverse()
  },[contracts])

  const handleAccept = (contract) => {
    console.log("dispatching dog")
    dispatch(acceptUserContract(contract.contractID));
    dispatch(addUserPlayer({teamID: contract.team.cityID, player: contract.player}))
  };

  const handleDecline = (contractID) => {
    dispatch(declineUserContract(contractID));
  };

  const getStatusColor = (status) => {
    if(status === "pending"){
      return "bg-yellow-500"
    } else if (status === "accepted") {
      return "bg-green-500"
    } else if (status === "declined" || status === "rejected") {
      return "bg-red-500"
    }
  }

  const getPlayer = (playerID) => players.find((player) => player.playerID === playerID);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Contracts</h2>
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-5 md:col-span-3 px-4 py-2 text-left">Player</div>
        <div className="hidden md:block md:col-span-2 px-4 py-2 text-left">Pos</div>
        <div className="hidden md:block md:col-span-2 px-4 py-2 text-left">Rating</div>
        <div className="hidden md:block md:col-span-2 px-4 py-2 text-left">Days Remaining</div>
        <div className="col-span-4 md:col-span-3 px-4 py-2 text-left">Status</div>
      </div>
      {userContracts.map((contract) => {
        const player = getPlayer(contract.player.playerID);
        return (
          <div
            key={contract.contractID}
            className="grid grid-cols-12 gap-4 items-center mb-4 p-4 rounded bg-neutral-700"
          >
            <div className="col-span-5 md:col-span-3 flex items-center">
              <div className="hidden md:block w-16 h-16 rounded-full overflow-hidden mr-4">
                <PlayerImage className="w-full h-full object-cover" imgLink={player.img_link} name={player.name}/>
              </div>
              <div className="truncate">
                <h3 className="text-lg md:text-xl font-bold whitespace-normal break-words">
                  {player.name}
                </h3>
                <p className="text-gray-400 hidden md:block">{player.birthplace.name}</p>
              </div>
            </div>
            <div className="hidden md:col-span-2 md:block px-4 text-left">
              <p>{player.position}</p>
            </div>
            <div className="hidden md:col-span-2 md:block px-4 text-left">
              <p>{player.rating}</p>
            </div>
            <div className="hidden md:col-span-2 md:block px-4 text-left">
              <p>{contract.finishDay - day > 0 ? (contract.finishDay - day) : 0}</p>
            </div>
            <div className="col-span-6 md:col-span-3 px-4 text-left">
              {contract.status === 'decision' ? (
                <div className="flex flex-col space-y-2 md:flex-col md:gap-1 md:items-center md:space-x-0 md:space-y-0 w-full">
                  <button
                    onClick={() => handleAccept(contract)}
                    className="bg-green-500 text-white px-4 py-2 rounded flex items-center justify-center w-full hover:bg-green-600"
                  >
                    Accept
                    <Check size={16} className="inline ml-2" />
                  </button>
                  <button
                    onClick={() => handleDecline(contract.contractID)}
                    className="bg-red-500 text-white px-4 py-2 rounded flex items-center justify-center w-full hover:bg-red-600"
                  >
                    Decline
                    <X size={16} className="inline ml-2" />
                  </button>
                </div>
              ) : (
                
                <div className={`${getStatusColor(contract.status)} text-white px-4 py-2 rounded flex items-center justify-center w-ful capitalize`}>{contract.status}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContractsPage;
