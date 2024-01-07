import { useSelector } from "react-redux";

function useDay() {
  const simulation = useSelector((state) => state.simulation);

  return simulation.day;
}

export default useDay;
