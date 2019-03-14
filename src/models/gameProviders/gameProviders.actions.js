import { types as fetchTypes } from "Models/fetch";
import { getGameProviders } from "Api/api.casinoPlayerGames";
import { types } from "./gameProviders.constants";

export const initiateFetchGameProviders = () => ({
  type: fetchTypes.FETCH,
  name: types.FETCH_GAME_PROVIDERS,
  postFetch: types.FETCH_GAME_PROVIDERS_COMPLETE,
  asyncCall: getGameProviders,
});

export const fetchGameProviders = () => ({
  type: types.FETCH_GAME_PROVIDERS_START,
});
