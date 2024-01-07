import { connect } from "react-redux";

import { useEffect, useMemo } from "react";

import splitName from "../utils/splitName";
import {
  handleUserContractAccepted,
  handleUserContractDeclined,
  handleContract,
} from "../slices/contractsSlice";

import { addUserPlayer } from "../slices/citiesSlice";

import { changeTeamStatus, userOfferedContract } from "../slices/playersSlice";

import Image from "./Image";
import useUserTeam from "../hooks/useUserTeam";

function ContractList({
  contracts,
  handleUserContractAccepted,
  handleUserContractDeclined,
  handleContract,
  addUserPlayer,
  changeTeamStatus,
  userOfferedContract,
}) {
  const userContracts = useMemo(() => {
    if (contracts) {
      return contracts.filter((contract) => contract.team.userTeam);
    } else return [];
  }, [contracts]);

  const team = useUserTeam();

  useEffect(() => {
    if (Object.values(team.roster).filter((pos) => pos !== null).length === 5) {
      for (const contract of userContracts) {
        if (contract.status === "decision") {
          handleUserContractDeclined(contract.contractID);
        }
      }
    }
  }, [team]);

  function handleAccepted(contract) {
    handleUserContractAccepted(contract.contractID);
    addUserPlayer({ teamID: contract.team.cityID, player: contract.player });
  }

  function handleDeclined(contract) {
    handleUserContractDeclined(contract.contractID);
    changeTeamStatus(contract.player.playerID);
    userOfferedContract(contract.player.playerID);
  }

  function renderStatus(contract) {
    switch (contract.status) {
      case "decision":
        return (
          <div className="contract-list-button-container">
            <button onClick={() => handleAccepted(contract)}>Accept</button>
            <button onClick={() => handleDeclined(contract)}>Decline</button>
          </div>
        );
      default:
        return (
          <div className="contract-list-status">
            {"contract " + contract.status}
          </div>
        );
    }
  }

  return (
    <table className="player-list-table contract-list-table">
      <thead>
        <tr>
          <td>Player</td>
          <td>Pos</td>
          <td>Rating</td>
          <td>Status</td>
        </tr>
      </thead>
      <tbody>
        {userContracts &&
          userContracts.map((contract, idx) => (
            <tr key={idx}>
              <td className="player">
                <Image
                  imgLink={contract.player.img_link}
                  imgClassName="player-image"
                  name={contract.player.name}
                />
                <div className="name">
                  {splitName(contract.player.name).map((name) => (
                    <div key={name}>{name}</div>
                  ))}
                </div>
              </td>
              <td className="contract-list-table-PI">
                <div>{contract.player.position}</div>
                <div>{contract.player.rating}</div>
              </td>
              <td>{contract.finishDay}</td>
              <td>{renderStatus(contract)}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

const mapStateToProps = (state) => {
  return {
    contracts: state.contracts,
  };
};

const mapStateToDispatch = {
  handleUserContractAccepted,
  handleUserContractDeclined,
  handleContract,
  addUserPlayer,
  changeTeamStatus,
  userOfferedContract,
};

export default connect(mapStateToProps, mapStateToDispatch)(ContractList);
