import { shortListPlayer } from "../slices/playersSlice";
import { addContract } from "../slices/contractsSlice";
import { userOfferedContract } from "../slices/playersSlice";
import { faMagnifyingGlass, faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import useUserTeam from "../hooks/useUserTeam";
import useDay from "../hooks/useDay";

function PlayerListActions({
  player,
  shortListPlayer,
  addContract,
  userOfferedContract,
}) {
  const team = useUserTeam();
  const day = useDay();

  function handleContractOffer(player) {
    let payload = {
      player: player,
      team: team,
      day: day,
    };

    // Add Contract
    addContract(payload);
    // Handle Player Boolean
    userOfferedContract(player.playerID);
  }
  return (
    <div className="player-list-icons">
      <button
        className={
          player.isShortListed
            ? "player-list-icon-active"
            : "player-list-icon-inactive"
        }
        onClick={() => shortListPlayer(player.playerID)}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
      <button
        className={
          player.isOffered
            ? "player-list-icon-active"
            : "player-list-icon-inactive"
        }
        onClick={() => handleContractOffer(player)}
        disabled={player.isOffered}
      >
        <FontAwesomeIcon icon={faFile} />
      </button>
    </div>
  );
}

const mapStateToDispatch = {
  shortListPlayer,
  addContract,
  userOfferedContract,
};

export default connect(null, mapStateToDispatch)(PlayerListActions);
