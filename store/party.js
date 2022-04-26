import { baseInstance } from "../axios";

// ACTION TYPES
const LOAD_SHOUT_PARTY = "party/load-shout";
const LOAD_INDIVIDUAL_PARTY = "party/load-individual";
const TOGGLE_PARTY_LOADED = "party/toggle-loaded";
const TOGGLE_PARTY_IS_LOADING = "party/toggle-isloading";
const TOGGLE_INVITES_LOADED = "invites/toggle-loaded";
const TOGGLE_INVITES_IS_LOADING = "invites/toggle-isloading";
const SET_UPDATE_INDIVIDUAL_PARTY_ERROR = "party/update-individual-error";
const SET_UPDATE_SHOUT_PARTY_ERROR = "party/update-shout-error";
const SET_UPDATED_PARTIES = "party/updated";
const ADD_PARTY = "party/add";

const SET_ERROR = "set-error";
const CREATING_PARTY = "party/creating";
const PARTY_CREATED = "party/created";
const UPDATE_IDS = "party/updateIds";

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
  creatingParty: false,
  partyCreated: null,

  updatedPartiesDetailId: [],
  errorUpdatingIndividual: false,
  errorUpdatingShout: false,
  updated: false,

  errorMessage: false,
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
    case UPDATE_IDS:
      return { ...state, updatedPartiesDetailId: action.payload };
    case ADD_PARTY:
      return { ...state, parties: { ...state.parties, individual: [...state.parties.individual, action.payload] } };

    case TOGGLE_INVITES_LOADED:
      return { ...state, invitesIsLoaded: action.payload };
    case TOGGLE_INVITES_IS_LOADING:
      return { ...state, invitesIsLoading: action.payload };

    case SET_ERROR:
      return { ...state, errorMessage: action.payload };
    case CREATING_PARTY:
      return { ...state, creatingParty: action.payload };
    case PARTY_CREATED:
      return { ...state, partyCreated: action.payload };

    case SET_UPDATE_INDIVIDUAL_PARTY_ERROR:
      return { ...state, errorUpdatingIndividual: action.payload };
    case SET_UPDATE_SHOUT_PARTY_ERROR:
      return { ...state, errorUpdatingShout: action.payload };
    case SET_UPDATED_PARTIES:
      return { ...state, updated: action.payload };

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
export const getUpdatedPartiesDetailsId = (state) => {
  return state.allParties.updatedPartiesDetailId;
};
export const getUpdatedStatus = (state) => {
  return state.allParties.updated;
};

export const getNewParty = (state) => {
  return state.allParties.newParty;
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
export const getCreatingPartyStatus = (state) => {
  return state.allParties.creatingParty;
};

export const getpartyCreated = (state) => {
  return state.allParties.partyCreated;
};

// Error selector
export const getErrorStatus = (state) => {
  return state.allParties.errorMessage;
};

// Action Creators
const loadShoutParty = (party) => {
  return { type: LOAD_SHOUT_PARTY, payload: party };
};
export const loadIndividualParty = (party) => {
  return { type: LOAD_INDIVIDUAL_PARTY, payload: party };
};
export const loadInvitesParties = (party) => {
  return { type: LOAD_INDIVIDUAL_PARTY, payload: party };
};

export const setUpdatedIds = (ids) => {
  return { type: UPDATE_IDS, payload: ids };
};

const setError = (message) => {
  return { type: SET_ERROR, payload: message };
};

export const setPartyCreated = (status) => {
  console.log("in set party created and value is ", status);
  return { type: PARTY_CREATED, payload: status };
};

export const addParty = (party) => {
  return { type: ADD_PARTY, payload: party };
};

// Sort by date function
function compare(a, b) {
  if (Date.parse(a.date) > Date.parse(b.date)) return 1;
  if (Date.parse(a.date) < Date.parse(b.date)) return -1;
  return 0;
}
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
      // const sorted = individualParties.sort(compare);
      // console.log("sorted parties is ", sorted);
      dispatch(loadShoutParty(shoutParties.sort(compare)));
      dispatch(loadIndividualParty(individualParties.sort(compare)));
      dispatch(updateAllParties(individualParties, id, "individual"));
      dispatch(updateAllParties(shoutParties, id, "shout"));
      dispatch({ type: TOGGLE_PARTY_LOADED, payload: true });
      dispatch({ type: TOGGLE_PARTY_IS_LOADING, payload: false });
    } catch (error) {
      if (error.response) {
        console.log("a 400 error has occured");
        // No parties response from the server
        dispatch({ type: TOGGLE_INVITES_LOADED, payload: true });
        // dispatch({ type: TOGGLE_PARTY_LOADED, payload: true });
      }
      console.log("An error occured", error.message);
      dispatch(setError("Load all parties error"));
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
      dispatch(loadInvitesParties(inviteParties.sort(compare)));
      dispatch({ type: TOGGLE_INVITES_LOADED, payload: true });
      dispatch({ type: TOGGLE_INVITES_IS_LOADING, payload: false });
    } catch (error) {
      console.log("An error occured in load all invites", error.response);
      if (error?.response && error?.response?.status == 400) {
        console.log("a 400 error has occured");
        // No Invites response from the server
        dispatch({ type: TOGGLE_INVITES_LOADED, payload: true });
      } else {
        dispatch({ type: TOGGLE_INVITES_LOADED, payload: false });
      }
      dispatch({ type: TOGGLE_INVITES_IS_LOADING, payload: false });
    }
  };
};

export const createParty = (partyData) => {
  return async (dispatch, getState) => {
    dispatch({ type: CREATING_PARTY, payload: true });
    // dispatch(setError(false));
    // dispatch(setPartyCreated(false));
    console.log("party data is", JSON.stringify(partyData));
    try {
      const user = getState().user;
      console.log("IN try catch...", user.user.id);
      const resp = await baseInstance.post("/party/create", JSON.stringify(partyData));
      console.log("After creating Party: Response is:", resp.data.data);
      // dispatch(loadAllParties(user.user.id));
      dispatch(addParty(resp.data.data));
      // console.log("update individual party", getState().allParties.parties.individual);
      dispatch(setPartyCreated(resp.data.data));
      dispatch({ type: CREATING_PARTY, payload: false });
      dispatch(loadIndividualParty(getState().allParties.parties.individual.sort(compare)));
      dispatch(setError(""));
      // setTimeout(() => {
      //   dispatch(setPartyCreated(false));
      // }, 8000);
    } catch (error) {
      if (error.response) {
        console.log("REsponse errro", error.response);
      }
      console.log("Error creating partyies");
      dispatch(setError("Could'nt create party"));
      dispatch({ type: PARTY_CREATED, payload: false });
      dispatch({ type: CREATING_PARTY, payload: false });
    }
    // dispatch(setPartyCreated(false));
  };
};

export const createGiftGoal = (giftData) => {
  return async (dispatch) => {
    try {
      // const resp =
    } catch (error) {}
  };
};

export const updateParty = (updateObj, partyId, type) => {
  console.log("In update party ", updateObj);
  console.log("update party id is", partyId);
  return async (dispatch, getState) => {
    const state = getState();
    if (type == "individual") {
      const parties = state.allParties.parties.individual;
      const updatedIds = [...state.allParties.updatedPartiesDetailId, partyId];
      console.log("updated parties id", updatedIds);
      const updatedParties = parties.map((party) => {
        if (party.id == partyId) {
          return updateObj;
        } else {
          return party;
        }
      });
      dispatch(loadIndividualParty(updatedParties));
      dispatch(setUpdatedIds(updatedIds));
    }
  };
};

export const updateAllParties = (parties, userId, type) => {
  return async (dispatch) => {
    const allPartiesPromises = parties.map((el) => {
      return baseInstance.post("/party/details", {
        id: el.id,
        user: userId,
      });
    });
    try {
      const updatedParties = (await Promise.all(allPartiesPromises)).map((el) => {
        return el.data.party;
      });

      if (type == "individual") {
        dispatch(loadIndividualParty(updatedParties.sort(compare)));
        dispatch({ type: SET_UPDATE_INDIVIDUAL_PARTY_ERROR, payload: false });
      } else {
        dispatch(loadShoutParty(updatedParties.sort(compare)));
        dispatch({ type: SET_UPDATE_SHOUT_PARTY_ERROR, payload: false });
      }
      dispatch({ type: SET_UPDATED_PARTIES, payload: true });
      console.log("in update all parties function", updatedParties);
    } catch (error) {
      console.log("There was an error updating parites");
      if (type == "individual") {
        dispatch({ type: SET_UPDATE_INDIVIDUAL_PARTY_ERROR, payload: true });
      } else {
        dispatch({ type: SET_UPDATE_SHOUT_PARTY_ERROR, payload: true });
      }
      dispatch({ type: SET_UPDATED_PARTIES, payload: false });
    }
  };
};
