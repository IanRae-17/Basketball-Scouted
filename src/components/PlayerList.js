// Utils
import splitName from "../utils/splitName";

// Compnents
import PlayerListActions from "./PlayerListActions";
import Image from "../components/Image";

function PlayerList({ players, team }) {
  return (
    <table className="player-list-table">
      <thead>
        <tr>
          <td>Player</td>
          <td>Pos</td>
          <td>Rating</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {players &&
          players.map((player, idx) => (
            <tr key={idx}>
              <td className="player">
                <Image
                  imgLink={player.img_link}
                  imgClassName="player-image"
                  name={player.name}
                />

                <div className="name">
                  {splitName(player.name).map((name) => (
                    <div key={name}>{name}</div>
                  ))}
                </div>
              </td>
              <td>{player.position}</td>
              <td>{player.rating}</td>
              <td>
                <PlayerListActions player={player} team={team} />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default PlayerList;
