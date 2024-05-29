const fallbackImageUrl =
  "https://cdn.nba.com/headshots/nba/latest/260x190/fallback.png";

const PlayerImage = ({ imgLink, className, name }) => {
  return(<img
    src={imgLink || fallbackImageUrl}
    alt={name}
    className={className}
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = fallbackImageUrl;
    }}
  />);
};

export default PlayerImage;
