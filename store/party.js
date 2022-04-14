import { baseInstance } from "../axios";

// ACTION TYPES
const LOAD_SHOUT_PARTY = "party/load-shout";
const LOAD_INDIVIDUAL_PARTY = "party/load-individual";
const TOGGLE_PARTY_LOADED = "party/toggle-loaded";
const TOGGLE_PARTY_IS_LOADING = "party/toggle-isloading";
const TOGGLE_INVITES_LOADED = "invites/toggle-loaded";
const TOGGLE_INVITES_IS_LOADING = "invites/toggle-isloading";

const initState = {
  parties: {
    shout: [],
    individual: [],
    invites: [],
  },
  partiesLoaded: false,
  partiesIsLoading: true,
  invitesIsLoaded: false,
  invitesIsLoading: true,
};

// Party Reducer
export const PartyReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_SHOUT_PARTY:
      return { ...state, parties: { ...state.parties, shout: action.payload } };
    case LOAD_INDIVIDUAL_PARTY:
      return { ...state, parties: { ...state.parties, individual: action.payload } };
    case TOGGLE_PARTY_LOADED:
      return { ...state, partiesLoaded: action.payload };
    case TOGGLE_PARTY_IS_LOADING:
      return { ...state, partiesIsLoading: action.payload };

    case TOGGLE_INVITES_LOADED:
      return { ...state, invitesIsLoaded: action.payload };
    case TOGGLE_INVITES_IS_LOADING:
      return { ...state, invitesIsLoading: action.payload };

    default:
      return { ...state };
  }
};

// Selectors
// Parties Selectors
export const getShoutParties = (state) => {
  return state.allParties.parties.shout;
};
export const getIndividualParties = (state) => {
  return state.allParties.parties.individual;
};
export const getPartiesLoadedStatus = (state) => {
  return state.allParties.partiesLoaded;
};
export const getIsPartiesLoadingStatus = (state) => {
  return state.allParties.partiesIsLoading;
};

// Invites Selectors
export const getInvitesParties = (state) => {
  return state.allParties.parties.invites;
};
export const getInvitesLoadedStatus = (state) => {
  return state.allParties.invitesIsLoaded;
};
export const getIsInvitesLoadingStatus = (state) => {
  return state.allParties.invitesIsLoading;
};

// Action Creators
const loadShoutParty = (party) => {
  return { type: LOAD_SHOUT_PARTY, payload: party };
};
const loadIndividualParty = (party) => {
  return { type: LOAD_INDIVIDUAL_PARTY, payload: party };
};
const loadInvitesParties = (party) => {
  return { type: LOAD_INDIVIDUAL_PARTY, payload: party };
};

// Async Actions
export const loadAllParties = (id) => {
  console.log("user id is ", id);
  return async (dispatch, state) => {
    console.log("In dispath load parties");
    dispatch({ type: TOGGLE_PARTY_IS_LOADING, payload: true });
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
      dispatch({ type: TOGGLE_PARTY_IS_LOADING, payload: false });
    } catch (error) {
      console.log("An error occured", error.message);
      dispatch({ type: TOGGLE_PARTY_LOADED, payload: false });
      dispatch({ type: TOGGLE_PARTY_IS_LOADING, payload: false });
    }
  };
};

export const loadAllInvites = (id) => {
  console.log("user id is ", id);
  return async (dispatch, state) => {
    console.log("In dispath load invites");
    dispatch({ type: TOGGLE_INVITES_IS_LOADING, payload: true });
    try {
      const inviteResp = await baseInstance.post("/party/invites", { user: id });
      console.log("INvite respons...e", inviteResp);

      const inviteParties = inviteResp.data.parties;
      dispatch(loadInvitesParties(inviteParties));
      dispatch({ type: TOGGLE_INVITES_LOADED, payload: true });
      dispatch({ type: TOGGLE_INVITES_IS_LOADING, payload: false });
    } catch (error) {
      console.log("An error occured", error);
      dispatch({ type: TOGGLE_INVITES_LOADED, payload: false });
      dispatch({ type: TOGGLE_INVITES_IS_LOADING, payload: false });
    }
  };
};
