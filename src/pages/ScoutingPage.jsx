// src/pages/ScoutingPage.jsx
import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTrip } from '../slices/tripsSlice';

const ScoutingPage = () => {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities);
  const trips = useSelector((state) => state.trips);
  const day = useSelector(state => state.simulation.day);
  const [selectedCity, setSelectedCity] = useState(null);

  const userTeam = useMemo(() => {
    return cities.filter((city) => city.userTeam)[0];
  }, [cities]);

  const scoutingCities = useMemo(() => {
    return trips.filter((trip) => trip.team.cityID === userTeam.cityID);
  }, [trips, userTeam]);

  const scoutableCities = useMemo(() => {
    if (userTeam) {
      return cities.filter(
        (city) =>
          city.cityID !== userTeam.cityID &&
          !scoutingCities.some((trip) => trip.city.cityID === city.cityID)
      );
    } else {
      return [];
    }
  }, [cities, scoutingCities, userTeam]);

  const handleCityChange = (e) => {
    const city = scoutableCities.find((city) => city.name === e.target.value);
    setSelectedCity(city);
  };

  const handleScoutButtonClick = () => {
    if (selectedCity) {
      const day = 1; // replace with your actual day logic
      dispatch(addTrip({ team: userTeam, city: selectedCity, day }));
      setSelectedCity(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Scouting Trips</h2>
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-8 md:col-span-4 px-4 py-2 text-left">City</div>
        <div className="hidden md:block md:col-span-2 px-4 py-2 text-center">Time To Scout</div>
        <div className="hidden md:block md:col-span-2 px-4 py-2 text-center">Finish Day</div>
        <div className="col-span-4 md:col-span-4 px-4 py-2 text-left"></div>
      </div>
      <div className="grid grid-cols-12 gap-4 items-center mb-4 p-4 rounded bg-neutral-700">
        <div className="col-span-8 md:col-span-4">
          <select
            value={selectedCity ? selectedCity.name : ''}
            onChange={handleCityChange}
            className="w-full p-2 rounded bg-neutral-600 text-white cursor-pointer"
          >
            <option value="">Select a city</option>
            {scoutableCities.map((city) => (
              <option key={city.cityID} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          <p className="text-gray-400 hidden md:block">{selectedCity ? selectedCity.userInfo.estimatedPlayersInRange + " Players In Range" : ""}</p>
        </div>
        <div className="hidden md:col-span-2 md:block px-4 text-center">
          <p>{selectedCity ? selectedCity.userInfo.scoutTime : ''}</p>
        </div>
        <div className="hidden md:col-span-2 md:block px-4 text-center">
          <p>{selectedCity ? selectedCity.userInfo.scoutTime + day : ''}</p>
        </div>
        <div className="col-span-4 md:col-span-4 px-4 text-left flex md:justify-end justify-center">
          <button
            onClick={handleScoutButtonClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Scout
          </button>
        </div>
      </div>
      {scoutingCities.map((trip, idx) => (
        <div
          key={trip.tripID}
          className="grid grid-cols-12 gap-4 items-center mb-4 p-4 rounded bg-neutral-700"
        >
          <div className="col-span-6">
            <div className="truncate">
              <h3 className="text-lg md:text-xl font-bold whitespace-normal break-words">
                {trip.city.name}
              </h3>
              <p className="text-gray-400 hidden md:block">{trip.city.userInfo.estimatedPlayersInRange} Players In Range</p>
            </div>
          </div>
          <div className="col-span-6 px-4 text-right">
            <p>{trip.finishDay - day > 0 ? (trip.finishDay - day + " days remaining") : "Finished"} </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScoutingPage;
