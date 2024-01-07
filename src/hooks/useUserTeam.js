import { useSelector } from "react-redux";

function useUserTeam() {
  const cities = useSelector((state) => state.cities);

  const userTeam = cities.filter((city) => city.userTeam)[0];

  return userTeam;
}

export default useUserTeam;
