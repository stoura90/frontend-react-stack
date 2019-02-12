import { types } from "Models/playerGames";
import { types as fetchTypes } from "Models/fetch";
import { getCasinoPlayerGames } from "Api/api.casinoPlayerGames";

export const preloadFetchPlayerGames = ({ startIndex, pageSize }) => ({
  type: types.PLAYER_GAMES_FETCH,
  startIndex,
  pageSize,
});

export const fetchPlayerGames = ({ page, pageSize }) => {
  return {
    type: fetchTypes.FETCH,
    name: types.PLAYER_GAMES_FETCH_START,
    postFetch: `${types.PLAYER_GAMES_FETCH_COMPLETE}_PAGE${page}`,
    asyncCall: getCasinoPlayerGames,
    asyncCallData: { page, pageSize },
  };
};
