import formatPlayerName from "../utils/formatPlayerName";
import PlayerImage from "./PlayerImage";

const PlayerCard = ({player}) => {
  return (
    <div className="flex flex-col items-center text-center">
           <p className="text-gray-400 absolute top-2 left-2 right-2">{player.birthplace.name}</p>
      <div className="w-24 h-24 rounded-full overflow-hidden mb-2 mt-12">
   
        <PlayerImage
          imgLink={player.img_link}
          className="w-full h-full object-cover"
          name={player.name}
        />
      </div>
      <h3 className="text-xl font-bold break-words text-center mb-6">
        {formatPlayerName(player.name)}
      </h3>
      <div className="absolute bottom-2 left-2 right-2 flex justify-between text-gray-400">
        <p>{player.position}</p>
        <p>{player.rating}</p>
      </div>
    </div>
  );
};

export default PlayerCard;
