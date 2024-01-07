import PlayerCluster from "./PlayerCluster";
import TeamCluster from "./TeamCluster";

function InfoBox({ activeCluster }) {
  const renderCluster = (cluster) => {
    switch (cluster.type) {
      case "player":
        return <PlayerCluster player={cluster.item} />;
      case "team":
        return <TeamCluster team={cluster.item} />;
    }
  };
  return !(Object.keys(activeCluster).length === 0) ? (
    <div className="grid-map-info-box info-box">
      {activeCluster.data.map((cluster) => renderCluster(cluster))}
    </div>
  ) : (
    <></>
  );
}

export default InfoBox;
