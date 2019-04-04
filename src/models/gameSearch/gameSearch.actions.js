import { types, getSearchFetchCompleteType } from "Models/gameSearch";
import { types as fetchTypes } from "Models/fetch";
import {
  getGameLists,
  getLatestPlayedGames,
  getGamesByProviderGameNames,
} from "Api/api.gamebrowser";
import { getCasinoPlayerGameSearch } from "Api/api.casinoPlayerGames";
import { fetchSuggestedGames } from "Api/api.games";

export const initFetchQuerySearch = query => ({
  type: types.GAME_SEARCH_FETCH,
  query,
});

export const clearSearch = () => ({ type: types.GAME_SEARCH_CLEAR });

export const initFetchSuggested = () => ({
  type: types.GAME_SEARCH_FETCH_SUGGESTED_GAMES_START,
});

export const fetchQuerySearch = ({ page, pageSize, sessionId, query }) => ({
  type: fetchTypes.FETCH,
  name: types.GAME_SEARCH_FETCH_START,
  postFetch: getSearchFetchCompleteType(query),
  asyncCall: getCasinoPlayerGameSearch,
  asyncCallData: { page, pageSize, sessionId, query },
});

export const fetchLatestPlayedGames = ({ playerId }) => ({
  type: fetchTypes.FETCH,
  name: types.GAME_SEARCH_FETCH_LATEST_PLAYED_START,
  postFetch: types.GAME_SEARCH_FETCH_LATEST_PLAYED_COMPLETE,
  asyncCall: getLatestPlayedGames,
  asyncCallData: { playerId },
});

export const fetchGamesByProviderGameNames = ({
  platform,
  country,
  variant,
  providerGameNames,
}) => ({
  type: fetchTypes.FETCH,
  name: types.GAME_SEARCH_FETCH_GAMES_PROVIDER_START,
  postFetch: types.GAME_SEARCH_FETCH_GAMES_PROVIDER_COMPLETE,
  asyncCall: getGamesByProviderGameNames,
  asyncCallData: { platform, country, variant, providerGameNames },
});

export const fetchMostPopularGames = ({
  platform,
  country,
  id,
  variant = "default",
  page = 0,
  pageSize = 5,
}) => ({
  type: fetchTypes.FETCH,
  name: types.GAME_SEARCH_FETCH_MOSTPOPULAR_START,
  postFetch: types.GAME_SEARCH_FETCH_MOSTPOPULAR_COMPLETE,
  asyncCall: getGameLists,
  asyncCallData: { platform, country, id, variant, page, pageSize },
});

export const fetchSuggestedGamesAction = (
  game,
  handshake,
  platform,
  country,
  variant
) => ({
  type: fetchTypes.FETCH,
  name: types.GAME_SEARCH_FETCH_SUGGESTED_GAMES_START,
  postFetch: types.GAME_SEARCH_FETCH_SUGGESTED_GAMES_COMPLETE,
  asyncCall: fetchSuggestedGames,
  asyncCallData: {
    game,
    handshake,
    platform,
    country,
    variant,
  },
});
