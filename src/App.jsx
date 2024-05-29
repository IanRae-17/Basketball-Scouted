// src/App.jsx
import React, { useMemo } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "./store";
import Header from "./components/Header";
import PlayersPage from "./pages/PlayersPage";
import CitiesPage from "./pages/CitiesPage";
import ContractsPage from "./pages/ContractsPage";
import ScoutingPage from "./pages/ScoutingPage";
import DayCounter from "./components/DayCounter";
import TeamPage from "./pages/TeamPage";
import FinishPage from "./pages/FinishPage";

const AppContent = () => {
  const location = useLocation();
  const cities = useSelector((state) => state.cities);
  const citySelected = useMemo(() => {
    return cities.some((city) => city.userTeam);
  }, [cities]);

  return (
    <div className="min-h-screen bg-neutral-800 text-white flex flex-col">
      <Header />
      {citySelected && location.pathname !== "/finish" && <DayCounter />}
      <main className="flex-grow container mx-auto max-w-screen-lg p-4">
        <Routes>
          {!citySelected && <Route path="*" element={<CitiesPage />} />}
          {citySelected && (
            <>
              <Route path="/" element={<PlayersPage />} />
              <Route path="/players" element={<PlayersPage />} />
              <Route path="/contracts" element={<ContractsPage />} />
              <Route path="/scouting" element={<ScoutingPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/finish" element={<FinishPage />} />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
};

export default App;
