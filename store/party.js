import { baseInstance } from "../axios";

// ACTION TYPES
const LOAD_SHOUT_PARTY = "party/load-shout";
const LOAD_INDIVIDUAL_PARTY = "party/load-individual";
const TOGGLE_PARTY_LOADED = "party/toggle-loaded";

const initState = {
  parties: {
    shout: [],
    individual: [],
  },
  loaded: false,
};

// Party Reducer
export const PartyReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_SHOUT_PARTY:
      return { ...state, parties: { ...state.parties, shout: action.payload } };
    case LOAD_INDIVIDUAL_PARTY:
      return { ...state, parties: { ...state.parties, individual: action.payload } };
    case TOGGLE_PARTY_LOADED:
      return { ...state, loaded: action.payload };

    default:
      return { ...state };
  }
};

// Selectors
export const getShoutParties = (state) => {
  return state.allParties.parties.shout;
};
export const getIndividualParties = (state) => {
  return state.allParties.parties.individual;
};
export const getPartiesLoadedStatus = (state) => {
  return state.allParties.loaded;
};

// Action Creators
const loadShoutParty = (party) => {
  return { type: LOAD_SHOUT_PARTY, payload: party };
};
const loadIndividualParty = (party) => {
  return { type: LOAD_INDIVIDUAL_PARTY, payload: party };
};

export const loadAllParties = (id) => {
  return async (dispatch, state) => {
    console.log("In dispath load parties");
    try {
      const resp = await baseInstance.post("/party", { user: id });

      console.log("response from load all Parties is", resp.data);
      const shoutParties = resp.data.parties.filter((party) => party.type == "shout");
      const individualParties = resp.data.parties.filter((party) => party.type == "individual");
      //   console.log("Shout Parties", shoutParties);
      //   console.log("INdive Parties", individualParties);
      dispatch(loadShoutParty(shoutParties));
      dispatch(loadIndividualParty(individualParties));
      dispatch({ type: TOGGLE_PARTY_LOADED, payload: true });
    } catch (error) {
      console.log("An error occured", error);
      dispatch({ type: TOGGLE_PARTY_LOADED, payload: true });
    }
  };
};
