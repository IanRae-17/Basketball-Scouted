import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import scoreContract from "../utils/scoreContract";

const initialContractsState = [];

const contractsSlice = createSlice({
  name: "contracts",
  initialState: initialContractsState,
  reducers: {
    addContract: (state, action) => {
      const { team, player, day } = action.payload;
      const contract = {
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
    rejectUserContract: (state, action) => {
      return state.map((contract) =>
        contract.contractID === action.payload
          ? { ...contract, status: "rejected" }
          : contract
      );
    },
    chooseUserContract: (state, action) => {
      return state.map((contract) =>
        contract.contractID === action.payload
          ? { ...contract, status: "decision" }
          : contract
      );
    },
    acceptUserContract: (state, action) => {
      return state.map((contract) =>
        contract.contractID === action.payload
          ? { ...contract, status: "accepted" }
          : contract
      );
    },
    declineUserContract: (state, action) => {
      return state.map((contract) =>
        contract.contractID === action.payload
          ? { ...contract, status: "declined" }
          : contract
      );
    },
    retractCPUContract: (state, action) => {
      return state.map((contract) =>
        contract.contractID === action.payload
          ? { ...contract, status: "retracted" }
          : contract
      );
    },
    setContracts: (state, action) => {
      return action.payload;
    },
  },
});

export const {
  addContract,
  handleContract,
  chooseUserContract,
  rejectUserContract,
  acceptUserContract,
  declineUserContract,
  retractCPUContract,
  setContracts,
} = contractsSlice.actions;
export default contractsSlice.reducer;
