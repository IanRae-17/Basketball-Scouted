import { useSelector } from "react-redux";

function useRefreshPlayer(playerID) {
  const players = useSelector((state) => state.players);

  const player = players.filter((player) => player.playerID === playerID)[0];

  return player;
}

export default useRefreshPlayer;
