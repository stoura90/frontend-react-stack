import { types } from "./gameSearch.constants";

export const gameSearchReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GAME_SEARCH_FETCH_PLAYER_GAMES:
    case types.GAME_SEARCH_FETCH: {
      return {
        ...state,
        loading: true,
      };
    }

    case types.GAME_SEARCH_NO_RESULTS: {
      return {
        ...state,
        hasNoResults: true,
      };
    }

    case types.GAME_SEARCH_NO_LATEST_PLAYED: {
      return {
        ...state,
        hasNoLatestPlayed: true,
      };
    }

    case types.GAME_SEARCH_FETCH_PLAYER_GAMES_COMPLETE:
    case types.GAME_SEARCH_FETCH_COMPLETE: {
      return {
        ...state,
        loading: false,
      };
    }

    case types.GAME_SEARCH_CLEAR: {
      return {
        ...state,
        loading: false,
        hasNoResults: false,
        hasNoLatestPlayed: false,
      };
    }

    default:
      return state;
  }
};

export default gameSearchReducer;
