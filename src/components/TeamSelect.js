import BBALLIMAGE from "../assets/BBALL.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateLeague } from "../slices/citiesSlice";
import { addUserInfo } from "../slices/citiesSlice";
import { setCenter } from "../slices/mapSlice";

import { connect } from "react-redux";

function TeamSelect({ generateLeague, players, addUserInfo, setCenter }) {
  const [cities, setCities] = useState([
    {
      cityID: "56fffd29-3896-4f65-aede-d53204d7d585",
      name: "New York City",
      defaultTeamName: "Knicks",
      location: {
        lat: 40.7128,
        lng: -74.006,
      },
      abbrv: "NYC",
      scouting: 5,
      reputation: 5,
    },
    {
      cityID: "0f5ec542-121d-4e71-aec7-f5e9cb862ff2",
      name: "Los Angeles",
      defaultTeamName: "Lakers",
      location: {
        lat: 34.0522,
        lng: -118.2437,
      },
      abbrv: "LOS",
      scouting: 5,
      reputation: 5,
    },
    {
      cityID: "0273010e-8710-4fd0-a5dd-2440451e29fc",
      name: "Chicago",
      defaultTeamName: "Bulls",
      location: {
        lat: 41.8781,
        lng: -87.6298,
      },
      abbrv: "CHI",
      scouting: 5,
      reputation: 5,
    },
    {
      cityID: "72144fdc-e7fc-457c-9f46-3ae24964beaa",
      name: "Dallas",
      defaultTeamName: "Mavericks",
      location: {
        lat: 32.7767,
        lng: -96.797,
      },
      abbrv: "DAL",
      scouting: 5,
      reputation: 4,
    },
    {
      cityID: "49b1dbe5-402f-49e7-b1ec-67e041241a2b",
      name: "Houston",
      defaultTeamName: "Rockets",
      location: {
        lat: 29.7604,
        lng: -95.3698,
      },
      abbrv: "HOU",
      scouting: 5,
      reputation: 4,
    },
    {
      cityID: "ac520379-d91e-420e-94c3-3bb8747aafe0",
      name: "Toronto",
      defaultTeamName: "Raptors",
      location: {
        lat: 43.6532,
        lng: -79.3832,
      },
      abbrv: "TOR",
      scouting: 4,
      reputation: 3,
    },
    {
      cityID: "dba1e891-e50f-47b9-b91b-147da790063f",
      name: "Washington D.C",
      defaultTeamName: "Wizards",
      location: {
        lat: 38.9072,
        lng: -77.0379,
      },
      abbrv: "WAS",
      scouting: 5,
      reputation: 4,
    },
    {
      cityID: "82931333-96a5-4caa-9871-8a5887bedc89",
      name: "Miami",
      defaultTeamName: "Heat",
      location: {
        lat: 25.7617,
        lng: -80.1918,
      },
      abbrv: "MIA",
      scouting: 4,
      reputation: 4,
    },
    {
      cityID: "6d48f4ad-58e1-457a-9917-43add1a96819",
      name: "Philadelphia",
      defaultTeamName: "76ers",
      location: {
        lat: 39.9526,
        lng: -75.1652,
      },
      abbrv: "PHI",
      scouting: 5,
      reputation: 5,
    },
    {
      cityID: "71cfa871-7252-4929-9016-8975ba5d460e",
      name: "Atlanta",
      defaultTeamName: "Hawks",
      location: {
        lat: 33.749,
        lng: -84.388,
      },
      abbrv: "ATL",
      scouting: 5,
      reputation: 4,
    },
    {
      cityID: "a6e7be2b-a737-4ca5-ba33-1aed200ac21b",
      name: "Boston",
      defaultTeamName: "Celtics",
      location: {
        lat: 42.3601,
        lng: -71.0589,
      },
      abbrv: "BOS",
      scouting: 5,
      reputation: 5,
    },
    {
      cityID: "f2da4b73-311d-4a47-904c-8bb2e51582e4",
      name: "Phoenix",
      defaultTeamName: "Suns",
      location: {
        lat: 33.4484,
        lng: -112.074,
      },
      abbrv: "PHO",
      scouting: 5,
      reputation: 4,
    },
    {
      cityID: "ce7fd867-78cc-41ee-8423-58dafb640515",
      name: "San Francisco",
      defaultTeamName: "Warriors",
      location: {
        lat: 37.7749,
        lng: -122.4194,
      },
      abbrv: "FRN",
      scouting: 5,
      reputation: 5,
    },
    {
      cityID: "c6424870-d72b-442c-994c-92a42f72f047",
      name: "Detroit",
      defaultTeamName: "Pistons",
      location: {
        lat: 42.3314,
        lng: -83.0458,
      },
      abbrv: "DET",
      scouting: 4,
      reputation: 4,
    },
    {
      cityID: "60b7658f-2e14-45bf-816d-2c343a113b73",
      name: "Minneapolis",
      defaultTeamName: "Lakers",
      location: {
        lat: 44.9778,
        lng: -93.265,
      },
      abbrv: "MIN",
      scouting: 4,
      reputation: 3,
    },
    {
      cityID: "a80bd533-93f5-4614-8cd0-b2c753b1b93b",
      name: "Denver",
      defaultTeamName: "Nuggets",
      location: {
        lat: 39.7392,
        lng: -104.9903,
      },
      abbrv: "DEN",
      scouting: 4,
      reputation: 3,
    },
    {
      cityID: "5ba614c0-8a13-4d81-a14a-09c503eae2cf",
      name: "Charlotte",
      defaultTeamName: "Bobcats",
      location: {
        lat: 35.2271,
        lng: -80.8431,
      },
      abbrv: "CHA",
      scouting: 3,
      reputation: 3,
    },
    {
      cityID: "bd16896c-a3b2-4d61-85d9-fa95967685c2",
      name: "San Antonio",
      defaultTeamName: "Spurs",
      location: {
        lat: 29.4241,
        lng: -98.4936,
      },
      abbrv: "ANT",
      scouting: 3,
      reputation: 5,
    },
    {
      cityID: "27ef185b-6b27-4c17-a36b-73bdb3bbab76",
      name: "Portland",
      defaultTeamName: "Trail Blazers",
      location: {
        lat: 45.5152,
        lng: -122.6784,
      },
      abbrv: "POR",
      scouting: 3,
      reputation: 3,
    },
    {
      cityID: "b355dd45-54d7-4290-bc61-2d05ca153ce8",
      name: "Sacramento",
      defaultTeamName: "Kings",
      location: {
        lat: 38.5816,
        lng: -121.4944,
      },
      abbrv: "SAC",
      scouting: 4,
      reputation: 3,
    },
    {
      cityID: "d3e2e785-4a3c-4b8b-b392-0a46edf2e756",
      name: "Orlando",
      defaultTeamName: "Magic",
      location: {
        lat: 28.5383,
        lng: -81.3792,
      },
      abbrv: "ORL",
      scouting: 4,
      reputation: 3,
    },
    {
      cityID: "3d01641b-ca5c-44e9-bc7b-bb1704ceda14",
      name: "Cleveland",
      defaultTeamName: "Cavaliers",
      location: {
        lat: 41.4993,
        lng: -81.6944,
      },
      abbrv: "CLE",
      scouting: 4,
      reputation: 3,
    },
    {
      cityID: "35cfbe30-c6fc-4377-989d-c2afec435ae2",
      name: "Indianapolis",
      defaultTeamName: "Pacers",
      location: {
        lat: 39.7684,
        lng: -86.1581,
      },
      abbrv: "IND",
      scouting: 3,
      reputation: 2,
    },
    {
      cityID: "309aa35a-fb3a-423c-950b-63400fae7599",
      name: "Milwaukee",
      defaultTeamName: "Bucks",
      location: {
        lat: 43.0389,
        lng: -87.9065,
      },
      abbrv: "MIL",
      scouting: 3,
      reputation: 3,
    },
    {
      cityID: "6fd58d33-ff7b-49f2-af56-38ea034f08f9",
      name: "Oklahoma City",
      defaultTeamName: "Thunder",
      location: {
        lat: 35.4676,
        lng: -97.5164,
      },
      abbrv: "OKC",
      scouting: 2,
      reputation: 3,
    },
    {
      cityID: "820260e2-367d-4924-a0d0-0a0a8bcf9a0e",
      name: "Memphis",
      defaultTeamName: "Grizzlies",
      location: {
        lat: 35.1495,
        lng: -90.049,
      },
      abbrv: "MEM",
      scouting: 3,
      reputation: 2,
    },
    {
      cityID: "361724b6-6c7f-4f91-93e7-6aaab61927d7",
      name: "New Orleans",
      defaultTeamName: "Pelicans",
      location: {
        lat: 29.9511,
        lng: -90.0715,
      },
      abbrv: "NOS",
      scouting: 3,
      reputation: 2,
    },
    {
      cityID: "c05382a8-5970-4f82-9b7f-401f4f5d6d92",
      name: "Salt Lake City",
      defaultTeamName: "Jazz",
      location: {
        lat: 40.7608,
        lng: -111.891,
      },
      abbrv: "SLC",
      scouting: 3,
      reputation: 2,
    },
    {
      cityID: "eedfad43-d812-42ed-8aeb-4a5865d5eb30",
      name: "Las Vegas",
      defaultTeamName: "Aces",
      location: {
        lat: 36.1699,
        lng: -115.1398,
      },
      abbrv: "VEG",
      scouting: 3,
      reputation: 2,
    },
    {
      cityID: "7c19655d-6a6d-488c-9919-1ba326e424e0",
      name: "Pittsburgh",
      defaultTeamName: "Penguins",
      location: {
        lat: 40.4406,
        lng: -79.9959,
      },
      abbrv: "PIT",
      scouting: 3,
      reputation: 2,
    },
    {
      cityID: "f8763a97-552a-42df-999a-a757f02a8897",
      name: "St. Louis",
      defaultTeamName: "Bombers",
      location: {
        lat: 38.627,
        lng: -90.1994,
      },
      abbrv: "STL",
      scouting: 3,
      reputation: 2,
    },
    {
      cityID: "a401d49d-4b26-4d12-94d9-5fc6fbe891aa",
      name: "Kansas City",
      defaultTeamName: "Jayhawks",
      location: {
        lat: 39.0997,
        lng: -94.5786,
      },
      abbrv: "KAN",
      scouting: 2,
      reputation: 2,
    },
    {
      cityID: "23ff2224-c5d2-4e59-8b0a-b9a08d2b421f",
      name: "Baltimore",
      defaultTeamName: "Braves",
      location: {
        lat: 39.2904,
        lng: -76.6122,
      },
      abbrv: "BAL",
      scouting: 3,
      reputation: 2,
    },
    {
      cityID: "4867efe8-87fb-4668-b763-119c18ca9c15",
      name: "Columbus",
      defaultTeamName: "Crew",
      location: {
        lat: 39.9612,
        lng: -82.9988,
      },
      abbrv: "COL",
      scouting: 2,
      reputation: 2,
    },
    {
      cityID: "c06e5860-b8c6-44dc-879f-53eb8444e2eb",
      name: "San Diego",
      defaultTeamName: "Zookeepers",
      location: {
        lat: 32.7157,
        lng: -117.1611,
      },
      abbrv: "SDI",
      scouting: 2,
      reputation: 2,
    },
    {
      cityID: "00eb1b98-8646-4049-92b5-713202e34231",
      name: "Seattle",
      defaultTeamName: "Supersonics",
      location: {
        lat: 47.6062,
        lng: -122.3321,
      },
      abbrv: "SEA",
      scouting: 5,
      reputation: 5,
    },
    {
      cityID: "c32f12ee-d1f9-44e2-b62f-319622638c70",
      name: "Edmonton",
      defaultTeamName: "Elks",
      location: {
        lat: 53.5444,
        lng: -113.4909,
      },
      abbrv: "EDM",
      scouting: 3,
      reputation: 2,
    },
    {
      cityID: "6c08d52d-d710-445d-a851-aab0c406e02b",
      name: "Montreal",
      defaultTeamName: "Impact",
      location: {
        lat: 45.5017,
        lng: -73.5673,
      },
      abbrv: "MON",
      scouting: 4,
      reputation: 3,
    },
    {
      cityID: "6b0c29b5-8eab-45dc-a2ff-a13e25bdf14a",
      name: "Green Bay",
      defaultTeamName: "Packers",
      location: {
        lat: 44.5133,
        lng: -88.0133,
      },
      abbrv: "GRB",
      scouting: 2,
      reputation: 2,
    },
    {
      cityID: "63d06b31-365f-4033-aed8-a8e6a1122ecf",
      name: "Nashville",
      defaultTeamName: "Pioneers",
      location: {
        lat: 36.1627,
        lng: -86.7816,
      },
      abbrv: "NAS",
      scouting: 3,
      reputation: 2,
    },
    {
      cityID: "efac3832-6683-4ce2-81bf-6ba5b8dad345",
      name: "Louisville",
      defaultTeamName: "Cardinals",
      location: {
        lat: 38.2527,
        lng: -85.7585,
      },
      abbrv: "LOU",
      scouting: 2,
      reputation: 2,
    },
    {
      cityID: "e3193bb4-c9e7-4970-a0c1-b84f41bcfbd7",
      name: "Sao Paulo",
      defaultTeamName: "Samba",
      location: {
        lat: -23.5505,
        lng: -46.6333,
      },
      abbrv: "SAO",
      scouting: 2,
      reputation: 2,
    },
    {
      cityID: "39fb5ccf-29d5-4e01-a4b5-7ac90c2ec4f6",
      name: "Shanghai",
      defaultTeamName: "Sharks",
      location: {
        lat: 31.2304,
        lng: 121.4737,
      },
      abbrv: "SHA",
      scouting: 2,
      reputation: 3,
    },
    {
      cityID: "c468e175-78f6-4353-8012-d2df0a8d4c5e",
      name: "Istanbul",
      defaultTeamName: "Basaksehir",
      location: {
        lat: 41.0082,
        lng: 28.9784,
      },
      abbrv: "IST",
      scouting: 2,
      reputation: 3,
    },
    {
      cityID: "f42e23e0-3186-4a61-94fd-fe39a02b7232",
      name: "Tokyo",
      defaultTeamName: "Tigers",
      location: {
        lat: 35.6895,
        lng: 139.6917,
      },
      abbrv: "TOK",
      scouting: 2,
      reputation: 3,
    },
    {
      cityID: "d71d893f-c250-425b-95fe-9cd82ed1ce42",
      name: "London",
      defaultTeamName: "Lions",
      location: {
        lat: 51.5074,
        lng: -0.1278,
      },
      abbrv: "LON",
      scouting: 3,
      reputation: 3,
    },
    {
      cityID: "ece721a7-7a3b-4a9c-a36d-ec236f587200",
      name: "Paris",
      defaultTeamName: "Saint Germain",
      location: {
        lat: 48.8566,
        lng: 2.3522,
      },
      abbrv: "PAR",
      scouting: 3,
      reputation: 3,
    },
    {
      cityID: "36569afe-0afe-4f26-ad00-a241da1c572e",
      name: "Berlin",
      defaultTeamName: "Gulls",
      location: {
        lat: 52.52,
        lng: 13.405,
      },
      abbrv: "BER",
      scouting: 3,
      reputation: 4,
    },
    {
      cityID: "c45cf28c-019b-4bb7-9d25-9420f34e8b9a",
      name: "Madrid",
      defaultTeamName: "Royalty",
      location: {
        lat: 40.4168,
        lng: -3.7038,
      },
      abbrv: "MAD",
      scouting: 4,
      reputation: 3,
    },
    {
      cityID: "6bcb605f-92f7-4d22-af99-192697b0f670",
      name: "Rome",
      defaultTeamName: "Promenade",
      location: {
        lat: 41.9028,
        lng: 12.4964,
      },
      abbrv: "RME",
      scouting: 3,
      reputation: 4,
    },
    {
      cityID: "481f48c4-2a99-4683-859d-b1ba408aa912",
      name: "Belgrade",
      defaultTeamName: "Bruisers",
      location: {
        lat: 44.7866,
        lng: 20.4489,
      },
      abbrv: "BLG",
      scouting: 3,
      reputation: 3,
    },
    {
      cityID: "175817e4-b18b-4a1a-b99d-51e0311fa705",
      name: "Athens",
      defaultTeamName: "Army",
      location: {
        lat: 37.9838,
        lng: 23.7275,
      },
      abbrv: "ATH",
      scouting: 3,
      reputation: 3,
    },
    {
      cityID: "5640e209-fba8-4cc1-a86f-e0599efd0f62",
      name: "Prague",
      defaultTeamName: "Kingsman",
      location: {
        lat: 50.0755,
        lng: 14.4378,
      },
      abbrv: "PRA",
      scouting: 3,
      reputation: 4,
    },
    {
      cityID: "5f63931f-b33c-4ec7-be72-3a35a7e3c14e",
      name: "Johannesburg",
      defaultTeamName: "Jets",
      location: {
        lat: -26.2041,
        lng: 28.0473,
      },
      abbrv: "JNB",
      scouting: 3,
      reputation: 3,
    },
    {
      cityID: "ea11449e-1fac-4720-b9e3-2aa0e354a345",
      name: "Cairo",
      defaultTeamName: "Al Ahly",
      location: {
        lat: 30.0444,
        lng: 31.2357,
      },
      abbrv: "CAI",
      scouting: 3,
      reputation: 3,
    },
    {
      cityID: "fb7757f6-bcb4-46db-b80f-e035263e8407",
      name: "Lagos",
      defaultTeamName: "Lazers",
      location: {
        lat: 6.5244,
        lng: 3.3792,
      },
      abbrv: "LGS",
      scouting: 3,
      reputation: 3,
    },
    {
      cityID: "67e3971c-2b0e-4911-a333-6ceec3193804",
      name: "Sydney",
      defaultTeamName: "Wave",
      location: {
        lat: -33.8651,
        lng: 151.2099,
      },
      abbrv: "SYD",
      scouting: 3,
      reputation: 4,
    },
    {
      cityID: "f3cb4559-1ccd-43bf-b4b4-ff352e333d63",
      name: "Mexico City",
      defaultTeamName: "Aztecs",
      location: {
        lat: 19.4326,
        lng: -99.1332,
      },
      abbrv: "MEX",
      scouting: 3,
      reputation: 3,
    },
    {
      cityID: "2f9346ba-152c-40bb-abf8-888d48d2d1b8",
      name: "Buenos Aires",
      defaultTeamName: "Baskets",
      location: {
        lat: -34.6037,
        lng: -58.3816,
      },
      abbrv: "BUE",
      scouting: 3,
      reputation: 3,
    },
    {
      cityID: "6eb9ecd0-8b51-4d8e-9660-b0e3beeefc87",
      name: "Barcelona",
      defaultTeamName: "BC",
      location: {
        lat: 41.3851,
        lng: 2.1734,
      },
      abbrv: "BAR",
      scouting: 3,
      reputation: 4,
    },
    {
      cityID: "849a36c1-ed2d-4b96-9f4b-4697bc249b52",
      name: "Tampa Bay",
      defaultTeamName: "Buccaneers",
      location: {
        lat: 27.7634,
        lng: -82.5437,
      },
      abbrv: "TMB",
      scouting: 4,
      reputation: 3,
    },
    {
      cityID: "33e7823d-d1f2-4e70-8fa1-27af37ee5639",
      name: "Dakar",
      defaultTeamName: "Darkwings",
      location: {
        lat: 14.7167,
        lng: -17.4677,
      },
      abbrv: "DKR",
      scouting: 3,
      reputation: 2,
    },
    {
      cityID: "6f540684-af77-4964-8c5f-f6409826bd1c",
      name: "Yaounde",
      defaultTeamName: "Yellow-Jackets",
      location: {
        lat: 3.848,
        lng: 11.5021,
      },
      abbrv: "YND",
      scouting: 3,
      reputation: 2,
    },
  ]);

  const [direction, setDirection] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);

  const navigate = useNavigate();

  function filterCol(type) {
    setDirection((prevDir) => !prevDir);

    let filtCities = [...cities];

    if (type === "scouting" || type === "reputation") {
      filtCities.sort((a, b) => {
        if (direction) {
          return a[type] - b[type];
        }
        return b[type] - a[type];
      });
      setCities(filtCities);
    } else {
      filtCities.sort((a, b) => {
        const nameA = a[type].toUpperCase();
        const nameB = b[type].toUpperCase();

        if (direction) {
          return nameA.localeCompare(nameB);
        }
        return nameB.localeCompare(nameA);
      });
      setCities(filtCities);
    }
  }

  function handleTeamSelect() {
    let cityChoice = cities[selectedRow - 1];
    addUserInfo({ chosenCity: cityChoice, players: players });
    setCenter(cityChoice);
    generateLeague({ id: cityChoice.cityID });
    navigate("home");
  }

  return (
    <div className="grid-container">
      <div className="grid-corner corner">
        <img src={BBALLIMAGE} />
        <h1>scouted</h1>
      </div>
      <div className="grid-header header"></div>
      <div className="grid-main main">
        <h3>Choose Your Team</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <td onClick={() => filterCol("name")} className="filter">
                  City
                </td>
                <td
                  onClick={() => filterCol("defaultTeamName")}
                  className="filter"
                >
                  Team Name
                </td>
                <td onClick={() => filterCol("scouting")} className="filter">
                  Scouting
                </td>
                <td onClick={() => filterCol("reputation")} className="filter">
                  Reputation
                </td>
                <td className="end"></td>
              </tr>
            </thead>
            <tbody>
              {cities &&
                cities.map((city, idx) => (
                  <tr key={idx}>
                    <td>{city.name}</td>
                    <td>{city.defaultTeamName}</td>
                    <td>{city.scouting}</td>
                    <td>{city.reputation}</td>
                    <td className="end">
                      <input
                        type="checkbox"
                        checked={selectedRow - 1 === idx}
                        onChange={() => setSelectedRow(idx + 1)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid-submit-button button-wrapper">
        <button
          className="button"
          disabled={!selectedRow}
          onClick={() => handleTeamSelect()}
        >
          Choose Team
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cities: state.cities,
    players: state.players,
  };
};

const mapDispatchToProps = {
  generateLeague,
  addUserInfo,
  setCenter,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamSelect);
