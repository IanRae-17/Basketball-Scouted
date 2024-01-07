import Image from "../components/Image";
import PlayerListActions from "./PlayerListActions";
import useRefreshPlayer from "../hooks/useRefreshPlayer";

function PlayerCluster({ player }) {
  const refreshedPlayer = useRefreshPlayer(player.playerID);
  return (
    <div className="cluster-wrapper">
      <div className="info-img-wrapper">
        <Image
          imgLink={refreshedPlayer.img_link}
          imgClassName="info-box-img"
          name={refreshedPlayer.name}
        />
        <h3>{refreshedPlayer.name}</h3>
        <div className="p-bold">{refreshedPlayer.rating}</div>
      </div>
      <div className="actions-wrapper">
        <PlayerListActions player={refreshedPlayer} />
      </div>
    </div>
  );
}

export default PlayerCluster;
