// src/components/CityList.jsx
import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserInfo, generateLeague } from "../slices/citiesSlice";
import { useNavigate } from "react-router-dom";
import { FunnelSimple } from "phosphor-react";
import { setCenter } from "../slices/mapSlice";

const CityList = () => {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities);
  const [selectedCity, setSelectedCity] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "reputation",
    direction: "descending",
  });
  const navigate = useNavigate();
  const players = useSelector((state) => state.players);

  const handleSelectCity = (cityID) => {
    setSelectedCity(cityID);
  };

  const handleSubmit = () => {
    if (selectedCity) {
      let city = cities.filter(city => city.cityID === selectedCity)[0]
      dispatch(generateLeague({ id: selectedCity }));
      dispatch(addUserInfo({ chosenCity: city, players: players }));
      dispatch(setCenter(city.location))
      navigate("/players"); // Navigate to the players page after generating the league
    }
  };

  const sortedCities = useMemo(() => {
    let sortableCities = [...cities];
    sortableCities.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return a.name.localeCompare(b.name); // Secondary sort by name alphabetically
    });
    return sortableCities;
  }, [cities, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4">Choose Your Team</h2>
      <div className="grid grid-cols-12 gap-4 mb-4">
  <div className="col-span-4 md:col-span-4 px-4 py-2 text-left">City</div>
  <div className="hidden md:col-span-3 md:block px-4 py-2 text-left">
    Team Name
  </div>
  <button
    onClick={() => requestSort("reputation")}
    className="col-span-3 md:col-span-2 px-4 py-2 text-left flex"
  >
    <span className="block md:hidden">Rep</span>
    <span className="hidden md:block">Reputation</span>
    <span><FunnelSimple className="ml-1 mt-1" /></span>
  </button>
  <button
    onClick={() => requestSort("scouting")}
    className="col-span-3 md:col-span-2 px-4 py-2 text-left flex"
  >
    <span className="block md:hidden">Sct</span>
    <span className="hidden md:block">Scouting</span>
    <span><FunnelSimple className="ml-1 mt-1" /></span>
  </button>
  <div className="col-span-2 md:col-span-1 px-4 py-2 text-left"></div>
</div>

      <div className="overflow-y-auto max-h-96">
        {sortedCities.map((city) => (
          <div
            key={city.cityID}
            className={`grid grid-cols-12 md:grid-cols-12 gap-4 items-center mb-2 p-1 rounded ${
              selectedCity === city.cityID ? "bg-blue-700" : "bg-neutral-700"
            }`}
            onClick={() => handleSelectCity(city.cityID)}
          >
            <div className="col-span-6 md:col-span-4 px-4 text-left">
              <h3 className="text-lg md:text-xl font-bold">{city.name}</h3>
            </div>
            <div className="hidden md:col-span-3 md:block px-4 text-left">
              <p className="text-gray-400">{city.defaultTeamName}</p>
            </div>
            <div className="col-span-2 md:col-span-2 px-4 text-left">
              <p className="text-gray-400">{city.reputation}</p>
            </div>
            <div className="col-span-2 md:col-span-2 px-4 text-left">
              <p className="text-gray-400">{city.scouting}</p>
            </div>
            <div className="col-span-2 md:col-span-1 px-4 text-center flex justify-center items-center">
              <input
                type="checkbox"
                checked={selectedCity === city.cityID}
                onChange={() => handleSelectCity(city.cityID)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        disabled={!selectedCity}
      >
        Submit
      </button>
    </div>
  );
};

export default CityList;
