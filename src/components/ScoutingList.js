import { useState, useMemo } from "react";

import { connect } from "react-redux";
import { addTrip } from "../slices/tripsSlice";

function ScoutingList({ cities, trips, team, day, addTrip }) {
  const [selectedCity, setSelectedCity] = useState(null);
  const [total, setTotal] = useState(0);

  const scoutingCities = useMemo(() => {
    const sC = trips.filter((trip) => trip.team.cityID === team.cityID);
    let newTotal = 0;
    sC.forEach((trip) => {
      if (!trip.isFinished) {
        newTotal += trip.timeToScout;
      }
    });
    setTotal(newTotal);
    return sC;
  }, [trips]);

  const scoutableCities = useMemo(() => {
    if (team) {
      return cities.filter(
        (city) =>
          city.cityID !== team.cityID &&
          !scoutingCities.some((trip) => trip.city.cityID === city.cityID)
      );
    } else {
      return [];
    }
  }, [cities, scoutingCities, team]);

  const handleCityChange = (e) => {
    const city = scoutableCities.find((city) => city.name === e.target.value);
    setSelectedCity(city);
  };

  const handleScoutButtonClick = () => {
    console.log(selectedCity);
    let payload = {
      team: team,
      city: selectedCity,
      day: day,
    };

    addTrip(payload);

    if (selectedCity) {
      setSelectedCity(null);
    }
  };
  return (
    <table className="player-list-table scouting-list-table">
      <thead>
        <tr>
          <td>City</td>
          <td>Players In Range</td>
          <td>Trip Length</td>
          <td>Finish Day</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <select
              value={selectedCity ? selectedCity.name : ""}
              onChange={handleCityChange}
            >
              <option value="">Select a city</option>
              {scoutableCities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </td>
          <td>
            {selectedCity ? selectedCity.userInfo.estimatedPlayersInRange : ""}
          </td>
          <td>{selectedCity ? selectedCity.userInfo.scoutTime : ""}</td>
          <td>{selectedCity ? total + selectedCity.userInfo.scoutTime : ""}</td>

          <td className="scouting-list-button">
            <button onClick={handleScoutButtonClick}>Scout</button>
          </td>
        </tr>
        {scoutingCities.map((trip, idx) => (
          <tr key={idx} className="scouting-list-row">
            <td>{trip.city.name}</td>
            <td>{trip.city.userInfo.estimatedPlayersInRange}</td>
            <td>{trip.timeToScout}</td>
            <td>{trip.finishDay - day}</td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const mapStateToProps = (state) => {
  return {
    cities: state.cities,
    trips: state.trips,
  };
};

const mapDispatchToProps = {
  addTrip,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScoutingList);
