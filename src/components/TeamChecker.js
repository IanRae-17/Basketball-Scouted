import { useMemo } from "react";
function TeamChecker({ cities }) {
  const leagueCities = useMemo(() => {
    return cities.filter((city) => city.hasTeam);
  }, [cities]);
  return (
    <>
      {leagueCities &&
        leagueCities.map((city) => (
          <div>
            <p>{city.name}</p>
            <ul>
              {Object.values(city.roster).map((value) => {
                if (value) {
                  return <li>{value.name}</li>;
                }
              })}
            </ul>
          </div>
        ))}
    </>
  );
}

export default TeamChecker;
