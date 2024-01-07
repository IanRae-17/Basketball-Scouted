import splitName from "../utils/splitName";
import { useState } from "react";
import { swapPlayers } from "../slices/citiesSlice";
import { connect } from "react-redux";
import Image from "../components/Image";
function TeamList({ team, swapPlayers }) {
  const [activePos, setActivePos] = useState(null);

  function teamPosition(idx) {
    switch (idx) {
      case 0:
        return "PG";
      case 1:
        return "SG";
      case 2:
        return "SF";
      case 3:
        return "PF";
      case 4:
        return "C";
      default:
        break;
    }
  }

  function swapPlayer(idx) {
    let pos = teamPosition(idx);
    if (activePos) {
      // Already an active, swap spots
      swapPlayers({ teamID: team.cityID, pos1: activePos, pos2: pos });
      setActivePos(null);
    } else {
      // Not active, make active
      setActivePos(pos);
    }
  }

  return (
    <table className="player-list-table">
      <thead>
        <tr>
          <td>Player</td>
          <td>Team Pos</td>
          <td>Player Pos</td>
          <td>Rating</td>
        </tr>
      </thead>
      <tbody>
        {team &&
          Object.values(team.roster).map((player, idx) => (
            <tr
              key={idx}
              onClick={() => swapPlayer(idx)}
              className={activePos === teamPosition(idx) ? "active" : ""}
            >
              <td className="player">
                {player && (
                  <Image
                    imgLink={player.img_link}
                    imgClassName="player-image"
                    name={player.name}
                  />
                )}
                <div className="name">
                  {player &&
                    splitName(player.name).map((name) => (
                      <div key={name}>{name}</div>
                    ))}
                </div>
              </td>
              <td>{teamPosition(idx)}</td>
              <td>{player && player.position}</td>
              <td>{player && player.rating}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

const mapStateToDispatch = {
  swapPlayers,
};

export default connect(null, mapStateToDispatch)(TeamList);
