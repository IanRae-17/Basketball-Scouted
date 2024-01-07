import { useState } from "react";
import Image from "./Image";

function FinishSimulation({ finishedLeague, unSignedPlayers }) {
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleHeaderClick = (position) => {
    if (sortBy === position) {
      // If the same header is clicked again, toggle the sort order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If a new header is clicked, reset sort order to 'asc'
      setSortOrder("asc");
    }
    setSortBy(position);
  };

  const sortedLeague = [...finishedLeague].sort((teamA, teamB) => {
    let result;
    if (sortBy === "AVG") {
      const avgRatingA = averageRating(Object.values(teamA.roster));
      const avgRatingB = averageRating(Object.values(teamB.roster));
      result = avgRatingB - avgRatingA;
    } else {
      const ratingA = teamA.roster[sortBy] ? teamA.roster[sortBy].rating : 0;
      const ratingB = teamB.roster[sortBy] ? teamB.roster[sortBy].rating : 0;
      result = ratingB - ratingA;
    }
    return sortOrder === "asc" ? result : -result;
  });

  function averageRating(roster) {
    const totalRating = roster.reduce((sum, item) => sum + item.rating, 0);
    return totalRating / roster.length;
  }

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

  return (
    <div className="grid-container">
      <div className="grid-main finish-table">
        <div className="table-header">
          {["PG", "SG", "SF", "PF", "C", "AVG"].map((position) => (
            <h3 key={position} onClick={() => handleHeaderClick(position)}>
              {position}
            </h3>
          ))}
        </div>
        {sortedLeague.map((team) => (
          <div className="table-row">
            <h1 className="table-row-header">
              {team.name + ", " + team.defaultTeamName}
            </h1>
            <div className="table-row-content">
              {Object.values(team.roster).map((player, idx) => (
                <div className="table-player" key={player.name}>
                  <Image
                    imgLink={player.img_link}
                    imgClassName="player-img"
                    name={player.name}
                  />
                  <div className="player-info">
                    <h3>{teamPosition(idx)}</h3>
                    <h3>{player.rating}</h3>
                  </div>
                  <h3>{player.name}</h3>
                </div>
              ))}
              <div className="stats">
                <div>{averageRating(Object.values(team.roster))}</div>
                <h3>Average Rating</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FinishSimulation;
