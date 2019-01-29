import { types } from "Models/gameSearch";
import { types as fetchTypes } from "Models/fetch";
import { getCasinoPlayerGames } from "Api/api.casinoPlayerGames";
import {
  getGameLists,
  getQuerySearch,
  getLatestPlayedGames,
  getGamesByProviderGameNames,
} from "Api/api.gamebrowser";

export const preloadFetchPlayerGames = () => ({
  type: types.GAME_SEARCH_FETCH_PLAYER_GAMES,
});

export const fetchPlayerGames = () => ({
  type: fetchTypes.FETCH,
  name: types.GAME_SEARCH_FETCH_PLAYER_GAMES_START,
  postFetch: types.GAME_SEARCH_FETCH_PLAYER_GAMES_COMPLETE,
  asyncCall: getCasinoPlayerGames,
});

export const initFetchQuerySearch = q => ({
  type: types.GAME_SEARCH_FETCH,
  q,
});

export const clearSearch = () => ({ type: types.GAME_SEARCH_CLEAR });

export const fetchQuerySearch = ({ platform, country, q }) => ({
  type: fetchTypes.FETCH,
  name: types.GAME_SEARCH_FETCH_START,
  postFetch: types.GAME_SEARCH_FETCH_COMPLETE,
  asyncCall: getQuerySearch,
  asyncCallData: { platform, country, q },
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
