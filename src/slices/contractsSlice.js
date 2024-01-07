import { createSlice } from "@reduxjs/toolkit";

import { v4 as uuidv4 } from "uuid";
import scoreContract from "../utils/scoreContract";

const initialContractsState = [];

const contractsSlice = createSlice({
  name: "contracts",
  initialState: initialContractsState,
  reducers: {
    addContract: (state, action) => {
      let { team, player, day } = action.payload;
      let contract = {
        contractID: uuidv4(),
        team: team,
        player: player,
        finishDay: day + Math.floor(Math.random() * 8) + 3,
        score: scoreContract(team, player),
        isHandled: false,
        status: "pending",
      };
      state.push(contract);
    },
    handleContract: (state, action) => {
      return state.map((contract) =>
        contract.contractID === action.payload
          ? { ...contract, isHandled: true }
          : contract
      );
    },
    handleUserContractNotChosen: (state, action) => {
      return state.map((contract) =>
        contract.contractID === action.payload
          ? { ...contract, status: "rejected" }
          : contract
      );
    },
    handleUserContractChosen: (state, action) => {
      return state.map((contract) =>
        contract.contractID === action.payload
          ? { ...contract, status: "decision" }
          : contract
      );
    },
    handleUserContractAccepted: (state, action) => {
      return state.map((contract) =>
        contract.contractID === action.payload
          ? { ...contract, status: "accepted" }
          : contract
      );
    },
    handleUserContractDeclined: (state, action) => {
      return state.map((contract) =>
        contract.contractID === action.payload
          ? { ...contract, status: "declined" }
          : contract
      );
    },
    handleCPURetractContract: (state, action) => {
      return state.map((contract) =>
        contract.contractID === action.payload
          ? { ...contract, status: "retracted" }
          : contract
      );
    },
    setContracts: (state, action) => {
      return action.payload;
    },
    // Add other actions related to players
  },
});

export const {
  addContract,
  handleContract,
  handleUserContractChosen,
  handleUserContractNotChosen,
  handleUserContractAccepted,
  handleUserContractDeclined,
  handleCPURetractContract,
  setContracts,
} = contractsSlice.actions;
export default contractsSlice.reducer;
