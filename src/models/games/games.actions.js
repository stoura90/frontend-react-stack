import { types as fetchTypes } from "Models/fetch";
import { fetchGames } from "Api/api.games";
import { types } from "./games.constants";
import { getGamesBySlugs } from "Api/api.gamebrowser";

export const initiateFetchGamesBySlugs = ({
  slugs,
  platform,
  country,
  variant,
}) => {
  return {
    type: fetchTypes.FETCH,
    name: types.FETCH_GAMES_BY_SLUGS,
    postFetch: types.FETCH_GAMES_BY_SLUGS_COMPLETE,
    asyncCall: getGamesBySlugs,
    asyncCallData: { platform, country, slugs, variant },
  };
};

export const initFetchTopLists = () => ({
  type: types.INIT_FETCH_GAME_LISTS,
});

export const fetchTopLists = asyncCallData => ({
  type: fetchTypes.FETCH,
  name: types.FETCH_TOP_LISTS_START,
  asyncCallData,
  asyncCall: fetchGames,
  postFetch: types.FETCH_TOP_LISTS_COMPLETE,
});

export const fetchGamesBySlugs = slugs => ({
  slugs,
  type: types.FETCH_GAMES_BY_SLUGS_START,
});

export const launchGame = slug => ({ type: types.LAUNCH_GAME, slug });
