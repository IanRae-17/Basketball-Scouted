// React
import { useEffect, useState } from "react";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faArrowLeft,
  faArrowRight,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

// Redux
import { connect } from "react-redux";
import useUserTeam from "../hooks/useUserTeam";

function MapHeader({ cities, mapRef }) {
  console.log("Map Header Render");
  const [mapIndex, setMapIndex] = useState(29);
  const [teamIndex, setTeamIndex] = useState(null);

  const team = useUserTeam();

  useEffect(() => {
    setTeamIndex(cities.findIndex((city) => city.cityID === team.cityID));
  }, [team]);

  function handlePrevClick() {
    const newIndex = (mapIndex - 1 + cities.length) % cities.length;
    setMapIndex(newIndex);
    panMap(cities[newIndex].location);
  }

  function handleNextClick() {
    const newIndex = (mapIndex + 1) % cities.length;
    setMapIndex(newIndex);
    panMap(cities[newIndex].location);
  }

  function handleHomeClick(teamIndex) {
    setMapIndex(teamIndex);
    panMap(cities[teamIndex].location);
  }

  function panMap(location) {
    const map = mapRef.current;
    map.panTo(location);
  }

  return (
    <div className="grid-map-header map-header">
      <div className="map-header-home">
        <FontAwesomeIcon
          icon={faHome}
          onClick={() => handleHomeClick(teamIndex)}
          className="map-header-icons"
        />
      </div>

      <div className="map-header-arrow-nav">
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={() => handlePrevClick()}
          className="map-header-icons"
        />
        <div className="map-header-area">
          {cities[mapIndex].name.toLowerCase() + " area"}
        </div>
        <FontAwesomeIcon
          icon={faArrowRight}
          onClick={() => handleNextClick()}
          className="map-header-icons"
        />
      </div>
      <div className="map-header-arrow-nav">
        <FontAwesomeIcon icon={faUser} />
        <div>120</div>
      </div>
    </div>
  );
}

const mapStateToDispatch = (state) => {
  return {
    cities: state.cities,
  };
};

export default connect(mapStateToDispatch, null)(MapHeader);
